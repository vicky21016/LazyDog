import express from 'express'
import pool from '../config/mysql.js'


const router = express.Router()

// 取得所有老師資訊
router.get('/list', async (req, res) => {
  try {
    const sql =
      "SELECT teacher.*, course_type.name AS category_name FROM teacher JOIN course_type ON teacher.category_id = course_type.type_id;";
    const [teachers] = await pool.execute(sql)

    // console.log('Backend Teachers Data:', teachers) // 確保資料是陣列

    if (!Array.isArray(teachers)) {
      return res.status(500).json({ status: 'error', message: '資料格式錯誤' })
    }
    res.json(teachers)
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
})

// 取得單一老師資訊
router.get('/info/:id', async (req, res) => {
  const { id } = req.params
  try {
     const sql = `
        SELECT 
        teacher.*, 
        course_type.name AS category_name,
        GROUP_CONCAT(DISTINCT course.name SEPARATOR ', ') AS course_names,
        GROUP_CONCAT(DISTINCT course.id SEPARATOR ', ') AS course_ids
      FROM 
        teacher
      LEFT JOIN 
        course_type ON teacher.category_id = course_type.type_id
      LEFT JOIN 
        course_session ON teacher.id = course_session.teacher_id
      LEFT JOIN 
        course ON course_session.course_id = course.id
      WHERE 
        teacher.id = ? 
      AND 
        (course_session.is_deleted = 0 OR course_session.is_deleted IS NULL) 
      AND 
        (course_session.start_date >= CURDATE() OR course_session.start_date IS NULL)
      GROUP BY 
        teacher.id;
    `;
    const [teacher] = await pool.execute(sql, [id])
    if (teacher.length == 0)
      return res.status(404).json({ error: '老師不存在' })
    res.json(teacher[0])
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
})

// 新增老師
router.post('/', async (req, res) => {
  try {
    const { name, category, introduce, experience, img } = req.body
    const sql = `INSERT INTO teacher (name, category_id, Introduce, experience, img) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [
      name,
      category,
      introduce,
      experience,
      img,
    ])

    res.json({
      status: 'success',
      message: '老師已成功新增',
      teacherId: result.insertId,
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    })
  }
})

// 隨機撈取資料
router.get('/random', async (req, res) => {
  try {
  const sql =
    "SELECT teacher.*, course_type.name AS category_name FROM teacher JOIN course_type ON teacher.category_id = course_type.type_id ORDER BY RAND() LIMIT 4"; 
  const [random] = await pool.execute(sql)
    if (!Array.isArray(random)) {
      return res.status(500).json({ status: 'error', message: '資料格式錯誤' })
    }
    res.json(random)
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
})

router.get("/courseRandom", async (req, res) => {
  try {
    const sql =
      "SELECT course.*, course_img.url AS course_img FROM course JOIN course_img ON course.id = course_img.course_id ORDER BY RAND() LIMIT 4";
    const [random] = await pool.execute(sql);
    if (!Array.isArray(random)) {
      return res.status(500).json({ status: "error", message: "資料格式錯誤" });
    }
    res.json(random);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// 取得該老師的課程
// const sql =`SELECT 
//     course.name AS course_name
// FROM 
//     course_session
// JOIN 
//     course ON course_session.course_id = course.id
// WHERE 
//     course_session.teacher_id = ?  -- 根據老師的 ID 查詢課程
//     AND course_session.is_deleted = 0
//     AND course_session.start_date >= CURDATE();`

    export default router