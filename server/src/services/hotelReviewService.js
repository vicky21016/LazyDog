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
    console.log("收到的 review_id:", review_id);
    console.log("收到的 operator_id:", operator_id);
    console.log("收到的 reply:", reply);

    // 1️⃣ **查詢評論，取得 `hotel_id`**
    const [reviews] = await pool.query(
      "SELECT hotel_id FROM hotel_reviews WHERE id = ?",
      [review_id]
    );

    if (!reviews || reviews.length === 0) {
      throw new Error(`找不到評論 ID=${review_id}`);
    }

    const hotel_id = reviews[0].hotel_id;

    // 2️⃣ **確保 `operator_id` 有權限管理該 `hotel_id`**
    const [hotel] = await pool.query(
      "SELECT id FROM hotel WHERE id = ? AND operator_id = ?",
      [hotel_id, operator_id]
    );

    if (!hotel || hotel.length === 0) {
      throw new Error(`你無權回覆這則評論，飯店 ID=${hotel_id} 不屬於你的帳號`);
    }

    // 3️⃣ **更新評論的 `reply`**
    await pool.query(
      "UPDATE hotel_reviews SET reply = ?, updated_at = NOW() WHERE id = ?",
      [reply, review_id]
    );

    console.log(`成功更新 review_id=${review_id}，reply=${reply}`);

    return {
      success: true,
      message: "評論回覆成功",
      data: { review_id, reply },
    };
  } catch (error) {
    console.error("評論回覆失敗:", error);
    throw new Error("無法回覆評論：" + error.message);
  }
};


export const getHotelReviews = async (hotel_id, operator_id) => {
  try {
    // 1️⃣ **先檢查 `hotel_id` 是否屬於 `operator_id`**
    const [hotel] = await pool.query(
      "SELECT id FROM hotel WHERE id = ? AND operator_id = ?",
      [hotel_id, operator_id]
    );

    if (!hotel || hotel.length === 0) {
      throw new Error(`你無權查看這家飯店的評論，飯店 ID=${hotel_id} 不屬於你的帳號`);
    }

    // 2️⃣ **獲取評論（不包含已刪除的評論）**
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

    // 3️⃣ **獲取評論的圖片**
    const reviewIds = reviews.map((r) => r.id);
    const [images] = await pool.query(
      `SELECT id, review_id, url 
       FROM hotel_review_images 
       WHERE review_id IN (?) AND is_deleted = 0`,
      [reviewIds]
    );

    // 4️⃣ **合併評論與圖片**
    const reviewMap = {};
    reviews.forEach((review) => {
      reviewMap[review.id] = {
        ...review,
        images: [],
      };
    });

    images.forEach((img) => {
      const review = reviewMap[img.review_id];
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

export const deleteReviews = async (review_id, user_id, operator_id) => {
  try {
    // 1️⃣ **先查詢該評論的 `hotel_id`、`user_id`**
    const [review] = await pool.query(
      "SELECT hotel_id, user_id FROM hotel_reviews WHERE id = ?",
      [review_id]
    );

    if (!review || review.length === 0) {
      throw new Error(`找不到評論 ID=${review_id}`);
    }

    const { hotel_id, user_id: reviewOwnerId } = review[0];

    // 2️⃣ **如果是用戶自己，允許刪除**
    if (user_id && reviewOwnerId === user_id) {
      await pool.query(
        "UPDATE hotel_reviews SET is_deleted = 1, updated_at = NOW() WHERE id = ?",
        [review_id]
      );
      return { success: true, message: "評論已成功刪除" };
    }

    // 3️⃣ **如果是業者 (`operator_id`)，要確認 `hotel_id` 是否屬於該 `operator_id`**
    if (operator_id) {
      const [hotel] = await pool.query(
        "SELECT id FROM hotel WHERE id = ? AND operator_id = ?",
        [hotel_id, operator_id]
      );

      if (!hotel || hotel.length === 0) {
        throw new Error(`你無權刪除這則評論，飯店 ID=${hotel_id} 不屬於你的帳號`);
      }

      // 4️⃣ **執行軟刪除**
      await pool.query(
        "UPDATE hotel_reviews SET is_deleted = 1, updated_at = NOW() WHERE id = ?",
        [review_id]
      );
      return { success: true, message: "評論已成功刪除" };
    }

    // 5️⃣ **若不是 `user_id` 或 `operator_id`，拒絕請求**
    throw new Error("你沒有權限刪除此評論");
  } catch (error) {
    throw new Error("刪除評論失敗：" + error.message);
  }
};

