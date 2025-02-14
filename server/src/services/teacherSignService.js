// import資料庫的連線設定
import pool from "../config/mysql.js";

// 用MVC架構，步驟一 Model 負責資料庫操作
export const getCoursesByTeacher = async (teacherId) => {
  try {
    const sql =`
       SELECT cs.*, c.*, t.name AS teacher_name 
       FROM course_session cs
       JOIN course c ON cs.course_id = c.id
       JOIN teacher t ON cs.teacher_id = t.id
       WHERE cs.teacher_id = ? AND cs.is_deleted = 0
    `;
    const [courses] = await pool.execute(sql, [teacherId]);
    return courses;
  } catch (err) {
    throw new Error(" 無法取得課程列表：" + err.message);
  }
};


// export const getCourseIds = async (id) => {
//   try {
//     const [courses] = await pool.query("SELECT * FROM course WHERE id = ?", [
//       id,
//     ]);
//     if (courses.length == 0){
//         console.log("!!!!!!!!!!!");
//     }
//     console.log(courses);
//     return courses;
//   } catch (err) {
//     throw new Error(" 無法取得 ${id} 課程:;" + err.message);
//   }
// };

export const createCourseWithSession = async (courseData, sessionData) => {
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

    await connection.commit(); // 提交交易
    return { courseId, sessionId: sessionResult.insertId };
  } catch (err) {
    console.log("錯誤:", err);
    throw new Error(" 無法建立課程：" + err.message);
  } finally {
    connection.release();
  }
};

// export const updateCourseWithSession = async (courseId, courseData, sessionId, sessionData) => {
//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();

//     await connection.query(
//       `UPDATE course SET type_id = ?, img_id = ?, name = ?, description = ?, duration = ?, price = ?, notice = ?, qa = ? WHERE id = ? AND is_deleted =0`,
//       [
//         courseData.type_id,
//         courseData.img_id,
//         courseData.name,
//         courseData.description,
//         courseData.duration,
//         courseData.price,
//         courseData.notice,
//         courseData.qa,
//         courseId,
//       ]
//     );

//     await connection.query(
//       `UPDATE course_session SET area_id = ?, teacher_id = ?, max_people = ?, curr_people = ?, remaining_slots = ?, start_date = ?, end_date = ?, class_dates = ?, deadline_date = ?, start_time = ?, end_time = ?, update_at = NOW() WHERE course_id = ? AND id = ? AND is_deleted = 0 `,
//       [
//         sessionData.area_id,
//         sessionData.teacher_id,
//         sessionData.max_people,
//         sessionData.curr_people,
//         sessionData.remaining_slots,
//         sessionData.start_date,
//         sessionData.end_date,
//         sessionData.class_dates,
//         sessionData.deadline_date,
//         sessionData.start_time,
//         sessionData.end_time,
//         courseId,
//         sessionId,
//       ]
//     );

//     await connection.commit();   // 提交交易
//     return { message: "課程與梯次更新成功!" };
//   } catch (err) {
//     await connection.rollback(); // 回滾交易
//     console.log("錯誤:", err);
//     throw new Error(" 無法更新課程與梯次: " + err.message);
//   } finally {
//     connection.release();
//   }
// };

// export const deleteCourseSession = async (sessionId) => {
//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();

//     // 軟刪除 course_session 記錄
//     await connection.query(
//       "UPDATE course_session SET is_deleted = 1 WHERE id = ? AND is_deleted = 0",
//       [sessionId]
//     );

//     await connection.commit(); // 提交交易
    
//   } catch (err) {
//     await connection.rollback(); // 發生錯誤則回滾
//     throw err;
//     // console.error("刪除錯誤:", err);
//     // res.status(500).json({ error: "無法刪除該梯次: " + err.message });
//   } finally {
//     connection.release();
//   }
// };



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

