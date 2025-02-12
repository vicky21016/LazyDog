import express from "express";
import {
  getAllHotels,
  getByIds,
  createHotel,
  updateHotel,
  softDeleteHotel,
  getSearch,
} from "../controllers/hotelController.js";
// import { verifyToken, verifyRole   } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllHotels);
router.get("/search", getSearch);
router.get("/:id", getByIds);
router.post("/", createHotel);
router.patch("/:id", updateHotel);
router.patch("/:id/soft-delete", softDeleteHotel);
// EX: ("/hotels/:id", verifyToken, verifyRole(["operator", "admin"]), softDeleteHotel)

export default router;
