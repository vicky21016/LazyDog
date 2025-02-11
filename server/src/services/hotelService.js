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

    const { id, created_at, average_rating, total_reviews, ...updateFields } =
      updateData;

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

    if (!id || isNaN(Number(id))) {
      console.log(" 無效的 ID:", id);
      return { error: "無效的 ID，請提供正確的旅館 ID" };
    }

    const [alives] = await pool.query(
      "SELECT * FROM hotel WHERE id = ? AND is_deleted = 0",
      [id]
    );

    if (alives.length === 0) {
      console.log(`刪除失敗: 找不到 id=${id} 或該旅館已刪除`);
      return { error: `刪除失敗，找不到 id=${id} 或該旅館已刪除` };
    }

    console.log(` 執行 SQL 軟刪除: id=${id}`);
    // SQL 軟刪除
    const [result] = await pool.query(
      "UPDATE hotel SET is_deleted = 1 WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      console.log(` 軟刪除失敗: id=${id}`);
      return { error: `軟刪除失敗，找不到 id=${id}` };
    }

    console.log(`旅館 id=${id} 已成功軟刪除`);
    return { message: `旅館 id=${id} 已成功刪除` };
  } catch (error) {
    console.error(" 軟刪除錯誤:", error);
    return { error: "無法刪除旅館：" + error.message };
  }
};
