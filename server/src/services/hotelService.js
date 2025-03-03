import pool from "../config/mysql.js";
const buildBaseHotelQuery = () => {
  return `
   SELECT h.*, 
       hi.url AS main_image_url,
       IFNULL(r.avg_rating, 0) AS avg_rating,
       IFNULL(r.review_count, 0) AS review_count, 
       IFNULL(rp.min_price, 9999999) AS min_price
FROM hotel h
LEFT JOIN hotel_images hi ON h.main_image_id = hi.id
LEFT JOIN (
    SELECT hotel_id, 
           ROUND(AVG(rating), 1) AS avg_rating,
           COUNT(id) AS review_count
    FROM hotel_reviews
    GROUP BY hotel_id
) r ON h.id = r.hotel_id
LEFT JOIN (
    SELECT hrt.hotel_id, MIN(hrt.price_per_night) AS min_price
    FROM hotel_room_types hrt
    GROUP BY hrt.hotel_id
) rp ON h.id = rp.hotel_id

  `;
};
export const getHotels = async (sortOption) => {
  const connection = await pool.getConnection();
  try {
    const baseQuery = buildBaseHotelQuery();
    const orderByClause =
      sortOption == "review"
        ? "ORDER BY review_count DESC"
        : sortOption == "rating"
        ? "ORDER BY avg_rating DESC"
        : "ORDER BY h.id DESC";

    const query = `${baseQuery} GROUP BY h.id ${orderByClause}`;
    const [hotels] = await connection.query(query);
    return hotels;
  } catch (error) {
    throw new Error("無法取得飯店列表：" + error.message);
  } finally {
    connection.release();
  }
};

