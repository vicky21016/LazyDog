  import { getAllarticle, getIdS, createArticlesS, deleteArticleS, updateArticleS, searchKeywordS } from "../services/articleService.js";

// getIdS, createArticlesS, updateArticleS, deleteArticleS searchKeywordS

// 獲取所有文章
export const getArticles = async (req, res) => {
  try {
      const articles = await getAllarticle();
      if (articles.length === 0) {
          return res.status(404).json({ error: "找不到全部文章" });
      }

      // 格式化文章資料，處理 created_at、updated_at，並設定 cover_image 預設值
      const formattedArticles = articles.map(article => ({
          ...article,
          created_at: new Date(article.created_at).toISOString().split('T')[0], // 只取日期
          updated_at: new Date(article.updated_at).toISOString().split('T')[0],  // 只取日期
          cover_image: article.cover_image || "http://localhost:5000/api/articles/image4.jpg" // 設定預設圖片
      }));

      res.json(formattedArticles);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};



// 取得指定文章
export const getId = async (req, res) => {
  const { id } = req.params;
  // console.log("getId:" + id)
  try {
      const results = await getIdS(id);
      // console.log(results);

      if (!results || results.length === 0) {
          return res.status(404).json({ message: "文章不存在" });
      }

      // 格式化日期（只顯示 YYYY-MM-DD）
      const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : null;

      // 組合文章資料
      const article = {
          id: results[0].id,
          title: results[0].title,
          content: results[0].content,
          cover_image: results[0].cover_image,
          author_name: results[0].name,
          category_id: results[0].category_id,
          category_name: results[0].category_name,
          created_at: formatDate(results[0].created_at),
          updated_at: formatDate(results[0].updated_at), // 確保 updated_at 也被格式化
          comments: []
      };

      const commentMap = new Map(); // 用 Map 避免重複

      results.forEach(row => {
        if (row.comment_id && !commentMap.has(row.comment_id) && row.is_deleted !== 1) {
            commentMap.set(row.comment_id, {
                id: row.comment_id,
                content: row.comment_content,
                author: row.commenter_name,
                author_img: row.commenter_img,
                is_deleted: row.is_deleted
            });
        }
    });

      article.comments = Array.from(commentMap.values());
      res.json(article);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


// 創建文章

export const createArticle = async (req, res) => {
    const { title, content, author_id, category_id, article_img } = req.body;
    // console.log(req.body);
    try {
        // 呼叫服務層函數來創建文章
        const article = await createArticlesS({ title, content, author_id, category_id, article_img });

        // 返回創建成功的響應
        res.status(201).json({
            message: "文章創建成功",
            article
        });
        // console.log(article);
    } catch (err) {
        // 如果有錯誤，返回錯誤響應
        console.log(err);
        
        res.status(500).json({
            message: "文章創建失敗",
            error: err.message
        });
    }

}

// 處理創建文章時的圖片上傳

// controllers/uploadController.js
export const uploadController = {
  handleUpload: (req, res) => {
    try {
      // multer 成功後，檔案資訊會放在 req.file
      // 這裡可以做：存 DB、記錄、或其他商業邏輯
      const filePath = `http://localhost:5000/api/articles/${req.file.filename}`

      // 最後回傳給前端
      res.status(200).json({
        link: filePath, 
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}


// 編輯文章

export const updateArticle = async (req, res) => {
    const { id } = req.params;  // 從 URL 參數中獲取文章的 ID
    const { title, content, author_id, category_id, article_img } = req.body;
  
    try {
      // 呼叫服務層來更新文章資料
      const updatedArticle = await updateArticleS({
        id, title, content, author_id, category_id, article_img
      });
  
      // 返回成功響應
      res.status(200).json({
        message: "文章更新成功",
        article: updatedArticle
      });
    } catch (err) {
      // 返回錯誤響應
      res.status(500).json({
        message: "文章更新失敗",
        error: err.message
      });
    }
  };



// 刪除文章
export const deleteArticle = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        // console.log("Article ID:", id);
        const article = await deleteArticleS(id);
        console.log(101);
        console.log(article);
        // if (!article) {
        //     return res.status(404).json({ error: "文章未找到" });
        // }
        console.log(37);

        return res.json({ message: "文章刪除成功", deletedArticle: article }); // 成功刪除
    } catch (error) {
        return res.status(500).json({ error: error.message + "是我這裡出問題" });
        // console.log("捕獲到的錯誤:", error);
    }
};


export const searchKeyword = async (req, res) => {
  const { keyword } = req.query;  // 從請求中獲取搜索關鍵字
  
  try {
    // 調用搜索函數獲取文章數據
    const articles = await searchKeywordS(keyword);

    if (articles.length === 0) {
      return res.status(404).json({ message: "沒有找到相關的文章。" });
    }

    // 格式化日期函式（YYYY-MM-DD）
    const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : null;

    // 使用一個物件來去重文章，文章的 id 作為鍵
    const uniqueArticles = {};

    // 遍歷所有文章，去除重複的文章
    articles.forEach(article => {
      if (!uniqueArticles[article.id]) {
        // 如果文章沒有重複，就加入到 uniqueArticles 物件中
        uniqueArticles[article.id] = {
          id: article.id,
          title: article.title,
          content: article.content,
          cover_image: article.cover_image,
          category_name: article.category_name,
          created_at: formatDate(article.created_at), // 只顯示日期
          updated_at: formatDate(article.updated_at), // 只顯示日期
          comments: []
        };
      }

      // 處理文章的評論
      if (article.comment_id) {
        // 將評論信息添加到對應文章的評論列表中
        uniqueArticles[article.id].comments.push({
          content: article.comment_content,
          author: article.commenter_name,
          author_img: article.commenter_img || null,
        });
      }
    });

    // 返回去重後的文章數據
    const result = Object.values(uniqueArticles);

    return res.status(200).json(result);

  } catch (error) {
    console.error("搜索文章時出錯:", error);
    return res.status(500).json({ error: "搜索文章時出錯：" + error.message });
  }
};
