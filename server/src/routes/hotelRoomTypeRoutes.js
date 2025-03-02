import express from "express";
import {
  getAllHotelRoom,
  getHotelRoomById,
  getHotelRoomsByOperator,
  createHotelRoom,
  updateHotelRoom,
  deleteHotelRoom,
  getAllRoomTypesController,
  uploadRoomImage,
} from "../controllers/hotelRoomTypeController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();
//都可以
router.get("/", getAllHotelRoom);
router.get("/hotel/:hotelId", getHotelRoomById);
//operator可以
router.post("/", verifyToken, verifyRole(["operator"]), createHotelRoom);
router.patch("/:id", verifyToken, verifyRole(["operator"]), updateHotelRoom);
router.delete("/:id", verifyToken, verifyRole(["operator"]), deleteHotelRoom);
router.get("/room-types", getAllRoomTypesController);
router.get("/operator/:operatorId", getHotelRoomsByOperator);
router.post(
  "/:roomId/upload",
  verifyToken,
  upload.single("image"),
  uploadRoomImage
);

export default router;
