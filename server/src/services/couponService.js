import pool from "../config/mysql.js";

export const getCoupons = async () => {
  try {
    const [coupons] = await pool.query("SELECT * FROM coupons");
    return coupons;
  } catch (error) {
    throw new Error(` 無法取得優惠券列表：` + error.message);
  }
};

export const getId = async (id) => {
  try {
    const [coupons] = await pool.query(
      "SELECT * FROM coupons WHERE id = ? AND is_deleted = 0",
      [id]
    );
    return coupons;
  } catch (err) {
    throw new Error(`無法取得 ${id} 的優惠券:` + err.message);
  }
};

export const createCoupons = async (couponData) => {
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
    } = couponData;

    const [result] = await pool.query(
      `INSERT INTO coupons 
          (name, type, content, value, min_order_value, start_time,end_time,status, max_usage, max_usage_per_user, code, 
          created_at, updated_at, is_deleted) 
          VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, NOW(), NOW(), 0)`,
      [
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
      ]
    );

    return { id: result.insertId, name, type, code };
  } catch (err) {
    throw new Error("無法創新優惠券：" + err.message);
  }
};
