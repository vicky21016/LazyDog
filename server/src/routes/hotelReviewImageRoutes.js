import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import { uploadReviewImage, getReviewImages, deleteReviewImage } from "../controllers/reviewImageController.js";
import multer from "multer";

// 設定 Multer到我要的資料夾
const upload = multer({ dest: "uploads/hotel_review_images/" });

const router = express.Router();

// 上傳評論圖片（使用者）
router.post("/", verifyToken, verifyRole(["user"]), upload.single("image"), uploadReviewImage);

// 取得評論的圖片
router.get("/:review_id", getReviewImages);

// 刪除評論圖片（使用者）
router.delete("/:id", verifyToken, verifyRole(["user"]), deleteReviewImage);

export default router;
