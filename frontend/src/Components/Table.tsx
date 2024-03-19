import React, { useState, useEffect } from "react";

import styles from "./Table.module.css";

interface ChamberData {
  id: string;
  total_capacity: number;
  used_capacity: number;
  latitude: number;
  longitude: number;
}

interface TableProps {
  shouldReload: boolean;
  onReload: () => void;
}

function Table({ shouldReload, onReload }: TableProps) {
  const [data, setData] = useState<ChamberData[]>([]);

  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/chambers");
        const result = await response.json();
        console.log(result);

        setData(result.chambers); // Set your state with the result
        const currentTimestamp = new Date().toLocaleString(); // Adjust format as needed
        setLastRefreshedAt(currentTimestamp);
        console.log(result.chambers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      onReload();
    };

    fetchData(); // Call the function to fetch data
    onReload(); // Reset the reload trigger in App.tsx
  }, [shouldReload]); // Empty dependency array means this effect runs once on mount

  return (
    <div
      style={{
        marginTop: 24,
      }}
    >
      {data ? (
        <div>
          <h2>Chamber Assignment Details</h2>
          <h3>Last refreshed at: {lastRefreshedAt}</h3>
          <table className={styles.container}>
            <thead>
              <tr>
                <th>Chamber ID</th>
                <th>Total Capacity</th>
                <th>Used Capacity</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {data.map((chamber) => {
                return (
                  <tr key={chamber.id}>
                    <td>{chamber.id}</td>
                    <td>{chamber.total_capacity}</td>
                    <td>{chamber.used_capacity}</td>
                    <td>{chamber.latitude}</td>
                    <td>{chamber.longitude}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default Table;
