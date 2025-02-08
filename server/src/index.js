import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const upload = multer();
const secretKey = process.env.JWT_SECRET_KEY;

// CORS 設定
const whitelist = ["http://localhost:5500", "http://localhost:3000"];
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked request from: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json()); 

// 測試首頁 API
app.get("/", (req, res) => {
  res.send("首頁");
});

// JWT
function checkToken(req, res, next) {
  let token = req.get("Authorization");

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7);
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: "error", message: "登入驗證失效，請重新登入。" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({ status: "error", message: "無登入驗證資料，請重新登入。" });
  }
}



// 設置 PORT 並啟動伺服器
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
