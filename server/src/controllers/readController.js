import {
  fetchCouponRestrictions,
  fetchTags,
  fetchHotelTags,
} from "../services/readService.js";

export const fetchCouponRestriction = async (req, res) => {
  try {
    const restrictions = await fetchCouponRestrictions(req.params.couponId);
    res.status(200).json(restrictions);
  } catch (error) {
    res.status(500).json({ error: "無法取得優惠券限制：" + error.message });
  }
};
export const fetchTag = async (req, res) => {
  try {
    const tags = await fetchTags();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: "無法取得標籤：" + error.message });
  }
};
export const fetchHotelTag = async (req, res) => {
  try {
    const hotelTags = await fetchHotelTags(req.params.hotelId);
    res.status(200).json(hotelTags);
  } catch (error) {
    res.status(500).json({ error: "無法取得飯店標籤：" + error.message });
  }
};
