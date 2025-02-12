import pool from '../config/mysql.js'

export const getAllHotelsImages = async () => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM hotel_images WHERE is_deleted = 0'
    )
    return result
  } catch (err) {
    throw new Error('無法取得圖片' + err.message)
  }
}
