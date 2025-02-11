// 用MVC架構，步驟三 Route 路由設定
import express from "express";
import { getAllCourse,getIdCourse ,createCourse} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getAllCourse);     // 多筆
router.get("/:id", getIdCourse);   // 一筆
router.post("/", createCourse); 
// router.put("/:courseId", updateCourse);  
// router.delete("/:courseId",);  
export default router;
