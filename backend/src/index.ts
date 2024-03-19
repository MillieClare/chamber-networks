import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { PoolClient } from "pg";
import pool from "./db";
import cors from "cors";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// Enable CORS requests
app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.post(
  "/find-closest-available-chamber",
  async (req: Request, res: Response) => {
    const {
      name,
      street_address,
      postcode,
      building_latitude,
      building_longitude,
    } = req.body;

    let client: PoolClient | null = null; // Declare client here to make it accessible in all blocks
    let capacityAvailable: boolean = true;

    try {
      client = await pool.connect(); // Initialize client in the try block
      await client.query("BEGIN"); // Start the transaction

      // Step 1: Find the nearest suitable chamber
      const getChamberQuery = `
      SELECT id, ST_Distance(
        geom::geography,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
      ) AS distance,
      used_capacity
      FROM chambers
      WHERE (total_capacity - used_capacity) >= 10
      ORDER BY distance
      LIMIT 1;
    `;
      const chamberResult = await client.query(getChamberQuery, [
        building_longitude,
        building_latitude,
      ]);

      if (chamberResult.rows.length === 0) {
        capacityAvailable = false;
        throw new Error("No available chamber found"); // Use throw to jump to the catch block
      }
      const selectedChamberId = chamberResult.rows[0].id;

      // Step 2: Add the new customer
      const updateAddCustomerQuery = `
      INSERT INTO customers (customer_name, street_address, postcode, building_latitude, building_longitude, chamberId)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
      await client.query(updateAddCustomerQuery, [
        name,
        street_address,
        postcode,
        building_latitude,
        building_longitude,
        selectedChamberId,
      ]);

      // Step 3: Update 'used_capacity' to reflect new customer
      const updateChamberQuery = `
      UPDATE chambers
      SET used_capacity = used_capacity + $1
      WHERE id = $2;
    `;
      await client.query(updateChamberQuery, [10, selectedChamberId]);

      // Step 4: Find nearest chamber irrespective of capacity (check if selected chamber is also nearest chamber) - alert user is nearest chamber doesn't have capacity but still provide next closest that does.
      const getNearestChamberQuery = `
      SELECT id, ST_Distance(
        geom::geography,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
        ) AS distance
      FROM chambers
      ORDER BY distance
      LIMIT 1;
    `;
      const nearestChamberResult = await client.query(getNearestChamberQuery, [
        building_longitude,
        building_latitude,
      ]);

      if (nearestChamberResult.rows.length === 0) {
        capacityAvailable = false;
        throw new Error("No chambers found"); // Use throw to jump to the catch block
      }
      const nearestSelectedChamberId = nearestChamberResult.rows[0].id;

      // Step 5: Check if nearest chamber is at capacity
      const isNearestChamberAtCapacity =
        nearestSelectedChamberId === selectedChamberId ? false : true;

      // Step 6: Find out if selected chamber is now at capacity after update
      const isSelectedChamberAtCapacity =
        chamberResult.rows[0].used_capacity === 90 ? true : false;

      await client.query("COMMIT"); // Successfully end the transaction

      res.json({
        success: true,
        chamberId: selectedChamberId,
        nearestSelectedChamberId,
        isNearestChamberAtCapacity,
        isSelectedChamberAtCapacity,
      });
    } catch (err) {
      console.error(err);
      if (client) {
        await client.query("ROLLBACK"); // Rollback the transaction in case of any error
      }
      !capacityAvailable
        ? res.json({
            success: false,
            chamberId: null,
            nearestSelectedChamberId: null,
            isNearestChamberAtCapacity: null,
            isSelectedChamberAtCapacity: null,
          })
        : res.status(500).send("Server error");
    } finally {
      if (client) {
        client.release(); // Release the client back to the pool
      }
    }
  }
);

app.get("/chambers", async (req: Request, res: Response) => {
  let client: PoolClient | null = null; // Declare client here to make it accessible in all blocks

  try {
    client = await pool.connect();

    const getAllChambersQuery = `
    SELECT id,
      total_capacity,
      used_capacity,
      latitude,
      longitude,
      total_capacity - used_capacity AS available_capacity
    FROM chambers ORDER BY id;
  `;
    const allChambersAndAvailableCapacities = await client.query(
      getAllChambersQuery
    );

    res.json({ chambers: allChambersAndAvailableCapacities.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  } finally {
    if (client) {
      client.release();
    }
  }
});

app.get("/capacityAvailable", async (req: Request, res: Response) => {
  let client: PoolClient | null = null; // Declare client here to make it accessible in all blocks

  try {
    client = await pool.connect();

    const getCapacityAvailableQuery = `
    SELECT bool_or(capacity_available) AS capacity_available FROM(
      SELECT
      CASE
        WHEN total_capacity - used_capacity >= 10 THEN true
        ELSE false
      END AS capacity_available
    FROM chambers
    );
  `;
    const capacityAvailable = await client.query(getCapacityAvailableQuery);

    res.json(capacityAvailable.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  } finally {
    if (client) {
      client.release(); // Release the client back to the pool
    }
  }
});

app.listen(port, () => {
  console.log(`Server is available at http://localhost:${port}`);
});
