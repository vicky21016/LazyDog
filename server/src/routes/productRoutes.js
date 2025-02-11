import express from "express";
import multer from "multer";
import {
  getAll,
  getId,
  getSearch,
  createNew,
  updateItem,
  connectError,
} from "../controllers/productController.js";

const router = express.Router();
const upload = multer();

router.get("/", getAll);
router.get("/search", getSearch); //search要在productID前面
router.get("/:productID", getId);
router.post("/", upload.none(), createNew);
router.patch("/:productID", upload.none(), updateItem);
// router.delete("/products/:id", getAllProducts);
router.get("/*", connectError);

// router.post

// router.put

export default router;
