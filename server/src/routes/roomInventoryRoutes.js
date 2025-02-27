import express from "express";
import {
  getRoomInventory,
  updateRoomInventory,
  getAllRoomInventory,
} from "../controllers/roomInventoryController.js";

const router = express.Router();
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

router.get("/", getAllRoomInventory); // 取得所有房型的庫存

router.get("/:hotelId", getRoomInventory);
router.patch(
  "/:roomInventoryId",
  verifyToken,
  verifyRole(["operator"]),
  updateRoomInventory
);

export default router;
