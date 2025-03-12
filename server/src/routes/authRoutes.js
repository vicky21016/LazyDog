import express from "express";
import jwt from "jsonwebtoken";
import pool from "../config/mysql.js";
import bcrypt from "bcrypt";
import multer from "multer";
import { resolve, dirname, extname } from "path";
import { rename, access, constants } from "node:fs/promises";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

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
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ewald.toy61@ethereal.email",
    pass: "wSFWDJYGncwwKaf3mJ",
  },
});
const generateOTP = () => {
  // 這裡可以自定義 OTP 的生成邏輯，例如數字或混合字串
  // 例如生成 6 位數字的 OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: '"Lazy Dog 🐶" <isabel17@ethereal.email>',
    to: email,
    subject: "您的 OTP 驗證碼",
    html: `<p>您的 OTP 驗證碼是：<strong>${otp}</strong></p><p>請在 5 分鐘內使用此驗證碼。</p>`,
  };
  // console.log(mailOptions);

  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    // console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // console.log("OTP 郵件已發送至：", email);
    console.log("OTP:", otp);
  } catch (error) {
    console.error("發送 OTP 郵件失敗：", error);
    throw new Error("發送 OTP 郵件失敗");
  }
};
router.post("/generate", upload.none(), async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "請提供電子郵件地址" });
  }

  try {
    // 1. 生成 OTP
    const otp = generateOTP();
    const token = uuidv4();
    // 2. 加密 OTP 存到資料庫
    const hashedOTP = await bcrypt.hash(otp, 10);

    // 3. 設定 OTP 過期時間 (例如：5 分鐘後)
    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 5);

    // 4. 儲存 OTP 到資料庫
    const sql = `
      INSERT INTO otp (email, token, hash, created_at, expired_at)
      VALUES (?, ?, ?, NOW(), ?)
    `;
    await pool.execute(sql, [email, token, hashedOTP, expiredAt]);
    console.log(email);
    console.log(otp);

    // 5. 寄送 OTP 郵件
    await sendOTPEmail(email, otp);

    res.json({
      status: "success",
      message: "OTP 已發送至您的電子郵件",
      data: { token },
    });
  } catch (error) {
    console.error("生成 OTP 失敗：", error);
    res.status(500).json({ error: "生成 OTP 失敗" });
  }
});

// router.post("/verify", upload.none(), async (req, res) => {
//   const { token, otp } = req.body;

//   if (!token || !otp) {
//     return res.status(400).json({ error: "請提供 OTP 和 token" });
//   }

//   try {
//     // 1. 從資料庫查詢 OTP
//     const sql = `SELECT * FROM otp WHERE token = ? AND expired_at > NOW()`;
//     const [rows] = await pool.execute(sql, [token]);

//     if (rows.length === 0) {
//       return res.status(400).json({ error: "無效的 OTP 或已過期" });
//     }

//     const otpData = rows[0];

//     // 2. 比對 OTP
//     const isMatch = await bcrypt.compare(otp, otpData.hash);

//     if (!isMatch) {
//       return res.status(400).json({ error: "OTP 錯誤" });
//     }

//     // 3. 如果驗證成功，刪除資料庫中已使用的 OTP
//     await pool.execute("DELETE FROM otp WHERE id = ?", [otpData.id]);

//     res.json({ status: "success", message: "OTP 驗證成功" });
//   } catch (error) {
//     console.error("驗證 OTP 失敗：", error);
//     res.status(500).json({ error: "驗證 OTP 失敗" });
//   }
// });