export const searchHotels = async (keyword) => {
  try {
    const [hotels] = await pool.execute(
      "SELECT * FROM hotel WHERE (name LIKE ? OR county LIKE ? OR district LIKE ? OR address LIKE ?) AND is_deleted = 0",
      [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );
    return hotels;
  } catch (error) {
    throw new Error("取得相關資料失敗");
  }
};

export const getId = async (id, checkInDate, checkOutDate) => {
  const connection = await pool.getConnection();
  try {
    // ✅ 修正 SQL，確保不會因 `room_inventory` 沒有資料而導致查詢失敗
    const query = `
      SELECT h.*, hi.url AS main_image_url
      FROM hotel h
      LEFT JOIN hotel_images hi ON h.main_image_id = hi.id
      WHERE h.id = ?
    `;

    const [hotels] = await connection.query(query, [id]);

    if (hotels.length === 0) {
      throw new Error(`找不到 id=${id} 的旅館`);
    }

    let hotel = hotels[0];

    // 🔹 如果 `hotel.main_image_id` 為 `null`，則避免 `id != null` 出錯
    let mainImageIdCondition = hotel.main_image_id ? `AND id != ?` : ``;
    let queryParams = hotel.main_image_id ? [id, hotel.main_image_id] : [id];

    // ✅ 查詢 `hotel_images`，確保 `is_deleted = 0`
    const [hotelImages] = await connection.query(
      `SELECT * FROM hotel_images WHERE hotel_id = ? ${mainImageIdCondition} AND is_deleted = 0`,
      queryParams
    );

    hotel.hotel_images = hotelImages || []; // ✅ 確保 `hotel_images` 陣列存在

    return hotel;
  } catch (error) {
    throw new Error(`無法取得 id=${id} 旅館: ` + error.message);
  } finally {
    connection.release();
  }
};


export const getOperatorTZJ = async (req) => {
  try {
    if (!req.user || !req.user.id) {
      throw new Error("找不到 operatorId，請確認你的 token 是否正確");
    }

    const operatorId = Number(req.user.id); // 確保是數字
    if (isNaN(operatorId)) {
      throw new Error(`operatorId 不是數字: ${req.user.id}`);
    }

    const [hotels] = await pool.query(
      "SELECT * FROM hotel WHERE operator_id = ?",
      [operatorId]
    );

    return hotels;
  } catch (err) {
    throw new Error(
      `你的 operatorId: ${req.user?.id || "未知"} 有錯，錯誤訊息: ${
        err.message
      }`
    );
  }
};

export const createHotels = async (hotelData) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      operator_id,
      name,
      link,
      county,
      district,
      address,
      phone,
      room_total,
      introduce,
      latitude,
      longitude,
      map_link,
      check_in_time,
      check_out_time,
      contact_email,
      url,
    } = hotelData;

    const [hotelResult] = await connection.query(
      `INSERT INTO hotel 
        (operator_id, name, link, county, district, address, phone, room_total, introduce, latitude, 
         longitude, map_link, check_in_time, check_out_time, contact_email, created_at, updated_at, is_deleted) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), 0)`,
      [
        operator_id,
        name,
        link,
        county,
        district,
        address,
        phone,
        room_total,
        introduce,
        latitude,
        longitude,
        map_link,
        check_in_time,
        check_out_time,
        contact_email,
      ]
    );

    await connection.commit();
    return { message: "飯店建立成功" };
  } catch (error) {
    await connection.rollback();
    throw new Error("無法創立旅館：" + error.message);
  } finally {
    connection.release();
  }
};
export const uploadHotelImages = async (hotelId, images) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const values = images.map((img) => [
      hotelId,
      img.url,
      img.description || null,
    ]);
    const [result] = await connection.query(
      `INSERT INTO hotel_images (hotel_id, url, description) VALUES ?`,
      [values]
    );

    await connection.commit();
    return { insertedCount: result.affectedRows };
  } catch (error) {
    await connection.rollback();
    throw new Error("圖片上傳失敗：" + error.message);
  } finally {
    connection.release();
  }
};
export const deleteHotelImages = async (imageIds) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      `UPDATE hotel_images SET is_deleted = 1, updated_at = NOW() WHERE id IN (?)`,
      [imageIds]
    );

    await connection.commit();
    return { deletedCount: result.affectedRows };
  } catch (error) {
    await connection.rollback();
    throw new Error("圖片刪除失敗：" + error.message);
  } finally {
    connection.release();
  }
};
export const updateHotelById = async (updateData) => {
  const { id, ...updateFields } = updateData;

  if (!id) {
    return { error: "缺少 id，無法更新旅館" };
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    if (Object.keys(updateFields).length > 0) {
      const keys = Object.keys(updateFields);
      const values = Object.values(updateFields);
      const set = keys.map((key) => `${key} = ?`).join(", ");

      console.log("🔍 更新 SQL:", `UPDATE hotel SET ${set} WHERE id = ${id}`);
      console.log("🔍 更新值:", values);

      const [result] = await connection.query(
        `UPDATE hotel SET ${set}, updated_at = NOW() WHERE id = ?`,
        [...values, id]
      );

      console.log("🔍 SQL 更新結果:", result);

      if (result.affectedRows === 0) {
        throw new Error("資料沒有變更或旅館 ID 不存在");
      }
    }

    await connection.commit();
    return { message: "旅館更新成功" };
  } catch (error) {
    await connection.rollback();
    return { error: "更新失敗：" + error.message };
  } finally {
    connection.release();
  }
};

export const updateMainImages = async (hotelId, imageId) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 檢查圖片是否屬於該旅館
    const [imageExists] = await connection.query(
      "SELECT id FROM hotel_images WHERE id = ? AND hotel_id = ? AND is_deleted = 0",
      [imageId, hotelId]
    );

    if (imageExists.length == 0) {
      throw new Error("找不到該圖片，或圖片已刪除");
    }

    // 更新主圖片
    await connection.query(
      "UPDATE hotel SET main_image_id = ?, updated_at = NOW() WHERE id = ?",
      [imageId, hotelId]
    );

    await connection.commit();
    return { message: "主圖片更新成功" };
  } catch (error) {
    await connection.rollback();
    throw new Error("更新主圖片失敗：" + error.message);
  } finally {
    connection.release();
  }
};

//  將圖片插入 `hotel_images` 資料表
export const insertHotelImage = async (hotelId, imageUrl) => {
  const baseUrl = "http://localhost:5000";
  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `${baseUrl}${imageUrl}`;

  const [result] = await pool.query(
    "INSERT INTO hotel_images (hotel_id, url) VALUES (?, ?)",
    [hotelId, fullImageUrl]
  );
  return result.insertId;
};

