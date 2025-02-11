// 用MVC架構，步驟三 Route 路由設定
import express from "express";
import { getAllCourse,getIdCourse ,createCourse} from "../controllers/courseController.js";

const router = express.Router();

router.get("/course", getAllCourse);
router.get("/course/:id", getIdCourse);
router.post("/course", createCourse);
export default router;
