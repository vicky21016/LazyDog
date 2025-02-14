import {
  getHotels,
  getId,
  createHotels,
  updateHotelById,
  softDeleteHotelById,
  searchHotels,
} from '../services/hotelService.js'

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await getHotels()
    res.json(hotels)
  } catch (err) {
    res.status(500).json({ err: `找不到旅館` })
  }
}

export const getSearch = async (req, res) => {
  try {
    const { keyword } = req.query
    if (!keyword) throw new Error('請提供關鍵字')

    const hotel = await searchHotels(keyword)
    if (!hotel.length) throw new Error('查無')
    res.status(200).json({
      status: 'success',
      data: hotel,
      message: `查詢： ${keyword} 相關成功，共${hotel.length}筆資料`,
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
export const getByIds = async (req, res) => {
  try {
    console.log('找到旅館ID:', req.params.id)
    const id = Number(req.params.id, 10)

    if (isNaN(id)) {
      return res.status(400).json({ err: '無效的 ID' })
    }

    const hotel = await getId(id)
    if (!hotel) {
      return res.status(404).json({ err: `找不到 id=${id} 的旅館` })
    }

    res.json(hotel)
  } catch (err) {
    res.status(500).json({ error: `找不到旅館` })
  }
}

export const createHotel = async (req, res) => {
  try {
    console.log('收到請求資料:', req.body)

    const {
      name,
      link,
      county,
      district,
      address,
      phone,
      room_total,
      introduce,
      status,
      latitude,
      longitude,
      map_link,
      check_in_time,
      check_out_time,
      contact_email,
      url,
    } = req.body

    if (
      !name ||
      !link ||
      !county ||
      !district ||
      !address ||
      !phone ||
      !room_total ||
      !introduce ||
      !map_link ||
      !check_in_time ||
      !check_out_time ||
      !contact_email
    ) {
      return res.status(400).json({ error: '缺少必要欄位' })
    }

    const newHotel = await createHotels({
      name,
      link,
      county,
      district,
      address,
      phone,
      room_total,
      introduce,
      status,
      latitude,
      longitude,
      map_link,
      check_in_time,
      check_out_time,
      contact_email,
      url,
    })

    res.status(201).json({
      success: true,
      message: '飯店與圖片建立成功',
      data: newHotel,
    })
  } catch (error) {
    console.error('建立飯店錯誤:', error)
    res.status(500).json({ error: '無法建立旅館', details: error.message })
  }
}

export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params
    const hotelData = req.body

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: '無效的 ID' })
    }

    const updatedHotel = await updateHotelById({ id, ...hotelData })
    if (!updatedHotel) {
      return res.status(404).json({ error: `找不到 id=${id} 或該旅館已刪除` })
    }

    res.json({ message: `旅館 id=${id} 更新成功` })
  } catch (error) {
    res.status(500).json({ error: `找不到旅館` })
  }
}

export const softDeleteHotel = async (req, res) => {
  try {
    const { id } = req.params

    const deletedHotel = await softDeleteHotelById(id)

    if (!deletedHotel) {
      return res.status(404).json({ error: `找不到 id=${id} 或該旅館已刪除` })
    }

    res.json({ message: `旅館 id=${id} 已軟刪除` })
  } catch (error) {
    res.status(500).json({ error: `找不到旅館` })
  }
}
