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
export const getCouponByCodes = async (code, userId) => {
  try {
    if (!code) {
      return { success: false, status: 400, message: "請提供優惠券代碼" };
    }

    if (!userId) {
      return { success: false, status: 400, message: "缺少 userId" };
    }
    // 查詢優惠券是否存在
    const [coupons] = await pool.execute(
      "SELECT * FROM coupons WHERE code = ? AND is_deleted = 0",
      [code]
    );

    if (coupons.length == 0) {
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
    //低消
    if (coupon.min_order_value && orderTotal < coupon.min_order_value) {
      return {
        success: false,
        status: 400,
        message: `此優惠券需消費滿 ${coupon.min_order_value} 元才可使用`,
      };
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
    //是不是全站
    if (coupon.is_global) {
      return { success: true, data: coupon, message: "此優惠券為全館適用" };
    }
    const [restrictions] = await pool.execute(
      "SELECT * FROM coupon_restrictions WHERE coupon_id = ? AND is_deleted = 0",
      [coupon.id]
    );

    if (restrictions.length > 0) {
      return {
        success: true,
        data: coupon,
        restrictions,
        message: "此優惠券有限制使用範圍",
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
      discount_type, 
      is_global = 0,
      content = "",
      value,
      min_order_value = 0, 
      start_time,
      end_time,
      status = "active", 
      max_usage = 1,
      max_usage_per_user = 1, 
      code,
    } = couponData;

    if (!name || !discount_type || !value || !start_time || !end_time || !code) {
      throw new Error("缺少必要的欄位");
    }

    const formatDateTime = (date) => {
      return new Date(date).toISOString().slice(0, 19).replace("T", " ");
    };

    const startTimeFormatted = start_time ? formatDateTime(start_time) : null;
    const endTimeFormatted = end_time ? formatDateTime(end_time) : null;

    const isGlobalSafe = is_global ? 1 : 0; // 確保是數字
    const contentSafe = content ?? "";

    const [result] = await pool.query(
      `INSERT INTO coupons 
          (name, discount_type, is_global, content, value, min_order_value, start_time, end_time, status, max_usage, max_usage_per_user, code, created_at, updated_at, is_deleted) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), 0)`,
      [
        name,
        discount_type,
        isGlobalSafe,
        contentSafe,
        value,
        min_order_value,
        startTimeFormatted,
        endTimeFormatted,
        status,
        max_usage,
        max_usage_per_user,
        code,
      ]
    );

    if (!result || !result.insertId) {
      throw new Error("無法創建優惠券，請檢查數據庫");
    }

    return { success: true, id: result.insertId, name, discount_type, code };
  } catch (err) {
    console.error(" 無法創建優惠券:", err.message);
    return { success: false, error: "無法創建優惠券：" + err.message };
  }
};


export const updateCouponById = async (id, couponData) => {
  try {
    console.log(" 接收到的更新數據:", couponData);

    if (!id) {
      return { error: "缺少 id，無法更新優惠券" };
    }

    if (!couponData || Object.keys(couponData).length === 0) {
      return { error: "沒有提供更新欄位" };
    }

    // 確保 discount_type不是 undefined
    const discountType =
      couponData.discount_type && typeof couponData.discount_type === "string"
        ? couponData.discount_type.toLowerCase()
        : "fixed"; // 預設為 "fixed"

    console.log(" 最終 discountType:", discountType);

    // 過濾掉 undefined 或 null
    const updateFields = Object.fromEntries(
      Object.entries({
        name: couponData.name,
        content: couponData.content,
        value: couponData.value,
        min_order_value: couponData.min_order_value,
        start_time: couponData.start_time,
        end_time: couponData.end_time,
        status: couponData.status,
        max_usage: couponData.max_usage,
        max_usage_per_user: couponData.max_usage_per_user,
        code: couponData.code,
        discount_type: discountType, 
      }).filter(([_, value]) => value !== undefined && value !== null)
    );

    const keys = Object.keys(updateFields);
    if (keys.length === 0) {
      return { error: "沒有可更新的欄位" };
    }

    const values = Object.values(updateFields);
    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const sqlQuery = `UPDATE coupons SET ${setClause}, updated_at = NOW() WHERE id = ?`;
    values.push(id); // `id` 放在最後

    console.log(" SQL 查詢:", sqlQuery);
    console.log(" SQL 參數:", values);

    const [result] = await pool.query(sqlQuery, values);

    if (!result || result.affectedRows === 0) {
      return { error: `更新失敗，找不到 id=${id} 的優惠券或沒有變更` };
    }

    return { message: `優惠券 id=${id} 更新成功` };
  } catch (error) {
    console.error(" 更新優惠券錯誤:", error);
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
    return { message: `優惠券 id=${id} 已成功軟刪除` };
  } catch (error) {
    await connection.rollback();
    return { error: "無法刪除：" + error.message };
  } finally {
    connection.release();
  }
};

