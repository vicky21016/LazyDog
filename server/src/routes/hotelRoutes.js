import express from "express";
import {
  getAllHotels,
  getByIds,
  createHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

router.get("/hotels", getAllHotels);
router.get("/hotels/:id", getByIds);
router.post("/hotels", createHotel);

export default router;
