import pool from "../config/mysql.js";

// 讀取師資
export const getTeacherInfo = async (teacherId) => {
  try {
    const [infos] = await pool.execute(`      
      SELECT teacher.* , users.teacher_id AS teacherId, ct.name AS typeName
      FROM teacher 
      JOIN users ON teacher.id = users.teacher_id
      JOIN course_type ct ON ct.type_id = teacher.category_id
      WHERE users.id = ? 
      AND teacher.is_deleted = 0
    `, [teacherId]);
    if (infos.length == 0){
      console.log("師資資訊不存在");
    }
    
    const [types] = await pool.execute(`      
      SELECT *
      FROM course_type 
      WHERE is_deleted = 0
    `);
    if (types.length == 0){
      console.log("類別不存在");
    }

    return { infos, types};
  } catch (err) {
    throw new Error(" 無法取得師資資訊：" + err.message);
  }
}

// 編輯師資
export const updateTeacherInfo = async (teacherId, updateData) => {
  try {
    const { name, category_id, Introduce, Experience, img } = updateData;

    const sql = `
      UPDATE teacher 
      JOIN users ON users.teacher_id = teacher.id
      JOIN course_type ct ON ct.type_id = teacher.category_id
      SET 
        teacher.name = ?, 
        teacher.category_id = ?,
        teacher.Introduce = ?, 
        teacher.Experience = ?, 
        teacher.img = ?
      WHERE users.id = ? 
      AND teacher.is_deleted = 0
    `;

    const [result] = await pool.execute(sql, [
      name,
      category_id,
      Introduce,
      Experience,
      img,
      teacherId
    ]);

    return result.affectedRows > 0; // 如果有更新回傳 true，否則 false
  } catch (err) {
    throw new Error("無法更新師資資訊：" + err.message);
  }
};

// 課程列表
export const getCoursesByTeacher = async (teacherId) => {
  try {
    const sql =`
      SELECT 
        cs.id AS session_id, cs.course_id, cs.area_id, cs.teacher_id, cs.class_dates, 
        c.name AS course_name, c.description AS course_description, 
        course_area.region AS region, 
        users.name AS teacher_name,
        cm.url AS img_url
      FROM users
      JOIN teacher t ON users.teacher_id = t.id   -- 先找到對應的 teacher
      JOIN course_session cs ON t.id = cs.teacher_id  -- 取得該教師的課程
      JOIN course c ON cs.course_id = c.id
      JOIN course_area ON cs.area_id = course_area.id
      JOIN course_img cm ON cm.course_id = c.id
      WHERE users.id = ?   -- 透過 users.id 來篩選對應的教師
      AND cm.main_pic = 1
      AND cs.is_deleted = 0
    `;
    const [courses] = await pool.execute(sql, [teacherId]);
    return courses;
  } catch (err) {
    throw new Error(" 無法取得課程列表：" + err.message);
  }
};

// 課程梯次 細節
export const getCoursesIdByTeacher = async (id) => {
  try {
    const [courses] = await pool.query(`
       SELECT c.*, cs.*, ct.name AS typeName, cs.id AS session_id, ca.region AS region
      FROM course_session cs
      JOIN course c ON cs.course_id = c.id
      JOIN course_type ct ON c.type_id = ct.type_id
      JOIN course_area ca ON cs.area_id = ca.id
      WHERE cs.id = ?
      AND cs.is_deleted = 0`
      ,[id]);
    if (courses.length == 0){
        console.log("課程不存在");
    }

    const [mainpic] = await pool.query(`
      SELECT cm.* 
      FROM course_img cm
      JOIN course_session cs ON cm.course_id = cs.course_id 
      JOIN course c ON c.id = cs.course_id 
      WHERE cs.id = ?
      AND cm.main_pic = 1
      `,[id]);
    if (mainpic.length == 0){
        console.log("該課程主圖不存在");
    }

    const [otherpics] = await pool.query(`
      SELECT cm.* 
      FROM course_img cm
      JOIN course_session cs ON cm.course_id = cs.course_id 
      JOIN course c ON c.id = cs.course_id 
      WHERE cs.id = ?
      AND cm.main_pic = 0
      `,[id]);
    if (otherpics.length == 0){
        console.log("該課程其他照片不存在");
    }

    const [types] = await pool.execute(`      
      SELECT *
      FROM course_type 
      WHERE is_deleted = 0
    `);
    if (types.length == 0){
      console.log("課程類別不存在");
    }

    const [places] = await pool.execute(`      
      SELECT *
      FROM course_area
    `);
    if (places.length == 0){
      console.log("上課地點不存在");
    }


    return {courses, mainpic, otherpics, types, places};
  } catch (err) {
    throw new Error(` 無法取得 ${id} 課程:;` + err.message);
  }
};

