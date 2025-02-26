import pool from "../config/mysql.js";

export const getAllHotelRooms = async () => {
  try {
    const [rows] = await pool.execute(`
          SELECT hrt.*, rt.name AS room_type_name, rt.description AS room_type_description
          FROM hotel_room_types hrt
          JOIN room_type rt ON hrt.room_type_id = rt.id
          WHERE hrt.is_deleted = 0
        `);
    return rows;
  } catch (error) {
    throw new Error("無法取得旅館房型: " + error.message);
  }
};
export const getHotelRoomByIds = async (hotelId) => {
  try {
    const [rows] = await pool.query(
      `SELECT hrt.*, rt.name AS room_type_name, rt.description AS room_type_description
       FROM hotel_room_types hrt
       JOIN room_type rt ON hrt.room_type_id = rt.id
       WHERE hrt.hotel_id = ? AND hrt.is_deleted = 0`,
      [hotelId]
    );
    return rows; // 返回所有符合 hotelId 的房型
  } catch (error) {
    throw new Error(`找不到 hotel_id=${hotelId} 的房型，錯誤訊息：` + error.message);
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

    const [roomTypeCheck] = await pool.execute(
      "SELECT id FROM room_type WHERE id = ?",
      [room_type_id]
    );

    if (roomTypeCheck.length == 0) {
      throw new Error(`room_type_id ${room_type_id} 不存在`);
    }
    const [result] = await pool.query(
        `INSERT INTO hotel_room_types 
        (hotel_id, room_type_id, quantity, price_per_night, description, pet_capacity, allowed_pet_size, default_food_provided, image_url, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [hotel_id, room_type_id, quantity, price_per_night, description, pet_capacity, allowed_pet_size, default_food_provided, image_url]
      );
    return { id: result.insertId, ...data };
  } catch (error) {
    throw new Error("無法新增hotel房型:" + error.message);
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

    const [result] = await pool.query(
      "UPDATE hotel_room_types SET quantity=?, price_per_night=?, description=?, pet_capacity=?, allowed_pet_size=?, default_food_provided=?, image_url=?, updated_at=NOW() WHERE id=? AND is_deleted = 0",
      [
        quantity,
        price_per_night,
        description,
        pet_capacity,
        allowed_pet_size,
        default_food_provided,
        image_url,
        id,
      ]
    );
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
