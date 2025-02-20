import {
  getAllProducts,
  getAllProductId,
  getSearchKeyword,
  getAllCategory,
  getAllOrder,
  getProductId,
  createNewItem,
  updateItemInfo,
  deleteItemInfo,
} from "../services/productService.js";

export const getAll = async (req, res) => {
  try {
    const products = await getAllProducts();
    if (!products.length) throw new Error("查無商品列表");
    res.status(200).json({
      status: "success",
      data: products,
      message: `查詢商品列表成功，共${products.length}筆資料`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSearch = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) throw new Error("請提供關鍵字");

    const product = await getSearchKeyword(keyword);
    if (!product.length) throw new Error("查無相關商品");
    res.status(200).json({
      status: "success",
      data: product,
      message: `查詢： ${keyword} 相關商品成功，共${product.length}筆資料`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const updateFields = category ? "category_id = ? AND" : "";
    const value = category ? [category] : "";
    const categorys = await getAllCategory(updateFields, value);
    if (!categorys.length) throw new Error("查無商品分類列表");
    res.status(200).json({
      status: "success",
      data: categorys,
      message: `查詢商品分類列表成功，共${categorys.length}筆資料`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const orders = await getAllOrder();
    if (!orders.length) throw new Error("查無訂單列表");
    const productCount = {};
    orders.forEach((order) => {
      const products = order.productID_list.split(",");
      products.forEach((product) => {
        productCount[product] = (productCount[product] || 0) + 1;
      });
    });
    const sortedProducts = Object.entries(productCount)
      .map(([productID, count]) => ({ productID, count }))
      .sort((a, b) => b.count - a.count);
    res.status(200).json({
      status: "success",
      data: sortedProducts,
      message: `查詢訂單列表成功，共${sortedProducts.length}筆資料`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getId = async (req, res) => {
  try {
    const { productID } = req.params;
    if (!productID) throw new Error("請提供商品編號");
    const regForPD = /^PD([A-Z]{2}0[1-3])(25)(\d{3})$/;
    if (!regForPD.test(productID)) {
      return connectError(req, res);
    }

    const product = await getProductId(productID);
    if (!product.length) throw new Error(`查無編號：${productID} 商品`);
    res.status(200).json({
      status: "success",
      data: product,
      message: `查詢編號：${productID} ${product[0].name} 商品成功`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createNew = async (req, res) => {
  try {
    const { cateId, name, brand, price, stock, listImg, img } = req.body;
    if (!cateId || !name || !brand || !price || !stock || !listImg || !img) {
      return res.status(401).json({
        status: "error",
        message: "請從正規管道進入此頁面",
      });
    }
    let classNum = "";
    switch (cateId) {
      case "1":
        classNum = "FD01";
        break;
      case "2":
        classNum = "FD02";
        break;
      case "3":
        classNum = "FD03";
        break;
      case "4":
        classNum = "SU01";
        break;
      case "5":
        classNum = "PT01";
        break;
      case "6":
        classNum = "PT02";
        break;
      case "7":
        classNum = "OD01";
        break;
      case "8":
        classNum = "HM01";
        break;
      case "9":
        classNum = "HM02";
        break;
    }
    const ProductID = `PD${classNum}25`;

    const product = await createNewItem(
      cateId,
      name,
      brand,
      price,
      stock,
      listImg,
      img,
      ProductID
    );
    if (product.affectedRows == 0) {
      throw new Error("新增商品失敗");
    }
    res.status(201).json({
      status: "success",
      message: `新增 ${name} 商品成功`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { productID } = req.params;
    if (!productID) throw new Error("請提供商品編號");
    const regForPD = /^PD([A-Z]{2}0[1-3])(25)(\d{3})$/;
    if (!regForPD.test(productID)) {
      return connectError(req, res);
    }
    const {
      cateId,
      name,
      brand,
      price,
      discount,
      discountEnd,
      stock,
      fullInfo,
      infoText,
      spec,
      isDeleted,
      listImg,
      infoImg,
      img,
      smImg,
    } = req.body;
    const updateFields = [];
    const value = [];
    const updateImgsFields = [];
    const imgs = [];
    const fieldNames = [
      "category_id",
      "name",
      "brand",
      "price",
      "discount",
      "discount_et",
      "stock",
      "full_info",
      "info_text",
      "spec",
      "is_deleted",
      "updated_at",
    ];
    const imgNames = [
      "name",
      "list_img",
      "info_img",
      "lg_img",
      "sm_img",
      "is_deleted",
      "updated_at",
    ];
    const updateContent = [
      cateId,
      name,
      brand,
      price,
      discount,
      discountEnd,
      stock,
      fullInfo,
      infoText,
      spec,
      isDeleted,
      productID,
    ];
    const updateImgs = [
      name,
      listImg,
      infoImg,
      img,
      smImg,
      isDeleted,
      productID,
    ];
    for (let i = 0; i < updateContent.length; i++) {
      if (updateContent[i]) {
        if (i == 11) {
          updateFields.push(`${fieldNames[i]} = ?`);
          value.push(new Date().toISOString());
          value.push(updateContent[i]);
        } else {
          updateFields.push(`${fieldNames[i]} = ?`);
          value.push(updateContent[i]);
        }
      }
    }
    for (let i = 0; i < updateImgs.length; i++) {
      if (updateImgs[i]) {
        if (i == 6) {
          updateImgsFields.push(`${imgNames[i]} = ?`);
          imgs.push(new Date().toISOString());
          imgs.push(updateImgs[i]);
        } else {
          updateImgsFields.push(`${imgNames[i]} = ?`);
          imgs.push(updateImgs[i]);
        }
      }
    }

    const product = await updateItemInfo(
      updateFields,
      value,
      updateImgsFields,
      imgs
    );
    if (product.affectedRows == 0) {
      throw new Error("更新商品失敗");
    }
    res.status(200).json({
      status: "success",
      message: `更新編號：${productID} ${name} 商品成功`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const softDeleteItem = async (req, res) => {
  try {
    const { productID } = req.params;
    if (!productID) throw new Error("請提供商品編號");
    const regForPD = /^PD([A-Z]{2}0[1-3])(25)(\d{3})$/;
    if (!regForPD.test(productID)) {
      return connectError(req, res);
    }
    const status = await getAllProductId(productID);
    if (!status.length) throw new Error(`查無編號：${productID} 商品`);
    const updateFields = ["is_deleted = ?"];
    const updateImgsFields = updateFields;
    const value = status[0].is_deleted ? [0, productID] : [1, productID];
    const imgs = value;
    const product = await updateItemInfo(
      updateFields,
      value,
      updateImgsFields,
      imgs
    );
    if (product.affectedRows == 0) {
      throw new Error("商品軟刪除切換失敗");
    }
    res.status(200).json({
      status: "success",
      message: `編號：${productID} 商品軟刪除切換成功`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { productID } = req.params;
    if (!productID) throw new Error("請提供商品編號");
    const regForPD = /^PD([A-Z]{2}0[1-3])(25)(\d{3})$/;
    if (!regForPD.test(productID)) {
      return connectError(req, res);
    }

    const product = await deleteItemInfo(productID);
    if (product.affectedRows == 0) {
      throw new Error("刪除商品失敗");
    }
    res.status(200).json({
      status: "success",
      message: `刪除編號：${productID} 商品成功`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const connectError = async (req, res) => {
  res.status(404).json({
    status: "error",
    message: `查無此頁面`,
  });
};

// 200 OK 用於請求成功 ，GET 檔案成功，PUT， PATCH 更新成功
// 201 Created 用於請求 POST 成功建立資料
// 204 No Content 用於請求 DELETE 成功
// 400 Bad Request 用於請求 API 參數不正確的情況，例如傳入的 JSON 格式錯誤
// 401 Unauthorized 用於表示請求的 API 缺少身份驗證資訊
// 403 Forbidden 用於表示該資源不允許特定用戶訪問
// 404 Not Found 用於表示請求一個不存在的資源
