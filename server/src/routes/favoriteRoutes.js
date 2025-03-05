import express from 'express';
import pool from '../config/mysql.js';

const router = express.Router();

// 加入課程收藏
router.post('/', async (req, res) => {
  const { user_id, course_id } = req.body;
  const sql = 'INSERT INTO course_favorites (user_id, course_id) VALUES (?, ?)';

  try {
    const [result] = await pool.execute(sql, [user_id, course_id]);
    res.json({ status: 'success', favorite_id: result.insertId });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 取得使用者收藏的課程
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const sql = `
    SELECT cf.id, cf.course_id, c.name, ci.main_pic
    FROM course_favorites cf
    JOIN course c ON cf.course_id = c.id
    LEFT JOIN course_img ci ON cf.course_id = ci.course_id
    WHERE cf.user_id = ?
  `;

  try {
    const [rows] = await pool.execute(sql, [user_id]);
    res.json({ status: 'success', data: rows });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 移除課程收藏
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM course_favorites WHERE id = ?', [id]);
    res.json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
