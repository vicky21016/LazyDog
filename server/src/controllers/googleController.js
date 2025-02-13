import pool from '../config/mysql.js'
import express from 'express'

const router = express.Router()


router.post('/google-login', async (req, res) => {
  const { google_id, email, name, avatar_url } = req.body

  if (!google_id || !email) {
    return res.status(400).json({ message: '缺少必要的資訊' })
  }

  try {
    // 檢查是否已存在
    const [rows] = await pool.query('SELECT * FROM users WHERE google_id = ?', [
      google_id,
    ])

    if (rows.length > 0) {
      return res.status(200).json({ message: '登入成功', user: rows[0] })
    }

    // 插入新使用者
    const [result] = await pool.query(
      'INSERT INTO users (google_id, email, name, avatar_url) VALUES (?, ?, ?, ?)',
      [google_id, email, name, avatar_url]
    )

    const newUser = {
      id: result.insertId,
      google_id,
      email,
      name,
      avatar_url,
    }

    return res.status(201).json({ message: '新使用者已儲存', user: newUser })
  } catch (error) {
    console.error('Google 登入錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤', error })
  }
})

export default router
