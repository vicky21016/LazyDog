import express from "express";
import { getAllRoom, getRoomById, createRoom, updateRoom, deleteRoom } from "../controllers/hotelRoomTypeController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",getAllRoom)
router.get("/:id",getRoomById)

router.post()
router.patch()
router.delete()
