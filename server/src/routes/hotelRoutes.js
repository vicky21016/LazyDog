import express from "express";
import { getAllHotels,getById } from "../controllers/hotelController.js";

const router = express.Router();

router.get("/hotels", getAllHotels);
router.get("/hotels/:id", getById);

export default router;
