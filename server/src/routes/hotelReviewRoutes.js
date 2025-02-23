import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import {
  createHotelReview,
  replyHotelReview,
  getHotelReview,
  deleteReview,
} from "../controllers/hotelReviewController.js";
import multer from "multer";
import pool from "../config/mysql.js";
const upload = multer({ dest: "uploads/hotel_review_images/" });

const router = express.Router();
router.get("/average", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT hotel_id, ROUND(AVG(rating), 1) AS avg_rating
      FROM hotel_reviews
      GROUP BY hotel_id
    `);
    res.json(rows);
  } catch (error) {
    console.error("取得評分失敗:", error);
    res.status(500).json({ message: "無法取得評分" });
  }
});
// 使用者發表評論
router.post(
  "/",
  verifyToken,
  verifyRole(["user"]),
  upload.array("images", 5),
  createHotelReview
);

// 業者回覆評論
router.post(
  "/:id/reply",
  verifyToken,
  verifyRole(["operator"]),
  replyHotelReview
);

// 刪除自己的評論包含圖片(只是軟刪除而已)
router.delete("/:id", verifyToken, verifyRole(["user"]), deleteReview);

// 取得特定HOTEL的所有評論
router.get("/:hotel_id", getHotelReview);

export default router;
