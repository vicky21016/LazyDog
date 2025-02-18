import {
  addFavorites,
  removeFavorites,
  getUserFavorites,
} from "../services/hotelFavoriteService.js";

export const addFavorite = async (req, res) => {
  try {
    const { hotel_id } = req.body;
    const user_id = req.user.id;

    if (!hotel_id) {
      return res.status(400).json({ error: "缺少必要欄位 hotel_id" });
    }

    const favorite = await addFavorites(user_id, hotel_id);
    if (!favorite) {
      return res.status(500).json({ error: "無法收藏飯店" });
    }

    if (favorite.error) {
      return res.status(400).json({ error: favorite.error });
    }

    res
      .status(201)
      .json({ success: true, message: "收藏成功", data: favorite });
  } catch (error) {
    res.status(500).json({ error: "無法新增收藏", details: error.message });
  }
};
export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const result = await removeFavorites(id, user_id);
    if (!result) {
      return res.status(500).json({ error: "無法移除收藏" });
    }

    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    res.status(200).json({ success: true, message: "收藏已移除" });
  } catch (error) {
    res.status(500).json({ error: "無法移除收藏", details: error.message });
  }
};
export const getUserFavorite = async (req, res) => {
  try {
    const user_id = req.user.id;
    const favorites = await getUserFavorites(user_id);

    res.status(200).json({ success: true, data: favorites });
  } catch (error) {
    res.status(500).json({ error: "無法獲取收藏清單", details: error.message });
  }
};
