import express from "express";
import {
  getHotelTag,
  addHotelTag,
  removeHotelTag,
} from "../controllers/hotelTagsController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:hotelId", getHotelTag);

router.post("/", verifyToken, verifyRole(["operator"]), addHotelTag);

//這裡的刪除是直接刪除
router.delete(
  "/:hotelId/:tagId",
  verifyToken,
  verifyRole(["operator"]),
  removeHotelTag
);

export default router;
