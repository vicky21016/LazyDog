import {
  getAllHotelRooms,
  getHotelRoomByIds,
  createHotelRooms,
  updateHotelRooms,
  deleteHotelRooms,
  getAllRoomTypes,
  getHotelRoomByOperatorId,
} from "../services/hotelRoomTypeService.js";
import pool from "../config/mysql.js";
export const getAllHotelRoom = async (req, res) => {
  try {
    const rooms = await getAllHotelRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: "無法取得房型：" + error.message });
  }
};
export const getHotelRoomById = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const rooms = await getHotelRoomByIds(hotelId); // 確保這個函數正確處理 hotel_id
    if (!rooms || rooms.length == 0) {
      return res
        .status(404)
        .json({ error: `找不到 hotel_id=${hotelId} 的房型` });
    }
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "無法取得房型：" + error.message });
  }
};
export const getHotelRoomsByOperator = async (req, res) => {
  const { operatorId } = req.params;

  try {
    const rooms = await getHotelRoomByOperatorId(operatorId);

    res.json({ status: "success", data: rooms });
  } catch (error) {
    console.error(" 查詢房型錯誤:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
export const createHotelRoom = async (req, res) => {
  try {
    const newRoom = await createHotelRooms(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ error: "無法新增房型：" + error.message });
  }
};
export const updateHotelRoom = async (req, res) => {
  try {
    const updated = await updateHotelRooms(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "房型不存在" });
    res.status(200).json({ message: "房型更新成功" });
  } catch (error) {
    res.status(400).json({ error: "無法更新房型：" + error.message });
  }
};
export const deleteHotelRoom = async (req, res) => {
  try {
    const deleted = await deleteHotelRooms(req.params.id);
    if (!deleted) return res.status(404).json({ message: "房型不存在" });
    res.status(200).json({ message: "房型已刪除" });
  } catch (error) {
    res.status(500).json({ error: "無法刪除房型：" + error.message });
  }
};
export const getAllRoomTypesController = async (req, res) => {
  try {
    const roomTypes = await getAllRoomTypes();
    res.json({ status: "success", data: roomTypes });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "無法獲取房型種類: " + error.message });
  }
};
export const uploadRoomImage = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "請上傳圖片" });
    }

    // 確保回傳完整圖片路徑
    const baseUrl = `${req.protocol}://${req.get("host")}`; // 獲取 http://localhost:5000
    const imageUrl = `/uploads/hotel/${req.file.filename}`;
    const fullImageUrl = `${baseUrl}${imageUrl}`; // 轉換為完整 URL

    // 更新資料庫
    await pool.query(
      "UPDATE hotel_room_types SET image_url = ? WHERE id = ?",
      [imageUrl, roomId]
    );

    res.json({ status: "success", image_url: fullImageUrl });
  } catch (error) {
    console.error("圖片上傳失敗:", error);
    res.status(500).json({ error: "圖片上傳失敗" });
  }
};

