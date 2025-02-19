import pool from "../config/mysql.js";

export const getOrderDogs = async (orderId) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM order_dogs WHERE order_id = ? AND is_deleted = 0",
      [orderId]
    );
    return rows;
  } catch (error) {
    throw new Error("無法取得訂單內的寵物：" + error.message);
  }
};

export const createOrderDogs = async (data) => {
  try {
    const { order_id, name, breed, age, size, special_needs, vaccination_status } = data;
    const [result] = await pool.query(
        `INSERT INTO order_dogs 
        (order_id, name, breed, age, size, special_needs, vaccination_status, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [order_id, name, breed, age, size, special_needs, vaccination_status]
      );
      return { id: result.insertId, ...data };
  } catch (error) {
    throw new Error("無法新增訂單內的寵物：" + error.message);
  }
};

export const updateOrderDogs = async (dogId, data) => {
  try {
    const { name, breed, age, size, special_needs, vaccination_status } = data;
    const [result] = await pool.query( `UPDATE order_dogs 
      SET name=?, breed=?, age=?, size=?, special_needs=?, vaccination_status=?, updated_at=NOW() 
      WHERE id=? AND is_deleted = 0`,
      [name, breed, age, size, special_needs, vaccination_status, dogId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("無法更新訂單內的寵物：" + error.message);
  }
};

export const deleteOrderDogs = async (dogId) => {
  try {
    const [result] = await pool.query(
      "UPDATE order_dogs SET is_deleted = 1 WHERE id = ?",
      [dogId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("無法刪除訂單內的寵物：" + error.message);
  }
};
