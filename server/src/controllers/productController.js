import {getAllProducts, getProductId, getSearchKeyword, createNewItem} from "../services/productService.js";

export const getAll = async (req, res) => {
  try {
    const products = await getAllProducts();
    if (!products.length) throw new Error("找不到商品");
    res.status(200).json({
      status: "success",
      data: products,
      message: `查詢商品列表成功，共${products.length}筆資料`,
    });
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const getId = async (req, res) => {
  try {
    const {productID} = req.params;
    if (!productID) throw new Error("請提供商品編號");
    const regex = /^PD([A-Z]{2}0[1-3])(25)(\d{3})$/;
    console.log(regex.test(productID));
    // if (regex.test(productID));
    const product = await getProductId(productID);
    if (!product.length) throw new Error(`編號：${productID}查無此商品`);
    res.status(200).json({
      status: "success",
      data: product,
      message: `${product[0].name} 查詢商品成功`,
    });
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const getSearch = async (req, res) => {
  try {
    const {keyword} = req.query;
    if (!keyword) throw new Error("請提供關鍵字");
    const product = await getSearchKeyword(keyword);
    if (!product.length) throw new Error("查無相關商品");
    res.status(200).json({
      status: "success",
      data: product,
      message: `查詢： ${keyword} 相關商品成功，共${product.length}筆資料`,
    });
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const createNew = async (req, res) => {
  try {
    const {keyword} = req.query;
    if (!keyword) throw new Error("請提供關鍵字");
    const product = await createNewItem(keyword);
    if (!product.length) throw new Error("查無相關商品");
    res.status(200).json({
      status: "success",
      data: product,
      message: `查詢： ${keyword} 相關商品成功，共${product.length}筆資料`,
    });
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const connectError = async (req, res) => {
  res.status(404).json({
    status: "error",
    message: `查無此頁面`,
  });
};
