import express from "express";
import {
  getHotelPriceRange,
  getGlobalPriceRange,
  addRoomBasePrice,
  updateRoomBasePrice,
  softDeleteRoomBasePrice
} from "../controllers/roomBasePriceController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 取得所有飯店價格範圍
router.get("/", getGlobalPriceRange);

// 取得特定飯店價格範圍
router.get("/:hotelId", getHotelPriceRange);

// 新增房型價格 (限 Operator)
router.post("/", verifyToken, verifyRole(["operator"]), addRoomBasePrice);

// 更新房型價格 (限 Operator)
router.patch("/:id", verifyToken, verifyRole(["operator"]), updateRoomBasePrice);

// 軟刪除房型價格 (限 Operator)
router.patch("/delete/:id", verifyToken, verifyRole(["operator"]), softDeleteRoomBasePrice);

export default router;
