import express from "express";
import pool from "../config/mysql.js";

const router = express.Router();

// 取得使用者收藏的課程
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const sql = `
      SELECT 
      cf.id,
      cf.user_id, 
      cf.course_id, 
      c.name, 
      ci.url AS main_pic
    FROM course_favorites cf 
    JOIN course c ON cf.course_id = c.id 
    LEFT JOIN course_img ci ON c.id = ci.course_id AND ci.main_pic = 1
    WHERE cf.user_id = ?;
;
    `;

  try {
    const [rows] = await pool.execute(sql, [user_id]);
    res.json({ status: "success", data: rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { user_id, course_id } = req.body;

  if (!user_id || !course_id) {
    return res.status(400).json({ status: "error", message: "缺少必要參數" });
  }

  try {
    const checkSql = `SELECT id FROM course_favorites WHERE user_id = ? AND course_id = ?`;
    const [existing] = await pool.execute(checkSql, [user_id, course_id]);

    if (existing.length > 0) {
      return res.status(400).json({ status: "error", message: "已收藏此課程" });
    }

    const insertSql = `INSERT INTO course_favorites (user_id, course_id, created_at, updated_at, is_deleted) VALUES (?, ?, NOW(), NOW(), 0)`;
    const [result] = await pool.execute(insertSql, [user_id, course_id]);

    res.json({ status: "success", message: "收藏成功", id: result.insertId });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  if (!user_id) {
    return res
      .status(400)
      .json({ status: "error", message: "需要提供 user_id" });
  }

  try {
    const checkSql = `SELECT user_id FROM course_favorites WHERE id = ?`;
    const [existing] = await pool.execute(checkSql, [id]);

    if (existing.length === 0) {
      return res.status(404).json({ status: "error", message: "找不到該收藏" });
    }

    if (existing[0].user_id !== user_id) {
      return res
        .status(403)
        .json({ status: "error", message: "無權刪除此收藏" });
    }

    const deleteSql = `DELETE FROM course_favorites WHERE id = ?`;
    await pool.execute(deleteSql, [id]);

    res.json({ status: "success", message: "刪除成功" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});
export default router;
