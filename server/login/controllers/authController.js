// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import db from "../lib/db.js";

// // 註冊新使用者
// export const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // 檢查是否已有相同的 Email
//     const [existingUser] = await db.query(
//       "SELECT * FROM users WHERE email = ?",
//       [email]
//     );
//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: "Email 已被註冊" });
//     }

//     // 加密密碼
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 插入新使用者
//     await db.query(
//       "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
//       [name, email, hashedPassword]
//     );

//     res.status(201).json({ message: "註冊成功" });
//   } catch (error) {
//     res.status(500).json({ message: "伺服器錯誤", error: error.message });
//   }
// };

// // 使用者登入
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // 確認使用者是否存在
//     const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
//       email,
//     ]);
//     if (user.length === 0) {
//       return res.status(400).json({ message: "無效的 Email 或密碼" });
//     }

//     // 驗證密碼
//     const validPassword = await bcrypt.compare(password, user[0].password);
//     if (!validPassword) {
//       return res.status(400).json({ message: "無效的 Email 或密碼" });
//     }

//     // 產生 JWT
//     const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({
//       message: "登入成功",
//       token,
//       user: { id: user[0].id, name: user[0].name, email: user[0].email },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "伺服器錯誤", error: error.message });
//   }
// };
