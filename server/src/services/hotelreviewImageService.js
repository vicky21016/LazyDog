import pool from "../config/mysql.js";

export const addReviewImageService = async (review_id, url, description) => {
  try {
    await pool.query(
      "INSERT INTO hotel_review_images (review_id, url, description, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
      [review_id, url, description || null]
    );
    return true;
  } catch (error) {
    console.error("新增評論圖片錯誤:", error);
    return false;
  }
};
export const getReviewImagesService = async (review_id) => {
  try {
    const [images] = await pool.query(
      "SELECT id, url, description FROM hotel_review_images WHERE review_id = ? AND is_deleted = 0",
      [review_id]
    );
    return images;
  } catch (error) {
    console.error("獲取評論圖片錯誤:", error);
    return [];
  }
};
export const deleteReviewImageService = async (id, user_id) => {
  try {
    const [image] = await pool.query(
      `SELECT hri.* FROM hotel_review_images hri
         JOIN hotel_reviews hr ON hri.review_id = hr.id
         WHERE hri.id = ? AND hr.user_id = ?`,
      [id, user_id]
    );

    if (image.length === 0) return false;

    await pool.query(
      "UPDATE hotel_review_images SET is_deleted = 1, updated_at = NOW() WHERE id = ?",
      [id]
    );
    return true;
  } catch (error) {
    console.error("刪除評論圖片錯誤:", error);
    return false;
  }
};
