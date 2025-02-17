import pool from "../config/mysql.js";

export const getAllOrders = async () => {
  try {
    const [orders] = await pool.query(
      "SELECT * FROM hotel_order WHERE is_deleted=0"
    );
    return orders;
  } catch (err) {
    throw new Error("無法取得此訂單:" + err.message);
  }
};
