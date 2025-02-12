import express from "express";
import {
  getAllHotels,
  getByIds,
  createHotel,
  updateHotel,
  softDeleteHotel,
} from "../controllers/hotelController.js";
// import { verifyToken, verifyRole   } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllHotels);
router.get("/:id", getByIds);
router.post("/", createHotel);
router.patch("/:id", updateHotel);
router.patch("/:id/soft-delete", softDeleteHotel); 
// EX: ("/hotels/:id", verifyToken, verifyRole(["operator", "admin"]), softDeleteHotel)

export default router;
