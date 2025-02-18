import {
  getAllOrders,
  getOrderById,
  getOpHotelId,
  createNewOrders,
  updateOrderById,
  updateOrderStatus,
  updatePayStatus,
  softDeleteOrderById,
} from "../services/hotelOrderService.js";

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
    const orderId = req.params.id;
    const order = await getOrderById(orderId);
    if (!order) return res.status(404).json({ error: "找不到該訂單" });
    if (req.user.role == "user" && order.user_id !== req.user.id) {
      return res.status(403).json({ error: "你無權查看此訂單" });
    }
    if (req.user.role == "operator") {
      const operatorHotelId = await getOpHotelId(req.user.id);
      if (!operatorHotelId.includes(order.hotel_id)) {
        return res.status(403).json({ error: "你無權查看這間飯店的訂單" });
      }
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ error: "無法取得訂單", details: error.message });
  }
};

export const createNewOrder = async (req, res) => {
  try {
    const {
      user_id,
      hotel_id,
      dog_count,
      check_in,
      check_out,
      total_price,
      payment_status,
      payment_method,
      cancellation_policy,
      remark,
    } = req.body;
    if (
      !user_id ||
      !hotel_id ||
      !dog_count ||
      !check_in ||
      !check_out ||
      !total_price ||
      !payment_status ||
      !payment_method ||
      !cancellation_policy ||
      !remark
    ) {
      return res.status(400).json({ error: "缺少必要欄位" });
    }
    const order = await createNewOrders({
      user_id,
      hotel_id,
      dog_count,
      check_in,
      check_out,
      total_price,
      payment_status,
      payment_method,
      cancellation_policy,
      remark,
    });
    res
      .status(201)
      .json({ success: true, message: "訂單建立成功", data: order });
  } catch (error) {
    res.status(500).json({ error: "無法創建訂單", details: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const updateData = req.body;
    const success = await updateOrderById(orderId, updateData);

    if (!success) return res.status(404).json({ error: "找不到此訂單" });
    res.status(200).json({ success: true, message: "訂單更新成功" });
  } catch (error) {
    res.status(500).json({ error: "無法更新訂單", details: error.message });
  }
};

export const changeStauts = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "無效的訂單狀態" });
    }
    const order = await getOrderById(orderId);
    if (!order) return res.status(404).json({ error: "找不到該訂單" });

    if (req.user.role == "operator") {
      const operatorHotelIds = await getOpHotelId(req.user.id);
      if (!operatorHotelIds.includes(order.hotel_id)) {
        return res.status(403).json({ error: "你無權更改這間飯店的訂單" });
      }
    }
    const success = await updateOrderStatus(orderId, status);
    if (!success) return res.status(404).json({ error: "找不到該訂單" });

    res.status(200).json({
      success: true,
      message: `訂單 id=${orderId} 狀態更新為 ${status}`,
    });
  } catch (error) {
    res.status(500).json({ error: "無法更新訂單狀態", details: error.message });
  }
};
export const updatePay = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const { payment_status } = req.body;

    if (!["paid", "unpaid", "partial"].includes(payment_status)) {
      return res.status(400).json({ error: "無效的付款狀態" });
    }
    const order = await getOrderById(orderId);
    if (!order) return res.status(404).json({ error: "找不到該訂單" });
    if (req.user.role !== "operator") {
      return res.status(403).json({ error: "只有業者可以更改付款狀態" });
    }
    const operatorHotelIds = await getOpHotelId(req.user.id);
    if (!operatorHotelIds.includes(order.hotel_id)) {
      return res.status(403).json({ error: "你無權更改這間飯店的付款狀態" });
    }
    const success = await updatePayStatus(orderId, payment_status);
    if (!success) return res.status(404).json({ error: "找不到該訂單" });

    res
      .status(200)
      .json({
        success: true,
        message: `訂單 id=${orderId} 付款狀態更新為 ${payment_status}`,
      });
  } catch (error) {
    res.status(500).json({ error: "無法更新付款狀態", details: error.message });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const success = await softDeleteOrderById(orderId);
    if (!success) return res.status(404).json({ error: "找不到該訂單" });
    res.status(200).json({ success: true, message: "訂單已軟刪除" });
  } catch (error) {
    res.status(500).json({ error: "無法刪除此訂單", details: error.message });
  }
};
