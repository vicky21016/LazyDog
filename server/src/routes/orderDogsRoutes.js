import express from "express";
import {
  getOrderDog,
  createOrderDog,
  updateOrderDog,
  deleteOrderDog,
} from "../controllers/orderDogsController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:orderId", verifyToken, getOrderDog);
router.post("/", verifyToken, verifyRole(["user"]), createOrderDog);
router.patch("/:dogId", verifyToken, verifyRole(["user"]), updateOrderDog);
router.delete("/:dogId", verifyToken, verifyRole(["user"]), deleteOrderDog);

export default router;
