import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import { addFavorite, removeFavorite, getUserFavorites } from "../controllers/hotelFavoriteController.js";

const router = express.Router();

// 新增收藏（使用者）
router.post("/", verifyToken, verifyRole(["user"]), addFavorite);

// 取消收藏（使用者）
router.delete("/:id", verifyToken, verifyRole(["user"]), removeFavorite);

// 取得使用者的收藏清單
router.get("/", verifyToken, verifyRole(["user"]), getUserFavorites);

export default router;
