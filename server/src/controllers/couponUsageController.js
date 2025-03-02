import {
  claimUserCoupon,
  getUserCoupons,
  useUserCoupon,
  deleteUserCoupon,
  claimUserCouponByCode,
} from "../services/couponUsageService.js";

export const claimCoupon = async (req, res) => {
  try {
    const { couponId } = req.body;
    const userId = req.user.id;
    const result = await claimUserCoupon(userId, couponId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const claimCouponByCode = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id;
    if (!code) {
      return res.status(400).json({ error: "請提供優惠券代碼" });
    }

    const result = await claimUserCouponByCode(userId, code);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCouponss = async (req, res) => {
  try {
    console.log("請求的使用者:", req.user); // 確保 user 存在
    const userId = req.user?.id;
    if (!userId) {
      return res.status(403).json({ error: "未授權，無法獲取優惠券" });
    }

    const result = await getUserCoupons(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error("獲取優惠券失敗:", error.message);
    res.status(400).json({ error: error.message });
  }
};


export const useCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;
    const { userId, orderId, orderTable } = req.body;

    if (!userId || !couponId || !orderId || !orderTable) {
      return res.status(400).json({ error: "缺少必要欄位" });
    }

    if (!["hotel_order", "course_orders", "yi_orderlist"].includes(orderTable)) {
      return res.status(400).json({ error: "無效的訂單類型" });
    }

    const result = await useUserCoupon(userId, couponId, orderId, orderTable);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;
    const userId = req.user.id;
    const result = await deleteUserCoupon(userId, couponId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
