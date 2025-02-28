import {
  getHotels,
  getId,
  getOperatorTZJ,
  createHotels,
  updateHotelById,
  softDeleteHotelById,
  searchHotels,
  getFilteredHotels,
} from "../services/hotelService.js";
import pool from "../config/mysql.js";

/* 取得所有飯店（支援排序） */
export const getAllHotels = async (req, res) => {
  try {
    const { sort } = req.query; // 取得排序參數
    const hotels = await getHotels(sort); // 讓 getHotels() 接受排序條件
    res.json(hotels);
  } catch (error) {
    console.error("獲取飯店列表失敗:", error);
    res.status(500).json({ error: "無法獲取飯店列表" });
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
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "無效的 ID，請提供數字格式" });
    }

    const hotel = await getId(id); // 確保這個函數可以正確查詢資料
    if (!hotel) {
      console.log(` 找不到 id=${id} 的旅館`);
      return res.status(404).json({ error: `找不到 id=${id} 的旅館` });
    }

    res.json(hotel);
  } catch (err) {
    console.error("伺服器錯誤:", err);
    res.status(500).json({ error: `伺服器錯誤: ${err.message}` });
  }
};

export const getOperatorHotels = async (req, res) => {
  try {
    const operatorId = Number(req.params.id);
    const userId = req.user.id;

    console.log("解析出的 operatorId:", operatorId);
    console.log("當前登入的 userId:", userId);

    if (!operatorId || isNaN(operatorId)) {
      return res.status(400).json({ error: "無效的 ID，請提供數字格式" });
    }

   
    if (operatorId !== userId) {
      return res.status(403).json({ error: "你沒有權限查看這間旅館" });
    }

    const [hotels] = await pool.query(
      "SELECT * FROM hotel WHERE operator_id = ?",
      [operatorId]
    );

    if (hotels.length == 0) {
      return res.status(404).json({ error: "找不到旅館資料" });
    }

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createHotel = async (req, res) => {
  try {
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
    const hotelId = req.params.id; // 取得前端傳來的 hotel ID
    const operatorId = req.user.id; // 透過 JWT 解析的 operator ID

    //  呼叫軟刪除函數並傳遞 `hotelId` 和 `operatorId`
    const deletedHotel = await softDeleteHotelById(hotelId, operatorId);

    if (deletedHotel.error) {
      return res.status(403).json({ error: deletedHotel.error }); // 403 Forbidden
    }

    res.json({ message: `旅館 id=${hotelId} 已軟刪除` });
  } catch (error) {
    console.error("刪除旅館失敗：", error);
    res.status(500).json({ error: ` 刪除旅館時發生錯誤` });
  }
};

/** 取得飯店總數 */
export const getHotelsCount = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS total FROM hotel WHERE is_deleted = 0`
    );
    res.json({ total: rows[0].total || 0 });
  } catch (error) {
    console.error("無法獲取飯店總數:", error);
    res.status(500).json({ error: "伺服器錯誤" });
  }
};

/** 取得分頁飯店 */
export const getPaginatedHotels = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const [hotels] = await pool.query(
      `SELECT * FROM hotel WHERE is_deleted = 0 LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json(hotels);
  } catch (error) {
    console.error("獲取飯店清單失敗:", error);
    res.status(500).json({ error: "伺服器錯誤" });
  }
};

/* 取得篩選後的飯店 */
export const getFilteredHotelsS = async (req, res) => {
  try {
    const filters = {
      city: req.body.city || null,
      district: req.body.district || null,
      checkInDate: req.body.checkInDate || null,
      checkOutDate: req.body.checkOutDate || null,
      min_rating: req.body.minRating ? parseFloat(req.body.minRating) : null,
      min_price: req.body.minPrice ? parseFloat(req.body.minPrice) : null,
      max_price: req.body.maxPrice ? parseFloat(req.body.maxPrice) : null,
      room_type_id: req.body.roomTypeId ? parseInt(req.body.roomTypeId) : null,
      tags: req.body.tags
        ? req.body.tags.map(Number).filter((n) => !isNaN(n))
        : [],
    };
    const hotels = await getFilteredHotels(filters);
    res.json(hotels);
  } catch (error) {
    console.error("獲取篩選飯店失敗:", error);
    res.status(500).json({ error: "無法獲取篩選後的飯店" });
  }
};
