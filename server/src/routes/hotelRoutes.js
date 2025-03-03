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