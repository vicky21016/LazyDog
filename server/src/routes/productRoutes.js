import express from "express";
import {getAll} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAll);
// router.get("/products/:id", getAllProducts);
// router.get("/products/search", getAllProducts);
// router.post("/products", getAllProducts);
// router.put("/products/:id", getAllProducts);
// router.delete("/products/:id", getAllProducts);

// router.post

// router.put

export default router;
