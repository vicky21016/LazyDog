//還沒加 API 的路由

import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import moment from "moment";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;
const upload = multer();
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
dotenv.config();
// 續路由部份
let whitelist = ["http://localhost:5500", "http://localhost:3000"];
let corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// 路由部份
app.get("/", (req, res) => {
  res.send("首頁");
});

app.listen(3005, () => {
  console.log("server is running");
});

function checkToken(req, res, next) {
  let token = req.get("Authorization");

  if (token && token.indexOf("Bearer ") === 0) {
    token = token.slice(7);
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ status: "error", message: "登入驗證失效，請重新登入。" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ status: "error", message: "無登入驗證資料，請重新登入。" });
  }
}
app.get("/protected", checkToken, (req, res) => {
  res.json({ message: "成功訪問受保護的 API", user: req.decoded });
});



const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
