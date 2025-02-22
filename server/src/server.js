import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/authRoutes.js";
import favoriteRouter from "./routes/favoriteRoutes.js";
import googleRouter from "./controllers/googleController.js";
import teacherSignRouter from "./routes/teacherSignRoutes.js";
import pool from "./config/mysql.js";
import hotelImagesRoutes from "./routes/hotelImagesRoutes.js";
import readRoutes from "./routes/readRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import hotelTagsRoutes from "./routes/hotelTagsRoutes.js";
import hotelRoomTypeRoutes from "./routes/hotelRoomTypeRoutes.js";
import roomInventoryRoutes from "./routes/roomInventoryRoutes.js";
import hotelOrderRoutes from "./routes/hotelOrderRoutes.js";
import orderDogsRoutes from "./routes/orderDogsRoutes.js";
import hotelFavoriteRoutes from "./routes/hotelFavoriteRoutes.js";
import hotelReviewRoutes from "./routes/hotelReviewRoutes.js";
import userCouponsRoutes from "./routes/couponUsageRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import couponRestrictionRoutes from "./routes/couponRestrictionRoutes.js";
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
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/auth", authRouter);
app.use("/api/auth/google", googleRouter);
app.use("/teacher", teacherSignRouter);

app.use("/api/read", readRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/hotel_tags", hotelTagsRoutes);
app.use("/api/hotel_room_types", hotelRoomTypeRoutes);
app.use("/api/room_inventory", roomInventoryRoutes);
app.use("/api/hotel_images", hotelImagesRoutes);
app.use("/api/hotel_orders", hotelOrderRoutes);
app.use("/api/order_dogs", orderDogsRoutes);
app.use("/api/hotel_favorites", hotelFavoriteRoutes);
app.use("/api/hotel_review", hotelReviewRoutes);

app.use("/api/coupon", couponRoutes);
app.use("/api/coupon/restrictions", couponRestrictionRoutes);
app.use("/api/coupon/usage", userCouponsRoutes);

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
