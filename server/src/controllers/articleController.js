import { getArticlesS, getIdS, createArticlesS, deleteArticleS } from "../services/articleService.js";

// getIdS, createArticlesS, updateArticleS, deleteArticleS

// 獲取所有文章
export const getArticles = async (req, res) => {
    try {
        const articles = await getArticlesS();

        res.json(articles);
        if (articles.length === 0) {
            return res.status(404).json({ error: "找不到全部文章" });
        }
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 取得指定文章
export const getId = async (req, res) => {
    try {

        const { id } = req.params;
        const article = await getIdS(id); // ✅ 改為呼叫 getIdS，避免遞迴

        if (!article || article.length === 0) { // ✅ 檢查陣列長度
            return res.status(404).json({ error: "找不到文章，文章可能不存在或可能已被刪除" });
        }

        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 創建文章
export const createArticle = async (req, res) => {
    try {
        const {
            title, content, author_id, category_id
        } = req.body;

        if (!title || !content || !author_id || !category_id) {
            return res.status(400).json({
                error: "有欄位未填完",
            });
        }

        console.log("收到請求資料:", req.body);
        const newArticle = await createArticlesS({
            title, content, author_id, category_id
        });

        res.status(201).json(newArticle);
        console.log(newArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

// export const updateArticle = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const {
//             title, content, author_id, category_id
//         } = req.body;
//         if(!id) {
//             return res.status(400).json({ error: "無效的 author_id" });
//         }
//         if (!title || !content || !author_id || !category_id) {
//             return res.status(400).json({ error: "欄位填寫不明確" });
//         }
//         res.json({ message: "更新成功" });
//     } catch (error) {
//         res.status(500).json({ error: "伺服器錯誤", details: error.message });
//     }
// }

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
