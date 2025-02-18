import {
  getAllRooms,
  getRoomByIds,
  createRooms,
  updateRooms,
  deleteRooms,
} from "../services/hotelRoomTypeService.js";

export const getAllRoom = async (req, res) => {
  try {
    const rooms = await getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: "無法取得房型：" + error.message });
  }
};
export const getRoomById = async (req, res) => {
  try {
    const room = await getRoomByIds(req.params.id);
    if (!room) return res.status(404).json({ message: "找不到此房型" });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: "無法取得房型：" + error.message });
  }
};
export const createRoom = async (req, res) => {
  try {
    const newRoom = await createRooms(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ error: "無法新增房型：" + error.message });
  }
};
export const updateRoom = async (req, res) => {
  try {
    const updated = await updateRooms(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "房型不存在" });
    res.status(200).json({ message: "房型更新成功" });
  } catch (error) {
    res.status(400).json({ error: "無法更新房型：" + error.message });
  }
};
export const deleteRoom = async (req, res) => {
  try {
    const deleted = await deleteRooms(req.params.id);
    if (!deleted) return res.status(404).json({ message: "房型不存在" });
    res.status(200).json({ message: "房型已刪除" });
  } catch (error) {
    res.status(500).json({ error: "無法刪除房型：" + error.message });
  }
};
