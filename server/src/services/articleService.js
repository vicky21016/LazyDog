import pool from "../config/mysql.js";


// 獲取全部文章
export const getArticlesS = async () => {
  try {
    const [articles] = await pool.query("SELECT * FROM articles WHERE is_deleted = 0");
    return articles;
  } catch (error) {
    throw new Error(" 無法取得所有文章：" + error.message);
  }
};


// 獲取指定文章
export const getIdS = async (id) => {
  try {
    const [articles] = await pool.query("SELECT * FROM articles WHERE id = ? AND is_deleted = 0", [id]);
    return articles;
  } catch (error) {
    throw new Error(`找不到 ${id} 文章，文章可能不存在或可能已被刪除：${error.message}`);

  }
}

// 創建文章
export const createArticlesS = async (createArticle) => {
  try {
    const {
      title, content, author_id, category_id
    } = createArticle;
    const [result] = await pool.query(
      `INSERT INTO articles 
          (title, content, author_id, category_id, 
          created_at, updated_at, is_deleted) 
          VALUES (?, ?, ?, ?, NOW(), NOW(), 0)`,
      [title, content, author_id, category_id]
    );

    return {
      id: result.insertId,
      title,
      content,
      author_id,
      category_id
    };
  } catch (err) {
    throw new Error("文章創建失敗：" + err.message);
  }
};

// 編輯文章
// export const updateArticleS = async (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     console.log(id);
//     const { title, content, author_id, category_id } = req.body;
//     console.log(id);

//     if (!title || !content || !author_id || !category_id) {
//       return res.status(400).json({ error: "請提供完整的文章資訊" });
//     }

//     const [result] = await pool.query(
//       `UPDATE articles 
//        SET title = ?, content = ?, author_id = ?, category_id = ?, updated_at = NOW() 
//        WHERE id = ? AND is_deleted = 0`,
//       [title, content, author_id, category_id, id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "更新失敗，可能文章不存在或已刪除" });
//     }

//     res.json({ message: "更新成功", id });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };


// 編輯文章(版本2)
export const updateArticleS = async (id, title, content, author_id, category_id, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE articles 
       SET title = ?, content = ?, author_id = ?, category_id = ?, updated_at = NOW() 
       WHERE id = ? AND is_deleted = 0`,
      [title, content, author_id, category_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '找不到文章或文章已被刪除' });
    }

    return { success: true, message: '文章更新成功' };
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '伺服器錯誤' });
  }
};



// 刪除文章
export const deleteArticleS = async (id) => {
  try {
    console.log(id);
    const [result] = await pool.query(
      `UPDATE articles SET is_deleted = 1, updated_at = NOW() WHERE id = ? AND is_deleted = 0`,
      [id]
    );
    console.log(38);

    if (result.affectedRows == 0) {
      return { error: "刪除失敗，找不到該文章" };
    }
    console.log(39);


    return { message: "以軟刪除文章", id };
  } catch (error) {
    console.error("刪除文章時出錯:", error);
    throw new Error("刪除文章時出錯：" + error.message);
  }
};

// 搜尋文章
export const searchKeywordS = async (keyword) => {
  try {
    if (!keyword || keyword.trim() == "") {
      return { error: "請提供有效的搜尋關鍵字" };
    }
    const [articles] = await pool.execute(
      "SELECT * FROM articles WHERE (title LIKE ? OR content LIKE ?) AND is_deleted = 0",
      [`%${keyword}%`,`%${keyword}%`]
    );
    return articles;
  } catch (error) {
    console.error("搜尋文章時出錯:", error);
    throw new Error("搜尋文章時出錯：" + error.message);
  }
}