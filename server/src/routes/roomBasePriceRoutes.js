import express from "express";
import {
  getHotelPriceRange,
  getGlobalPriceRange,
  addRoomBasePrice,
  updateRoomBasePrice,
  softDeleteRoomBasePrice,
  getRoomBasePrices,  // 取得所有房型價格
} from "../controllers/roomBasePriceController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 取得所有房型價格
router.get("/", getRoomBasePrices);

// 取得所有飯店價格範圍
router.get("/range", getGlobalPriceRange);

// 取得特定飯店價格範圍
router.get("/range/:hotelId", getHotelPriceRange);

// 新增房型價格 (限 Operator)
router.post("/", verifyToken, verifyRole(["operator"]), addRoomBasePrice);

// 更新房型價格 (限 Operator)
router.patch("/:id", verifyToken, verifyRole(["operator"]), updateRoomBasePrice);

// 軟刪除房型價格 (限 Operator)
router.patch("/delete/:id", verifyToken, verifyRole(["operator"]), softDeleteRoomBasePrice);

export default router;
