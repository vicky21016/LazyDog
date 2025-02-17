import { getAllOrders } from "../services/hotelOrderService.js";

export const getOrders = async (req, res) => {
  try {
    const hotelOrders = await getAllOrders();
    res.json(hotelOrders);
  } catch (err) {
    res.status(500).json({ error: "找不到訂單", details: err.message });
  }
};
