import { createCommentS,deleteCommentS,getCommentByAuthorS } from "../services/commentService.js";

export const createComment = async (req, res) => {
    const { content, article_id, user_id } = req.body;

    try {
        // 呼叫服務層函數來創建文章
        const comment = await createCommentS({ content, article_id, user_id });

        // 返回創建成功的響應
        res.status(201).json({
            // message: "留言創建成功",
            comment
        });
    } catch (err) {
        // 如果有錯誤，返回錯誤響應
        res.status(500).json({
            message: "留言創建失敗",
            error: err.message
        });
    }

}

// export const deleteComment = async (req, res) => {
//     const { commentId } = req.body;
//     console.log(commentId)
//     if (!commentId) {
//         return res.status(400).json({ message: "缺少留言 ID" });
//     }

//     try {
//         // 呼叫服務層函數來刪除留言
//         await deleteCommentS(commentId);

//         // 返回刪除成功的響應
//         res.status(200).json({ message: "留言刪除成功" });
//     } catch (err) {
//         // 如果有錯誤，返回錯誤響應
//         res.status(500).json({
//             message: "留言刪除失敗",
//             error: err.message
//         });
//     }
// };

export const deleteComment = async (req, res) => {
    try {
        
        const { id } = req.params;
        // console.log("Article ID:", id);
        const comment = await deleteCommentS(id);
        console.log(comment);
       

        return res.json({ message: "文章刪除成功", deleteCommentS: comment }); // 成功刪除
    } catch (error) {
        return res.status(500).json({ error: error.message + "是我這裡出問題" });
        // console.log("捕獲到的錯誤:", error);
    }
};

export const getCommentByAuthor = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const results = await getCommentByAuthorS(id);
        // console.log(results);
  
        if (!results || results.length === 0) {
            return res.status(404).json({ message: "文章不存在" });
        }
        // 組合留言資料
        const comment = {
            id: results.id,
            title: results.title,
            content: results.content,
            article_id: results.article_id,
            author_name: results.name,
            author_img:results.author_img
        };
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };