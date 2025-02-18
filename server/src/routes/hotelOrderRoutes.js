import express from "express";
import {
  getOrders,
  getOrder,
  createNewOrder,
  updateOrder,
  changeStauts,
  updatePay,
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

// 變更訂單狀態 only operator可用
router.patch(
  "/:id/status",
  verifyToken,
  verifyRole(["operator"]),
  changeStauts
);
// 變更付款狀態（業者可操作）
router.patch("/:id/payment", verifyToken, verifyRole(["operator"]), updatePay);
// 軟刪除訂單（只有管理員能硬刪除）這邊只做軟刪除
router.patch(
  "/:id/soft-delete",
  verifyToken,
  verifyRole(["operator"]),
  deleteOrder
);

export default router;
