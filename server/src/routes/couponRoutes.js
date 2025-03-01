import express from "express";
import {
  getCoupons,
  getCouponById,
  getCouponByCode,
  createCoupons,
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
router.post("/", verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const role = req.user.role;
    const result = await createCoupons(req.body, user_id, role);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "無法新增優惠券：" + error.message });
  }
});

router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const role = req.user.role;
    const { id } = req.params;

    const result = await updateCoupon(id, req.body, user_id, role);

    if (!result.success) {
      return res.status(403).json({ error: result.message });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "無法更新優惠券：" + error.message });
  }
});

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
