import React, { useState, FormEvent } from "react";
import styles from "./Form.module.css";

interface CustomerData {
  name: string;
  street_address: string;
  postcode: string;
  building_latitude: string;
  building_longitude: string;
}

function Form() {
  const [name, setName] = useState<string>("");
  const [street_address, setStreetAddress] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [building_latitude, setLatitude] = useState<string>("");
  const [building_longitude, setLongitude] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const customerData: CustomerData = {
      name,
      street_address,
      postcode,
      building_latitude,
      building_longitude,
    };
    console.log({ customerData });

    try {
      const response = await fetch(
        "http://localhost:8000/find-closest-available-chamber",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const {
        chamberId,
        isNearestChamberAtCapacity,
        isSelectedChamberAtCapacity,
        nearestSelectedChamberId,
      } = result;

      if (isNearestChamberAtCapacity) {
        console.log(
          `The nearest chamber (${nearestSelectedChamberId}) to the customer has no capacity, we have assigned the customer to the closest chamber which does have capacity: ${chamberId}.`
        );
      }

      if (isSelectedChamberAtCapacity) {
        console.log(
          `We have added the customer to the closest chamber: ${chamberId} - please note that this chamber is now full and no more customers can be allocated.`
        );
      }

      console.log({
        chamberId,
        isNearestChamberAtCapacity,
        isSelectedChamberAtCapacity,
        nearestSelectedChamberId,
      });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }

    try {
      const response = await fetch("http://localhost:8000/capacityAvailable", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (!result.capacity_available) {
        console.log(
          "There are no more available chambers. We cannot accept any new customers"
        );
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>Add a Customer</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formrow}>
          <div className={styles.inputdata}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            />
            <div className={styles.underline}></div>
            <label>Customer Name</label>
          </div>
          <div className={styles.inputdata}>
            <input
              type="text"
              value={street_address}
              onChange={(e) => setStreetAddress(e.target.value)}
              required
            />
            <div className={styles.underline}></div>
            <label>Street Address</label>
          </div>
        </div>
        <div className={styles.formrow}>
          <div className={styles.inputdata}>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              required
            />
            <div className={styles.underline}></div>
            <label>Postcode</label>
          </div>
          <div className={styles.inputdata}>
            <input
              type="text"
              value={building_latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
            <div className={styles.underline}></div>
            <label>Latitude</label>
          </div>
          <div className={styles.inputdata}>
            <input
              type="text"
              value={building_longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
            <div className={styles.underline}></div>
            <label>Longitude</label>
          </div>
        </div>
        <br />
        <div className={styles.underline}></div>

        <div className={`${styles.formrow} + ${styles.submitbtn}`}>
          <div className={styles.inputdata}>
            <div className={styles.inner}></div>
            <input type="submit" value="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
