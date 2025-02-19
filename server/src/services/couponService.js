import pool from "../config/mysql.js";

export const getCoupons = async () => {
  try {
    const [coupons] = await pool.query(
      "SELECT * FROM coupons  WHERE is_deleted = 0"
    );
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
export const getCouponByCode = async (code, userId) => {
  try {
    // 查詢優惠券是否存在
    const [coupons] = await pool.execute(
      "SELECT * FROM coupons WHERE code = ? AND is_deleted = 0",
      [code]
    );

    if (coupons.length === 0) {
      return { success: false, status: 404, message: "找不到此優惠券" };
    }

    const coupon = coupons[0];

    // 檢查優惠券是否過期
    const now = new Date();
    if (new Date(coupon.start_time) > now) {
      return { success: false, status: 400, message: "此優惠券尚未生效" };
    }
    if (new Date(coupon.end_time) < now) {
      return { success: false, status: 400, message: "此優惠券已過期" };
    }

    // 檢查優惠券是否已達最大使用次數
    const [usageMaxCount] = await pool.execute(
      "SELECT COUNT(*) as total_usage FROM coupon_usage WHERE coupon_id = ? AND status = 'claimed'",
      [coupon.id]
    );

    if (usageMaxCount[0].total_usage >= coupon.max_usage) {
      return { success: false, status: 400, message: "此優惠券已被領取完畢" };
    }

    // 檢查使用者是否已經領取過
    const [userClaimed] = await pool.execute(
      "SELECT COUNT(*) as user_usage FROM coupon_usage WHERE user_id = ? AND coupon_id = ? AND status = 'claimed'",
      [userId, coupon.id]
    );

    if (userClaimed[0].user_usage >= coupon.max_usage_per_user) {
      return {
        success: false,
        status: 400,
        message: "您已超過此優惠券的領取次數",
      };
    }

    return { success: true, data: coupon };
  } catch (err) {
    console.error(`無法取得優惠券 (${code}):`, err);
    return { success: false, status: 500, message: "伺服器錯誤" };
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

    values.push(id); // id 放在最後

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

export const softDeleteCouponById = async (id) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [existingCoupon] = await connection.query(
      "SELECT * FROM coupons WHERE id = ? AND is_deleted = 0",
      [id]
    );

    if (existingCoupon.length == 0) {
      await connection.rollback();
      return { error: `刪除失敗，找不到 id=${id} 或者已刪除` };
    }

    // 軟刪除旅館
    const [result] = await connection.query(
      "UPDATE coupons SET is_deleted = 1 , updated_at = NOW() WHERE id = ?",
      [id]
    );

    if (result.affectedRows == 0) {
      await connection.rollback();
      return { error: `軟刪除失敗，找不到 id=${id}` };
    }
    await connection.query(
      "UPDATE coupon_restrictions SET is_deleted = 1, updated_at = NOW() WHERE coupon_id = ?",
      [id]
    );
    await connection.commit();
    return { message: `旅館 id=${id} 已成功軟刪除` };
  } catch (error) {
    await connection.rollback();
    return { error: "無法刪除：" + error.message };
  } finally {
    connection.release();
  }
};

export const getCouponRestrictions = async (couponId) => {
  try {
    const [restrictions] = await pool.query(
      `SELECT cr.*, 
        CASE 
          WHEN cr.restricted_table = 'course' THEN c.name
          WHEN cr.restricted_table = 'yi_product' THEN p.name
          WHEN cr.restricted_table = 'hotel' THEN h.name
        END AS restricted_name
      FROM coupon_restrictions cr
      LEFT JOIN course c ON cr.restricted_id = c.id AND cr.restricted_table = 'course'
      LEFT JOIN yi_product p ON cr.restricted_id = p.id AND cr.restricted_table = 'yi_product'
      LEFT JOIN hotel h ON cr.restricted_id = h.id AND cr.restricted_table = 'hotel'
      WHERE cr.coupon_id = ? AND cr.is_deleted = 0`,
      [couponId]
    );
    return restrictions;
  } catch (error) {
    throw new Error(`無法取得優惠券限制：` + error.message);
  }
};
