import jwt from 'jsonwebtoken'
import pool from '../config/mysql.js'
import dotenv from 'dotenv'

dotenv.config()
const secretKey = process.env.JWT_SECRET_KEY

if (!secretKey) {
  console.error(' JWT_SECRET_KEY 未設定，請檢查環境變數！')
  process.exit(1)
}

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
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ status: 'error', message: 'Token 無效或已過期' })
      }
      req.user = decoded
      next()
    })
  } catch (err) {
    console.error(' Token 驗證錯誤:', err)
    return res.status(401).json({ error: 'Token 無效或已過期' })
  }
}

export const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(401)
        .json({ status: 'error', message: '未授權，請重新登入' })
    }
    // 確保 roles 是陣列
    const allowedRoles = Array.isArray(roles) ? roles : [roles]

    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ status: 'error', message: '您沒有權限執行此操作' })
    }
    next()
  }
}
