import pool from "../config/mysql.js";

export const getHotels = async () => {
  try {
    const [hotels] = await pool.query(
      "SELECT * FROM hotel WHERE is_deleted = 0"
    );
    return hotels;
  } catch (error) {
    throw new Error(" 無法取得旅館list：" + error.message);
  }
};

export const getId = async (id) => {
  try {
    const [hotels] = await pool.query(
      "SELECT * FROM hotel WHERE id = ? AND is_deleted = 0",
      [id]
    );

    if (hotels.length === 0) {
      throw new Error(`找不到 id=${id} 的旅館`);
    }

    return hotels[0];
  } catch (error) {
    throw new Error(`無法取得 id=${id} 旅館: ` + error.message);
  }
};

export const createHotels = async (hotelData) => {
  try {
      const {
          name, county, district, address, phone
      } = hotelData;

      const [result] = await pool.query(
          `INSERT INTO hotel 
          (name, county, district, address, phone, 
          created_at, updated_at, is_deleted) 
          VALUES (?, ?, ?, ?, ?, NOW(), NOW(), 0)`, 
          [name, county, district, address, phone]
      );

      return { id: result.insertId, name, address, phone };
  } catch (err) {
      throw new Error("無法創立旅館：" + err.message);
  }
};
