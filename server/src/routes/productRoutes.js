import express from "express";
import multer from "multer";
import {
  getAll,
  getSearch,
  getCategory,
  getOrder,
  getId,
  createNew,
  updateItem,
  softDeleteItem,
  deleteItem,
  connectError,
} from "../controllers/productController.js";

const router = express.Router();
const upload = multer();

router.get("/", getAll);
router.get("/search", getSearch); //search要在productID前面
router.get("/category", getCategory);
router.get("/order", getOrder);
router.get("/:productID", getId);
router.post("/", upload.none(), createNew);
router.patch("/:productID", upload.none(), updateItem);
router.patch("/:productID/delete", upload.none(), softDeleteItem);
router.delete("/:productID", deleteItem);
router.get("/*", connectError);

// router.post

// router.put

export default router;
