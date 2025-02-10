import express from "express";
import {getAll, getId, getSearch, createNew, connectError} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/search", getSearch); //search要在productID前面
router.get("/products/:productID", getId);
router.post("/products", createNew);
// router.put("/products/:id", getAllProducts);
// router.delete("/products/:id", getAllProducts);
router.get("/products/*", connectError);

// router.post

// router.put

export default router;
