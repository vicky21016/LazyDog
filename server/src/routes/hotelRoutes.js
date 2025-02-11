import express from "express";
import {
  getAllHotels,
  getByIds,
  createHotel,
  updateHotel,
  deleteHotel,

} from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", getAllHotels);
router.get("/:id", getByIds);
router.post("/", createHotel);
router.patch("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
