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

router.get(
  "/:id",
  verifyToken,
  verifyRole(["operator", "teacher"]),
  getCouponById
);
//提供查詢
router.get("/code/:code", getCouponByCode);
router.post("/", verifyToken, createCoupon);

router.patch("/:id", verifyToken, updateCoupon);

router.patch("/:id/soft-delete", verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const role = req.user.role;
    const { id } = req.params;

    const result = await softDeleteCoupon(id, user_id, role);

    if (!result.success) {
      return res.status(403).json({ error: result.message });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "無法刪除優惠券：" + error.message });
  }
});

export default router;
