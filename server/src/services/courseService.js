// import資料庫的連線設定
import pool from "../config/mysql.js";

// 用MVC架構，步驟一 Model 負責資料庫操作
export const getCourses = async ({
  keyword,
  typeList = [],
  placeList = [],
  // minPrice,
  // maxPrice,
}) => {
  try {
    console.log("📌 service接收到的篩選條件:", {
      keyword,
      typeList,
      placeList,
    });
    let sql = `
      SELECT 
        course.*, 
        course_type.name AS type_name, 
        course_img.url AS img_url,
        GROUP_CONCAT(DISTINCT course_session.area_id ORDER BY course_session.area_id) AS area_ids
      FROM course
      JOIN course_type ON course.type_id = course_type.type_id
      LEFT JOIN course_img ON course.id = course_img.course_id AND course_img.main_pic = 1
      LEFT JOIN course_session ON course.id = course_session.course_id  -- 加入與 course_session 的聯結
      LEFT JOIN course_area ON course_session.area_id = course_area.id  -- 根據 course_session 的 area_id 來聯結 course_area
      WHERE 1=1
      `;

    let params = [];

    // ✅ 課程類別篩選
    if (typeList.length > 0) {
      sql += ` AND course.type_id IN (${typeList.map(() => "?").join(",")})`;
      params.push(...typeList);
      console.log("type", params);
    }

    // ✅ 上課地點篩選
    if (placeList.length > 0) {
      sql += ` AND course_session.area_id IN (${placeList
        .map(() => "?")
        .join(",")})`;
      params.push(...placeList);
      console.log("place", params);
    }

    // ✅ SQL 排序與分組
    sql += ` GROUP BY course.id`;

    console.log("📌 執行 SQL：", sql); // 🛠 Debug
    console.log("📌 SQL 參數：", params); // 🛠 Debug

    const [courses] = await pool.execute(sql, params);
    if (courses.length == 0) {
      console.log("課程列表不存在");
    }

    const [types] = await pool.execute(`      
      SELECT *
      FROM course_type 
      WHERE is_deleted = 0
    `);
    if (types.length == 0) {
      console.log("課程類別不存在");
    }

    const [places] = await pool.execute(`      
      SELECT *
      FROM course_area
    `);
    if (places.length == 0) {
      console.log("上課地點不存在");
    }

    const [latest] = await pool.execute(`
      SELECT c.id AS courseId, c.name AS courseName, cm.url AS img_url       
      FROM course_session cs 
      JOIN course c ON cs.course_id = c.id
      JOIN course_img cm ON c.id = cm.course_id
      WHERE cs.start_date >= CURDATE()
      AND cs.is_deleted = 0
      AND cm.main_pic = 1
      GROUP BY c.id
      ORDER BY cs.start_date ASC
      LIMIT 6
      ;`);
    if (latest.length == 0) {
      console.log("近期開課不存在");
    }
    const [newest] = await pool.execute(`
      SELECT c.id AS courseId, c.name AS courseName, cm.url AS img_url, cs.start_date AS startdate, cs.created_at AS created       
      FROM course_session cs 
      JOIN course c ON cs.course_id = c.id
      JOIN course_img cm ON c.id = cm.course_id
      WHERE cs.created_at
      AND cs.is_deleted = 0
      AND cm.main_pic = 1
      GROUP BY c.id
      ORDER BY cs.created_at ASC
      LIMIT 6
      ;`);
    if (newest.length == 0) {
      console.log("最新建立課程不存在");
    }

    // console.log("課程類別:", types); // 檢查是否有類別資料
    // console.log("上課地點:", places); // 檢查是否有地點資料

    return { courses, types, places, latest, newest };
  } catch (err) {
    throw new Error(" 無法取得課程列表：" + err.message);
  }
};

export const getId = async (id) => {
  try {
    const [course] = await pool.query(
      `
      SELECT c.* , cm.url AS img_url
      FROM course c
      JOIN course_img cm ON c.id = cm.course_id
      WHERE c.id = ?
      AND cm.main_pic = 1`,
      [id]
    );
    if (course.length == 0) {
      console.log("課程不存在");
    }
    const [session] = await pool.query(
      `
      SELECT 
        cs.*, 
        cs.id AS session_id , 
        t.name AS teacher_name , 
        t.img AS teacher_img, 
        ca.region AS region,
        ca.address AS address
      FROM course_session cs 
      JOIN teacher t ON cs.teacher_id = t.id
      JOIN course_area ca ON cs.area_id = ca.id
      WHERE cs.course_id = ? 
      AND cs.is_deleted = 0 
      AND cs.start_date >= CURDATE() 
      ORDER BY cs.start_date ASC, cs.id ASC;
      `,
      [id]
    );
    if (session.length == 0) {
      console.log("梯次不存在");
    }
    const [place] = await pool.query("SELECT * FROM course_area");
    if (course.length == 0) {
      console.log("上課地點不存在");
    }
    const [imgs] = await pool.query(
      `
      SELECT * 
      FROM course_img 
      WHERE course_id = ? 
      `,
      [id]
    );
    if (course.length == 0) {
      console.log("課程照片不存在");
    }
    const [simiCourse] = await pool.query(
      `
      SELECT c.id AS courseId, c.name AS courseName, cm.url AS img_url 
      FROM course c 
      JOIN course_img cm ON c.id = cm.course_id
      WHERE c.type_id = (SELECT type_id FROM course WHERE id = ?) 
      AND cm.main_pic = 1;
      `,
      [id]
    );
    if (course.length == 0) {
      console.log("相關課程的資料不存在");
    }
    return { course, session, place, imgs, simiCourse };
  } catch (err) {
    throw new Error(" 無法取得 ${id} 課程:;" + err.message);
  }
};

export const searchCourses = async (keyword) => {
  try {
    const [courses] = await pool.execute(
      "SELECT * FROM course WHERE (name LIKE ? OR description LIKE ?) AND is_deleted = 0",
      [`%${keyword}%`, `%${keyword}%`]
    );
    return courses;
  } catch (error) {
    console.log(error);
    throw new Error("取得相關資料失敗");
  }
};

// export const createCourseWithSession = async (courseData, sessionData) => {
//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();

//     const [courseResult] = await connection.query(
//       `INSERT INTO course (type_id, img_id, name, description, duration, price, notice, qa, is_deleted)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         courseData.type_id,
//         courseData.img_id,
//         courseData.name,
//         courseData.description,
//         courseData.duration,
//         courseData.price,
//         courseData.notice,
//         courseData.qa,
//         0,
//         // 預設 is_deleted 為 0
//       ]
//     );

//     const courseId = courseResult.insertId;

//     const [sessionResult] = await connection.query(
//       `INSERT INTO course_session (course_id, area_id, teacher_id, max_people, curr_people, remaining_slots, start_date, end_date, class_dates, deadline_date, start_time, end_time, is_deleted, created_at, update_at)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
//       [
//         courseId,
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
//         0, // 預設 is_deleted 為 0
//       ]
//     );

//     await connection.commit(); // 提交交易
//     return { courseId, sessionId: sessionResult.insertId };
//   } catch (err) {
//     console.log("錯誤:", err);
//     throw new Error(" 無法建立課程：" + err.message);
//   } finally {
//     connection.release();
//   }
// };

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
