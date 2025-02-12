import {
  getHotels,
  getId,
  createHotels,
  updateHotelById,
  softDeleteHotelById,
  searchHotels,
} from "../services/hotelService.js";

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await getHotels();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ err: `找不到旅館` });
  }
};

export const getSearch = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) throw new Error("找不到關鍵字");
    const hotels = await searchHotels(keyword);
    if (!hotels.length) throw new Error("查無相關商品");
    res.status(200).json({
      status: "success",
      data: hotels,
      message: `查詢： ${keyword} 成功，共${hotels.length}筆資料`,
    });
  } catch (err) {
    res.status(500).json({ err: `找不到旅館` });
  }
};
export const getByIds = async (req, res) => {
  try {
    console.log("找到旅館ID:", req.params.id);
    const id = Number(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ err: "無效的 ID" });
    }

    const hotel = await getId(id);
    if (!hotel) {
      return res.status(404).json({ err: `找不到 id=${id} 的旅館` });
    }

    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: `找不到旅館` });
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
      return res.status(400).json({
        error: "缺少必要欄位 (name, county, district, address, phone)",
      });
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
      category,
      check_in_time,
      check_out_time,
      contact_email,
    });

    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: `無法建立旅館` });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotelData = req.body;

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "無效的 ID" });
    }

    const updatedHotel = await updateHotelById({ id, ...hotelData });
    if (!updatedHotel) {
      return res.status(404).json({ error: `找不到 id=${id} 或該旅館已刪除` });
    }

    res.json({ message: `旅館 id=${id} 更新成功` });
  } catch (error) {
    res.status(500).json({ error: `找不到旅館` });
  }
};

export const softDeleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHotel = await softDeleteHotelById(id);

    if (!deletedHotel) {
      return res.status(404).json({ error: `找不到 id=${id} 或該旅館已刪除` });
    }

    res.json({ message: `旅館 id=${id} 已軟刪除` });
  } catch (error) {
    res.status(500).json({ error: `找不到旅館` });
  }
};
