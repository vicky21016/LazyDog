import { getAllOrders, getOrderById } from "../services/hotelOrderService.js";

export const getOrders = async (req, res) => {
  try {
    const hotelOrders = await getAllOrders();
    res.json(hotelOrders);
  } catch (err) {
    res.status(500).json({ error: "找不到訂單", details: err.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    console.log("收到的訂單 ID:", req.params.id);
    const order = await getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: "找不到該訂單" });
    if (req.user.role == "user" && order.user_id !== req.user.id) {
      return res.status(403).json({ error: "你無權查看此訂單" });
    }
    if (req.user.role == "operator" && order.hotel_id !== req.user.operator_id) {
        return res.status(403).json({ error: "你無權查看這間飯店的訂單" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ error: "無法取得訂單", details: error.message });
  }
};
