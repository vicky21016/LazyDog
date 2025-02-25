import jwt from 'jsonwebtoken'
import pool from '../config/mysql.js'
import dotenv from 'dotenv'

dotenv.config()
// console.log(`JWT Secret Key: ${secretKey}`);
const secretKey = process.env.JWT_SECRET_KEY

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.get('Authorization')
    if (!token) {
      return res.status(401).json({ status: 'error', message: '未提供 Token' })
    }
    if (!token.startsWith('Bearer ')) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Token 格式錯誤' })
    }
    token = token.slice(7)
    console.log(token);
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ status: 'error', message: `Token 無效或已過期: ${err}` })
      }

      // 檢查使用者是否仍然存在於資料庫
      const [user] = await pool.execute(
        'SELECT id, role FROM users WHERE id = ? AND is_deleted = 0',
        [decoded.id]
      )

      if (user.length == 0) {
        return res
          .status(401)
          .json({ status: 'error', message: '不存在或已停用' })
      }

      req.user = user[0]
      next()
    })
  } catch (err) {
    console.error('Token 驗證錯誤:', err)
    return res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
}
export const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(401)
        .json({ status: 'error', message: '未授權，請重新登入' })
    }
    const allowedRoles = Array.isArray(roles) ? roles : [roles]

    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ status: 'error', message: '您沒有權限執行此操作' })
    }
    next()
  }
}
