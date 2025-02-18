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
    return {
      success: true,
      message: "評論已成功新增",
      data: { id: result.insertId, rating, comment },
    };
  } catch (error) {
    throw new Error("無法新增評論：" + error.message);
  }
};
export const replyHotelReviews = async (review_id, operator_id, reply) => {
  try {
    const [review] = await pool.query(
      "SELECT * FROM hotel_reviews WHERE id = ?",
      [review_id]
    );
    if (review.length == 0) {
      throw new Error("找不到該評論，無法回覆");
    }
    await pool.query(
      "UPDATE hotel_reviews SET reply = ?, updated_at = NOW() WHERE id = ?",
      [reply, review_id]
    );
    return {
      success: true,
      message: "評論回覆成功",
      data: { review_id, reply },
    };
  } catch (error) {
    throw new Error("無法回覆評論：" + error.message);
  }
};
export const getHotelReviews = async (hotel_id) => {
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
    if (reviews.length == 0) {
      return { success: true, message: "此飯店沒有評論", data: [] };
    }
    // 取得所有評論的 ID
    const reviewIds = reviews.map((r) => r.id);

    // 取得這些評論的圖片
    const [images] = await pool.query(
      `SELECT id, review_id, url 
       FROM hotel_review_images 
       WHERE review_id IN (?) AND is_deleted = 0`,
      [reviewIds]
    );

    // 把圖片加入對應的評論
    const reviewMap = {};
    reviews.forEach((review) => {
      reviewMap[review.id] = {
        ...review,
        images: [], // 預設空
      };
    });

    images.forEach((img) => {
      const review = reviewMap[img.review_id]; // 找對應的評論
      if (review) {
        review.images.push({ id: img.id, url: img.url });
      }
    });

    return {
      success: true,
      message: "評論獲取成功",
      data: Object.values(reviewMap),
    };
  } catch (error) {
    throw new Error("無法獲取評論：" + error.message);
  }
};
export const deleteReviews = async (review_id, user_id) => {
  try {
    const [review] = await pool.query(
      "SELECT * FROM hotel_reviews WHERE id = ? AND user_id = ?",
      [review_id, user_id]
    );
    if (review.length == 0) {
      throw new Error("評論不存在或你不能刪刪除");
    }

    await pool.query(
      "UPDATE hotel_reviews SET is_deleted = 1, updated_at = NOW() WHERE id = ?",
      [review_id]
    );
    return { success: true, message: "評論已成功刪除" };
  } catch (error) {
    throw new Error("刪除評論失敗：" + error.message);
  }
};
