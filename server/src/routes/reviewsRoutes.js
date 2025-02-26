// import express from "express";
// import pool from "../config/mysql.js";

// const router = express.Router();

// // 新增評論
// router.post("/", async (req, res) => {
//   try {
//     const { user_id, course_id, rating, comment, reply } = req.body;
//     const sql = `INSERT INTO course_reviews (user_id, course_id, rating, comment, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`;
//     const [result] = await pool.execute(sql, [
//       user_id,
//       course_id,
//       rating,
//       comment,
//       reply,
//     ]);
//     res.json({
//       status: "success",
//       message: "評論已成功新增",
//       reviewId: result.insertId,
//     });
//   } catch (err) {
//     res.status(500).json({ status: "error", message: err.message });
//   }
// });


// // 取得單筆評論
// router.get("/:id", async (req, res) => {
//   try {
//     const sql = `SELECT 
//     cr.*, 
//     u.name AS user_name
// FROM 
//     course_reviews cr
// JOIN 
//     users u ON cr.user_id = u.id
// WHERE 
//     cr.course_id = ? 
//     AND cr.is_deleted = 0;
// `;
//     const [review] = await pool.execute(sql, [req.params.id]);
//     if (review.length === 0)
//       return res.status(404).json({ error: "評論未找到" });
//     res.json(review[0]);
//   } catch (err) {
//     res.status(500).json({ status: "error", message: err.message });
//   }
// });

// // 更新評論
// router.put("/:id", async (req, res) => {
//   try {
//     const { rating, comment, reply } = req.body;
//     const sql = `UPDATE course_reviews SET rating = ?, comment = ?, reply = ?, updated_at = NOW() WHERE id = ? AND is_deleted = 0`;
//     const [result] = await pool.execute(sql, [
//       rating,
//       comment,
//       reply,
//       req.params.id,
//     ]);
//     if (result.affectedRows === 0)
//       return res.status(404).json({ error: "評論未找到" });
//     res.json({ status: "success", message: "評論已更新" });
//   } catch (err) {
//     res.status(500).json({ status: "error", message: err.message });
//   }
// });

// // 刪除評論
// router.delete("/:id", async (req, res) => {
//   try {
//     const sql = `UPDATE course_reviews SET is_deleted = 1 WHERE id = ?`;
//     const [result] = await pool.execute(sql, [req.params.id]);
//     if (result.affectedRows === 0)
//       return res.status(404).json({ error: "評論未找到" });
//     res.json({ status: "success", message: "評論已刪除" });
//   } catch (err) {
//     res.status(500).json({ status: "error", message: err.message });
//   }
// });

// export default router;

import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import {
  createcourseReview,
  replycourseReview,
  getcourseReview,
  deleteReview,
} from "../controllers/reviewsControllers.js";
import multer from "multer";
import pool from "../config/mysql.js";
const upload = multer({ dest: "uploads/hotel_review_images/" });

const router = express.Router();
router.get("/average", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT course_id, ROUND(AVG(rating), 1) AS avg_rating
      FROM course_reviews
      GROUP BY course_id
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
  createcourseReview
);

// 業者回覆評論
router.post(
  "/:id/reply",
  verifyToken,
  verifyRole(["operator"]),
  replycourseReview
);

// 刪除自己的評論包含圖片(只是軟刪除而已)
router.delete("/:id", verifyToken, verifyRole(["user"]), deleteReview);

// 取得特定course的所有評論
router.get("/:course_id", getcourseReview);

export default router;
