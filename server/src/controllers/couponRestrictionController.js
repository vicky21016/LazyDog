import {
  getCouponRestrictions,
  createCouponRestrictions,
  deleteCouponRestrictions,
} from "../services/couponRestrictionService.js";

export const getCouponRestriction = async (req, res) => {
  try {
    const { coupon_id } = req.params;
    const restrictions = await getCouponRestrictions(coupon_id);
    res.json(restrictions);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
export const createCouponRestriction = async (req, res) => {
  try {
    const { coupon_id, restricted_id, restricted_table, restriction_type } =
      req.body;

    if (
      !coupon_id ||
      !restricted_id ||
      !restricted_table ||
      !restriction_type
    ) {
      return res.status(400).json({ error: "缺少必要欄位" });
    }
    const newRestriction = await createCouponRestrictions({
      coupon_id,
      restricted_id,
      restricted_table,
      restriction_type,
    });

    res.json(newRestriction);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteCouponRestriction = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCouponRestrictions(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
