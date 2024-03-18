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
