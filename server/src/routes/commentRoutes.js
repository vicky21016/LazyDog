import express from "express";
import multer from "multer";
import {
    createComment,
    deleteComment
} from '../controllers/commentController.js'

const router = express.Router();
const upload = multer();


router.post('/', upload.none(), createComment)
router.delete('/:id', deleteComment)

export default router;