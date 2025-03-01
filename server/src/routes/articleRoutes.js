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
import { getArticlesByAuthorS } from "../services/articleService.js";
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

router.use(express.static(resolve(__dirname, "../../public", "article_img")));
router.get("/", getArticles);
router.get("/search", searchKeyword); // search 要在 :id 前面
router.get("/:id", getId);
router.post("/", noFileUpload.none(), createArticle);
router.delete("/:id", deleteArticle);
router.put("/:id", noFileUpload.none(), updateArticle);
// 新增圖片上傳的路由，專門處理圖片上傳，Froala 的 imageUploadURL 就設定指向這裡
router.post("/upload", fileUpload.single("file"), uploadController.handleUpload);
router.post("/upload/cover", fileUpload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 返回上傳成功的文件信息，並且格式化為完整的 URL
    const fileUrl = `http://localhost:5000/api/articles/${req.file.filename}`;
    res.status(200).json({
      article_img: fileUrl, // 修改這裡
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 依 author_id 獲取文章
router.get("/author/:author_id", async (req, res) => {
  const { author_id } = req.params;

  try {
    const articles = await getArticlesByAuthorS(author_id);
    const formattedArticles = articles.map(article => ({
      ...article,
      cover_image: article.cover_image || "http://localhost:5000/api/articles/image2.jpg" // 設定預設圖片
  }));
    res.json(formattedArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
