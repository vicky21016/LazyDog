import {
  getHotels,
  getId,
  getOperatorTZJ,
  createHotels,
  updateHotelById,
  softDeleteHotelById,
  searchHotels,
} from "../services/hotelService.js";

export const getAllHotels = async (req, res) => {
  try {
    // 解析查詢參數，確保為數字型態
    const minRating = req.query.min_rating
      ? parseFloat(req.query.min_rating)
      : 0;
    const minPrice = req.query.min_price ? parseFloat(req.query.min_price) : 0;
    const maxPrice = req.query.max_price
      ? parseFloat(req.query.max_price)
      : 10000;
    const roomTypeId = req.query.room_type_id
      ? parseInt(req.query.room_type_id)
      : null;

    // 傳遞完整的查詢參數給 `getHotels`
    const hotels = await getHotels(minRating, minPrice, maxPrice, roomTypeId);

    res.json(hotels);
  } catch (error) {
    console.error("獲取飯店列表失敗:", error);
    res.status(500).json({ message: "無法獲取飯店列表" });
  }
};

export const getSearch = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) throw new Error("請提供關鍵字");

    const hotel = await searchHotels(keyword);
    if (!hotel.length) throw new Error("查無");
    res.status(200).json({
      status: "success",
      data: hotel,
      message: `查詢： ${keyword} 相關成功，共${hotel.length}筆資料`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
export const getOperatorHotels = async (req, res) => {
  try {
    const operatorId = req.user.id;
    const hotels = await getOperatorTZJ(operatorId);
    res.status(200).json({ success: true, data: hotels });
  } catch (err) {
    res.status(500).json({ error: `無法獲取旅館` });
  }
};

export const createHotel = async (req, res) => {
  try {
    console.log("收到請求資料:", req.body);
    console.log("收徒確認之後會刪掉", req.files);

    const operatorId = req.user.id;
    const {
      name,
      link,
      county,
      district,
      address,
      phone,
      room_total,
      introduce,
      latitude,
      longitude,
      map_link,
      check_in_time,
      check_out_time,
      contact_email,
      url,
    } = req.body;

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
      return res.status(400).json({ error: "缺少必要欄位" });
    }

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map((file) => `/uploads/hotel/${file.filename}`);
    }

    const newHotel = await createHotels({
      operator_id: operatorId,
      name,
      link,
      county,
      district,
      address,
      phone,
      room_total,
      introduce,
      latitude,
      longitude,
      map_link,
      check_in_time,
      check_out_time,
      contact_email,
      url: imageUrls,
    });

    res.status(201).json({
      success: true,
      message: "飯店與圖片建立成功",
      data: newHotel, //確認而已可以再刪
    });
  } catch (error) {
    console.error("建立飯店錯誤:", error);
    res.status(500).json({ error: "無法建立旅館", details: error.message });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleteImageIds, ...hotelData } = req.body;

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "無效的 ID" });
    }
    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = req.files.map((file) => ({
        url: `/uploads/hotel/${file.filename}`,
        description: null, // 預設為 null
      }));
    }
    const updatedHotel = await updateHotelById({
      id,
      deleteImageIds: deleteImageIds || [],
      newImages: newImages || [],
      ...hotelData,
    });
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
