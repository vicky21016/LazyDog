import pool from "../config/mysql.js";

export const getProducts = async () => {
  try {
    const [products] = await pool.query("SELECT * FROM yi_product");
    return products;
  } catch (error) {
    throw new Error(" 無法取得旅館列表：" + error.message);
  }
};
export default getProducts;
