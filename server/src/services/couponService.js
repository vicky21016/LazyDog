import pool from "../config/mysql.js";

export const getCoupons = async () => {
  try {
    const [coupons] = await pool.query("SELECT * FROM coupons");
    return coupons;
  } catch (error) {
    throw new Error(" 無法取得優惠券列表：" + error.message);
  }
};
export default getCoupons;
