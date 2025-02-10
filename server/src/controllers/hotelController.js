import { getHotels, getId, createHotels } from "../services/hotelService.js";

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await getHotels();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByIds = async (req, res) => {
  try {
    console.log("找到ID:", req.params.id);
    const id = parseInt(req.params.id, 10); //eddy的

    if (isNaN(id)) {
      return res.status(400).json({ error: "無效的 ID 確認一下" });
    }

    const hotel = await getId(id);
    if (!hotel) {
      return res.status(404).json({ error: `找不到 id=${id} 的旅館` });
    }

    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createHotel = async (req, res) => {
  try {
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
      category,
      check_in_time,
      check_out_time,
      contact_email,
    } = req.body;

    if (!name || !county || !district || !address || !phone) {
      return res
        .status(400)
        .json({
          error: "缺少必要欄位 (name, county, district, address, phone)",
        });
    }
    console.log(" 收到請求資料:", req.body);
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
      category,
      check_in_time,
      check_out_time,
      contact_email,
    });

    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
