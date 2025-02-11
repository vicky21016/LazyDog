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

export const updateHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, county, district, address, phone } = req.body;

    const [result] = await pool.query(
      `UPDATE hotel 
       SET name = ?, county = ?, district = ?, address = ?, phone = ?, updated_at = NOW() 
       WHERE id = ? AND is_deleted = 0`,
      [name, county, district, address, phone, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "更新失敗，找不到該旅館" });
    }

    res.json({ message: "旅館更新成功", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const softDeleteHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      `UPDATE hotel SET is_deleted = 1, updated_at = NOW() WHERE id = ? AND is_deleted = 0`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "刪除失敗，找不到該旅館" });
    }

    res.json({ message: "旅館已軟刪除", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const restoreHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      `UPDATE hotel SET is_deleted = 0, updated_at = NOW() WHERE id = ? AND is_deleted = 1`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "恢復失敗，找不到該旅館" });
    }

    res.json({ message: "旅館已恢復", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
