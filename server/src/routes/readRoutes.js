import express from "express";
import {
  fetchCouponRestriction,
  fetchTag,
  fetchHotelTag,
  fetchRoomType,
} from "../controllers/readController.js";

const router = express.Router();
// 查詢優惠券的限制條件
router.get("/coupon_restrictions/:couponId", fetchCouponRestriction);

// 查詢所有標籤
router.get("/tags", fetchTag);

// 查詢某個飯店的標籤
router.get("/hotel_tags/:hotelId", fetchHotelTag);

router.get("/room_types", fetchRoomType);

export default router;
