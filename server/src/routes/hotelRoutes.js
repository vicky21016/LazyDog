import express from "express";
import { getAllHotels,getById ,createHotel} from "../controllers/hotelController.js";

const router = express.Router();

router.get("/hotels", getAllHotels);
router.get("/hotels/:id", getById);
router.post("/hotels", createHotel);
export default router;
