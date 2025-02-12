import pool from "../config/mysql.js";

export const getAllProducts = async () => {
  try {
    const [products] = await pool.execute("SELECT * FROM yi_product WHERE is_deleted = 0");
    return products;
  } catch (error) {
    throw new Error("取得商品列表失敗");
  }
};

export const getProductId = async productID => {
  try {
    const [products] = await pool.execute("SELECT * FROM yi_product WHERE productID = ? AND is_deleted = 0", [
      productID,
    ]);
    return products;
  } catch (error) {
    throw new Error(`取得編號：${productID}的商品資料失敗`);
  }
};

export const getSearchKeyword = async keyword => {
  try {
    const [products] = await pool.execute("SELECT * FROM yi_product WHERE name LIKE ? AND is_deleted = 0", [
      `%${keyword}%`,
    ]);
    return products;
  } catch (error) {
    throw new Error("取得相關商品資料失敗");
  }
};

export const createNewItem = async (cateId, name, brand, price, stock, productID) => {
  try {
    const [last] = await pool.execute("SELECT * FROM yi_product WHERE category_id = ?", [cateId]);
    const newProductID = `${productID}${Number(last[last.length - 1].productID.slice(-3)) + 1}`;
    const [products] = await pool.execute(
      "INSERT INTO yi_product (category_id,name,brand,price,discount,discount_et,stock,full_info,info_text,spec,productID,created_at,updated_at,is_deleted) VALUES (? ,?, ?, ?,1,null, ?, null, null, null, ?, NOW(), NOW(), 0)",
      [cateId, name, brand, price, stock, newProductID]
    );
    return products;
  } catch (error) {
    throw new Error("新增商品資料失敗");
  }
};

export const updateItemInfo = async (cateId, name, brand, price, stock, productID) => {
  try {
    const [products] = await pool.execute(
      "UPDATE users SET ${updateFields.join(",
      ")} WHERE productID = ?;",
      [cateId, name, brand, price, stock, productID]
    );
    return products;
  } catch (error) {
    throw new Error("新增商品資料失敗");
  }
};
