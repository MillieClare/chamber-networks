import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { PoolClient } from "pg";
import pool from "./db";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

// Endpoint 1:
// /find-chamber(?)
// Step 1: Find the nearest suitable chamber - provide ID of closest chamber with available capacity
// Step 2: Add new customer - persist new customers in database
// Step 3: Update 'used_capacity' to reflect new customer
// TODO: Step 4: Find nearest chamber irrespective of capacity (check if selected chamber is also nearest chamber) - alert user is nearest chamber doesn't have capacity but still provide next closest that does.
// TODO: Step 5: Check if nearest chamber is at capacity
// TODO: Step 6: Find out if selected chamber is now at capacity after update - alert user if selected chamber is at capacity after customer is added.

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

    try {
      client = await pool.connect(); // Initialize client in the try block
      await client.query("BEGIN"); // Start the transaction

      // Step 1: Find the nearest suitable chamber
      const getChamberQuery = `
      SELECT id AS ChamberID, ST_Distance(
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
        throw new Error("No available chamber found"); // Use throw to jump to the catch block
      }
      const selectedChamberId = chamberResult.rows[0].chamberid;

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

      res.json({
        success: true,
        chamberId: selectedChamberId,
      });

      await client.query("COMMIT"); // Successfully end the transaction
    } catch (err) {
      console.error(err);
      if (client) {
        await client.query("ROLLBACK"); // Rollback the transaction in case of any error
      }
      res.status(500).send("Server error");
    } finally {
      if (client) {
        client.release(); // Release the client back to the pool
      }
    }
  }
);

app.listen(port, () => {
  console.log(`Server is available at http://localhost:${port}`);
});
