import express from "express";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../config/mysql.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectToDatabase(); 
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({ status: "fail", message: "用戶不存在" });
    }

    const user = users[0];

    // 比較明文密碼
    if (password !== user.password) {
      return res.status(401).json({ status: "fail", message: "密碼錯誤" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ status: "success", message: "登入成功", token });
  } catch (err) {
    console.error("伺服器錯誤:", err);
    res.status(500).json({ status: "error", message: "伺服器錯誤" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  console.log(req.body);
//   console.log("Email:", email);
// console.log("Password:", password);
  // if (!email || !password || !confirmPassword) {
  //   return res
  //     .status(400)
  //     .json({ status: "fail", message: "請填寫所有必填欄位" });
  // }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ status: "fail", message: "密碼和確認密碼不一致" });
  }

  try {
    const db = await connectToDatabase();
    console.log("資料庫連線成功");
    // 檢查用戶是否已經存在
    const [existUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    // console.log("查詢結果：", existUser);
    if (existUser.length > 0) {
      return res.status(400).json({ status: "fail", message: "用戶已存在" });
    }

    // 使用 bcrypt 加密密碼
    // const hashedPassword = await bcrypt.hash(password, 10);

    // console.log("要插入的 email:", email);
    // console.log("要插入的 password:", password);
    // 插入新用戶資料
    const [result] = await db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );
    
    console.log("插入結果:", result);
    // 註冊後返回成功訊息
    return res.status(201).json({ status: "success", message: "註冊成功" });
  } catch (err) {
    console.error("伺服器錯誤:", err);
    res.status(500).json({ status: "error", message: "伺服器錯誤" });
  }
});


export default router;
