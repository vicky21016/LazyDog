import express from "express";
import { getAllCoupons } from "../controllers/couponController.js";

const router = express.Router();

router.get("/coupons", getAllCoupons);

export default router;
