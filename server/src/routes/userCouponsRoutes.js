import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import {
  claimCoupon,
  getCoupons,
  useCoupon,
  deleteCoupon,
} from "../controllers/userCouponsController.js";

const router = express.Router();

router.get("/", verifyToken, verifyRole(["user"]), getCoupons);
router.post("/claim", verifyToken, verifyRole(["user"]), claimCoupon);
router.patch("/use/:couponId", verifyToken, verifyRole(["user"]), useCoupon);
router.patch(
  "/delete/:couponId",
  verifyToken,
  verifyRole(["user"]),
  deleteCoupon
);

export default router;
