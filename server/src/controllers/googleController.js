import pool from '../config/mysql.js'
import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()
const JWT_SECRET = 'your_jwt_secret'

router.post('/google-login', async (req, res) => {
  const { google_id, email, name, avatar_url } = req.body

  if (!google_id || !email) {
    return res.status(400).json({ status: 'fail', message: '缺少必要的資訊' })
  }

  try {
    // **檢查是否已經存在**
    const [rows] = await pool.query('SELECT * FROM users WHERE google_id = ?', [
      google_id,
    ])

    let user = null

    if (rows.length > 0) {
      console.log(' 用戶已存在:', rows[0])
      user = rows[0] // 直接使用已存在的用戶
    } else {
      const [result] = await pool.query(
        'INSERT INTO users (google_id, email, name, avatar_url) VALUES (?, ?, ?, ?)',
        [google_id, email, name, avatar_url]
      )

      if (result.affectedRows == 0) {
        throw new Error('用戶新增失敗')
      }

      user = {
        id: result.insertId,
        google_id,
        email,
        name,
        avatar_url,
      }

      console.log('新用戶成功儲存:', user)
    }

    // **產生 JWT Token**
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    })

    return res.status(200).json({
      status: 'success',
      message: 'Google 登入成功',
      user,
      token,
    })
  } catch (error) {
    console.error(' Google 登入錯誤:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤', error })
  }
})

export default router
