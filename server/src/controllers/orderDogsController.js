import {
  getOrderDogs,
  createOrderDogs,
  updateOrderDogs,
  deleteOrderDogs,
} from "../services/orderDogsService.js";

export const getOrderDog = async (req, res) => {
  try {
    const dogs = await getOrderDogs(req.params.orderId);
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ error: "無法取得訂單內的寵物：" + error.message });
  }
};
export const createOrderDog = async (req, res) => {
  try {
    const newDog = await createOrderDogs(req.body);
    res.status(201).json(newDog);
  } catch (error) {
    res.status(400).json({ error: "無法新增寵物：" + error.message });
  }
};
export const updateOrderDog = async (req, res) => {
  try {
    const updated = await updateOrderDogs(req.params.dogId, req.body);
    if (!updated)
      return res.status(404).json({ message: "寵物不存在或已被刪除" });
    res.status(200).json({ message: "寵物資訊已更新" });
  } catch (error) {
    res.status(400).json({ error: "無法更新寵物：" + error.message });
  }
};
export const deleteOrderDog = async (req, res) => {
  try {
    const deleted = await deleteOrderDogs(req.params.dogId);
    if (!deleted)
      return res.status(404).json({ message: "寵物不存在或已被刪除" });
    res.status(200).json({ message: "寵物已刪除" });
  } catch (error) {
    res.status(500).json({ error: "無法刪除寵物：" + error.message });
  }
};
