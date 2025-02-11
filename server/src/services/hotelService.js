import pool from "../config/mysql.js";

export const getHotels = async () => {
  try {
    const [hotels] = await pool.query(
      "SELECT * FROM hotel WHERE is_deleted = 0"
    );
    return hotels;
  } catch (error) {
    console.log("取得失敗");
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
    console.log("取得失敗");
    throw new Error(`無法取得 id=${id} 旅館: ` + error.message);
  }
};

export const createHotels = async (hotelData) => {
  try {
    const { name, county, district, address, phone } = hotelData;

    const [result] = await pool.query(
      `INSERT INTO hotel 
          (name, county, district, address, phone, 
          created_at, updated_at, is_deleted) 
          VALUES (?, ?, ?, ?, ?, NOW(), NOW(), 0)`,
      [name, county, district, address, phone]
    );

    return { id: result.insertId, name, address, phone };
  } catch (err) {
    console.log("創立失敗");
    throw new Error("無法創立旅館：" + err.message);
  }
};

export const updateHotelById = async (updateData) => {
  console.log(" PATCH 請求收到:", updateData);

  try {
    // 解構賦值排除不應該更新的欄位(目前寫在{}裡的欄位) ...updateFields展開 運算值是剩下欄位
    //updateFields變成一個新的物件來存放剩餘可更新欄位

    const { id, created_at, average_rating, total_reviews, ...updateFields } = updateData;

  
    if (!id) {
      return { error: "缺少 id，無法更新旅館" };
    }

    // 如果 updateFields 是空的，不更新
    if (Object.keys(updateFields).length === 0) {
      return { error: "沒有提供更新欄位" };
    }
    
    console.log(" 需要更新的欄位:", updateFields);

    //  動態生成 SQL **需要再研究 **
    const keys = Object.keys(updateFields);
    const values = Object.values(updateFields);
    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    values.push(id); 

    const [result] = await pool.query(
      `UPDATE hotel SET ${setClause}, updated_at = NOW() WHERE id = ?`,
      values
    );

    // 
    if (result.affectedRows === 0) {
      console.log("更新失敗，affectedRows = 0");
      return { error: "更新失敗，找不到該旅館" };
    }

    console.log(" 旅館 id=" + id + " 更新成功");
    return { message: `旅館 id=${id} 更新成功` };
  } catch (error) {
    console.error(" 更新錯誤:", error);
    return { error: "無法更新旅館：" + error.message };
  }
};


export const softDeleteHotelById = async (softDelete) => {
  try {
    const { id } = softDelete;
    const [result] = await pool.query(
      `UPDATE hotel SET is_deleted = 1, updated_at = NOW() WHERE id = ? AND is_deleted = 0`,
      [id]
    );

    if (result.affectedRows === 0) {
      console.log("刪除失敗");
      return { error: "刪除失敗，找不到該旅館" };
    }
  } catch (error) {
    console.log("刪除失敗");
    throw new Error("無法刪除" + error.message);
  }
};

export const restoreHotelById = async (restoredHotel) => {
  try {
    const { id } = restoredHotel;
    const [result] = await pool.query(
      `UPDATE hotel SET is_deleted = 0, updated_at = NOW() WHERE id = ? AND is_deleted = 1`,
      [id]
    );

    if (result.affectedRows === 0) {
      console.log("恢復失敗");
      return { error: "恢復失敗，找不到該旅館" };
    }
  } catch (error) {
    console.log("恢復失敗");
    throw new Error("無法恢復" + error.message);
  }
};
