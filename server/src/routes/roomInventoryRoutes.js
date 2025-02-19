import express from "express";
import {
  getRoomInventory,
  updateRoomInventory,
} from "../controllers/roomInventoryController.js";

const router = express.Router();
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

router.get("/:hotelId", getRoomInventory);
router.patch(
  "/:roomInventoryId",
  verifyToken,
  verifyRole(["operator"]),
  updateRoomInventory
);

export default router;
