import express from "express";
import {getAllProducts} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
// router.get("/products", getAllProducts);
// router.get("/products", getAllProducts);
// router.post("/products", getAllProducts);
// router.put("/products", getAllProducts);
// router.delete("/products", getAllProducts);

// router.post

// router.put

export default router;
