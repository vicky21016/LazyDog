import pool from "../config/mysql.js";

export const getAllProducts = async () => {
  try {
    const [products] = await pool.execute("SELECT * FROM yi_product");
    return products;
  } catch (error) {
    throw new Error(" 無法取得商品列表：" + error.message);
  }
};

export const getProductId = async (id) => {
  try {
    if(!id) throw new Error("請提供id");
    const [products] = await pool.execute("SELECT * FROM yi_product",[id]);
    return products;
  } catch (error) {
    throw new Error(" 無法取得商品：" + error.message);
  }
};

