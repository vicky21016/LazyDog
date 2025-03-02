import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import {
  createHotelReview,
  deleteReview,
} from "../controllers/hotelReviewController.js";
import multer from "multer";
import pool from "../config/mysql.js";
const upload = multer({ dest: "uploads/hotel_review_images/" });

const router = express.Router();

// 取得平均評分
router.get("/average", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT hotel_id, ROUND(AVG(rating), 1) AS avg_rating
      FROM hotel_reviews
      GROUP BY hotel_id
    `);
    res.json(rows);
  } catch (error) {
    console.error("取得評分失敗:", error);
    res.status(500).json({ message: "無法取得評分" });
  }
});

// 使用者發表評論
router.post(
  "/",
  verifyToken,
  verifyRole(["user"]),
  upload.array("images", 5),
  createHotelReview
);

// 業者回覆評論
router.post(
  "/:id/reply",
  verifyToken,
  verifyRole(["operator"]),
  async (req, res) => {
    try {
      const { id } = req.params; // 評論 ID
      const { reply } = req.body;
      const operator_id = req.user.id; // 取得當前登入的 `operator_id`

      if (!reply || reply.trim() === "") {
        return res.status(400).json({ message: "回覆內容不能為空" });
      }

      // 查詢評論，取得 `hotel_id`
      const [review] = await pool.query(
        "SELECT hotel_id FROM hotel_reviews WHERE id = ?",
        [id]
      );

      if (!review || review.length === 0) {
        return res.status(404).json({ message: `找不到評論 ID=${id}` });
      }

      const hotel_id = review[0].hotel_id;

      // 確保 `operator_id` 擁有該 `hotel_id`
      const [hotel] = await pool.query(
        "SELECT id FROM hotel WHERE id = ? AND operator_id = ?",
        [hotel_id, operator_id]
      );

      if (!hotel || hotel.length === 0) {
        return res.status(403).json({
          message: `你無權回覆這則評論，飯店 ID=${hotel_id} 不屬於你的帳號`,
        });
      }

      // 更新 `reply` 欄位
      await pool.query(
        "UPDATE hotel_reviews SET reply = ?, updated_at = NOW() WHERE id = ?",
        [reply, id]
      );

      res.json({
        success: true,
        message: "評論回覆成功",
        data: { review_id: id, reply },
      });
    } catch (error) {
      console.error("回覆評論失敗:", error);
      res.status(500).json({ message: "無法回覆評論：" + error.message });
    }
  }
);

// 刪除自己的評論（軟刪除）
router.delete("/:id", verifyToken, verifyRole(["user"]), deleteReview);

// 取得特定 HOTEL 的所有評論
router.get("/", verifyToken, verifyRole(["operator"]), async (req, res) => {
  try {
    const operator_id = req.user.id; 


    const [hotels] = await pool.query(
      "SELECT id FROM hotel WHERE operator_id = ?",
      [operator_id]
    );

    if (!hotels || hotels.length === 0) {
      return res.status(403).json({ message: "你沒有管理任何飯店，無法查詢評論" });
    }

    const hotel_id = hotels[0].id; 

    const [reviews] = await pool.query(
      `SELECT hr.*, u.name AS user_name
       FROM hotel_reviews hr
       JOIN users u ON hr.user_id = u.id
       WHERE hr.hotel_id = ? AND hr.is_deleted = 0 
       ORDER BY hr.created_at DESC`,
      [hotel_id]
    );

    if (reviews.length === 0) {
      return res.json({ success: true, message: "此飯店沒有評論", data: [] });
    }

    res.json({ success: true, message: "評論獲取成功", data: reviews });
  } catch (error) {
    console.error("取得評論失敗:", error);
    res.status(500).json({ message: "無法獲取評論：" + error.message });
  }
});


export default router;
