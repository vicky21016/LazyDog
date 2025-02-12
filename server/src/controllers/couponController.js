import { getCoupons, getId, createCoupons } from "../services/couponService.js";

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await getCoupons();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

export const createCoupon = async (req, res) => {
  try {
    const {
      name,
      type,
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
