import pool from "../config/mysql.js";

// 讀取師資
export const getTeacherInfo = async (teacherId) => {
  try {
    const [infos] = await pool.execute(
      `      
      SELECT teacher.* , users.teacher_id AS teacherId, ct.name AS typeName
      FROM teacher 
      JOIN users ON teacher.id = users.teacher_id
      JOIN course_type ct ON ct.type_id = teacher.category_id
      WHERE users.id = ? 
      AND teacher.is_deleted = 0
    `,
      [teacherId]
    );
    if (infos.length == 0) {
      console.log("師資資訊不存在");
    }

    const [types] = await pool.execute(`      
      SELECT *
      FROM course_type 
      WHERE is_deleted = 0
    `);
    if (types.length == 0) {
      console.log("類別不存在");
    }

    return { infos, types };
  } catch (err) {
    throw new Error(" 無法取得師資資訊：" + err.message);
  }
};

// 編輯師資
export const updateTeacherInfo = async (updateData) => {
  try {
    const { name, category_id, Introduce, Experience, img, teacherId } =
      updateData;

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
      WHERE teacher.id = ? 
      AND teacher.is_deleted = 0
    `;

    const [result] = await pool.execute(sql, [
      name,
      category_id,
      Introduce,
      Experience,
      img,
      teacherId,
    ]);

    return result.affectedRows > 0; // 如果有更新回傳 true，否則 false
  } catch (err) {
    throw new Error("無法更新師資資訊：" + err.message);
  }
};

// 課程列表
export const getCoursesByTeacher = async (teacherId) => {
  try {
    const sql = `
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
    const [courses] = await pool.query(
      `
       SELECT c.*, cs.*, ct.name AS typeName, cs.id AS session_id, ca.region AS region
      FROM course_session cs
      JOIN course c ON cs.course_id = c.id
      JOIN course_type ct ON c.type_id = ct.type_id
      JOIN course_area ca ON cs.area_id = ca.id
      WHERE cs.id = ?
      AND cs.is_deleted = 0`,
      [id]
    );
    if (courses.length == 0) {
      console.log("課程不存在");
    }

    const [mainpic] = await pool.query(
      `
      SELECT cm.* 
      FROM course_img cm
      JOIN course_session cs ON cm.course_id = cs.course_id 
      JOIN course c ON c.id = cs.course_id 
      WHERE cs.id = ?
      AND cm.main_pic = 1
      `,
      [id]
    );
    if (mainpic.length == 0) {
      console.log("該課程主圖不存在");
    }

    const [otherpics] = await pool.query(
      `
      SELECT cm.* 
      FROM course_img cm
      JOIN course_session cs ON cm.course_id = cs.course_id 
      JOIN course c ON c.id = cs.course_id 
      WHERE cs.id = ?
      AND cm.main_pic = 0
      `,
      [id]
    );
    if (otherpics.length == 0) {
      console.log("該課程其他照片不存在");
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

    return { courses, mainpic, otherpics, types, places };
  } catch (err) {
    throw new Error(` 無法取得 ${id} 課程:;` + err.message);
  }
};

// 新增課程+梯次
export const createCourseWithSession = async (
  courseData,
  sessionData,
  imgData
) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [courseResult] = await connection.query(
      `INSERT INTO course (type_id, name, description, duration, price, notice, qa, is_deleted) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        courseData.type_id,
        courseData.name,
        courseData.description,
        courseData.duration,
        courseData.price,
        courseData.notice,
        courseData.qa,
        0,
      ]
    );
    const courseId = courseResult.insertId;

    const [sessionResult] = await connection.query(
      `INSERT INTO course_session (course_id, area_id, teacher_id, max_people, start_date, class_dates, start_time, end_time, is_deleted, created_at, update_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        courseId,
        sessionData.area_id,
        sessionData.teacher_id,
        sessionData.max_people,
        sessionData.start_date,
        sessionData.class_dates,
        sessionData.start_time,
        sessionData.end_time,
        0,
      ]
    );
    const sessionId = sessionResult.insertId;

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
    }

    // 處理其他圖片
    if (imgData?.otherImages?.length > 0) {
      for (const url of imgData.otherImages) {
        await connection.query(
          `INSERT INTO course_img (course_id, main_pic, url) VALUES (?, ?, ?)`,
          [courseId, 0, url]
        );
      }
    }

    await connection.commit();
    return { courseId, sessionId, mainImageId };
  } catch (err) {
    await connection.rollback();
    console.log("錯誤:", err);
    throw new Error(" 無法建立課程：" + err.message);
  } finally {
    connection.release();
  }
};

// (新增) 取資料
export const createGets = async () => {
  try {
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

    return { types, places };
  } catch (err) {
    throw new Error(` 無法取得 ${id} 課程:;` + err.message);
  }
};

// 更新課程+梯次
export const updateCourseWithSession = async (
  courseId,
  courseData,
  sessionId,
  sessionData,
  imgData
) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      `UPDATE course 
        SET name = ?, type_id = ?, price = ?, duration = ?, description = ?, notice = ?, qa = ? 
        WHERE id = ? 
        AND is_deleted =0`,
      [
        courseData.name,
        courseData.type_id,
        courseData.price,
        courseData.duration,
        courseData.description,
        courseData.notice,
        courseData.qa,
        courseId,
      ]
    );

    await connection.query(
      `UPDATE course_session SET 
          max_people = ?,
          class_dates = ?,
          start_date = ?,  
          area_id = ?,
          start_time = ?, 
          end_time = ?,
          update_at = NOW() 
        WHERE course_id = ? 
        AND id = ? 
        AND is_deleted = 0 `,
      [
        sessionData.max_people,
        sessionData.class_dates,
        sessionData.start_date,
        sessionData.area_id,
        sessionData.start_time,
        sessionData.end_time,
        courseId,
        sessionId,
      ]
    );

    // 圖片處理邏輯
    if (imgData?.mainImage) {
      const [existingMainImage] = await connection.query(
        `SELECT id FROM course_img WHERE course_id = ? AND main_pic = 1`,
        [courseId]
      );

      if (existingMainImage.length > 0) {
        // 如果有主圖，則更新
        await connection.query(`UPDATE course_img SET url = ? WHERE id = ?`, [
          imgData.mainImage,
          existingMainImage[0].id,
        ]);
      } else {
        // 沒有主圖則插入
        await connection.query(
          `INSERT INTO course_img (course_id, main_pic, url) VALUES (?, ?, ?)`,
          [courseId, 1, imgData.mainImage]
        );
      }
    }

    // **處理刪除的圖片**
    if (imgData?.deletedPics?.length > 0) {
      const deletedPicsArray = JSON.parse(imgData.deletedPics);
      const picIdsToDelete = deletedPicsArray.map((pic) => pic.id); // 取出所有圖片的 id

      await connection.query(
        `DELETE FROM course_img WHERE id IN (?) AND course_id = ?`,
        [picIdsToDelete, courseId]
      );
      console.log("🗑️ 已刪除圖片 ID:", picIdsToDelete);
    }

    // 更新其他圖片
    if (imgData?.otherImages?.length > 0) {
      for (const filename of imgData.otherImages) {
        await connection.query(
          `INSERT INTO course_img (course_id, main_pic, url) VALUES (?, ?, ?)`,
          [courseId, 0, filename] // 其他圖片，main_pic = 0
        );
      }
    }

    await connection.commit(); // 提交交易
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
