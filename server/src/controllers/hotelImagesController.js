import { getAllHotelsImages } from '../services/hotelImagesService.js'

export const getHotelsImages = async (req, res) => {
  try {
    const hotels = await getAllHotelsImages()
    res.json(hotels)
  } catch (err) {
    res.status(500).json({ err: `找不到全部圖片` })
  }
}
