import express from 'express'
import pool from '../config/mysql.js'


const router = express.Router()

// 取得所有老師資訊
router.get('/list', async (req, res) => {
  try {
    const sql = 'SELECT * FROM teacher'
    const [teachers] = await pool.execute(sql)

    // console.log('Backend Teachers Data:', teachers) // 確保資料是陣列

    // if (!Array.isArray(teachers)) {
    //   return res.status(500).json({ status: 'error', message: '資料格式錯誤' })
    // }
    res.json(teachers)
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
})

// 取得單一老師資訊
router.get('/info/:id', async (req, res) => {
  const { id } = req.params
  try {
    const sql = 'SELECT * FROM teacher WHERE id = ?'
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
    const sql = `INSERT INTO teacher (name, category_id, Introduce, experience, img) VALUES (?, ?, ?, ?)`
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

    export default router