import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import {
  getArticles,
  getId,
  createArticle,
  deleteArticle,
  updateArticle,
  searchKeyword,
  uploadController,
} from "../controllers/articleController.js";

import { dirname, resolve } from "path";

import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));




const router = express.Router();

// 用於處理一般表單資料，不包含檔案
const noFileUpload = multer();

// 為圖片上傳設定儲存配置
const uploadDir = path.join(process.cwd(), "public/article_img");
const fileUpload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${uuidv4()}${ext}`;
      cb(null, filename);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024, 
  },
});
console.log(resolve(__dirname, "../../public", "article_img","0c68b190-ebe5-11ee-bb73-635f232238eb.webp"));

router.use(express.static(resolve(__dirname, "../../public", "article_img")));
router.get("/", getArticles);
router.get("/search", searchKeyword); // search 要在 :id 前面
router.get("/:id", getId);
router.post("/", noFileUpload.none(), createArticle);
router.delete("/:id", deleteArticle);
router.put("/:id", noFileUpload.none(), updateArticle);

// 新增圖片上傳的路由，專門處理圖片上傳，Froala 的 imageUploadURL 就設定指向這裡
router.post("/upload", fileUpload.single("file"), uploadController.handleUpload);


export default router;