router.post("/forgot-password", upload.none(), async (req, res) => {
  const { token, otp, newPassword, confirmNewPassword } = req.body;

  if (!token || !otp || !newPassword || !confirmNewPassword) {
    return res
      .status(400)
      .json({ error: "請提供驗證碼、token、新密碼和確認新密碼" });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ error: "密碼和確認密碼不符" });
  }

  try {
    // 1. 從資料庫查詢 OTP
    const sql = `SELECT * FROM otp WHERE token = ? AND expired_at > NOW()`;
    const [rows] = await pool.execute(sql, [token]);

    if (rows.length === 0) {
      return res.status(400).json({ error: "無效的驗證碼或已過期" });
    }

    const otpData = rows[0];

    // 2. 比對 OTP
    const isMatch = await bcrypt.compare(otp, otpData.hash);

    if (!isMatch) {
      return res.status(400).json({ error: "驗證碼錯誤" });
    }

    // 3. 如果驗證成功，刪除資料庫中已使用的 OTP
    await pool.execute("DELETE FROM otp WHERE id = ?", [otpData.id]);

    // 4. 加密新密碼
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 5. 更新資料庫中用戶的密碼
    const updateSql = `UPDATE users SET password = ? WHERE email = ?`;
    const [result] = await pool.execute(updateSql, [
      hashedNewPassword,
      otpData.email,
    ]);

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "找不到該用戶" });
    }

    res.json({ status: "success", message: "密碼已成功重置" });
  } catch (error) {
    console.error("重置密碼失敗：", error);
    res.status(500).json({ error: "重置密碼失敗" });
  }
});

router.post("/login", upload.none(), async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw new Error("請提供帳號和密碼");

    const sql = "SELECT * FROM `users` WHERE email = ?;";
    const [users] = await pool.execute(sql, [email]);

    if (users.length === 0) throw new Error("找不到使用者");

    const user = users[0];
    if (user.is_deleted == 1) throw new Error("找不到使用者");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("帳號或密碼錯誤");
    const avatar = await getAvatar(user.user_img);
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        birthday: user.birthday,
        gender: user.gender,
        phone: user.phone,
        avatar,
        teacher_id: user.teacher_id, // Add teacher_id here
        company_name: user.company_name,
        business_license_number: user.business_license_number,
        county: user.county,
        district: user.district,
        address: user.address,
      },
      secretKey,
      {
        expiresIn: "8h",
      }
    );

    res.status(200).json({
      status: "success",
      data: { token },
      message: "登入成功",
    });
  } catch (err) {
    console.log("伺服器錯誤:", err);
    res.status(400).json({
      status: "error",
      message: err.message ? err.message : "伺服器錯誤",
    });
  }
});

router.post("/register", upload.none(), async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ status: "error", message: "請填寫所有必填欄位" });
  }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ status: "error", message: "密碼和確認密碼不一致" });
  }

  try {
    console.log("資料庫連線成功");
    const [existUser] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existUser.length > 0) {
      return res.status(400).json({ status: "fail", message: "用戶已存在" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

    const sql =
      "INSERT INTO `users` (`email`, `password`, `created_at`,user_img) VALUES (?, ?, ?,Dog5.png)";
    const [result] = await pool.execute(sql, [
      email,
      hashedPassword,
      createdAt,
    ]);

    // Assuming you also want to set teacher_id when the user registers, you may need to update the `users` table schema for this
    const [newUser] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const user = newUser[0];

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        birthday: user.birthday,
        gender: user.gender,
        phone: user.phone,
        avatar: await getAvatar(user.user_img),
        teacher_id: user.teacher_id,
        company_name: user.company_name,
        business_license_number: user.business_license_number,
        county: user.county,
        district: user.district,
        address: user.address,
      },
      secretKey,
      {
        expiresIn: "8h",
      }
    );

    res
      .status(201)
      .json({ status: "success", data: { email }, message: "註冊成功", token });
  } catch (err) {
    console.error("伺服器錯誤:", err);
    res.status(500).json({ status: "error", message: "伺服器錯誤" });
  }
});

