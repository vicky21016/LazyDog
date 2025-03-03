import pool from "../config/mysql.js";
const handleDatabaseError = (error, customMessage) => {
  console.error(`資料庫錯誤: ${error.message}`);
  throw new Error(`${customMessage}: ${error.message}`);
};
export const getAllHotelRooms = async () => {
  try {
    const [rows] = await pool.execute(
      `SELECT hrt.*, 
              rt.name AS room_type_name, 
              rt.description AS room_type_description, 
              COALESCE(MAX(hi.url), hrt.image_url) AS image_url 
       FROM hotel_room_types hrt
       JOIN room_type rt ON hrt.room_type_id = rt.id
       LEFT JOIN hotel_images hi ON hrt.room_type_id = hi.room_type_id
       WHERE hrt.is_deleted = 0
       GROUP BY hrt.id`
    );
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
              hrt.image_url AS image_url 
       FROM hotel_room_types hrt
       JOIN room_type rt ON hrt.room_type_id = rt.id
       WHERE hrt.hotel_id = ? AND hrt.is_deleted = 0`,
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
              COALESCE(
                (SELECT hi.url 
                 FROM hotel_images hi 
                 WHERE hi.room_type_id = hrt.room_type_id AND hi.image_type = 'room' 
                 ORDER BY hi.created_at DESC 
                 LIMIT 1), 
                hrt.image_url
              ) AS image_url 
       FROM hotel_room_types hrt
       JOIN room_type rt ON hrt.room_type_id = rt.id
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

    if (!hotel_id || !room_type_id || !quantity || !price_per_night || !image_url) {
      throw new Error("缺少必填欄位");
    }

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
        image_url, // 確保 image_url 是正確的路徑
      ]
    );

    return { id: result.insertId, ...data };
  } catch (error) {
    console.error("創建酒店房間時發生錯誤：", error);
    throw new Error("無法創建酒店房間：" + error.message);
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
    const [rows] = await pool.query(
      "SELECT hotel_id, is_deleted FROM hotel_room_types WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      throw new Error(`找不到 id=${id} 的房型`);
    }

    const existingRoom = rows[0];

    if (existingRoom.is_deleted == 1) {
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
      updateParams.push(image_url ? image_url : null);
    }

    if (updateParams.length == 0) {
      throw new Error("沒有可更新的欄位");
    }

    // 移除最後的逗號和空格
    updateQuery = updateQuery.slice(0, -2);

    updateQuery += " WHERE id=? AND is_deleted = 0";
    updateParams.push(id);

    const [result] = await pool.query(updateQuery, updateParams);

    if (result.affectedRows == 0) {
      throw new Error(`更新失敗，可能是傳入的數據與現有數據相同`);
    }

    return true;
  } catch (error) {
    throw new Error(`無法更新旅館房型 (ID: ${id}): ` + error.message);
  }
};

export const deleteHotelRooms = async (id) => {
  const connection = await pool.getConnection(); // 取得資料庫連接
  try {
    await connection.beginTransaction(); // 開始事務

    const [existingRoom] = await connection.query(
      "SELECT id FROM hotel_room_types WHERE id = ?",
      [id]
    );
    if (existingRoom.length == 0) {
      throw new Error(`找不到 ID=${id} 的房型`);
    }

    const [relatedInventory] = await connection.query(
      "SELECT * FROM room_inventory WHERE room_type_id = ?",
      [id]
    );
    if (relatedInventory.length > 0) {
      await connection.query(
        "DELETE FROM room_inventory WHERE room_type_id = ?",
        [id]
      );
    }

    const [result] = await connection.query(
      "DELETE FROM hotel_room_types WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error(`刪除失敗，找不到房型 ID=${id}`);
    }

    await connection.commit(); // 提交事務
    return { message: `成功刪除房型 ID=${id}` };
  } catch (error) {
    await connection.rollback(); // 回滾事務
    throw new Error(`無法刪除旅館房型 (ID: ${id}): ` + error.message);
  } finally {
    connection.release(); // 釋放連接
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
