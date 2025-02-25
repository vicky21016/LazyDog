import pool from "../config/mysql.js";
import {
  getHotelTags,
  addHotelTags,
  removeHotelTags,
} from "../services/hotelTagsService.js";

export const getHotelTag = async (req, res) => {
  try {
    const hotelTags = await getHotelTags(req.params.hotelId);
    res.status(200).json(hotelTags);
  } catch (error) {
    res.status(500).json({ error: "無法取得飯店標籤：" + error.message });
  }
};
export const addHotelTag = async (req, res) => {
  try {
    const { hotel_id, tag_id } = req.body;
    const added = await addHotelTags(hotel_id, tag_id);
    if (!added) return res.status(400).json({ message: "新增標籤失敗" });
    res.status(201).json({ message: "標籤已新增" });
  } catch (error) {
    res.status(400).json({ error: "無法新增標籤：" + error.message });
  }
};

export const removeHotelTag = async (req, res) => {
  try {
    const { hotelId, tagId } = req.params;
    const removed = await removeHotelTags(hotelId, tagId);
    if (!removed) return res.status(404).json({ message: "標籤不存在" });
    res.status(200).json({ message: "標籤已刪除" });
  } catch (error) {
    res.status(500).json({ error: "無法刪除標籤：" + error.message });
  }
};
//懶得寫後面
export const getAllHotelTags = async (req, res) => {
  try {
    console.log("🔍 嘗試取得所有飯店標籤...");

    const query = `
      SELECT DISTINCT t.id, t.name, t.description 
      FROM tags t
      JOIN hotel_tags ht ON t.id = ht.tag_id
      WHERE ht.is_deleted = 0
    `;

    const [rows] = await pool.query(query);

    if (!rows.length) {
      console.warn(" 沒有找到任何標籤資料");
      return res.json([]); // 回傳空陣列，而不是 404
    }

    console.log(` 成功取得 ${rows.length} 筆標籤資料`);
    res.json(rows);
  } catch (error) {
    console.error(" 取得標籤失敗:", error);
    res.status(500).json({ message: "無法取得標籤", error: error.message });
  }
};