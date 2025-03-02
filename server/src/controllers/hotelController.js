import {
  getHotels,
  getId,
  getOperatorTZJ,
  createHotels,
  updateHotelById,
  softDeleteHotelById,
  searchHotels,
  getFilteredHotels,
  updateMainImages,
  deleteHotelImagesByIds,
  insertHotelImage,
  deleteImageById
} from "../services/hotelService.js";
import pool from "../config/mysql.js";
const validateHotelId = (id) => {
  const hotelId = Number(id);
  if (isNaN(hotelId)) {
    throw new Error("無效的 ID，請提供數字格式");
  }
  return hotelId;
};
const handleError = (res, error, message = "伺服器錯誤") => {
  console.error(`${message}:`, error);
  res.status(500).json({ error: message, details: error.message });
};
/* 取得所有飯店（支援排序） */
export const getAllHotels = async (req, res) => {
  try {
    const { sort } = req.query;
    const hotels = await getHotels(sort);
    res.json(hotels);
  } catch (error) {
    handleError(res, error, "獲取飯店列表失敗");
  }
};

export const getSearch = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) throw new Error("請提供關鍵字");

    const hotels = await searchHotels(keyword);
    if (!hotels.length) throw new Error("查無相關飯店");

    res.status(200).json({
      status: "success",
      data: hotels,
      message: `查詢：${keyword} 相關成功，共 ${hotels.length} 筆資料`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getByIds = async (req, res) => {
  try {
    const id = validateHotelId(req.params.id);
    const { checkInDate, checkOutDate } = req.query;

    const hotel = await getId(id, checkInDate, checkOutDate);
    if (!hotel) {
      return res.status(404).json({ error: `找不到 id=${id} 的旅館` });
    }

    res.json(hotel);
  } catch (error) {
    handleError(res, error, "獲取飯店失敗");
  }
};

export const getOperatorHotels = async (req, res) => {
  try {
    const operatorId = validateHotelId(req.params.id);
    const userId = req.user.id;

    if (operatorId !== userId) {
      return res.status(403).json({ error: "你沒有權限查看這間旅館" });
    }

    const hotels = await getOperatorTZJ(req);
    if (!hotels.length) {
      return res.status(404).json({ error: "找不到旅館資料" });
    }

    res.json(hotels);
  } catch (error) {
    handleError(res, error, "獲取負責人飯店失敗");
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
      data: newHotel,
    });
  } catch (error) {
    handleError(res, error, "建立飯店失敗");
  }
};
export const updateHotel = async (req, res) => {
  try {
    const id = validateHotelId(req.params.id);
    let { deleteImageIds, ...hotelData } = req.body;

    if (deleteImageIds) {
      deleteImageIds = Array.isArray(deleteImageIds)
        ? deleteImageIds.map(Number).filter((id) => !isNaN(id))
        : [];
    }

    if (deleteImageIds.length > 0) {
      const deleteResult = await deleteHotelImagesByIds(deleteImageIds, false);
      if (deleteResult.error) return res.status(500).json(deleteResult);
    }

    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = req.files.map((file) => ({
        url: `/uploads/hotel/${file.filename}`,
        description: null,
        hotel_id: id,
      }));
      const insertResult = await insertHotelImages(newImages);
      if (insertResult.error) return res.status(500).json(insertResult);
    }

    const updatedHotel = await updateHotelById({ id, ...hotelData });
    if (!updatedHotel) {
      return res.status(404).json({ error: `找不到 id=${id} 或該旅館已刪除` });
    }

    res.json({ message: `旅館 id=${id} 更新成功` });
  } catch (error) {
    handleError(res, error, "更新旅館失敗");
  }
};

export const updateMainImage = async (req, res) => {
  try {
    const { hotelId, imageId } = req.params;
    if (!hotelId || !imageId) {
      return res.status(400).json({ message: "缺少 hotelId 或 imageId" });
    }

    const result = await updateMainImages(hotelId, imageId);
    res.json({ status: "success", message: "主圖片更新成功" });
  } catch (error) {
    handleError(res, error, "更新主圖片失敗");
  }
};

export const softDeleteHotel = async (req, res) => {
  try {
    const hotelId = validateHotelId(req.params.id);
    const operatorId = req.user.id;

    const deletedHotel = await softDeleteHotelById(hotelId, operatorId);
    if (deletedHotel.error) {
      return res.status(403).json({ error: deletedHotel.error });
    }

    res.json({ message: `旅館 id=${hotelId} 已軟刪除` });
  } catch (error) {
    handleError(res, error, "刪除旅館失敗");
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
    handleError(res, error, "獲取飯店總數失敗");
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
    handleError(res, error, "獲取分頁飯店失敗");
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
    handleError(res, error, "獲取篩選飯店失敗");
  }
};
//刪除單張圖片
export const deleteHotelImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const success = await deleteImageById(imageId);
    if (!success) {
      return res.status(404).json({ error: "圖片不存在或已刪除" });
    }
    res.json({ status: "success", message: "圖片已刪除" });
  } catch (error) {
    handleError(res, error, "刪除圖片失敗");
  }
};


export const deleteHotelImages = async (req, res) => {
  try {
    const { imageIds } = req.body;
    if (!Array.isArray(imageIds) || imageIds.length === 0) {
      return res.status(400).json({ error: "請提供要刪除的圖片 ID" });
    }

    const validImageIds = imageIds.map(Number).filter((id) => !isNaN(id));
    if (validImageIds.length !== imageIds.length) {
      return res.status(400).json({ error: "圖片 ID 必須是數字" });
    }

    const result = await deleteHotelImagesByIds(validImageIds, false);
    res.json(result);
  } catch (error) {
    handleError(res, error, "批量刪除圖片失敗");
  }
};
export const uploadHotelImage = async (req, res) => {
  try {
    const { hotelId } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: "請上傳圖片" });
    }

    const imageUrl = `/uploads/hotels/${req.file.filename}`;
    const imageId = await insertHotelImage(hotelId, imageUrl);

    res.json({ status: "success", image_id: imageId, image_url: imageUrl });
  } catch (error) {
    handleError(res, error, "圖片上傳失敗");
  }
};

