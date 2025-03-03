import express from "express";
import {
  getAllHotels,
  getByIds,
  getOperatorHotels,
  createHotel,
  updateHotel,
  softDeleteHotel,
  getSearch,
  getHotelsCount,
  getPaginatedHotels,
  deleteHotelImage,
  deleteHotelImages,
  updateMainImage,
  getFilteredHotelsS,
  uploadHotelImage,
} from "../controllers/hotelController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";
import pool from "../config/mysql.js";

const router = express.Router();

// ------------------------------
// 公開路由（不需要驗證權限）
// ------------------------------
router.get("/count", getHotelsCount); // 取得飯店總數
router.get("/paginated", getPaginatedHotels); // 取得分頁飯店
router.get("/filter", getFilteredHotelsS); // 篩選飯店
router.post("/filter", getFilteredHotelsS); // 篩選飯店（POST）
router.get("/", getAllHotels); // 查詢所有飯店
router.get("/search", getSearch); // 搜尋飯店
router.get("/:id", getByIds); // 取得特定飯店

// ------------------------------
// **新增：價格範圍 API**
// ------------------------------
router.get("/price-range/all", async (req, res) => {
  try {
    const query = `
      SELECT 
        COALESCE(NULLIF(MIN(price_per_night), 0), 500) AS min_price, 
        COALESCE(NULLIF(MAX(price_per_night), 0), 10000) AS max_price
      FROM hotel_room_types
      WHERE price_per_night IS NOT NULL AND price_per_night > 0;
    `;
    
    console.log("🔍 正在執行 SQL 查詢...");
    
    const [rows] = await pool.query(query);
    
    console.log("🔹 查詢結果:", rows);

    if (!rows || rows.length == 0) {
      console.log(" 沒有查詢到價格範圍資料！");
      return res.json({ min_price: 500, max_price: 10000 });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(" 獲取全域價格範圍失敗:", error);
    res.status(500).json({ error: "無法獲取全域價格範圍", details: error.message });
  }
});


// 取得特定飯店的最低 / 最高房價
router.get("/price-range/:hotelId", async (req, res) => {
  const { hotelId } = req.params;
  try {
    const query = `
      SELECT 
        COALESCE(MIN(price_per_night), 0) AS min_price, 
        COALESCE(MAX(price_per_night), 10000) AS max_price
      FROM hotel_room_types 
      WHERE hotel_id = ? AND price_per_night IS NOT NULL AND price_per_night > 0;
    `;
    const [rows] = await pool.query(query, [hotelId]);

    if (!rows || rows.length == 0) {
      return res.status(404).json({ error: `找不到 hotel_id=${hotelId} 的價格資料` });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(`獲取 hotel_id=${hotelId} 的價格範圍失敗:`, error);
    res.status(500).json({ error: "無法獲取飯店價格範圍" });
  }
});





// ------------------------------
// 受保護路由（需要驗證權限）
// ------------------------------

// 只有 operator 可以查看自己的飯店
router.get(
  "/operator/:id",
  verifyToken,
  verifyRole(["operator"]),
  getOperatorHotels
);

// 只有 operator 可以新增飯店
router.post(
  "/",
  verifyToken,
  verifyRole(["operator"]),
  upload.array("images", 5), // 允許上傳最多 5 張圖片
  createHotel
);

// 只有 operator 可以更新飯店
router.patch(
  "/:id",
  verifyToken,
  verifyRole(["operator"]),
  upload.array("newImages", 5), // 允許上傳最多 5 張新圖片
  updateHotel
);

// 只有 operator 可以軟刪除飯店
router.patch(
  "/:id/soft-delete",
  verifyToken,
  verifyRole(["operator"]),
  softDeleteHotel
);

// 只有 operator 可以更換主圖片
router.patch(
  "/:hotelId/main-image/:imageId",
  verifyToken,
  verifyRole(["operator"]),
  updateMainImage
);

// 只有 operator 可以刪除單張圖片
router.delete(
  "/:hotelId/image/:imageId",
  verifyToken,
  verifyRole(["operator"]),
  deleteHotelImage
);

// 只有 operator 可以批量刪除圖片
router.delete(
  "/images",
  verifyToken,
  verifyRole(["operator"]),
  deleteHotelImages
);

// 只有 operator 可以上傳圖片
router.post(
  "/:hotelId/images",
  verifyToken,
  verifyRole(["operator"]),
  upload.single("image"), // 允許上傳單張圖片
  uploadHotelImage
);

export default router;
