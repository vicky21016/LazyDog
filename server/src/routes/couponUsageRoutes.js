import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import {
  claimCoupon,
  claimCouponByCode,
  getCoupons,
  useCoupon,
  deleteCoupon,
} from "../controllers/couponUsageController.js";

const router = express.Router();

router.get("/", verifyToken, verifyRole(["user"]), getCoupons);
router.post("/claim", verifyToken, verifyRole(["user"]), claimCoupon);
router.post("/typing", verifyToken, verifyRole(["user"]), claimCouponByCode);
router.patch("/use/:couponId", verifyToken, verifyRole(["user"]), useCoupon);
router.patch(
  "/delete/:couponId",
  verifyToken,
  verifyRole(["user"]),
  deleteCoupon
);

export default router;
