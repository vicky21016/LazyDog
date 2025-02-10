import pool from "../config/mysql.js";

export const getAllProducts = async () => {
  try {
    const [products] = await pool.execute("SELECT * FROM yi_product");
    return products;
  } catch (error) {
    throw new Error("無法取得商品列表");
  }
};

export const getProductId = async productID => {
  try {
    const [products] = await pool.execute("SELECT * FROM yi_product WHERE productID = ?", [productID]);
    return products;
  } catch (error) {
    throw new Error(`無法取得編號：${productID}的商品資料`);
  }
};

export const getSearchKeyword = async keyword => {
  try {
    const [products] = await pool.execute("SELECT * FROM yi_product WHERE name LIKE ?", [`%${keyword}%`]);
    return products;
  } catch (error) {
    throw new Error("無法取得相關商品資料：");
  }
};

export const createNewItem = async keyword => {
  try {
    const [products] = await pool.execute("SELECT * FROM yi_product WHERE name LIKE ?", [`%${keyword}%`]);
    return products;
  } catch (error) {
    throw new Error("無法取得相關商品資料：");
  }
};
