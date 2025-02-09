import { getCoupons } from "../services/couponService.js";

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await getCoupons();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getAllCoupons;
