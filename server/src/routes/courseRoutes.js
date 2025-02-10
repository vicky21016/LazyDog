import express from "express";
import { getAllCourse,getIdCourse ,createCourse} from "../controllers/courseController.js";

const router = express.Router();

router.get("/course", getAllCourse);
router.get("/course/:id", getIdCourse);
router.post("/course", createCourse);
export default router;
