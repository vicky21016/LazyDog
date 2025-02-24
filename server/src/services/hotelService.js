import pool from "../config/mysql.js";

export const getHotels = async () => {
  const connection = await pool.getConnection();
  try {
    let query = `
      SELECT h.*, 
             hi.url AS main_image_url,
             IFNULL(r.avg_rating, 0) AS avg_rating,
             IFNULL(rbp.min_price, 0) AS min_price
      FROM hotel h
      LEFT JOIN hotel_images hi ON h.main_image_id = hi.id
      LEFT JOIN (
          SELECT hotel_id, ROUND(AVG(rating), 1) AS avg_rating
          FROM hotel_reviews
          GROUP BY hotel_id
      ) r ON h.id = r.hotel_id
      LEFT JOIN (
          SELECT hotel_id, MIN(base_price) AS min_price
          FROM room_base_price 
          WHERE is_deleted = 0
          GROUP BY hotel_id
      ) rbp ON h.id = rbp.hotel_id
      WHERE h.is_deleted = 0 
      GROUP BY h.id
    `;

    console.log(" 執行 SQL 查詢:", query);

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

export const getId = async (id) => {
  try {
    const [hotels] = await pool.query(
      `SELECT h.*, hi.url AS main_image_url
       FROM hotel h
       LEFT JOIN hotel_images hi ON h.main_image_id = hi.id
       WHERE h.id = ? AND h.is_deleted = 0`,
      [id]
    );

    if (hotels.length == 0) {
      throw new Error(`找不到 id=${id} 的旅館`);
    }

    return hotels[0];
  } catch (error) {
    throw new Error(`無法取得 id=${id} 旅館: ` + error.message);
  }
};
export const getOperatorTZJ = async (operatorId) => {
  try {
    const [hotels] = await pool.query(
      "SELECT * FROM hotel WHERE operator_id = ?",
      [operatorId]
    );
    return hotels;
  } catch (err) {
    throw new Error(`你的operatorId:${operatorId}有錯`);
  }
};

export const createHotels = async (hotelData) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
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

    console.log("收到的圖片:", url);

    const [hotelResult] = await connection.query(
      `INSERT INTO hotel 
        (name, link, county, district, address, phone, room_total, introduce, latitude, 
         longitude, map_link, check_in_time, check_out_time, contact_email, created_at, updated_at, is_deleted) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), 0)`,
      [
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

    const hotel_id = hotelResult.insertId;
    let mainImageId = null;

    // image_url
    let imageList = Array.isArray(url)
      ? url
      : typeof url === "string"
      ? [url]
      : [];
    console.log("圖片要存入:", imageList);
    //預設是上船的第一張圖片為main_image
    if (imageList.length > 0) {
      for (let i = 0; i < imageList.length; i++) {
        const [imageResult] = await connection.query(
          "INSERT INTO hotel_images (hotel_id, url) VALUES (?, ?)",
          [hotel_id, imageList[i]]
        );
        if (i == 0) {
          mainImageId = imageResult.insertId;
        }
      }
    }

    console.log("設定主要圖片 ID:", mainImageId);

    //更新 main_image_id
    if (mainImageId) {
      await connection.query(
        "UPDATE hotel SET main_image_id = ? WHERE id = ?",
        [mainImageId, hotel_id]
      );
    }

    await connection.commit();
    return {
      id: hotel_id,
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
      url: imageList,
    };
  } catch (error) {
    await connection.rollback();
    throw new Error("無法創立旅館：" + error.message);
  } finally {
    connection.release();
  }
};

export const updateHotelById = async (updateData) => {
  try {
    // 解構賦值排除不應該更新的欄位(目前寫在{}裡的欄位) ...updateFields展開 運算值是剩下欄位
    //updateFields變成一個新的物件來存放剩餘可更新欄位

    const {
      id,
      created_at,
      average_rating,
      total_reviews,
      main_image_id,
      deleteImageIds = [],
      newImages = [],
      ...updateFields
    } = updateData;

    if (!id) {
      return { error: "缺少 id，無法更新旅館" };
    }

    // 如果 updateFields 是空的，不更新
    if (
      Object.keys(updateFields).length == 0 &&
      deleteImageIds.length == 0 &&
      newImages.length == 0 &&
      !main_image_id
    ) {
      return { error: "沒有提供更新欄位或新增刪除圖片" };
    }

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      //  動態生成 SQL **需要再研究 **
      if (Object.keys(updateFields).length > 0) {
        const keys = Object.keys(updateFields);
        const values = Object.values(updateFields);
        const set = keys.map((key) => `${key} = ?`).join(", ");
        values.push(id);

        const [result] = await pool.query(
          `UPDATE hotel SET ${set}, updated_at = NOW() WHERE id = ?`,
          values
        );
        if (result.affectedRows == 0) {
          return { error: "更新失敗，找不到該旅館" };
        }
      }
      if (deleteImageIds.length > 0) {
        await pool.query(
          `UPDATE hotel_images SET is_deleted = 1, updated_at = NOW() WHERE id IN (${deleteImageIds
            .map(() => "?")
            .join(", ")})`,
          deleteImageIds
        );
      }

      if (newImages.length > 0) {
        const newImageValues = newImages.map(() => "(?, ?, ?)").join(", ");
        const newImageData = newImages.flatMap((img) => [
          id,
          img.url,
          img.description || null,
        ]);
        console.log("即將存入的圖片:", newImageData);

        await connection.query(
          `INSERT INTO hotel_images (hotel_id, url, description) VALUES ${newImageValues}`,
          newImageData
        );
      }
      //這邊是換main_image_id
      if (main_image_id) {
        const [imageExists] = await connection.query(
          "SELECT id FROM hotel_images WHERE id = ? AND hotel_id = ? AND is_deleted = 0",
          [main_image_id, id]
        );

        if (imageExists.length == 0) {
          throw new Error("選擇的 main_image_id 無效，請選擇該飯店的有效圖片");
        }

        await connection.query(
          "UPDATE hotel SET main_image_id = ?, updated_at = NOW() WHERE id = ?",
          [main_image_id, id]
        );
      }
      await connection.commit();
      return {
        message: `旅館 id=${id} 更新成功,${deleteImageIds.length} 張圖片已刪除，${newImages.length} 張圖片已新增`,
      };
    } catch (error) {
      await connection.rollback();
      return { error: "更新失敗：" + error.message };
    } finally {
      connection.release();
    }
  } catch (error) {
    return { error: "無法更新旅館：" + error.message };
  }
};

export const softDeleteHotelById = async (id) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [LiveHotel] = await connection.query(
      "SELECT * FROM hotel WHERE id = ? AND is_deleted = 0",
      [id]
    );

    if (LiveHotel.length == 0) {
      await connection.rollback();
      return { error: `刪除失敗，找不到 id=${id} 或該旅館已刪除` };
    }

    // 軟刪除旅館
    const [result] = await connection.query(
      "UPDATE hotel SET is_deleted = 1, updated_at = NOW() WHERE id = ?",
      [id]
    );

    const imageResult = await pool.query(
      "UPDATE hotel_images SET is_deleted = 1,updated_at = NOW()  WHERE hotel_id =?",
      [id]
    );

    if (result.affectedRows == 0 && imageResult.affectedRows == 0) {
      await connection.rollback();
      return { error: `軟刪除失敗，找不到 id=${id}` };
    }

    await connection.commit();
    return { message: `旅館 id=${id} 已成功軟刪除` };
  } catch (error) {
    await connection.rollback();
    return { error: "無法刪除旅館：" + error.message };
  } finally {
    connection.release();
  }
};
/**  從資料庫獲取篩選後的飯店 */
export const getFilteredHotelS = async (filters) => {
  const connection = await pool.getConnection();
  try {
    let query = `
      SELECT h.*, 
             hi.url AS main_image_url,
             IFNULL(r.avg_rating, 0) AS avg_rating, 
             IFNULL(rbp.min_price, 0) AS min_price
      FROM hotel h
      LEFT JOIN hotel_images hi ON h.main_image_id = hi.id
      LEFT JOIN (
          SELECT hotel_id, ROUND(AVG(rating), 1) AS avg_rating
          FROM hotel_reviews
          GROUP BY hotel_id
      ) r ON h.id = r.hotel_id
      LEFT JOIN (
          SELECT hotel_id, MIN(base_price) AS min_price
          FROM room_base_price
          WHERE is_deleted = 0
          GROUP BY hotel_id
      ) rbp ON h.id = rbp.hotel_id
      WHERE h.is_deleted = 0
    `;

    let queryParams = [];

    // 🔹 動態新增篩選條件
    if (filters.min_price !== null) {
      query += ` AND IFNULL(rbp.min_price, 0) >= ?`;
      queryParams.push(filters.min_price);
    }
    if (filters.max_price !== null) {
      query += ` AND IFNULL(rbp.min_price, 0) <= ?`;
      queryParams.push(filters.max_price);
    }
    if (filters.min_rating !== null) {
      query += ` AND IFNULL(r.avg_rating, 0) >= ?`;
      queryParams.push(filters.min_rating);
    }
    if (filters.room_type_id !== null) {
      query += ` AND EXISTS (
        SELECT 1 FROM room_base_price WHERE room_type_id = ? AND hotel_id = h.id
      )`;
      queryParams.push(filters.room_type_id);
    }
    if (filters.tags && filters.tags.length > 0) {
      query += ` AND h.id IN (
        SELECT hotel_id FROM hotel_tags WHERE tag_id IN (${filters.tags.map(() => "?").join(", ")})
      )`;
      queryParams.push(...filters.tags);
    }

    query += " GROUP BY h.id";




    const [hotels] = await connection.query(query, queryParams);
    return hotels;
  } catch (error) {
    throw new Error("無法取得篩選飯店：" + error.message);
  } finally {
    connection.release();
  }
};
