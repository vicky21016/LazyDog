import express from 'express'
import pool from '../config/mysql.js'


const app = express.Router()

// 取得所有老師資訊
app.get('/', async (req, res) => {
    try {
        const sql = 'SELECT * FROM teachers'
        const [teachers] = await pool.execute(sql);
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ status: 'error',
        message: err.message });
    }
});

// 取得單一老師資訊
app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM teachers WHERE id = ?'
        const [teacher] = await pool.execute(sql, [id]);
        if (teacher.length == 0) return res.status(404).json({ error: "老師不存在" });
        res.json(teacher[0]);
    } catch (err) {
        res.status(500).json({status: 'error',
        message: err.message });
    }
});

// 新增老師
router.post('/', async (req, res) => {
    try {
        const { name, introduce, experience,  img } = req.body;
        const sql = `INSERT INTO teachers (name, Introduce, experience, img) VALUES (?, ?, ?, ?)`;
        const [result] = await pool.execute(sql, [name, introduce, experience, img]);

        res.json({
            status: 'success',
            message: '老師已成功新增',
            teacherId: result.insertId
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
    });

    export default app