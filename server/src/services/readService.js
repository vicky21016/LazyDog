import pool from "../config/mysql.js";

export const fetchCouponRestrictions = async (couponId) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM coupon_restrictions WHERE coupon_id = ?",
      [couponId]
    );
    return rows;
  } catch (error) {
    throw new Error("無法取得優惠券限制：" + error.message);
  }
};
export const fetchTags = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM tags");
    return rows;
  } catch (error) {
    throw new Error("無法取得標籤：" + error.message);
  }
};
export const fetchHotelTags = async (hotelId) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.id, t.name 
         FROM hotel_tags ht
         JOIN tags t ON ht.tag_id = t.id
         WHERE ht.hotel_id = ?`,
      [hotelId]
    );
    return rows;
  } catch (error) {
    throw new Error("無法取得飯店標籤：" + error.message);
  }
};

export const fetchRoomTypes = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM room_type WHERE is_deleted = 0");
    return rows;
  } catch (error) {
    throw new Error("無法取得房型：" + error.message);
  }
};