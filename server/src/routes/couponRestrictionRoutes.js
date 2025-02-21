import express from "express";
import {
  getCouponRestriction,
  createCouponRestriction,
  deleteCouponRestriction,
} from "../controllers/couponRestrictionController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/:coupon_id", getCouponRestriction);
router.post(
  "/",
  verifyToken,
  verifyRole(["operator", "teacher"]),
  createCouponRestriction
);
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["operator", "teacher"]),
  deleteCouponRestriction
);

export default router;
