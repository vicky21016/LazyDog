import pool from "../config/mysql.js";

export const getArticlesS = async () => {
  try {
    const [articles] = await pool.query("SELECT * FROM articles WHERE is_deleted = 0");
    return articles;
  } catch (error) {
    throw new Error(" 無法取得所有文章：" + error.message);
  }
};

export const getIdS = async (id) => {
  try {
    const [articles] = await pool.query("SELECT * FROM articles WHERE id = ? AND is_deleted = 0", [id]);
    return articles;
  } catch (error) {
    throw new Error(`找不到 ${id} 文章，文章可能不存在或可能已被刪除：${error.message}`);

  }
}

export const createArticlesS = async (createArticle) => {
  // console.log("函示有被呼叫");

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

// export const updateArticleS = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content, author_id, category_id } = req.body;
//     const [result] = await pool.query(
//       `UPDATE articles 
//        SET title = ?, content = ?, author_id = ?, category_id = ?, updated_at = NOW() 
//        WHERE id = ? AND is_deleted = 0`,
//       [title, content, author_id, category_id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "更新失敗" });
//     }

//     res.json({ message: "更新成功", id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
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