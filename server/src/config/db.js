import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "dogadmin",
      password: process.env.DB_PASSWORD || "helloworld",
      database: process.env.DB_DATABASE || "dog_db",
    });

    console.log("資料庫連線成功");
    return db;
  } catch (error) {
    console.error("資料庫連線失敗:", error);
    throw error;
  }
};

export default connectDB;