// 新增課程+梯次
export const createCourseWithSession = async (courseData, sessionData, imgData) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [courseResult] = await connection.query(
      `INSERT INTO course (type_id, img_id, name, description, duration, price, notice, qa, is_deleted) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        courseData.type_id,
        courseData.img_id,
        courseData.name,
        courseData.description,
        courseData.duration,
        courseData.price,
        courseData.notice,
        courseData.qa,
        0,
        // 預設 is_deleted 為 0
      ]
    );

    const courseId = courseResult.insertId;

    const [sessionResult] = await connection.query(
      `INSERT INTO course_session (course_id, area_id, teacher_id, max_people, curr_people, remaining_slots, start_date, end_date, class_dates, deadline_date, start_time, end_time, is_deleted, created_at, update_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        courseId,
        sessionData.area_id,
        sessionData.teacher_id,
        sessionData.max_people,
        sessionData.curr_people,
        sessionData.remaining_slots,
        sessionData.start_date,
        sessionData.end_date,
        sessionData.class_dates,
        sessionData.deadline_date,
        sessionData.start_time,
        sessionData.end_time,
        0, // 預設 is_deleted 為 0
      ]
    );

    

    let img_id = "";

     // 處理主圖
     let mainImageId = null;
     if (imgData?.mainImage) {
       const [mainImgResult] = await connection.query(
         `INSERT INTO course_img (course_id, main_pic, url) VALUES (?, ?, ?)`,
         [courseId, 1, imgData.mainImage]
       );
       mainImageId = mainImgResult.insertId;
       img_id = mainImgResult.insertId;
 
       // 更新課程的 img_id 欄位
       await connection.query(`UPDATE course SET img_id = ? WHERE id = ?`, [mainImageId, courseId]);
     }
 
     // 處理其他圖片
     if (imgData?.otherImages?.length>0) {
       for (const url of imgData.otherImages) {
         await connection.query(
           `INSERT INTO course_img (course_id, main_pic, url) VALUES (?, ?, ?)`,
           [courseId, 0, url] // 其他圖片，main_pic = 0
         );
       }
     }


    await connection.commit(); // 提交交易
    return { courseId, sessionId: sessionResult.insertId, mainImageId};
  } catch (err) {
    console.log("錯誤:", err);
    throw new Error(" 無法建立課程：" + err.message);
  } finally {
    connection.release();
  }
};

// 更新課程+梯次
export const updateCourseWithSession = async (courseId, courseData, sessionId, sessionData) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      `UPDATE course SET type_id = ?, name = ?, description = ?, duration = ?, price = ?, notice = ?, qa = ? WHERE id = ? AND is_deleted =0`,
      [
        courseData.type_id,
        courseData.name,
        courseData.description,
        courseData.duration,
        courseData.price,
        courseData.notice,
        courseData.qa,
        courseId,
      ]
    );

    await connection.query(
      `UPDATE course_session SET area_id = ?, teacher_id = ?, max_people = ?, curr_people = ?, remaining_slots = ?, start_date = ?, end_date = ?, class_dates = ?, deadline_date = ?, start_time = ?, end_time = ?, update_at = NOW() WHERE course_id = ? AND id = ? AND is_deleted = 0 `,
      [
        sessionData.area_id,
        sessionData.teacher_id,
        sessionData.max_people,
        sessionData.curr_people,
        sessionData.remaining_slots,
        sessionData.start_date,
        sessionData.end_date,
        sessionData.class_dates,
        sessionData.deadline_date,
        sessionData.start_time,
        sessionData.end_time,
        courseId,
        sessionId,
      ]
    );

    await connection.commit();   // 提交交易
    return { message: "課程與梯次更新成功!" };
  } catch (err) {
    await connection.rollback(); // 回滾交易
    console.log("錯誤:", err);
    throw new Error(" 無法更新課程與梯次: " + err.message);
  } finally {
    connection.release();
  }
};

// 梯次軟刪除
export const deleteCourseSession = async (sessionId) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 軟刪除 course_session 記錄
    await connection.query(
      "UPDATE course_session SET is_deleted = 1 WHERE id = ? AND is_deleted = 0",
      [sessionId]
    );

    await connection.commit(); // 提交交易
    
  } catch (err) {
    await connection.rollback(); // 發生錯誤則回滾
    throw err;
    // console.error("刪除錯誤:", err);
    // res.status(500).json({ error: "無法刪除該梯次: " + err.message });
  } finally {
    connection.release();
  }
};



// 測試
// const courseData = {
//     type_id: 1,
//     img_id: 3,
//     name: "狗狗基礎訓練",
//     description: "適合新手狗主人",
//     duration: "5週",
//     price: 5000,
//     notice: "請攜帶狗狗疫苗證明",
//     qa: "可提前詢問問題"
// };

// const sessionData = {
//     area_id: 1,
//     teacher_id: 2,
//     max_people: 10,
//     curr_people: 0,
//     remaining_slots: 0,
//     start_date: "2025-03-01",
//     end_date: "2025-04-05",
//     class_dates: "2025-03-01,2025-03-08,2025-03-15,2025-03-22,2025-03-29",
//     deadline_date: "2025-02-25",
//     start_time: "10:00",
//     end_time: "12:00"
// };
// createCourseWithSession(courseData, sessionData)
//     .then(result => console.log("新增課程與梯次成功:", result))
//     .catch(error => console.error("錯誤:", error));

