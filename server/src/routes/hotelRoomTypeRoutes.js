import express from "express";
import {
  getAllHotelRoom,
  getHotelRoomById,
  createHotelRoom,
  updateHotelRoom,
  deleteHotelRoom,
} from "../controllers/hotelRoomTypeController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

const router = express.Router();
//都可以
router.get("/", getAllHotelRoom);
router.get("/:hotelId", getHotelRoomById);
//operator可以
router.post("/", verifyToken, verifyRole(["operator"]), createHotelRoom);
router.patch("/:id", verifyToken, verifyRole(["operator"]), updateHotelRoom);
router.delete("/:id", verifyToken, verifyRole(["operator"]), deleteHotelRoom);

export default router;
