import express from "express";
import {
  getCoupons,
  getCouponById,
  getCouponByCode,
  createCoupon,
  updateCoupon,
  softDeleteCoupon,
} from "../controllers/couponController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 取得所有優惠券（根據使用者角色）
router.get("/", verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const role = req.user.role;
    const result = await getCoupons(user_id, role);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "無法取得優惠券：" + error.message });
  }
});

// 透過 ID 查詢優惠券（只有 operator & teacher 可以查詢）
router.get("/:id", verifyToken, verifyRole(["operator", "teacher"]), getCouponById);

// 透過代碼查詢優惠券（所有已登入用戶可查詢）
router.get("/code/:code", verifyToken, getCouponByCode);

// 創建優惠券（只有 operator & teacher 可以創建）
router.post("/", verifyToken, verifyRole(["operator", "teacher"]), createCoupon);

// 更新優惠券（只有 operator & teacher 可以更新）
router.patch("/:id", verifyToken, verifyRole(["operator", "teacher"]), updateCoupon);

// 軟刪除優惠券（只有 operator & teacher 可以刪除）
router.patch("/:id/soft-delete", verifyToken, verifyRole(["operator", "teacher"]), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await softDeleteCoupon(id);

    if (result.error) {
      return res.status(403).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "無法刪除優惠券：" + error.message });
  }
});

export default router;
