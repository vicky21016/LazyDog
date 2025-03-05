import express from "express";
import multer from "multer";
import {
    createComment,
    deleteComment
} from '../controllers/commentController.js'
import {
    getCommentByAuthorS
} from '../services/commentService.js'

const router = express.Router();
const upload = multer();


router.post('/', upload.none(), createComment)
router.delete('/:id', deleteComment)
// router.get("/author/:author_id",getCommentByAuthor)
router.get("/author/:author_id", async (req, res) => {
    const { author_id } = req.params;
  
    try {
      const comments = await getCommentByAuthorS(author_id);
  
    //   const formattedArticles = articles.map(article => ({
    //     ...article,
    //     cover_image: article.cover_image || "http://localhost:5000/api/articles/image2.jpg" // 設定預設圖片
    // }));
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;