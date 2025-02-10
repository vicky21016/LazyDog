import pool from "../config/mysql.js";



export const getCourses = async () => {  
    try {
        const [courses] = await pool.query("SELECT * FROM course");        
        return courses;
        
    } catch (error) {
        throw new Error(" 無法取得課程列表：" + error.message);
    }
};

export const getId = async (id) => {  
    try {
        const [courses] = await pool.query("SELECT * FROM course WHERE id = ?", [id]);
        return courses;
    } catch (error) {
        throw new Error(" 無法取得 ${id} 課程:;" + error.message);
    }
};

export const createCourses = async () =>{
    try{
        const [courses] = await pool.query (`INSERT INTO  (id, name, , name, mail, head) 
      VALUES (?, ?, ?, ?, ?, ?)`)
    }catch(err){
        throw new Error(" 無法建立課程：" + error.message);
    }
}