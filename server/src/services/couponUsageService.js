import pool from "../config/mysql.js";

export const claimUserCoupon = async (userId, couponId) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [[coupon]] = await connection.query(
      `SELECT * FROM coupons WHERE id = ? AND is_deleted = 0`,
      [couponId]
    );
    if (!coupon) throw new Error("優惠券不存在或已刪除");

    const now = new Date();
    if (new Date(coupon.start_time) > now) throw new Error("優惠券尚未開始");
    if (new Date(coupon.end_time) < now) throw new Error("優惠券已過期");

    const [[totalUsage]] = await connection.query(
      `SELECT COUNT(*) AS total FROM coupon_usage WHERE coupon_id = ? AND is_deleted = 0`,
      [couponId]
    );
    if (totalUsage.total >= coupon.max_usage)
      throw new Error("此優惠券已被領取完畢");

    const [[userClaimed]] = await connection.query(
      `SELECT COUNT(*) AS count FROM coupon_usage WHERE user_id = ? AND coupon_id = ? AND is_deleted = 0`,
      [userId, couponId]
    );
    if (userClaimed.count >= coupon.max_usage_per_user)
      throw new Error("您已達此優惠券的領取上限");

    await connection.query(
      `INSERT INTO coupon_usage (user_id, coupon_id, status, claimed_at, created_at, updated_at, is_deleted)      VALUES (?, ?, 'claimed', NOW(), NOW(), NOW(), 0)`,
      [userId, couponId]
    );

    await connection.commit();
    return { success: true, message: "優惠券領取成功" };
  } catch (error) {
    await connection.rollback();
    throw new Error(error.message);
  } finally {
    connection.release();
  }
};
export const claimUserCouponByCode = async (userId, code) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [[coupon]] = await connection.query(
      `SELECT * FROM coupons WHERE code = ? AND is_deleted = 0`,
      [code]
    );
    if (!coupon) throw new Error("優惠券代碼無效或已刪除");

    const couponId = coupon.id;
    const now = new Date();
    if (new Date(coupon.start_time) > now) throw new Error("優惠券尚未開始");
    if (new Date(coupon.end_time) < now) throw new Error("優惠券已過期");

    const [[totalUsage]] = await connection.query(
      `SELECT COUNT(*) AS total FROM coupon_usage WHERE coupon_id = ? AND is_deleted = 0`,
      [couponId]
    );
    if (totalUsage.total >= coupon.max_usage)
      throw new Error("此優惠券已被領取完畢");
    const [[userClaimed]] = await connection.query(
      `SELECT COUNT(*) AS count FROM coupon_usage WHERE user_id = ? AND coupon_id = ? AND is_deleted = 0`,
      [userId, couponId]
    );
    if (userClaimed.count >= coupon.max_usage_per_user)
      throw new Error("您已達此優惠券的領取上限");
    await connection.query(
      `INSERT INTO coupon_usage (user_id, coupon_id, status, claimed_at, created_at, updated_at, is_deleted) 
       VALUES (?, ?, 'claimed', NOW(), NOW(), NOW(), 0)`,
      [userId, couponId]
    );

    await connection.commit();
    return { success: true, message: "優惠券領取成功" };
  } catch (error) {
    await connection.rollback();
    throw new Error(error.message);
  } finally {
    connection.release();
  }
};

export const getUserCoupons = async (userId) => {
  try {
    const [coupons] = await pool.query(
      `SELECT uc.id, uc.status, uc.claimed_at, c.name, c.type, c.value, c.start_time, c.end_time FROM coupon_usage uc JOIN coupons c ON uc.coupon_id = c.id WHERE uc.user_id = ? AND uc.is_deleted = 0 ORDER BY uc.claimed_at DESC`,
      [userId]
    );
    return { success: true, data: coupons };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const useUserCoupon = async (userId, couponId, orderId, orderTable) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    console.log("收到請求 - userId:", userId, "couponId:", couponId, "orderId:", orderId, "orderTable:", orderTable);

    // 🔎 確保 `orderTable` 是合法值
    const validTables = ["hotel_order", "course_orders", "yi_orderlist"];
    if (!validTables.includes(orderTable)) {
      throw new Error("無效的訂單類型");
    }

    // 🔎 檢查對應 `order_table` 是否存在
    const [[order]] = await connection.query(
      `SELECT id FROM ${orderTable} WHERE id = ? AND user_id = ?`,
      [orderId, userId]
    );

    if (!order) throw new Error("找不到對應的訂單");

    // 🔎 確保 `coupon_usage` 存在且處於 `claimed` 狀態
    const [[coupon]] = await connection.query(
      `SELECT * FROM coupon_usage WHERE user_id = ? AND coupon_id = ? AND status = 'claimed' AND is_deleted = 0`,
      [userId, couponId]
    );

    if (!coupon) throw new Error("優惠券無法使用或已使用");

    // ✅ **更新 `coupon_usage`，標記為 `used` 並關聯 `order_id` 和 `order_table`**
    await connection.query(
      `UPDATE coupon_usage 
       SET status = 'used', used_at = NOW(), updated_at = NOW(), order_id = ?, order_table = ? 
       WHERE user_id = ? AND coupon_id = ? AND status = 'claimed' AND is_deleted = 0`,
      [orderId, orderTable, userId, couponId]
    );

    await connection.commit();
    return { success: true, message: "優惠券已成功使用" };
  } catch (error) {
    await connection.rollback();
    throw new Error(error.message);
  } finally {
    connection.release();
  }
};


export const deleteUserCoupon = async (userId, couponId) => {
  try {
    const [[existing]] = await pool.query(
      `SELECT status FROM coupon_usage WHERE user_id = ? AND coupon_id = ? AND is_deleted = 0`,
      [userId, couponId]
    );
    if (!existing) throw new Error("找不到優惠券或已刪除");

    if (existing.status == "used") throw new Error("已使用的優惠券無法取消");

    await pool.query(
      `UPDATE coupon_usage SET is_deleted = 1, updated_at = NOW() WHERE user_id = ? AND coupon_id = ? AND status = 'claimed' AND is_deleted = 0`,
      [userId, couponId]
    );

    return { success: true, message: "優惠券已取消" };
  } catch (error) {
    throw new Error(error.message);
  }
};
