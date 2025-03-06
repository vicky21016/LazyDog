import pool from "../config/mysql.js";


// 創建留言

export const createCommentS = async (createComment) => {
    const connection = await pool.getConnection();
    try {
      const { content, article_id, user_id,create_time } = createComment;
  
      // 開始事務
      await connection.beginTransaction();
  
      // 第一步：插入文章資料到 articles 資料表
      const [result] = await connection.query(
        `INSERT INTO comments 
            (content, article_id, user_id, create_time) 
            VALUES (?, ?, ?,NOW())`,
        [content, article_id, user_id, create_time]
      );
      // 提交事務
      await connection.commit();
  
      return {
        id: result.insertId,
        content,
        article_id,
        user_id,// 返回圖片 URL
      };
    } catch (err) {
      // 回滾事務
      await connection.rollback();
      throw new Error("文章創建失敗：" + err.message);
    } finally {
      connection.release();
    }
  };

  export const deleteCommentS = async (commentId) => {
    console.log(commentId)
    const connection = await pool.getConnection();
    try {
        // 開始事務
        await connection.beginTransaction();

        // 執行 SQL 刪除留言
        const [result] = await connection.query(
            `UPDATE comments SET is_deleted = 1 WHERE id = ? AND is_deleted = 0`, 
            [commentId]
        );

        if (result.affectedRows === 0) {
            throw new Error("留言未找到或已被刪除");
        }

        // 提交事務
        await connection.commit();

        return { message: "留言刪除成功" };

    } catch (err) {
        // 回滾事務
        await connection.rollback();
        throw new Error("留言刪除失敗：" + err.message);
    } finally {
        connection.release();
    }
};

// 根據使用者id調取所有該作者沒有被ban的留言
export const getCommentByAuthorS = async (author_id) => {
  try {
    const [comment] = await pool.query(
      `SELECT comments.*, 
      users.name AS author_name,
      articles.title AS title,
      users.user_img AS user_img
      FROM comments
      LEFT JOIN users ON comments.user_id = users.id
      LEFT JOIN articles ON comments.article_id = articles.id
      WHERE comments.is_deleted = 0 
      AND users.is_deleted = 0 
      AND articles.is_deleted = 0
      AND comments.user_id = ?`,
      [author_id]
    );

    if (comment.length === 0) {
      return { message: "該作者沒有文章或文章已被刪除" };
    }
    // console.log(comment)

    return comment;
  } catch (error) {
    throw new Error(`獲取作者 ${author_id} 文章時發生錯誤：${error.message}`);
  }
};

