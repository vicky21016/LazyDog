import pool from "../config/mysql.js";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const secretKey = "your_jwt_secret";

router.post("/google-login", async (req, res) => {
  const { google_id, email, name, avatar_url } = req.body;

  if (!google_id || !email) {
    return res.status(400).json({ status: "fail", message: "缺少必要的資訊" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE google_id = ? OR email = ?",
      [google_id, email]
    );

    let user = null;

    if (rows.length > 0) {
      console.log(" 用戶已存在:", rows[0]);
      user = rows[0];
    } else {
      const [result] = await pool.query(
        "INSERT INTO users (google_id, email, name, avatar_url, role) VALUES (?, ?, ?, ?, ?)",
        [google_id, email, name, avatar_url, "user"] // 預設 Google 用戶 role 為 "user"
      );

      if (result.affectedRows == 0) {
        throw new Error("用戶新增失敗");
      }

      // 取得新用戶完整資料
      const [newUserRows] = await pool.query(
        "SELECT * FROM users WHERE id = ?",
        [result.insertId]
      );

      user = newUserRows[0];

      console.log("新用戶成功儲存:", user);
    }

    // 確保 `avatar` 存在
    const avatar = user.user_img
      ? `http://localhost:5000/user/img/${user.user_img}`
      : user.avatar_url;

    // **產生 JWT Token**
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role || "user", 
        name: user.name,
        birthday: user.birthday || "", 
        gender: user.gender || "",
        phone: user.phone || "", 
        avatar, // Google 大頭貼
        teacher_id: user.teacher_id || "",
        company_name: user.company_name || "",
        business_license_number: user.business_license_number || "",
        county: user.county || "",
        district: user.district || "",
        address: user.address || "",
      },
      secretKey,
      { expiresIn: "8h" } //  和普通登入一樣
    );

    return res.status(200).json({
      status: "success",
      message: "Google 登入成功",
      user,
      token,
    });
  } catch (error) {
    console.error(" Google 登入錯誤:", error);
    res.status(500).json({ status: "error", message: "伺服器錯誤", error });
  }
});

export default router;
