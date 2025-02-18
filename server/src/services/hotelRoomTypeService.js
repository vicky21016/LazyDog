import pool from "../config/mysql.js";

export const getAllRooms = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM room_type");
    return rows;
  } catch (error) {
    throw new Error("找不到該房型:" + error.message);
  }
};
export const getRoomByIds = async (id) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM room_type WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    throw new Error(`找不到房型 (ID: ${id})，錯誤訊息：` + error.message);
  }
};
export const createRooms = async (data) => {
  try {
    const { name, description, price, capacity } = data;
    const [result] = await pool.query(
      "INSERT INTO room_type (name, description, price, capacity) VALUES (?, ?, ?, ?)",
      [name, description, price, capacity]
    );
    return { id: result.insertId, name, description, price, capacity };
  } catch (error) {
    throw new Error("無法新增房型:" + error.message);
  }
};
export const updateRooms = async (id,data) => {
  try {
    const  { name, description, price, capacity } = data;
    const [result] = await pool.query ("UPDATE room_type SET name=?, description=?, price=?, capacity=? WHERE id=?",
    [name, description, price, capacity, id])
    return result.affectedRows > 0;

  } catch (error) {
    throw new Error(`無法更新房型 (ID: ${id})，錯誤訊息：` + error.message);
  }
};
export const deleteRooms = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM room_type WHERE id=?", [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`無法刪除房型 (ID: ${id})，錯誤訊息：` + error.message);
  }
};