// 刪除 `hotel_images` 中的圖片
export const deleteImageById = async (imageId) => {
  const [result] = await pool.query("DELETE FROM hotel_images WHERE id = ?", [
    imageId,
  ]);
  return result.affectedRows > 0; // 回傳是否刪除成功
};

export const deleteHotelImagesByIds = async (imageIds, isSoftDelete = true) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    if (!imageIds || imageIds.length === 0) {
      throw new Error("沒有提供圖片 ID");
    }

    const queryIds = Array.isArray(imageIds) ? imageIds : [imageIds];

    // 先檢查這些圖片是否存在
    const [existingImages] = await connection.query(
      `SELECT id FROM hotel_images WHERE id IN (${queryIds
        .map(() => "?")
        .join(", ")})`,
      queryIds
    );

    if (existingImages.length === 0) {
      throw new Error("找不到要刪除的圖片");
    }

    if (isSoftDelete) {
      await connection.query(
        `UPDATE hotel_images SET is_deleted = 1, updated_at = NOW() WHERE id IN (${queryIds
          .map(() => "?")
          .join(", ")})`,
        queryIds
      );
    } else {
      await connection.query(
        `DELETE FROM hotel_images WHERE id IN (${queryIds
          .map(() => "?")
          .join(", ")})`,
        queryIds
      );
    }

    await connection.commit();
    return { message: isSoftDelete ? "圖片已軟刪除" : "圖片已永久刪除" };
  } catch (error) {
    await connection.rollback();
    return { error: "刪除圖片失敗：" + error.message };
  } finally {
    connection.release();
  }
};

export const insertHotelImages = async (images) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    if (!images || images.length == 0) {
      throw new Error("沒有提供圖片");
    }

    // 先檢查 hotel 是否存在
    const hotelId = images[0].hotel_id;
    const [hotelCheck] = await connection.query(
      "SELECT id FROM hotel WHERE id = ?",
      [hotelId]
    );

    if (hotelCheck.length == 0) {
      throw new Error("找不到對應的旅館");
    }

    // 插入圖片
    const values = images.map((img) => [
      img.hotel_id,
      img.url,
      img.description || null,
      img.image_type || "room",
      0, // is_deleted = 0
      new Date(),
    ]);

    const [result] = await connection.query(
      `INSERT INTO hotel_images (hotel_id, url, description, image_type, is_deleted, created_at) VALUES ?`,
      [values]
    );

    // 如果有 main圖片，更新 hotel.main_image_id
    const mainImage = images.find((img) => img.image_type == "main");
    if (mainImage) {
      const [mainImageData] = await connection.query(
        "SELECT id FROM hotel_images WHERE hotel_id = ? AND image_type = 'main' ORDER BY created_at DESC LIMIT 1",
        [hotelId]
      );

      if (mainImageData.length > 0) {
        const mainImageId = mainImageData[0].id;
        await connection.query(
          "UPDATE hotel SET main_image_id = ? WHERE id = ?",
          [mainImageId, hotelId]
        );
      }
    }

    await connection.commit();
    return { message: "圖片新增成功", insertedCount: result.affectedRows };
  } catch (error) {
    await connection.rollback();
    console.error("新增圖片失敗:", error);
    return { error: "新增圖片失敗：" + error.message };
  } finally {
    connection.release();
  }
};

