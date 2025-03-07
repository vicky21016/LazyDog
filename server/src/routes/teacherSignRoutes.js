import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

import {
  getInfo,
  updateInfo,
  getCourse,
  getCourseId,
  createCourse,
  createGetNeed,
  updateCourse,
  deleteSessionOnly,
} from "../controllers/teacherSignController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../../lazydog");

// 動態設定存儲位置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir = path.join(rootDir, "public", "teacherSign", "uploads");
    console.log(uploadDir);

    if (req.path.includes("/info")) {
      uploadDir = path.join(rootDir, "public", "teacher-img");
    } else if (req.path.includes("/mycourse")) {
      uploadDir = path.join(rootDir, "public", "course", "img");
    } else if (req.path.includes("/user")) {
      uploadDir = path.join(rootDir, "public", "user", "img");
    }
    console.log("上傳目錄: ", uploadDir);

    // 確保資料夾存在
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("📁 目錄不存在，已建立:", uploadDir);
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    console.log("📸 上傳的檔案名稱: ", uniqueName); // ✅ 記錄檔案名稱
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// 師資
router.get("/info", verifyToken, verifyRole(["teacher"]), getInfo);
router.put(
  "/info",
  verifyToken,
  verifyRole(["teacher"]),
  upload.single("teacherPic"),
  updateInfo
);

// 課程
router.get("/mycourse", verifyToken, verifyRole(["teacher"]), getCourse);
router.get("/mycourse/:id", verifyToken, verifyRole(["teacher"]), getCourseId);
router.get("/createGet", verifyToken, verifyRole(["teacher"]), createGetNeed);
router.post(
  "/mycourse",
  verifyToken,
  verifyRole(["teacher"]),
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "otherImages", maxCount: 5 },
  ]),
  createCourse
);
router.put(
  "/mycourse/:id",
  verifyToken,
  verifyRole(["teacher"]),
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "otherImages", maxCount: 5 },
  ]),
  updateCourse
);
router.put(
  "/mycourse/session/:id",
  verifyToken,
  verifyRole(["teacher"]),
  deleteSessionOnly
);

export default router;
