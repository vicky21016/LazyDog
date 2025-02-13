import jwt from "jsonwebtoken";
import pool from "../config/mysql.js";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;


if (!secretKey) {
  console.error(" JWT_SECRET_KEY 未設定，請檢查環境變數！");
  process.exit(1);
}


export const verifyToken = async (req, res, next) => {
  try {
    let token = req.get("Authorization");

    if (!token) {
      return res.status(401).json({ error: "未提供 Token，請先登入" });
    }

    if (!token.startsWith("Bearer ")) {
      return res.status(400).json({ error: "驗證格式錯誤，請提供 Bearer Token" });
    }


    token = token.slice(7);


    const decoded = jwt.verify(token, secretKey);


    const [users] = await pool.execute(
      "SELECT id, email, role FROM users WHERE id = ?",
      [decoded.id]
    );

    if (users.length == 0) {
      return res.status(401).json({ error: "使用者不存在或已被刪除" });
    }

    req.user = users[0];
    next(); 
  } catch (err) {
    console.error(" Token 驗證錯誤:", err);
    return res.status(401).json({ error: "Token 無效或已過期" });
  }
};


export const verifyRole = (roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "您沒有權限執行此操作" });
      }
      next();
    };
  };
  