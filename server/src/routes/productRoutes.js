import express from "express";
import multer from "multer";
import {
  getAll,
  getAllCategory,
  getSearch,
  getCategory,
  getOrder,
  getFavorite,
  getId,
  createFavorite,
  createNew,
  updateFavorite,
  updateItem,
  softDeleteItem,
  deleteFavorite,
  deleteItem,
  connectError,
} from "../controllers/productController.js";

const router = express.Router();
const upload = multer();

router.get("/", getAll);
router.get("/search", getSearch); //search要在productID前面
router.get("/category", getAllCategory);
router.get("/categoryName", getCategory);
router.get("/order", getOrder);
router.get("/favorite", getFavorite);
router.get("/:productID", getId);
router.post("/favorite", upload.none(), createFavorite);
router.post("/", upload.none(), createNew);
router.patch("/favorite", upload.none(), updateFavorite);
router.patch("/:productID", upload.none(), updateItem);
router.patch("/:productID/delete", upload.none(), softDeleteItem);
router.delete("/favorite", deleteFavorite);
router.delete("/:productID", deleteItem);
router.get("/*", connectError);

// router.post

// router.put

export default router;
