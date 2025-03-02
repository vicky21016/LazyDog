import express from "express";
import { getAllRoomTypes } from "../services/hotelRoomService.js";

const router = express.Router();

// 取得所有房型種類
router.get("/room-types", async (req, res) => {
  try {
    const roomTypes = await getAllRoomTypes();
    res.json({ status: "success", data: roomTypes });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
