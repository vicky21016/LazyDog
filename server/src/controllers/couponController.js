import {
  getCoupons,
  getId,
  createCoupons,
  updateCouponById,
  softDeleteCouponById,
  getCouponByCodes,
} from "../services/couponService.js";

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await getCoupons();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const getCouponById = async (req, res) => {
  try {
    const id = Number(req.params.id, 10);
    const [coupon] = await getId(id);
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
export const getCouponByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const { userId } = req.query;

    if (!code) {
      return res.status(400).json({ error: "請提供優惠券代碼" });
    }

    if (!userId) {
      return res.status(400).json({ error: "缺少 userId" });
    }
    const result = await getCouponByCodes(code, userId);
    res.status(result.status || 200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const {
      name,
      type,
      is_global,
      content,
      value,
      min_order_value,
      start_time,
      end_time,
      status,
      max_usage,
      max_usage_per_user,
      code,
    } = req.body;

    if (
      !name ||
      !type ||
      !content ||
      !value ||
      !min_order_value ||
      !start_time ||
      !end_time ||
      !status ||
      !max_usage ||
      !max_usage_per_user ||
      !code
    ) {
      return res.status(400).json({ error: "缺少必要欄位" });
    }
    const newCoupon = await createCoupons({
      name,
      type,
      is_global: is_global || false,
      content,
      value,
      min_order_value,
      start_time,
      end_time,
      status,
      max_usage,
      max_usage_per_user,
      code,
    });

    res.json(newCoupon);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const couponData = req.body;

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "無效的 ID" });
    }

    const result = await updateCouponById(id, couponData);

    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const softDeleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await softDeleteCouponById(id);

    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
