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
  uploadHotelImage, // ✅ 新增上傳圖片控制器
} from "../controllers/hotelController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// 取得飯店總數
router.get("/count", getHotelsCount);

// 取得分頁飯店
router.get("/paginated", getPaginatedHotels);

// 篩選飯店
router.get("/filter", getFilteredHotelsS);
router.post("/filter", getFilteredHotelsS);

// 查詢所有飯店
router.get("/", getAllHotels);
router.get("/search", getSearch);
router.get("/:id", getByIds);

// 只有 operator 可以查看自己的飯店
router.get(
  "/operator/:id",
  verifyToken,
  verifyRole(["operator"]),
  getOperatorHotels
);

// 只有 operator 可以新增、更新、刪除飯店
router.post(
  "/",
  verifyToken,
  verifyRole(["operator"]),
  upload.array("images", 5),
  createHotel
);

router.patch(
  "/:id",
  verifyToken,
  verifyRole(["operator"]),
  upload.array("newImages", 5),
  updateHotel
);

router.patch(
  "/:id/soft-delete",
  verifyToken,
  verifyRole(["operator"]),
  softDeleteHotel
);

// 更換主要圖片
router.patch(
  "/:hotelId/main-image/:imageId",
  verifyToken,
  verifyRole(["operator"]),
  updateMainImage
);

// 刪除單張圖片
router.delete(
  "/:hotelId/image/:imageId",
  verifyToken,
  verifyRole(["operator"]),
  deleteHotelImage
);

// 批量刪除圖片
router.delete(
  "/images",
  verifyToken,
  verifyRole(["operator"]),
  deleteHotelImages
);

router.post(
  "/:hotelId/images",
  verifyToken,
  verifyRole(["operator"]),
  upload.single("image"),
  uploadHotelImage
);

export default router;
