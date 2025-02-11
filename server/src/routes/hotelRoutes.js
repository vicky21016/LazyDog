import express from "express";
import {
  getAllHotels,
  getByIds,
  createHotel,
  updateHotel,
  softDeleteHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", getAllHotels);
router.get("/:id", getByIds);
router.post("/", createHotel);
router.patch("/:id", updateHotel);
router.patch("/softDelete/:id", softDeleteHotel);

export default router;
