import pkg from "pg";

import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

console.log(typeof process.env.DB_PASSWORD);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, // Make sure DB_PASSWORD is defined in your .env file
  port: 5432,
});

export default pool;
