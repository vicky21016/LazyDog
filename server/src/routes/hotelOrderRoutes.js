import express from "express";
import {
  getOrders,
  getOrder,
  createNewOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/hotelOrderController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";


const router = express.Router();

// 取得所有訂單
router.get("/", verifyToken, verifyRole(["operator"]), getOrders);

//取得特定訂單
router.get("/:id", verifyToken, getOrder);

// 創建訂單
router.post("/", verifyToken, verifyRole(["user"]), createNewOrder);

//  更新訂單
router.patch("/:id", verifyToken, verifyRole(["operator"]), updateOrder);

// 軟刪除訂單（只有管理員能硬刪除）
router.patch(
  "/:id/soft-delete",
  verifyToken,
  verifyRole(["operator"]),
  deleteOrder
);

export default router;
