'use client';

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import FroalaEditorWrapper from '../../_components/update/content';
import Link from 'next/link';
import useArticles from "@/hooks/useArticle";
import useUploadCover from "@/hooks/uploadCover"; // 引入圖片上傳鉤子
import { useAuth } from "@/hooks/use-auth";  // 引入 useAuth 鉤子

export default function UpdateArticlePage({ params }) {
  const { updateArticle, getArticle } = useArticles(); // 新增 updateArticle 和 getArticleById
  const { uploadCover, isLoading, error } = useUploadCover(); // 使用圖片上傳 Hook
  const { user } = useAuth(); // 獲取當前使用者的資料
  console.log(user)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // ✅ 儲存 Froala 內容
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(''); // ✅ 儲存上傳的圖片 URL

  const articleId = params.id; // 從路由參數中獲取文章 ID

  // 類別選項
  const categoryOptions = [
    { id: 1, name: '保健與營養' },
    { id: 2, name: '食譜' },
    { id: 3, name: '善終' },
    { id: 4, name: '行為知識' },
    { id: 5, name: '開箱' }
  ];

  // 獲取文章資料
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await getArticle(articleId);
        console.log(article)
        setTitle(article.title);
        setContent(article.content);
        setSelectedCategory(article.category_id);
        setImageUrl(article.cover_image); // 設置現有圖片 URL
        // console.log("獲取的文章資料:", article.cover_image
        // );
      } catch (error) {
        console.error("獲取文章資料失敗:", error);
      }
    };

    fetchArticle();
  }, [articleId, getArticle]);

  // 處理圖片變更
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 提交文章
  const handleSubmit = async () => {
    if (!title.trim() || !selectedCategory) {
      alert("請填寫標題並選擇分類");
      return;
    }

    if (!user) {
      alert("請先登入");
      return;
    }

    // 如果有選擇新圖片，先上傳圖片
    let uploadedImageUrl = imageUrl; // 預設使用現有圖片 URL
    if (selectedImage) {
      try {
        uploadedImageUrl = await uploadCover(selectedImage);
        console.log("後端返回的圖片 URL:", uploadedImageUrl);
      } catch (err) {
        console.error("圖片上傳失敗:", err);
        alert("圖片上傳失敗，請重試");
        return;
      }
    }

    // 提交編輯後的文章資料
    const updatedArticle = {

      title,
      category_id: Number(selectedCategory),
      content,
      article_img: uploadedImageUrl || "",
      author_id: user.id
    };

    try {
      await updateArticle(articleId, updatedArticle); // 使用 updateArticle 更新文章
      alert("文章更新成功！");
      // 跳轉到文章列表或文章詳情頁
    } catch (error) {
      console.error("提交文章失敗:", error);
      alert("提交文章失敗，請檢查網路連線");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-sm-12">
          <Link href="/article/list" className="btn btn-primary mb-3">
            回文章列表
          </Link>
        </div>
        <div className="col-lg-9">
          <form
            className="p-3 col"
            style={{
              maxWidth: '750px',
              backgroundColor: '#FFF6E8',
              boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.25)"
            }}
          >
            <h4>編輯文章</h4>

            {/* 下拉選單 - 類別選擇 */}
            <select
              className="form-select my-3"
              value={selectedCategory}
              style={{ width: '154px' }}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              <option value="">請選擇主題</option>
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* 標題輸入 */}
            <input
              className="ps-2 w-100 d-block"
              placeholder="標題"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* 圖片上傳 */}
            <div style={{ margin: '20px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: '10px' }}
              />
              {/* 顯示現有圖片 */}
              {imageUrl && !imagePreview && (
                <div>
                  <h4>當前圖片:</h4>
                  <img
                    src={imageUrl}
                    alt="當前封面圖"
                    style={{ maxWidth: '100%', height: '250px', marginBottom: '10px' }}
                  />
                </div>
              )}
              {imagePreview && (
                <div>
                  <h4>新圖片預覽:</h4>
                  <img
                    src={imagePreview}
                    alt="預覽"
                    style={{ maxWidth: '100%', height: '250px', marginBottom: '10px' }}
                  />
                </div>
              )}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            {/* 文章內容編輯器 */}
            <FroalaEditorWrapper
              onContentChange={(content) => setContent(content)}
              initialContent={content} // 傳入初始內容
            />

            {/* 保存按鈕 */}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="mt-3"
                style={{
                  border: 'none',
                  backgroundColor: '#FFBD00',
                  color: 'white',
                  borderRadius: '5px',
                }}
                onClick={handleSubmit}
                disabled={isLoading} // 上傳中禁用按鈕
              >
                {isLoading ? '保存中...' : (
                  <>
                    <i className="bi bi-check-circle"></i> 保存文章
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}