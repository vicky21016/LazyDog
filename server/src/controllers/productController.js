import {getProducts} from "../services/productService.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export default getAllProducts;
