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
} from "../controllers/hotelController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// 取得飯店總數
router.get("/count", getHotelsCount);

// 取得分頁飯店
router.get("/paginated", getPaginatedHotels); // 避免與 `getAllHotels` 衝突
//篩選飯店的 AP
router.get("/filter", getFilteredHotelsS);
router.post("/filter", getFilteredHotelsS);
//  所有人都可以查詢所有飯店
router.get("/", getAllHotels); //不用任何條件的
router.get("/search", getSearch);
router.get("/:id", getByIds);

//  自己可以查看自己擁有的飯店
router.get(
  "/operator/:id",
  verifyToken,
  verifyRole(["operator"]),
  getOperatorHotels
);

//  新增、更新、刪除自己管理的飯店
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
router.patch(
  "/:hotelId/main-image/:imageId",
  verifyToken,
  verifyRole(["operator"]),
  updateMainImage
);
router.delete(
  "/:hotelId/image/:imageId",
  verifyToken,
  verifyRole(["operator"]),
  deleteHotelImage
);

router.delete("/:hotelId/images", verifyToken, verifyRole(["operator"]), deleteHotelImages);

export default router;
