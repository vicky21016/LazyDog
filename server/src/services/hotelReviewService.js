import pool from "../config/mysql.js";

export const createHotelReviews = async (
  user_id,
  hotel_id,
  rating,
  comment
) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO hotel_reviews (user_id, hotel_id, rating, comment, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [user_id, hotel_id, rating, comment]
    );
    return { id: result.insertId, rating, comment };
  } catch (error) {
    console.error("新增評論錯誤:", error);
    return null;
  }
};
export const replyHotelReviews = async (review_id, operator_id, reply) => {
  try {
    const [review] = await pool.query(
      "SELECT * FROM hotel_reviews WHERE id = ?",
      [review_id]
    );
    if (review.length == 0) return null;

    await pool.query(
      "UPDATE hotel_reviews SET reply = ?, updated_at = NOW() WHERE id = ?",
      [reply, review_id]
    );
    return { review_id, reply };
  } catch (error) {
    console.error("回覆評論錯誤:", error);
    return null;
  }
};
export const getHotelReviews = async(hotel_id) => {
  try {
    // 取得評論（不包含圖片）
    const [reviews] = await pool.query(
      `SELECT hr.*, u.name AS user_name
       FROM hotel_reviews hr
       JOIN users u ON hr.user_id = u.id
       WHERE hr.hotel_id = ? AND hr.is_deleted = 0 
       ORDER BY hr.created_at DESC`,
      [hotel_id]
    );

    // 取得所有評論的 ID
    const reviewIds = reviews.map(r => r.id);
    if (reviewIds.length == 0) return reviews;

    // 取得這些評論的圖片
    const [images] = await pool.query(
      `SELECT id, review_id, url 
       FROM hotel_review_images 
       WHERE review_id IN (?) AND is_deleted = 0`,
      [reviewIds]
    );

    // 把圖片加入對應的評論
    const reviewMap = reviews.reduce((acc, review) => {
      acc[review.id] = { ...review, images: [] };
      return acc;
    }, {});

    images.forEach(img => {
      if (reviewMap[img.review_id]) {
        reviewMap[img.review_id].images.push({ id: img.id, url: img.url });
      }
    });

    return Object.values(reviewMap);
  } catch (error) {
    console.error("獲取評論錯誤:", error);
    return [];
  }
};
export const deleteReviews = async (review_id, user_id) => {
  try {
    const [review] = await pool.query(
      "SELECT * FROM hotel_reviews WHERE id = ? AND user_id = ?",
      [review_id, user_id]
    );
    if (review.length == 0) return false;

    await pool.query(
      "UPDATE hotel_reviews SET is_deleted = 1, updated_at = NOW() WHERE id = ?",
      [review_id]
    );
    return true;
  } catch (error) {
    console.error("刪除評論錯誤:", error);
    return false;
  }
};
