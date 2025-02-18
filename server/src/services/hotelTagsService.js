import pool from "../config/mysql.js";

export const getHotelTags = async (hotelId) => {
    try{
        const [rows] = await pool.execute(
            "SELECT t.id, t.name FROM hotel_tags ht JOIN tags t ON ht.tag_id = t.id WHERE ht.hotel_id = ?",
            [hotelId]
          );
          return rows;
    }catch(error){
        throw new Error ("無法獲取標籤"+error.message)
    }
  
};

export const addHotelTags = async (hotelId, tagId) => {
    try{
        const [result] = await pool.execute(
            "INSERT INTO hotel_tags (hotel_id, tag_id) VALUES (?, ?)",
            [hotelId, tagId]
          );
          return result.affectedRows > 0;
    }catch(error){
        throw new Error ("無法新增標籤"+error.message) 
    }
 
};

export const removeHotelTags = async (hotelId, tagId) => {
    try{
        const [result] = await pool.execute(
            "DELETE FROM hotel_tags WHERE hotel_id = ? AND tag_id = ?",
            [hotelId, tagId]
          );
          return result.affectedRows > 0;
    }catch(error){
        throw new Error ("無法移除標籤"+error.message)
    }
 
};