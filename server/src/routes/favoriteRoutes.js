import express from 'express'
import pool from '../config/mysql.js'
const app = express.Router()


// 加入收藏
app.post('/', async (req, res) => {
    const { user_id, item_id, type } = req.body;
    const sql = 'INSERT INTO favorites (user_id, item_id, type) VALUES (?, ?, ?)';
   
    try {
        const [result] = await pool.execute( sql, [user_id, item_id, type]);
        
        res.json({ status: 'success', favorite_id: result.insertId });

    } catch (err) {
        res.status(500).json({ status: 'error',
      message: err.message });
    }
});

// 移除收藏
app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute('DELETE FROM favorites WHERE id = ?', [id]);
        res.json({status: 'success'});
    } catch (err) {
        res.status(500).json({ status: 'error',
            message: err.message  });
    }
});

export default app