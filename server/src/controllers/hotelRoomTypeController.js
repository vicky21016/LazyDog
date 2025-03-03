import {
  getAllHotelRooms,
  getHotelRoomByIds,
  createHotelRooms,
  updateHotelRooms,
  deleteHotelRooms,
  getAllRoomTypes,
  getHotelRoomByOperatorId,
} from "../services/hotelRoomTypeService.js";
import pool from "../config/mysql.js";
export const getAllHotelRoom = async (req, res) => {
  try {
    const rooms = await getAllHotelRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: "無法取得房型：" + error.message });
  }
};
export const getHotelRoomById = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;

    const rooms = await getHotelRoomByIds(hotelId); // 從資料庫獲取房型資料

    res.status(200).json({ status: "success", data: rooms });
  } catch (error) {
    console.error("獲取房型時發生錯誤：", error);
    res.status(500).json({ error: "無法獲取房型：" + error.message });
  }
};
export const getHotelRoomsByOperator = async (req, res) => {
  try {
    const operatorId = req.params.operatorId;

    const rooms = await getHotelRoomByOperatorId(operatorId); // 從資料庫獲取房型資料

    res.status(200).json({ status: "success", data: rooms });
  } catch (error) {
    console.error("獲取房型時發生錯誤：", error);
    res.status(500).json({ error: "無法獲取房型：" + error.message });
  }
};
export const createHotelRoom = async (req, res) => {
  try {
    let imageUrl = null;
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      imageUrl = `${baseUrl}/uploads/hotel/${req.file.filename}`;
    }

    const {
      hotel_id,
      room_type_id,
      quantity,
      price_per_night,
      description,
      pet_capacity,
      allowed_pet_size,
      default_food_provided,
    } = req.body;

    if (
      !hotel_id ||
      !room_type_id ||
      !quantity ||
      !price_per_night ||
      !description
    ) {
      return res.status(400).json({ error: "缺少必填欄位" });
    }

    const parsedQuantity = parseInt(quantity, 10) || 0;
    const parsedPrice = parseFloat(price_per_night) || 0;
    const parsedPetCapacity = parseInt(pet_capacity, 10) || 0; // 避免 NULL

    const finalAllowedSize = allowed_pet_size || "無限制";
    const finalFoodProvided = default_food_provided || "否";

    const newRoom = await createHotelRooms({
      hotel_id,
      room_type_id,
      quantity: parsedQuantity,
      price_per_night: parsedPrice,
      description,
      pet_capacity: parsedPetCapacity,
      allowed_pet_size: finalAllowedSize,
      default_food_provided: finalFoodProvided,
      image_url: imageUrl,
    });

    res.status(201).json({ message: "房型已成功新增", id: newRoom.id });
  } catch (error) {
    res.status(400).json({ error: "無法新增房型：" + error.message });
  }
};

export const updateHotelRoom = async (req, res) => {
  try {
    const roomId = req.params.id;

    const {
      quantity,
      price_per_night,
      description,
      pet_capacity,
      allowed_pet_size,
      default_food_provided,
    } = req.body;

    const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    let updateQuery = "UPDATE hotel_room_types SET ";
    const updateParams = [];

    if (quantity !== undefined)
      (updateQuery += "quantity=?, "), updateParams.push(quantity);
    if (price_per_night !== undefined)
      (updateQuery += "price_per_night=?, "),
        updateParams.push(price_per_night);
    if (description !== undefined)
      (updateQuery += "description=?, "), updateParams.push(description);
    if (pet_capacity !== undefined)
      (updateQuery += "pet_capacity=?, "), updateParams.push(pet_capacity);
    if (allowed_pet_size !== undefined)
      (updateQuery += "allowed_pet_size=?, "),
        updateParams.push(allowed_pet_size);
    if (default_food_provided !== undefined)
      (updateQuery += "default_food_provided=?, "),
        updateParams.push(default_food_provided);
    if (image_url !== undefined)
      (updateQuery += "image_url=?, "), updateParams.push(image_url); // ✅ 只有當 `image_url` 存在時才更新

    if (updateParams.length == 0) {
      return res.status(400).json({ error: "沒有可更新的欄位" });
    }

    updateQuery = updateQuery.slice(0, -2) + " WHERE id=? AND is_deleted = 0";
    updateParams.push(roomId);

    const [result] = await pool.query(updateQuery, updateParams);

    if (result.affectedRows == 0) {
      return res
        .status(404)
        .json({ error: "更新失敗，可能是傳入的數據與現有數據相同" });
    }

    res.status(200).json({ message: "房型已更新", image_url });
  } catch (error) {
    console.error("更新房型時發生錯誤：", error);
    res.status(500).json({ error: "無法更新房型：" + error.message });
  }
};

export const deleteHotelRoom = async (req, res) => {
  try {
    const deleted = await deleteHotelRooms(req.params.id);
    if (!deleted) return res.status(404).json({ message: "房型不存在" });
    res.status(200).json({ message: "房型已刪除" });
  } catch (error) {
    res.status(500).json({ error: "無法刪除房型：" + error.message });
  }
};
export const getAllRoomTypesController = async (req, res) => {
  try {
    const roomTypes = await getAllRoomTypes();
    res.json({ status: "success", data: roomTypes });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "無法獲取房型種類: " + error.message });
  }
};
export const uploadRoomImage = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    if (!req.file) {
      return res.status(400).json({ error: "未上傳圖片" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const image_url = `${baseUrl}/uploads/hotel/${req.file.filename}`;

    const [result] = await pool.query(
      "UPDATE hotel_room_types SET image_url = ? WHERE id = ?",
      [image_url, roomId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "找不到房型" });
    }

    res.status(200).json({ message: "圖片上傳成功", image_url });
  } catch (error) {
    res.status(500).json({ error: "無法上傳圖片：" + error.message });
  }
};
