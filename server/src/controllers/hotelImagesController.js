import {
  getAllHotelsImages,
  getById,
} from '../services/hotelImagesService.js'
// searchHotelImages,
export const getHotelsImages = async (req, res) => {
  try {
    const hotels = await getAllHotelsImages()
    res.json(hotels)
  } catch (err) {
    res.status(500).json({ err: `找不到全部圖片` })
  }
}

export const getByIds = async (req, res) => {
  try {
    const id = Number(req.params.id, 10)
    if (NaN(id)) {
      return res.status(400).json({ err: '無效的 ID' })
    }
    const hotel = await getById(id)
    if (!hotel) {
      return res.status(404).json({ err: `找不到 id=${id} ` })
    }
    res.json(hotel)
  } catch (err) {
    res.status(500).json({ err: `找不到圖片` })
  }
}

// export const getByhotelId = async (req, res) => {
//   try {
//     const { hotel_id } = req.query;
//     if (!hotel_id || isNaN(hotel_id)) {
//       return res.status(400).json({ error: "請提供有效的 hotel_id" });
//     }

//     const images = await searchHotelImages(hotel_id);

//     if (!images.length) {
//       return res.status(404).json({ error: `找不到 hotel_id= ${hotel_id} 的圖片` });
//     }

//     res.status(200).json({
//       status: "success",
//       data: images,
//       message: `查詢 hotel_id=${hotel_id} 成功，共 ${images.length} 筆資料`,
//     });
//   } catch (err) {
//     res.status(500).json({ error: `無法獲取圖片: ${err.message}` });
//   }
// };
