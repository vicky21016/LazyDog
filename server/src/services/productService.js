import pool from "../config/mysql.js";

export const getAllProducts = async (min, max, sort) => {
  try {
    const [products] = await pool.execute(
      `SELECT * FROM yi_product WHERE is_deleted = 0 ${
        min ? `AND price >= ${min}` : ""
      } ${max ? `AND price <= ${max}` : ""} ${
        sort == "name"
          ? `ORDER BY name DESC`
          : sort == "price"
          ? `ORDER BY price`
          : sort == "update"
          ? `ORDER BY updated_at`
          : `ORDER BY name`
      } `
    );
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("取得商品列表失敗");
  }
};

export const getAllCategoryName = async (category, min, max, sort) => {
  try {
    const [categoryName] = await pool.execute(
      `SELECT * FROM yi_category WHERE name = ? AND is_deleted = 0`,
      [category]
    );
    const [products] = await pool.execute(
      `SELECT * FROM yi_product WHERE category_id = ? AND is_deleted = 0 ${
        min ? `AND price >= ${min}` : ""
      } ${max ? `AND price <= ${max}` : ""} ${
        sort == "name"
          ? `ORDER BY name DESC`
          : sort == "price"
          ? `ORDER BY price`
          : sort == "update"
          ? `ORDER BY updated_at`
          : `ORDER BY name`
      }`,
      [categoryName[0].id]
    );
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("取得商品列表失敗");
  }
};

export const getSearchKeyword = async (
  category,
  keyword,
  field,
  value,
  min,
  max,
  sort
) => {
  try {
    if (field.length > 0) {
      // console.log(field, value);
      const [categoryName] = await pool.execute(
        `SELECT * FROM yi_category WHERE name = ? AND is_deleted = 0`,
        [category]
      );
      value.push(categoryName[0].id);
      // console.log(field, value);
      const [products] = await pool.execute(
        `SELECT * FROM yi_product WHERE ${field} AND category_id = ? AND is_deleted = 0 ${
          min ? `AND price >= ${min}` : ""
        } ${max ? `AND price <= ${max}` : ""} ${
          sort == "name"
            ? `ORDER BY name DESC`
            : sort == "price"
            ? `ORDER BY price`
            : sort == "update"
            ? `ORDER BY updated_at`
            : `ORDER BY name`
        }`,
        value
      );
      return products;
    }
    if (!category) {
      const [products] = await pool.execute(
        `SELECT * FROM yi_product WHERE name LIKE ? AND is_deleted = 0 ${
          min ? `AND price >= ${min}` : ""
        } ${max ? `AND price <= ${max}` : ""} ${
          sort == "name"
            ? `ORDER BY name DESC`
            : sort == "price"
            ? `ORDER BY price`
            : sort == "update"
            ? `ORDER BY updated_at`
            : `ORDER BY name`
        }`,
        [`%${keyword}%`]
      );
      return products;
    } else {
      const [categoryName] = await pool.execute(
        `SELECT * FROM yi_category WHERE name = ? AND is_deleted = 0`,
        [category]
      );
      const [products] = await pool.execute(
        `SELECT * FROM yi_product WHERE (name LIKE ? OR full_info LIKE ?)AND category_id = ? AND is_deleted = 0 ${
          min ? `AND price >= ${min}` : ""
        } ${max ? `AND price <= ${max}` : ""} ${
          sort == "name"
            ? `ORDER BY name DESC`
            : sort == "price"
            ? `ORDER BY price`
            : sort == "update"
            ? `ORDER BY updated_at`
            : `ORDER BY name`
        }`,
        [`%${keyword}%`, `%${keyword}%`, categoryName[0].id]
      );
      return products;
    }
  } catch (error) {
    console.log(error);
    throw new Error("取得相關商品資料失敗");
  }
};

export const getCategoryName = async (updateFields, value) => {
  try {
    if (value) {
      const [categoryName] = await pool.execute(
        `SELECT * FROM yi_category WHERE name = ? AND is_deleted = 0`,
        value
      );
      const [categorys] = await pool.execute(
        `SELECT * FROM yi_category_keyword WHERE ${updateFields} is_deleted = 0`,
        [categoryName[0].id]
      );
      return categorys;
    } else {
      const [categorys] = await pool.execute(
        `SELECT yi_category_keyword.*,yi_category.name As category FROM yi_category_keyword JOIN yi_category ON yi_category_keyword.category_id = yi_category.id WHERE yi_category_keyword.is_deleted = 0`
      );
      return categorys;
    }
  } catch (error) {
    console.log(error);
    throw new Error("取得相關商品資料失敗");
  }
};

