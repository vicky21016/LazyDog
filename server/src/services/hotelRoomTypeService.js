import pool from "../config/mysql.js";

export const getAllHotelRooms = async () => {
  try {
    const [rows] = await pool.execute(`
      SELECT hrt.*, 
             rt.name AS room_type_name, 
             rt.description AS room_type_description,
             COALESCE(hi.url, hrt.image_url) AS image_url
      FROM hotel_room_types hrt
      JOIN room_type rt ON hrt.room_type_id = rt.id
      LEFT JOIN hotel_images hi ON hrt.room_type_id = hi.room_type_id
      WHERE hrt.is_deleted = 0
      GROUP BY hrt.id
    `);
    return rows;
  } catch (error) {
    throw new Error("無法取得旅館房型: " + error.message);
  }
};

export const getHotelRoomByIds = async (hotelId) => {
  try {
    const [rows] = await pool.query(
      `SELECT hrt.*, 
              rt.name AS room_type_name, 
              rt.description AS room_type_description, 
              COALESCE(hi.url, hrt.image_url) AS image_url 
       FROM hotel_room_types hrt
       JOIN room_type rt ON hrt.room_type_id = rt.id
       LEFT JOIN (
          SELECT room_type_id, url 
          FROM hotel_images 
          WHERE image_type = 'room'
          ORDER BY created_at DESC
       ) hi ON hrt.room_type_id = hi.room_type_id
       WHERE hrt.hotel_id = ? AND hrt.is_deleted = 0
       GROUP BY hrt.id`,
      [hotelId]
    );

    return rows;
  } catch (error) {
    console.error(` SQL 查詢錯誤: ${error.message}`);
    throw new Error(
      `找不到 hotel_id=${hotelId} 的房型，錯誤訊息：` + error.message
    );
  }
};

export const createHotelRooms = async (data) => {
  try {
    const {
      hotel_id,
      room_type_id,
      quantity,
      price_per_night,
      description,
      pet_capacity,
      allowed_pet_size,
      default_food_provided,
      image_url, // ← 這裡改成 image_url，而不是 hotel_image_id
    } = data;

    // 檢查 room_type_id 是否有效
    const [roomTypeCheck] = await pool.execute(
      "SELECT id FROM room_type WHERE id = ?",
      [room_type_id]
    );
    if (roomTypeCheck.length === 0) {
      throw new Error(`room_type_id ${room_type_id} 不存在`);
    }

    let finalImageUrl = image_url;

    //  如果前端沒有提供 image_url，則自動選擇最新的房型圖片
    if (!image_url) {
      const [imageCheck] = await pool.execute(
        "SELECT url FROM hotel_images WHERE room_type_id = ? AND image_type = 'room' ORDER BY created_at DESC LIMIT 1",
        [room_type_id]
      );

      if (imageCheck.length > 0) {
        finalImageUrl = imageCheck[0].url;
      } else {
        console.warn(
          ` 找不到 room_type_id=${room_type_id} 的房間圖片，將設置為 NULL`
        );
        finalImageUrl = null;
      }
    }

    // 插入 hotel_room_types
    const [result] = await pool.query(
      `INSERT INTO hotel_room_types 
        (hotel_id, room_type_id, quantity, price_per_night, description, pet_capacity, allowed_pet_size, default_food_provided, image_url, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        hotel_id,
        room_type_id,
        quantity,
        price_per_night,
        description,
        pet_capacity,
        allowed_pet_size,
        default_food_provided,
        finalImageUrl, // 這裡存的是圖片 URL，而不是 ID
      ]
    );

    return { id: result.insertId, ...data, image_url: finalImageUrl };
  } catch (error) {
    throw new Error("無法新增 hotel 房型: " + error.message);
  }
};

export const updateHotelRooms = async (id, data) => {
  try {
    const {
      quantity,
      price_per_night,
      description,
      pet_capacity,
      allowed_pet_size,
      default_food_provided,
      image_url, 
    } = data;

    // 取得原本的房型資訊
    const [existingRoom] = await pool.query(
      "SELECT hotel_id FROM hotel_room_types WHERE id = ? AND is_deleted = 0",
      [id]
    );

    if (existingRoom.length == 0) {
      throw new Error(`找不到 id=${id} 的房型，或該房型已被刪除`);
    }

    let finalImageUrl = image_url;

    // * 如果前端沒有提供 image_url，則不更新
    if (!image_url) {
      finalImageUrl = null;
    }

    // 動態 SQL 更新
    let updateQuery = "UPDATE hotel_room_types SET ";
    const updateParams = [];

    if (quantity !== undefined) {
      updateQuery += "quantity=?, ";
      updateParams.push(quantity);
    }
    if (price_per_night !== undefined) {
      updateQuery += "price_per_night=?, ";
      updateParams.push(price_per_night);
    }
    if (description !== undefined) {
      updateQuery += "description=?, ";
      updateParams.push(description);
    }
    if (pet_capacity !== undefined) {
      updateQuery += "pet_capacity=?, ";
      updateParams.push(pet_capacity);
    }
    if (allowed_pet_size !== undefined) {
      updateQuery += "allowed_pet_size=?, ";
      updateParams.push(allowed_pet_size);
    }
    if (default_food_provided !== undefined) {
      updateQuery += "default_food_provided=?, ";
      updateParams.push(default_food_provided);
    }
    if (image_url !== undefined) {
      updateQuery += "image_url=?, ";
      updateParams.push(finalImageUrl);
    }

    updateQuery += "updated_at=NOW() WHERE id=? AND is_deleted = 0";
    updateParams.push(id);

    const [result] = await pool.query(updateQuery, updateParams);

    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`無法更新旅館房型 (ID: ${id}): ` + error.message);
  }
};

export const deleteHotelRooms = async (id) => {
  try {
    const [result] = await pool.query(
      "UPDATE hotel_room_types SET is_deleted = 1 WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`無法刪除旅館房型 (ID: ${id}): ` + error.message);
  }
};
