import {
  getAllHotelsImages,
  getById,
  searchHotelImages,
} from '../services/hotelImagesService.js'

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
    if (isNaN(id)) {
      return res.status(400).json({ err: '無效的 ID' })
    }

    const hotel = await getById(id)
    if (!hotel) {
      return res.status(404).json({ err: `找不到 id=${id} ` })
    }
    res.json(hotel)
  } catch (err) {
    res.status(500).json({ err: `找不到 id=${id}圖片` })
  }
}

export const getByHotelId = async (req, res) => {
  try {
    const { hotel_id } = req.params // 來自網址的參數
    if (!hotel_id) {
      return res.status(400).json({ error: '請提供 hotel_id' })
    }
    const hotelIdNumber = parseInt(hotel_id, 10)
    if (isNaN(hotelIdNumber)) {
      return res.status(400).json({ error: 'hotel_id 必須是數字' })
    }
    const images = await searchHotelImages(hotelIdNumber)
    if (!images.length) {
      return res.status(404).json({
        status: 'fail',
        message: `查無 hotel_id: ${hotelIdNumber} 相關的圖片`,
      })
    }
    res.status(200).json({
      status: 'success',
      data: images,
      message: `查詢成功，共 ${images.length} 筆資料`,
    })
  } catch (error) {
    res.status(500).json({ error: '伺服器錯誤', details: error.message })
  }
}
