import express from "express";
import multer from "multer";
import {
    getArticles, getId, createArticle, deleteArticle, updateArticle, searchKeyword
} from '../controllers/articleController.js'
const router = express.Router();
const upload = multer();

router.get('/', getArticles);
router.get('/:id', getId);
router.post('/', upload.none(), createArticle)
router.delete('/:id', deleteArticle)
router.put('/:id', upload.none(), updateArticle)
router.get('/search', searchKeyword)


export default router;
