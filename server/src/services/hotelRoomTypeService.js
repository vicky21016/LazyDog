import pool from "../config/mysql.js";
const handleDatabaseError = (error, customMessage) => {
  console.error(`資料庫錯誤: ${error.message}`);
  throw new Error(`${customMessage}: ${error.message}`);
};
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
    handleDatabaseError(error, "無法取得旅館房型");
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
       LEFT JOIN hotel_images hi ON hrt.room_type_id = hi.room_type_id AND hi.image_type = 'room'
       WHERE hrt.hotel_id = ? AND hrt.is_deleted = 0
       GROUP BY hrt.id`,
      [hotelId]
    );

    return rows;
  } catch (error) {
    console.error(`SQL 查詢錯誤: ${error.message}`);
    throw new Error(
      `找不到 hotel_id=${hotelId} 的房型，錯誤訊息：` + error.message
    );
  }
};
export const getHotelRoomByOperatorId = async (operatorId) => {
  try {
    // 先找到 operatorId 負責的 hotelId
    const [hotelRows] = await pool.query(
      `SELECT id FROM hotel WHERE operator_id = ? LIMIT 1`,
      [operatorId]
    );

    if (hotelRows.length == 0) {
      console.warn(` 找不到 operator_id=${operatorId} 負責的旅館`);
      return [];
    }

    const hotelId = hotelRows[0].id;

    // 再用 hotelId 查詢房型
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
    console.error(`SQL 查詢錯誤: ${error.message}`);
    throw new Error(
      `找不到 operator_id=${operatorId} 的房型，錯誤訊息：` + error.message
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
      image_url,
    } = data;

    // 確保 `room_type_id` 存在
    const [roomTypeCheck] = await pool.execute(
      "SELECT id FROM room_type WHERE id = ?",
      [room_type_id]
    );
    if (roomTypeCheck.length == 0) {
      throw new Error(`room_type_id ${room_type_id} 不存在`);
    }

    let finalImageUrl = image_url;

    if (!image_url) {
      // 改從 `room_type` 找預設圖片
      const [imageCheck] = await pool.execute(
        "SELECT default_image_url FROM room_type WHERE id = ?",
        [room_type_id]
      );
      if (imageCheck.length > 0) {
        finalImageUrl = imageCheck[0].default_image_url;
      } else {
        finalImageUrl = `http://localhost:5000/uploads/hotel/1-l-room.webp`;
      }
    }

    // 確保圖片為完整網址
    finalImageUrl = finalImageUrl
    ? `http://localhost:5000${finalImageUrl}`
    : `http://localhost:5000/uploads/hotel/1-l-room.webp`;
  
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
        finalImageUrl,
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
      "SELECT hotel_id, is_deleted FROM hotel_room_types WHERE id = ?",
      [id]
    );

    if (existingRoom.length === 0) {
      throw new Error(`找不到 id=${id} 的房型`);
    }
    if (existingRoom[0].is_deleted === 1) {
      throw new Error(`id=${id} 的房型已被刪除，無法更新`);
    }

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
      updateParams.push(image_url !== "" ? image_url : null);
    }

    if (updateParams.length === 0) {
      throw new Error("沒有可更新的欄位");
    }

    updateQuery += "updated_at=NOW() WHERE id=? AND is_deleted = 0";
    updateParams.push(id);

    console.log("更新 SQL:", updateQuery);
    console.log("參數:", updateParams);

    const [result] = await pool.query(updateQuery, updateParams);

    if (result.affectedRows === 0) {
      throw new Error(`更新失敗，可能是傳入的數據與現有數據相同`);
    }

    return true;
  } catch (error) {
    throw new Error(`無法更新旅館房型 (ID: ${id}): ` + error.message);
  }
};


export const deleteHotelRooms = async (id) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1️⃣ 先檢查是否有關聯的 `room_inventory` 資料
    const [relatedInventory] = await connection.query(
      "SELECT * FROM room_inventory WHERE room_type_id = ?",
      [id]
    );

    if (relatedInventory.length > 0) {
      // 先刪除 `room_inventory` 相關記錄，避免外鍵 (FOREIGN KEY) 限制
      await connection.query("DELETE FROM room_inventory WHERE room_type_id = ?", [id]);
    }

    // 2️⃣ 刪除 `hotel_images` 內關聯此 `room_type_id` 的圖片（如果有的話）
    await connection.query("DELETE FROM hotel_images WHERE room_type_id = ?", [id]);

    // 3️⃣ 最後刪除 `hotel_room_types` 內的房型
    const [result] = await connection.query("DELETE FROM hotel_room_types WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new Error(`刪除失敗，找不到房型 ID=${id}`);
    }

    await connection.commit();
    return { message: `成功刪除房型 ID=${id}` };
  } catch (error) {
    await connection.rollback();
    throw new Error(`無法刪除旅館房型 (ID: ${id}): ` + error.message);
  } finally {
    connection.release();
  }
};

export const getAllRoomTypes = async () => {
  try {
    const [rows] = await pool.execute(`
      SELECT id, name, description FROM room_type
    `);
    return rows;
  } catch (error) {
    throw new Error("無法取得房型種類: " + error.message);
  }
};
