import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export default pool;

// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
// console.log("DBDB_DATABASE:", process.env.DB_DATABASE);
