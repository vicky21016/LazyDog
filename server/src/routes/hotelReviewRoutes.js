import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import {
  createHotelReview,
  replyHotelReview,
  getHotelReview,
  deleteReview,
} from "../controllers/hotelReviewController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/hotel_review_images/" });

const router = express.Router();

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

// 取得特定HOTEL的所有評論
router.get("/:hotel_id", getHotelReview);

// 刪除自己的評論包含圖片(只是軟刪除而已)
router.delete("/:id", verifyToken, verifyRole(["user"]), deleteReview);

export default router;
