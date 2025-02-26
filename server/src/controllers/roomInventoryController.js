import {
  getRoomInventorys,
  updateRoomInventorys,
  getAllRoomInventoryService,
} from "../services/roomInventoryService.js";

export const getRoomInventory = async (req, res) => {
  try {
    const inventory = await getRoomInventorys(req.params.hotelId);
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: "無法取得房間庫存：" + error.message });
  }
};

export const updateRoomInventory = async (req, res) => {
  try {
    const { available_quantity, price, date } = req.body;
    const updated = await updateRoomInventorys(req.params.roomInventoryId, {
      available_quantity,
      price,
      date,
    });

    if (!updated)
      return res.status(400).json({ message: "更新失敗，請確認房型是否存在" });

    res.status(200).json({ message: "房間庫存已更新" });
  } catch (error) {
    res.status(400).json({ error: "無法更新房間庫存：" + error.message });
  }
};
export const getAllRoomInventory = async (req, res) => {
  try {
    const inventory = await getAllRoomInventoryService(); // 這裡需要在 service 層定義函式
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: "無法獲取房型庫存：" + error.message });
  }
};
