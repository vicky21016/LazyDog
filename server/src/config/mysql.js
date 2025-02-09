import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

let connection;

export const connectToDatabase = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0
    });
    console.log("資料庫連線成功");
  }
  return connection;
};

export default connectToDatabase;

// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
// console.log("DBDB_DATABASE:", process.env.DB_DATABASE);
