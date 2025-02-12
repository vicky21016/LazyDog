import express from "express";
import multer from "multer";
import {
    getArticles, getId, createArticle, deleteArticle
} from '../controllers/articleController.js'
const router = express.Router();
// getId, createArticle, updateArticle, deleteArticle,
// 獲取所有文章
// 網址: /api/Aritcle
router.get('/', getArticles);

router.get('/:id', getId);

const upload = multer();
router.post('/', upload.none(), createArticle)
router.delete('/:id', deleteArticle)

// // 獲取指定文章
// // 網址: /api/aritcle/:aritcleId
// router.get('/:aritcleId', async (req, res) => {
//     // 需要轉換成數字
//     const aritcleId = Number(req.params.aritcleId);

//     try {
//         const aritcle = await getId(aritcleId); // ✅ 改為呼叫 getIdS

//         if (!aritcle || aritcle.length === 0) { // ✅ 檢查陣列長度
//             return res.status(404).json({ error: "沒有此文章" });
//         }

//         return res.json(aritcle);
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// });


// // 新增文章
// // 網址: /api/article
// router.post('/', async (req, res) => {
//     console.log(3);
    
//     try {
//         // 需要加上await等待新增完成
//         await createArticle(req.body)
//         // 成功新增的回應，沒有資料要回傳
//         console.log(123);
//     } catch (error) {
//         // console.log(error);
//         return console.log("不可以連接3");
//     }
// })

// // 編輯文章
// // 網址: /api/blogs/:articleId
// // 範例:
// // {
// //   "title": "更新後的標題",
// //   "content": "更新後的內容"
// // }
// router.put('/:articleId', async (req, res) => {
//     // 需要轉換成數字
//     const blogId = Number(req.params.blogId)

//     try {
//         // 需要加上await等待更新完成
//         await updateBlog(blogId, req.body)
//         // 成功更新的回應，沒有資料要回傳
//         successResponse(res)
//     } catch (error) {
//         errorResponse(res, error)
//     }
// })

// // 刪除文章
// // 網址: /api/blogs/:articleId
// router.delete('/:blogId', async (req, res) => {
//     // 需要轉換成數字
//     const blogId = Number(req.params.blogId)

//     try {
//         // 需要加上await等待刪除完成
//         await deleteBlog(blogId)
//         // 成功刪除的回應
//         successResponse(res)
//     } catch (error) {
//         errorResponse(res, error)
//     }
// })


export default router;
