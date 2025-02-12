import express from "express";
import {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  softDeleteCoupon
} from "../controllers/couponController.js";

const router = express.Router();

router.get("/", getAllCoupons);
router.get("/:id", getCouponById);
router.post("/", createCoupon);
router.patch("/:id", updateCoupon);
router.patch("/:id/soft-delete", softDeleteCoupon);

export default router;