export const getAllOrder = async (updateFields, value) => {
  try {
    const [products] = await pool.execute(
      "SELECT * FROM yi_orderlist WHERE is_deleted = 0"
    );
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("取得商品列表失敗");
  }
};

export const getAllProductId = async (productID) => {
  try {
    const [products] = await pool.execute(
      "SELECT * FROM yi_product WHERE productID = ?",
      [productID]
    );
    return products;
  } catch (error) {
    console.log(error);
    throw new Error(`取得編號：${productID}的商品資料失敗`);
  }
};

export const getProductId = async (productID) => {
  try {
    const [products] = await pool.execute(
      "SELECT yi_product.*,users.name As user,users.email As email,yi_category.name As category,yi_img.list_img As listImg,yi_img.info_img As infoImg,yi_img.lg_img As img,yi_img.sm_img As smImg,yi_reviews.rating As rate,yi_reviews.comment As comment,yi_reviews.updated_at As commentTime FROM yi_product JOIN yi_category ON yi_product.category_id = yi_category.id JOIN yi_img ON yi_product.productID = yi_img.productID JOIN yi_reviews ON yi_product.productID = yi_reviews.productID JOIN users ON yi_reviews.user_id = users.id WHERE yi_product.productID = ? AND yi_product.is_deleted = 0",
      [productID]
    );
    // const [reviews] = await pool.execute(
    //   "SELECT * FROM yi_reviews WHERE productID = ? AND is_deleted = 0",
    //   [productID]
    // );
    return products;
  } catch (error) {
    console.log(error);
    throw new Error(`取得編號：${productID}的商品資料失敗`);
  }
};

export const createNewItem = async (
  cateId,
  name,
  brand,
  price,
  stock,
  listImg,
  img,
  productID
) => {
  try {
    const [last] = await pool.execute(
      "SELECT * FROM yi_product WHERE category_id = ?",
      [cateId]
    );
    const newProductID = `${productID}${
      Number(last[last.length - 1].productID.slice(-3)) + 1
    }`;
    const [products] = await pool.execute(
      "INSERT INTO yi_product (category_id,name,brand,price,discount,discount_et,stock,full_info,info_text,spec,productID,created_at,updated_at,is_deleted) VALUES ( ?, ?, ?, ?, 1, null, ?, null, null, null, ?, NOW(), NOW(), 0)",
      [cateId, name, brand, price, stock, newProductID]
    );
    const [imgs] = await pool.execute(
      "INSERT INTO yi_img (name,list_img,info_img,lg_img,sm_img,productID,created_at,updated_at,is_deleted) VALUES ( ?, ?, null, ?, null, ?, NOW(), NOW(), 0)",
      [name, listImg, img, newProductID]
    );
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("新增商品資料失敗");
  }
};

export const updateItemInfo = async (
  updateFields,
  value,
  updateImgsFields,
  imgs
) => {
  try {
    const [products] = await pool.execute(
      `UPDATE yi_product SET ${updateFields.join(", ")} WHERE productID = ? `,
      value
    );
    if (updateImgsFields && imgs) {
      const [newImgs] = await pool.execute(
        `UPDATE yi_img SET ${updateImgsFields.join(", ")} WHERE productID = ? `,
        imgs
      );
    }
    // const [warnings] = await pool.query("SHOW WARNINGS");
    // console.log("警告:", warnings);
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("更新商品資料失敗");
  }
};

export const deleteItemInfo = async (productID) => {
  try {
    const [products] = await pool.execute(
      "DELETE FROM yi_product WHERE productID = ?",
      [productID]
    );
    const [imgs] = await pool.execute(
      "DELETE FROM yi_img WHERE productID = ?",
      [productID]
    );
    return products;
  } catch (error) {
    console.log(error);
    throw new Error(`刪除編號：${productID}的商品資料失敗`);
  }
};
