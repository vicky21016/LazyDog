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

export const updateCouponById = async (id, couponData) => {
  try {
    if (!id) {
      return { error: "缺少 id，無法更新優惠券" };
    }

    if (!couponData || Object.keys(couponData).length == 0) {
      return { error: "沒有提供更新欄位" };
    }

    // 移除不能更新的欄位
    const { created_at, code, ...updateFields } = couponData;

    console.log("需要更新的欄位:", updateFields);

    // 確保有要更新的欄位
    const keys = Object.keys(updateFields);
    if (keys.length === 0) {
      return { error: "沒有可更新的欄位" };
    }

    // 產生動態 SQL
    const values = Object.values(updateFields);
    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const setClauseWithUpdatedAt = `${setClause}, updated_at = NOW()`;

    values.push(id); // id 放在最後一個參數

    const [result] = await pool.query(
      `UPDATE coupons SET ${setClauseWithUpdatedAt} WHERE id = ?`,
      values
    );

    if (!result || result.affectedRows == 0) {
      return { error: `更新失敗，找不到 id=${id} 的優惠券或沒有變更` };
    }

    return { message: `優惠券 id=${id} 更新成功` };
  } catch (error) {
    return { error: "無法更新優惠券：" + error.message };
  }
};
