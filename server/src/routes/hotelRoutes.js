import express from "express";
import {
  getAllHotels,
  getByIds,
  createHotel,
  updateHotel,
  deleteHotel,
  restoreHotel
} from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", getAllHotels);
router.get("/:id", getByIds);
router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.patch("/:id/restore", restoreHotel);

export default router;
