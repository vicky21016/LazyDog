import pool from "../config/mysql.js";

export const getHotelPriceRange = async (hotelId) => {
  try {
    const [rows] = await pool.execute(
      `SELECT MIN(base_price) AS min_price, MAX(base_price) AS max_price
       FROM room_base_price 
       WHERE hotel_id = ? AND is_deleted = 0`,
      [hotelId]
    );
    return rows[0]; // 回傳單一物件
  } catch (error) {
    throw new Error("無法獲取飯店價格範圍：" + error.message);
  }
};
export const getGlobalPriceRange = async () => {
    try {
      const [rows] = await pool.execute(
        `SELECT MIN(base_price) AS min_price, MAX(base_price) AS max_price 
         FROM room_base_price WHERE is_deleted = 0`
      );
      return rows[0]; // 回傳單一物件
    } catch (error) {
      throw new Error("無法獲取所有飯店的價格範圍：" + error.message);
    }
  };
  export const addRoomBasePrice = async (hotelId, roomTypeId, basePrice, currency = "TWD") => {
    try {
      const [result] = await pool.execute(
        `INSERT INTO room_base_price (hotel_id, room_type_id, base_price, currency) 
         VALUES (?, ?, ?, ?)`,
        [hotelId, roomTypeId, basePrice, currency]
      );
      return result.insertId; // 回傳新增的 ID
    } catch (error) {
      throw new Error("無法新增房型價格：" + error.message);
    }
  };
  export const updateRoomBasePrice = async (id, basePrice) => {
    try {
      const [result] = await pool.execute(
        `UPDATE room_base_price 
         SET base_price = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE id = ? AND is_deleted = 0`,
        [basePrice, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("無法更新房型價格：" + error.message);
    }
  };
  export const softDeleteRoomBasePrice = async (id) => {
    try {
      const [result] = await pool.execute(
        `UPDATE room_base_price 
         SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("無法刪除房型價格：" + error.message);
    }
  };
        