export const softDeleteHotelById = async (hotelId, operatorId) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    if (!hotelId || isNaN(hotelId) || !operatorId || isNaN(operatorId)) {
      throw new Error("無效的旅館 ID 或負責人 ID");
    }

    // 查詢該負責人的 Hotel 是否存在
    const [LiveHotel] = await connection.query(
      "SELECT * FROM hotel WHERE id = ? AND operator_id = ? AND is_deleted = 0",
      [hotelId, operatorId]
    );

    if (LiveHotel.length == 0) {
      await connection.rollback();
      return {
        error: `刪除失敗，旅館 ID=${hotelId} 不屬於負責人 ID=${operatorId} 或已刪除`,
      };
    }

    //  軟刪除旅館
    const [hotelResult] = await connection.query(
      "UPDATE hotel SET is_deleted = 1, updated_at = NOW() WHERE id = ? AND operator_id = ?",
      [hotelId, operatorId]
    );

    // 軟刪除旅館圖片
    const [imageResult] = await connection.query(
      "UPDATE hotel_images SET is_deleted = 1, updated_at = NOW() WHERE hotel_id = ?",
      [hotelId]
    );

    if (hotelResult.affectedRows === 0) {
      await connection.rollback();
      return { error: `軟刪除失敗，旅館 ID=${hotelId} 沒有變更` };
    }

    await connection.commit();
    return { message: ` 旅館 ID=${hotelId} 已成功軟刪除` };
  } catch (error) {
    await connection.rollback();
    return { error: " 無法刪除旅館：" + error.message };
  } finally {
    connection.release();
  }
};

/**  從資料庫獲取篩選後 */
export const getFilteredHotels = async (filters) => {
  const connection = await pool.getConnection();
  try {
    let query = `
      SELECT DISTINCT h.*, 
       hi.url AS main_image_url,
       COALESCE(r.avg_rating, 0) AS avg_rating, 
       COALESCE(r.review_count, 0) AS review_count, 
       COALESCE(inv.min_price, 9999999) AS min_price
      FROM hotel h
      LEFT JOIN hotel_images hi ON h.main_image_id = hi.id
      LEFT JOIN (
          SELECT hotel_id, 
                 ROUND(AVG(rating), 1) AS avg_rating, 
                 COUNT(id) AS review_count
          FROM hotel_reviews
          GROUP BY hotel_id
      ) r ON h.id = r.hotel_id
      LEFT JOIN (
    SELECT hrt.hotel_id, COALESCE(MIN(hrt.price_per_night), 9999999) AS min_price
    FROM hotel_room_types hrt
    GROUP BY hrt.hotel_id
) inv ON h.id = inv.hotel_id
WHERE h.is_deleted = 0 `;
    let queryParams = [];

    // 價格篩選
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      query += ` AND (inv.min_price IS NULL OR inv.min_price BETWEEN ? AND ?)`;
      queryParams.push(Number(filters.minPrice), Number(filters.maxPrice));
    }

    // 評分篩選
    if (filters.rating !== null && filters.rating !== undefined) {
      query += ` AND (r.avg_rating IS NULL OR r.avg_rating >= ?)`;
      queryParams.push(Number(filters.rating));
    }

    // 房型篩選
    if (filters.roomType) {
      query += ` AND EXISTS (
        SELECT 1 FROM hotel_room_types hrt
        WHERE hrt.hotel_id = h.id 
        AND hrt.room_type_id = ?
      )`;
      queryParams.push(Number(filters.roomType));
    }

    // 標籤篩選
    if (filters.tags && filters.tags.length > 0) {
      query += ` AND (
        SELECT COUNT(*) FROM hotel_tags ht
        WHERE ht.hotel_id = h.id 
        AND ht.tag_id IN (${filters.tags.map(() => "?").join(", ")})
      ) = ?`;
      queryParams.push(...filters.tags, filters.tags.length);
    }

    // 地區篩選
    if (filters.city) {
      query += ` AND h.county = ?`;
      queryParams.push(filters.city);
    }
    if (filters.district) {
      query += ` AND h.district = ?`;
      queryParams.push(filters.district);
    }

    // 訂房日期篩選
    if (filters.checkInDate && filters.checkOutDate) {
      query += ` AND EXISTS (
        SELECT 1 FROM room_inventory ri
        WHERE ri.hotel_id = h.id 
        AND ri.date BETWEEN ? AND ?
        AND ri.available_quantity > 0
      )`;
      queryParams.push(filters.checkInDate, filters.checkOutDate);
    }

    query += ` GROUP BY h.id`;
    const [hotels] = await connection.query(query, queryParams);
    return hotels;
  } catch (error) {
    throw new Error("無法取得篩選飯店：" + error.message);
  } finally {
    connection.release();
  }
};