router.post("/logout", checkToken, (req, res) => {
  const token = jwt.sign(
    {
      id: "",
      email: "",
      role: "",
      name: "",
      birthday: "",
      gender: "",
      phone: "",
      avatar: "",
      teacher_id: "",
      company_name: "",
      business_license_number: "",
      county: "",
      district: "",
      address: "",
    },
    secretKey,
    { expiresIn: "-10s" }
  );
  res.json({
    status: "success",
    data: { token },
    message: "登出成功",
  });
});

router.put("/:id", checkToken, upload.none(), async (req, res) => {
  const { id } = req.params;
  const { email, name, gender, birthday, phone, county, district, address } =
    req.body;

  try {
    if (id != req.decoded.id) throw new Error("沒有修改權限");
    if (!email && !name && !gender && !birthday && !phone)
      throw new Error("請至少提供一個修改的內容");

    const updateFields = [];
    const value = [];

    if (email) {
      updateFields.push("`email` = ?");
      value.push(email);
    }
    if (name) {
      updateFields.push("`name` = ?");
      value.push(name);
    }
    if (gender) {
      updateFields.push("`gender` = ?");
      value.push(gender);
    }
    if (birthday) {
      updateFields.push("`birthday` = ?");
      value.push(birthday);
    }
    if (phone) {
      updateFields.push("`phone` = ?");
      value.push(phone);
    }
    if (county) {
      // 如果有 county，加入更新
      updateFields.push("`county` = ?");
      value.push(county);
    }
    if (district) {
      // 如果有 district，加入更新
      updateFields.push("`district` = ?");
      value.push(district);
    }
    if (address) {
      // 如果有 address，加入更新
      updateFields.push("`address` = ?");
      value.push(address);
    }

    value.push(id);
    const sql = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?;`;

    const [result] = await pool.execute(sql, value);

    if (result.affectedRows == 0) throw new Error("更新失敗");

    const [updatedUserData] = await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (updatedUserData.length === 0) throw new Error("用戶不存在");

    const user = updatedUserData[0];

    const newToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        birthday: user.birthday,
        gender: user.gender,
        phone: user.phone,
        avatar: await getAvatar(user.user_img),
        teacher_id: user.teacher_id,
        company_name: user.company_name,
        business_license_number: user.business_license_number,
        county: user.county,
        district: user.district,
        address: user.address,
      },
      secretKey,
      { expiresIn: "8h" }
    );

    res.status(200).json({
      status: "success",
      message: `使用者 ${id} 更新成功`,
      data: { token: newToken },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message ? err.message : "修改失敗",
    });
  }
});

router.post(
  "/upload",
  upload.single("myFile"),
  checkToken,
  async (req, res) => {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ status: "error", message: "請上傳圖片" });
    }

    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return res
        .status(400)
        .json({ status: "error", message: "上傳的圖片格式不正確" });
    }

    const newFileName = `${Date.now()}${extname(
      file.originalname
    ).toLowerCase()}`;
    const newPath = resolve(__dirname, "../../public/user/img", newFileName);

    try {
      await rename(file.path, newPath);

      const sql = "UPDATE users SET `user_img` = ? WHERE id = ?;";
      await pool.execute(sql, [newFileName, req.decoded.id]);

      const token = jwt.sign(
        {
          id: req.decoded.id,
          email: req.decoded.email,
          role: req.decoded.role,
          name: req.decoded.name,
          birthday: req.decoded.birthday,
          gender: req.decoded.gender,
          phone: req.decoded.phone,
          avatar: newFileName,
          teacher_id: req.decoded.teacher_id,
          company_name: req.decoded.company_name,
          business_license_number: req.decoded.business_license_number,
          county: req.decoded.county,
          district: req.decoded.district,
          address: req.decoded.address,
        },
        secretKey,
        { expiresIn: "8h" }
      );

      res.status(200).json({
        fileUrl: `/user/img/${newFileName}`,
        data: { token },
      });
    } catch (err) {
      console.error("上傳錯誤:", err);
      return res.status(500).json({ status: "error", message: "檔案儲存失敗" });
    }
  }
);

router.post("/status", checkToken, (req, res) => {
  const { decoded } = req;
  const token = jwt.sign(
    {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
      birthday: decoded.birthday,
      gender: decoded.gender,
      phone: decoded.phone,
      avatar: decoded.avatar,
      teacher_id: decoded.teacher_id,
      company_name: decoded.company_name,
      business_license_number: decoded.business_license_number,
      county: decoded.county,
      district: decoded.district,
      address: decoded.address,
    },
    secretKey,
    { expiresIn: "8h" }
  );

  res.json({ status: "success", data: { token }, message: "登入中" });
});

router.use(express.static(resolve(__dirname, "../../public", "user", "img")));

function checkToken(req, res, next) {
  let token = req.get("Authorization");
  if (!token)
    return res.json({
      status: "error",
      data: "",
      message: "無資料",
    });

  if (!token.startsWith("Bearer "))
    return res.json({
      status: "error",
      data: "",
      message: "驗證資料錯誤",
    });

  token = token.slice(7);

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err)
      return res.status(401).json({
        status: "error",
        data: "",
        message: "資料失效",
      });
    req.decoded = decoded;
    next();
  });
}
// 在 authRoutes.js 中新增以下路由處理 Google 登入：
router.post("/google/google-login", upload.none(), async (req, res) => {
  const { google_id, email, name, avatar_url } = req.body;

  try {
    if (!google_id || !email || !name) {
      return res.status(400).json({ status: "error", message: "缺少必要欄位" });
    }

    // 檢查使用者是否已存在
    const [existUser] = await pool.execute(
      "SELECT * FROM users WHERE google_id = ?",
      [google_id]
    );

    let user;
    if (existUser.length > 0) {
      // 使用者已存在，直接取得使用者資料
      user = existUser[0];
    } else {
      // 使用者不存在，新增使用者
      const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
      const insertSql =
        "INSERT INTO users (google_id, email, name, user_img, created_at) VALUES (?, ?, ?, ?, ?)";
      const [result] = await pool.execute(insertSql, [
        google_id,
        email,
        name,
        avatar_url,
        createdAt,
      ]);

      // 重新查詢使用者資料
      const [newUser] = await pool.execute(
        "SELECT * FROM users WHERE google_id = ?",
        [google_id]
      );
      user = newUser[0];
    }
     // 產生Token
     const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role || "user",// 如果沒有role給預設值user
        name: user.name,
        birthday: user.birthday,
        gender: user.gender,
        phone: user.phone,
        avatar: await getAvatar(user.user_img),
        teacher_id: user.teacher_id,
        company_name: user.company_name,
        business_license_number: user.business_license_number,
        county: user.county,
        district: user.district,
        address: user.address,
      },
      secretKey,
      {
        expiresIn: "8h",
      }
    );
    res.status(200).json({
      status: "success",
      data: { token },
      message: "登入成功",
    });
    // console.log(data);
    
    // res.json({
    //   status: "success",
    //   token: {token},
    //   // user: {
    //   //   id: user.id,
    //   //   email: user.email,
    //   //   name: user.name,
    //   //   avatar_url: await getAvatar(user.user_img),
    //   // },
    // });
  } catch (err) {
    console.error("Google 登入錯誤:", err);
    res
      .status(500)
      .json({ status: "error", message: "Google 登入失敗", error: err.message });
  }
});



async function getAvatar(img) {
  const basePath = path.resolve("public/user/img");
  console.log(basePath);

  const defaultAvatar = "http://localhost:5000/auth/Dog5.png";

  if (!img) {
    return defaultAvatar;
  }

  const imgPath = path.join(basePath, img);

  try {
    await fs.promises.access(imgPath, fs.constants.F_OK);
    return `http://localhost:5000/auth/${img}`;
  } catch (err) {
    return defaultAvatar;
  }
}

export default router;
