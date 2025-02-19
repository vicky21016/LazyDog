import pool from "../config/mysql.js";

export const getRoomInventorys = async (hotelId) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM room_inventory WHERE hotel_id = ?",
      [hotelId]
    );
    return rows;
  } catch (error) {
    throw new Error("無法得到庫存資訊" + error.message);
  }
};

export const updateRoomInventorys = async (roomInventoryId, data) => {
  try {
    const { available_quantity, price, date } = data;

    const [result] = await pool.execute(
      `UPDATE room_inventory 
         SET available_quantity = ?, price = ?, date = ? 
         WHERE id = ?`,
      [available_quantity, price, date, roomInventoryId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("無法更新庫存" + error.message);
  }
};
