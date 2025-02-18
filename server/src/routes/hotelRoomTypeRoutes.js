import express from "express";
import {
  getAllRoom,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/hotelRoomTypeController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

const router = express.Router();
//都可以
router.get("/", getAllRoom);
router.get("/:id", getRoomById);
//operator可以
router.post("/", verifyToken, verifyRole(["operator"]), createRoom);
router.patch("/:id", verifyToken, verifyRole(["operator"]), updateRoom);
router.delete("/:id", verifyToken, verifyRole(["operator"]), deleteRoom);

export default router;
