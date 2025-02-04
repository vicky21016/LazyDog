import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import connectToDatabase from "./config/mysql.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST"],
  })
);


app.use("/auth", authRouter); 
app.get("/", (req, res) => {
  res.send("伺服器正在運行！");
});


(async () => {
  try {
    const db = await connectToDatabase();
    console.log("資料庫已連接");

    app.listen(5000, () => {
      console.log("服務啟動於 http://localhost:5000");
    });
  } catch (err) {
    console.error("無法啟動伺服器，資料庫連接失敗:", err);
  }
})();
