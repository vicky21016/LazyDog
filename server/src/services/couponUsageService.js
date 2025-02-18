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

export const useUserCoupon = async (userId, couponId, orderId) => {
  try {
    const [coupon] = await pool.query(
      `UPDATE coupon_usage SET status = 'used', used_at = NOW(), updated_at = NOW(), order_id = ? WHERE user_id = ? AND coupon_id = ? AND status = 'claimed' AND is_deleted = 0`,
      [orderId, userId, couponId]
    );

    if (coupon.affectedRows == 0) throw new Error("優惠券無法使用或已使用");

    return { success: true, message: "優惠券已成功使用" };
  } catch (error) {
    throw new Error(error.message);
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
