import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import { createHotelReview, replyHotelReview, getHotelReviews } from "../controllers/hotelReviewController.js";

const router = express.Router();

// 使用者發表評論
router.post("/", verifyToken, verifyRole(["user"]), createHotelReview);

// 業者回覆評論
router.post("/:id/reply", verifyToken, verifyRole(["operator"]), replyHotelReview);

// 取得特定飯店的所有評論
router.get("/:hotel_id", getHotelReviews);

export default router;
