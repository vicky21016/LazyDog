import express from "express";
import { getAllCoupons,getCouponById,createCoupon } from "../controllers/couponController.js";
//getByIds createCoupon updateCoupon softDeleteCoupon
const router = express.Router();

router.get("/", getAllCoupons);
router.get("/:id", getCouponById);
router.post("/", createCoupon);
// router.patch("/:id", updateCoupon);
// router.patch("/:id/soft-delete", softDeleteCoupon); 

export default router;
