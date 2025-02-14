import pool from '../config/mysql.js'

export const getAllHotelsImages = async () => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM hotel_images WHERE is_deleted = 0'
    )
    return result
  } catch (err) {
    throw new Error('無法取得所有圖片' + err.message)
  }
}
export const getById = async (id) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM hotel_images WHERE id = ? AND is_deleted = 0',
      [id]
    )
    return result
  } catch (err) {
    throw new Error(`無法取得 ${id} 的圖片: ${err.message}`)
  }
}
//用這個去做搜尋 http://localhost:5000/api/hotel_images/image/1
export const searchHotelImages = async (hotel_id) => {
  try {
    const [images] = await pool.execute(
      'SELECT * FROM hotel_images WHERE hotel_id = ? AND is_deleted = 0',
      [hotel_id]
    )
    return images
  } catch (error) {
    throw new Error(
      `無法取得 hotel_images=${hotel_id} 的圖片: ${error.message}`
    )
  }
}
