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
    const userId = req.user.id; // 從 Token 中獲取 userId
    const { status, type } = req.query;

    console.log("🚀 getCouponss 中的 req.user:", req.user);
    console.log("🚀 從 Token 獲取的 userId:", userId);

    const result = await getUserCoupons(userId, status, type);
    res.status(200).json(result);
  } catch (error) {
    console.error("控制器錯誤:", error);
    res.status(500).json({ success: false, error: "資料庫查詢失敗" });
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
