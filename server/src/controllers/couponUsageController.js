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
    const { userId, code } = req.body;

    if (!userId || !code) {
      return res.status(400).json({ error: "缺少 userId 或優惠券代碼" });
    }

    const result = await claimUserCouponByCode(userId, code);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCoupons = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await getUserCoupons(userId);
    res.status(200).json(result);
  } catch (error) {
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
