import pool from "../config/mysql.js";

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
export const createCouponRestrictions = async (restrictionData) => {
  try {
    const { coupon_id, restricted_id, restricted_table, restriction_type } =
      restrictionData;

    const [result] = await pool.query(
      `INSERT INTO coupon_restrictions (coupon_id, restricted_id, restricted_table, restriction_type, created_at, updated_at, is_deleted) 
           VALUES (?, ?, ?, ?, NOW(), NOW(), 0)`,
      [coupon_id, restricted_id, restricted_table, restriction_type]
    );

    return { id: result.insertId, ...restrictionData };
  } catch (error) {
    throw new Error(`無法新增優惠券限制：` + error.message);
  }
};
export const deleteCouponRestrictions = async (id) => {
  try {
    const [result] = await pool.query(
      "UPDATE coupon_restrictions SET is_deleted = 1, updated_at = NOW() WHERE id = ?",
      [id]
    );

    if (result.affectedRows == 0) {
      return { error: `刪除失敗，找不到 id=${id} 的限制` };
    }

    return { message: `優惠券限制 id=${id} 已成功刪除` };
  } catch (error) {
    throw new Error(`無法刪除優惠券限制：` + error.message);
  }
};
