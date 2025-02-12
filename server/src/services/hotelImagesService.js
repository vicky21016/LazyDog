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
// http://localhost:5000/api/hotel_images/search?hotel_id=3
// export const searchHotelImages = async (hotel_id) => {
//   try {
//     if (!hotel_id || isNaN(hotel_id)) {
//       throw new Error('請提供有效的 hotel_id')
//     }

//     const [images] = await pool.execute(
//       'SELECT * FROM hotel_images WHERE hotel_id = ? AND is_deleted = 0',
//       [hotel_id]
//     )

//     return images
//   } catch (err) {
//     throw new Error(`無法取得 hotel_id=${hotel_id} 的圖片: ${err.message}`)
//   }
// }
