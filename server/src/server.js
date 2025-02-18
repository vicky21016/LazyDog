import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import favoriteRouter from "./routes/favoriteRoutes.js";
import googleRouter from "./controllers/googleController.js";
import teacherSignRouter from "./routes/teacherSignRoutes.js";
import pool from "./config/mysql.js";
import hotelImagesRoutes from "./routes/hotelImagesRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import hotelOrderRoutes from "./routes/hotelOrderRoutes.js";
import hotelFavoriteRoutes from "./routes/hotelFavoriteRoutes.js";
import hotelReviewRoutes from "./routes/hotelReviewRoutes.js";
import userCouponsRoutes from "./routes/userCouponsRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import articlesRoutes from "./routes/articleRoutes.js";
import teacherRoute from "./routes/teacherRoute.js";
import cartRoutes from "./routes/cartRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  })
);
app.use("/uploads/hotel", express.static("/uploads/hotel"));

app.use("/auth", authRouter);
app.use("/api/google", googleRouter);
app.use("/teacher", teacherSignRouter);
app.use("/api/hotels", hotelRoutes);
app.use("/api/hotel_images", hotelImagesRoutes);
app.use("/api/hotel_orders", hotelOrderRoutes);
app.use("/api/hotel_favorite", hotelFavoriteRoutes);
app.use("/api/hotel_review", hotelReviewRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/coupon_usage", userCouponsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/favorite", favoriteRouter);
app.use("/teachers", teacherRoute);
app.use("/api/comment", commentRoutes);

app.get("/", (req, res) => {
  res.json({ status: "success", data: null, message: "首頁" });
});
(async () => {
  try {
    // await pool.query();

    console.log("資料庫已連接");

    app.listen(5000, () => {
      console.log("服務啟動於 http://localhost:5000");
    });
  } catch (err) {
    console.error("無法啟動伺服器，資料庫連接失敗:", err);
  }
})();
