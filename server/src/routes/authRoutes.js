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
      "INSERT INTO `users` (`email`, `password`, `created_at`) VALUES (?, ?, ?)";
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

// async function getAvatar(img) {
//   if (!img) {
//     return "http://localhost:5000/auth/Dog5.png";
//   }
//   return `http://localhost:5000/auth/${img}`;
// }

export default router;
