import pool from "../config/mysql.js";

export const addFavorites = async (user_id, hotel_id) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 檢查是否已收藏 (包含已刪除的紀錄)
    const [existing] = await connection.query(
      "SELECT id, is_deleted FROM hotel_favorites WHERE user_id = ? AND hotel_id = ?",
      [user_id, hotel_id]
    );

    if (existing.length > 0) {
      const favorite = existing[0];

      if (favorite.is_deleted === 0) {
        throw new Error("該飯店已收藏");
      }

      // **如果是軟刪除，改為更新 `is_deleted = 0`**
      await connection.query(
        "UPDATE hotel_favorites SET is_deleted = 0, updated_at = NOW() WHERE id = ?",
        [favorite.id]
      );

      await connection.commit();
      return {
        success: true,
        message: "重新收藏成功",
        data: { id: favorite.id, user_id, hotel_id },
      };
    }

    // **如果沒有收藏過，則執行 `INSERT`**
    const [result] = await connection.query(
      "INSERT INTO hotel_favorites (user_id, hotel_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
      [user_id, hotel_id]
    );

    await connection.commit();

    return {
      success: true,
      message: "收藏成功",
      data: { id: result.insertId, user_id, hotel_id },
    };
  } catch (error) {
    await connection.rollback();
    throw new Error("收藏失敗：" + error.message);
  } finally {
    connection.release();
  }
};


export const removeFavorites = async (favorite_id, user_id) => {
  try {
    const [existing] = await pool.query(
      "SELECT * FROM hotel_favorites WHERE id = ? AND user_id = ? AND is_deleted = 0",
      [favorite_id, user_id]
    );

    if (existing.length == 0) {
      throw new Error("找不到收藏紀錄");
    }

    // 使用 DELETE 語句實現硬刪除
    await pool.query(
      "DELETE FROM hotel_favorites WHERE id = ?",
      [favorite_id]
    );

    return { success: true, message: "收藏已移除" };
  } catch (error) {
    throw new Error("移除收藏錯誤：" + error.message);
  }
};

export const getUserFavorites = async (user_id) => {
  try {
    const [favorites] = await pool.query(
      `SELECT hf.id, h.id AS hotel_id, h.name, hi.url AS main_image_url
       FROM hotel_favorites hf
       JOIN hotel h ON hf.hotel_id = h.id
       LEFT JOIN hotel_images hi ON h.main_image_id = hi.id
       WHERE hf.user_id = ? AND hf.is_deleted = 0
       ORDER BY hf.created_at DESC`,
      [user_id]
    );
    return { success: true, message: "獲取收藏清單成功", data: favorites };
  } catch (error) {
    throw new Error("獲取收藏清單錯誤：" + error.message);
  }
};

