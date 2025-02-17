import pool from "../config/mysql.js";

// 讀取師資
export const getTeacherInfo = async (userId) => {
  try {
    const sql =`
      SELECT teacher.* 
      FROM teacher 
      JOIN users ON teacher.id = users.teacher_id
      WHERE users.id = ? 
      AND teacher.is_deleted = 0
    `;
    const [infos] = await pool.execute(sql, [userId]);
    return infos;
  } catch (err) {
    throw new Error(" 無法取得師資資訊：" + err.message);
  }
}

// 編輯師資
export const updateTeacherInfo = async (teacherId, updateData) => {
  try {
    const { name, category_id, skill, Introduce, Experience, img } = updateData;

    const sql = `
      UPDATE teacher
      JOIN users ON users.teacher_id = teacher.id
      SET 
        teacher.name = ?, 
        teacher.category_id = ?, 
        teacher.skill = ?, 
        teacher.Introduce = ?, 
        teacher.Experience = ?, 
        teacher.img = ?
      WHERE users.id = ? 
      AND teacher.is_deleted = 0
    `;

    const [result] = await pool.execute(sql, [
      name,
      category_id,
      skill,
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
        course_area.region AS area_region, 
        users.name AS teacher_name
      FROM users
      JOIN teacher t ON users.teacher_id = t.id   -- 先找到對應的 teacher
      JOIN course_session cs ON t.id = cs.teacher_id  -- 取得該教師的課程
      JOIN course c ON cs.course_id = c.id
      JOIN course_area ON cs.area_id = course_area.id
      WHERE users.id = ?   -- 透過 users.id 來篩選對應的教師
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
    const sql = `
      SELECT *
      FROM course_session cs
      WHERE cs.id = ?
      AND cs.is_deleted = 0
    `;
    const [courses] = await pool.query(sql, [id]);

    if (courses.length === 0){
        console.log("未找到課程資料！");
    }
    return courses;
  } catch (err) {
    throw new Error(" 無法取得 ${id} 課程:;" + err.message);
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

// 更新課程+梯次( 照片還沒 )
export const updateCourseWithSession = async (courseId, courseData, sessionId, sessionData) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      `UPDATE course SET type_id = ?, img_id = ?, name = ?, description = ?, duration = ?, price = ?, notice = ?, qa = ? WHERE id = ? AND is_deleted =0`,
      [
        courseData.type_id,
        courseData.img_id,
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

