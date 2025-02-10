import {getAllProducts, getProductId} from "../services/productService.js";

export const getAll = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const getId = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await getProductId();
    res.json(product);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
