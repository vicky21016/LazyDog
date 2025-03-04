import express from "express";
import multer from "multer";
import pool from "../config/mysql.js";
import { resolve, dirname, extname } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const timeStamp = Date.now();
    cb(null, `${timeStamp}${extname(file.originalname).toLowerCase()}`);
  },
});

const router = express.Router();
const upload = multer({ storage });
const secretKey = process.env.JWT_SECRET_KEY;
const __dirname = dirname(fileURLToPath(import.meta.url));

// 商品
router.post("/product", async (req, res) => {
  const {
    user_id,
    orderID,
    coupon_id,
    discount_amount,
    productID_list,
    price_list,
    amount_list,
    payment_status,
  } = req.body;

  if (!user_id || !orderID || !productID_list || !price_list || !amount_list) {
    return res.status(400).json({ status: "error", message: "缺少必要參數" });
  }

  // 確保 productID_list, price_list, amount_list 是陣列
  if (
    !Array.isArray(productID_list) ||
    !Array.isArray(price_list) ||
    !Array.isArray(amount_list)
  ) {
    return res.status(400).json({
      status: "error",
      message: "productID_list, price_list, amount_list 必須是陣列",
    });
  }

  // 確保 price_list 和 amount_list 長度一致
  if (
    price_list.length !== amount_list.length ||
    productID_list.length !== amount_list.length
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "商品、價格與數量的陣列長度不匹配" });
  }

  // 計算 total_price
  let total_price = price_list.reduce((sum, price, index) => {
    return sum + parseFloat(price) * parseInt(amount_list[index]);
  }, 0);

  // 計算折扣後的 final_amount
  let final_amount = total_price - (discount_amount || 0);
  if (final_amount < 0) final_amount = 0; // 確保不會變成負數

  const sql = `
    INSERT INTO yi_orderlist 
    (user_id, orderID, coupon_id, discount_amount, productID_list, price_list, amount_list, total_price, final_amount, created_at, is_deleted,payment_status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0,?)
  `;

  try {
    const [result] = await pool.execute(sql, [
      user_id,
      orderID,
      coupon_id || null, // 允許 NULL
      discount_amount || 0, // 預設為 0，確保計算時不出錯
      productID_list.join(","), // 陣列轉字串
      price_list.join(","),
      amount_list.join(","),
      total_price, // 計算出的原始總金額
      final_amount, // 計算出的折扣後金額
      payment_status != null ? payment_status : "pending",
    ]);

    res.json({
      status: "success",
      id: result.insertId,
      total_price,
      final_amount,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// 檢視使用者商品訂單
router.post("/productOrders", async (req, res) => {
  // 驗證 JWT Token，從 Token 中提取 user_id
  let token = req.get("Authorization");
  token = token.slice(7);
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "缺少 Token，請登入後再試" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // 使用你的 JWT 密鑰來驗證
    const user_id = decoded.id; // 從 Token 中解碼出 user_id

    // 查詢該使用者的所有訂單
    const sql = `
      SELECT *
      FROM yi_orderlist 
      WHERE user_id = ? AND is_deleted = 0
      ORDER BY created_at DESC
    `;

    const [orders] = await pool.execute(sql, [user_id]);

    if (orders.length === 0) {
      return res.json({
        status: "success",
        message: "沒有找到相關訂單",
        orders: [],
      });
    }

    const formattedOrders = await Promise.all(
      orders.map(async (order) => {
        const formattedOrder = {
          ...order,
          productID_list: order.productID_list
            ? order.productID_list.split(",")
            : [],
          price_list: order.price_list
            ? order.price_list.split(",").map(Number)
            : [],
          amount_list: order.amount_list
            ? order.amount_list.split(",").map(Number)
            : [],
        };

        // 取得第一個 productID
        const firstProductID = formattedOrder.productID_list[0];
        // console.log(firstProductID);

        // 查詢圖片
        if (firstProductID) {
          const sqlimg = `
            SELECT * FROM yi_img
            WHERE productID = ?
            AND is_deleted = 0
            ORDER BY created_at DESC
          `;
          const [imageResult] = await pool.execute(sqlimg, [firstProductID]);
          // console.log(imageResult);

          // 把查詢結果加入 order 物件中
          formattedOrder.imageResult = imageResult;
        }

        return formattedOrder;
      })
    );

    // console.log(formattedOrders);

    res.json({
      status: "success",
      orders: formattedOrders,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// 課程
router.post("/course", async (req, res) => {
  const {
    user_id,
    course_id,
    quanity,
    total_price,
    payment_status,
    payment_method,
    cancellation_policy,
    remark,
  } = req.body;

  const discount_amount = 0;
  const final_amount = total_price;
  try {
    const [result] = await pool.query(
      `INSERT INTO course_orders (user_id, course_id, quanity,total_price,final_amount,payment_status,payment_method,cancellation_policy,remark,created_at,updated_at,is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), 0)`,
      [
        user_id,
        course_id,
        quanity,
        total_price,
        final_amount,
        payment_status,
        payment_method,
        cancellation_policy,
        remark,
      ]
    );

    res.json({ status: "success", id: result.insertId });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// 旅館
router.post("/hotel", async (req, res) => {
  const {
    hotel_id,
    user_id,
    dog_count,
    check_in,
    check_out,
    total_price,
    payment_status,
    payment_method,
    cancellation_policy,
    remark,
  } = req.body;

  // Basic validation
  if (!hotel_id || !user_id || !check_in || !check_out) {
    return res.status(400).json({ status: "error", message: "缺少必要參數" });
  }

  //預設折扣為零
  const discount_amount = 0;
  const final_amount = total_price;

  try {
    const [result] = await pool.query(
      `INSERT INTO hotel_order 
      (hotel_id, user_id, dog_count, check_in, check_out, status, discount_amount, 
       total_price, final_amount, payment_status, payment_method, 
       cancellation_policy, remark, created_at, updated_at, is_deleted) 
       VALUES (?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), 0)`,
      [
        hotel_id,
        user_id,
        dog_count,
        check_in,
        check_out,
        discount_amount,
        total_price,
        final_amount,
        payment_status,
        payment_method != null ? payment_method : "ECpay",
        cancellation_policy,
        remark,
      ]
    );
    res.json({
      status: "success",
      id: result.insertId,
      total_price,
      final_amount,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// 檢視使用者旅館訂單
router.post("/hotelOrders", async (req, res) => {
  // 驗證 JWT Token，從 Token 中提取 user_id
  let token = req.get("Authorization");
  token = token.slice(7);
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "缺少 Token，請登入後再試" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user_id = decoded.id;

    // 查詢該使用者的所有訂單
    const sql = `
      SELECT *
      FROM hotel_order 
      WHERE user_id = ? AND is_deleted = 0
      ORDER BY created_at DESC
    `;

    const [orders] = await pool.execute(sql, [user_id]);

    // const sqlimg = `SELECT * FROM hotel_images WHERE is_deleted = 0 AND hotel_id = ?`;
    // const hotelImages = await pool.execute(sqlimg, [orders[0].hotel_id]);
    // const hotelImagess = hotelImages[0];

    const [hotelImages] = await pool.execute(
      `SELECT * FROM hotel_images WHERE is_deleted = 0 AND hotel_id = ?`,
      [orders[0].hotel_id]
    );

    console.log(hotelImages[0]?.url);

    if (orders.length === 0) {
      return res.json({
        status: "success",
        message: "沒有找到相關訂單",
        orders: [],
      });
    }

    res.json({
      status: "success",
      orders: orders,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;
