import {
  getAllProducts,
  getProductId,
  getSearchKeyword,
  createNewItem,
  updateItemInfo,
} from "../services/productService.js";

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
    const regForPD = /^PD([A-Z]{2}0[1-3])(25)(\d{3})$/;
    if (!regForPD.test(productID)) {
      return connectError(req, res);
    }
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
    const {cateId, name, brand, price, stock} = req.body;
    if (!cateId || !name || !brand || !price || !stock) {
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
    const product = await createNewItem(cateId, name, brand, price, stock, ProductID);
    if (product.affectedRows == 0) {
      throw new Error("新增商品失敗");
    }
    res.status(201).json({
      status: "success",
      message: `新增 ${name} 商品成功`,
    });
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const updateItem = async (req, res) => {
  try {
    const {productID} = req.params;
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
      updateTime,
      isDeleted,
    } = req.body;
    const updateFields = [];
    const value = [];
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
      updateTime,
      isDeleted,
    ];
    return;
    // if (cateId) {
    //   updateFields.push(`category_id = ?`);
    //   value.push(cateId);
    // }
    // if (name) {
    //   updateFields.push(`name = ?`);
    //   value.push(name);
    // }
    // if (brand) {
    //   updateFields.push(`brand = ?`);
    //   value.push(brand);
    // }
    // if (price) {
    //   updateFields.push(`price = ?`);
    //   value.push(price);
    // }
    // if (discount) {
    //   updateFields.push(`discount = ?`);
    //   value.push(discount);
    // }
    // if (discountEnd) {
    //   updateFields.push(`discount_et = ?`);
    //   value.push(discountEnd);
    // }
    // if (stock) {
    //   updateFields.push(`stock = ?`);
    //   value.push(stock);
    // }
    // if (fullInfo) {
    //   updateFields.push(`full_info = ?`);
    //   value.push(fullInfo);
    // }
    // if (infoText) {
    //   updateFields.push(`info_text = ?`);
    //   value.push(infoText);
    // }
    // if (spec) {
    //   updateFields.push(`spec = ?`);
    //   value.push(spec);
    // }
    // if (updateTime) {
    //   updateFields.push(`updated_at = ?`);
    //   value.push(now());
    // }
    // if (isDeleted) {
    //   updateFields.push(`is_deleted = ?`);
    //   value.push(isDeleted);
    // }

    // value.push(productID);

    // const product = await updateItemInfo(cateId, name, brand, price, stock, productID);
    // if (!product.length) throw new Error(`編號：${productID}查無此商品`);
    // res.status(200).json({
    //   status: "success",
    //   data: product,
    //   message: `${product[0].name} 查詢商品成功`,
    // });
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

// 200 OK 用於請求成功 ，GET 檔案成功，PUT， PATCH 更新成功
// 201 Created 用於請求 POST 成功建立資料
// 204 No Content 用於請求 DELETE 成功
// 400 Bad Request 用於請求 API 參數不正確的情況，例如傳入的 JSON 格式錯誤
// 401 Unauthorized 用於表示請求的 API 缺少身份驗證資訊
// 403 Forbidden 用於表示該資源不允許特定用戶訪問
// 404 Not Found 用於表示請求一個不存在的資源
