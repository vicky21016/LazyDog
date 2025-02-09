import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/mysql.js";

const secretKey = process.env.JWT_SECRET_KEY || "default_secret_key";

//  註冊 API
export const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  // role 必須
  const validRoles = ["user", "teacher", "operator"];
  if (!validRoles.includes(role)) {
    return res
      .status(400)
      .json({ error: "角色無效，請選擇 user, teacher 或 operator" });
  }

  if (!email || !password) {
    return res.status(400).json({ error: "請提供使用者名稱和密碼" });
  }

  try {
    // 檢查
    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "使用者名稱已被註冊" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      [email, hashedPassword, role]
    );

    res.status(201).json({ message: "註冊成功" });
  } catch (error) {
    console.error("❌ 註冊失敗:", error);
    res.status(500).json({ error: "伺服器錯誤，請稍後再試" });
  }
};

//  API
export const loginUser = async (req, res) => {
  const user = users[0];
  console.log("🟢 從資料庫取出的使用者資料:", user);

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("🟢 密碼比對結果:", isMatch);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "請提供使用者名稱和密碼" });
  }

  try {
    const [users] = await pool.query(
      "SELECT id, email, password, role FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ error: "使用者不存在" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "密碼錯誤" });
    }

    //  JWT，包含用戶角色
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
      expiresIn: "1h",
    });

    res.json({
      message: "登入成功",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(" 登入失敗:", error);
    res.status(500).json({ error: "伺服器錯誤，請稍後再試" });
  }
};
