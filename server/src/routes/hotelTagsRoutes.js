import express from "express";
import {
  getHotelTag,
  addHotelTag,
  removeHotelTag,
  getAllHotelTags,
} from "../controllers/hotelTagsController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/tags", getAllHotelTags);
router.get("/:hotelId(\\d+)", getHotelTag);


router.post("/", verifyToken, verifyRole(["operator"]), addHotelTag);

//改軟刪除
router.patch(
  "/:hotelId/:tagId",
  verifyToken,
  verifyRole(["operator"]),
  removeHotelTag
);

export default router;
