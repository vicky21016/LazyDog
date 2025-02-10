import express from "express";
import {
  getAllHotels,
  getByIds,
  createHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", getAllHotels);
router.get("/:id", getByIds);
router.post("/", createHotel);

export default router;
