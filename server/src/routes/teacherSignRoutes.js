import express from "express";
import jwt from "jsonwebtoken";
import pool from "../config/mysql.js";
import bcrypt from "bcrypt";
import multer from "multer";
import { 
  getInfo, 
  updateInfo, 
  getCourse, 
  getCourseId, 
  createCourse, 
  updateCourse, 
  deleteSessionOnly
} from "../controllers/teacherSignController.js";
import { verifyToken, verifyRole } from '../middlewares/authMiddleware.js'

const router = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;
const storage = multer.diskStorage({
  destination: "public/teacherSign/img",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // 避免檔名衝突
  },
});
const upload = multer({storage});


// 師資
router.get("/info", verifyToken, verifyRole(['teacher']), getInfo);     
router.put("/info", verifyToken, verifyRole(['teacher']), updateInfo); 


// 課程    
router.get("/mycourse", verifyToken, verifyRole(['teacher']), getCourse);
router.get("/mycourse/:id", verifyToken, verifyRole(['teacher']), getCourseId);
router.post("/", verifyToken, verifyRole(['teacher']), upload.fields([{ name: "mainImage" }, { name: "otherImages" }]), createCourse); 
router.put("/mycourse/:id",verifyToken, verifyRole(['teacher']), updateCourse); 
router.put("/mycourse/session/:id",verifyToken, verifyRole(['teacher']), deleteSessionOnly); 


export default router;
