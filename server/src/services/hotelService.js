import pool from "../config/mysql.js";



export const getHotels = async () => {  
    try {
        const [hotels] = await pool.execute("SELECT * FROM hotel");
        return hotels;
        
    } catch (error) {
        throw new Error(" 無法取得旅館列表：" + error.message);
    }
};

export const getId = async (id) => {  
    try {
        const [hotels] = await pool.query("SELECT * FROM hotel WHERE id = ?", [id]);
        return hotels;
    } catch (error) {
        throw new Error(" 無法取得旅館列表:;" + error.message);
    }
};