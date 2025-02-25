'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import FroalaEditorWrapper from '../_components/add_article/content';
import Link from 'next/link';
import useArticles from "@/hooks/useArticle";
import useUploadCover from "@/hooks/uploadCover"; // 引入圖片上傳鉤子
import { useAuth } from "@/hooks/use-auth";  // 引入 useAuth 鉤子

export default function AddArticlePage() {
  const { createArticle } = useArticles();
  const { uploadCover } = useUploadCover(); // ✅ 使用圖片上傳 Hook
  const { user } = useAuth(); // ✅ 獲取當前使用者

  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // ✅ 儲存 Froala 內容
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(''); // ✅ 儲存圖片 URL
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ 防止重複提交

  // 類別選項
  const categoryOptions = [
    { id: 1, name: '保健與營養' },
    { id: 2, name: '食譜' },
    { id: 3, name: '善終' },
    { id: 4, name: '行為知識' },
    { id: 5, name: '開箱' }
  ];

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

  // 提交文章（包含圖片上傳）
  const handleSubmit = async () => {
    if (!title.trim() || !selectedCategory) {
      alert("請填寫標題並選擇分類");
      return;
    }

    setIsSubmitting(true); // ✅ 防止重複提交

    let finalImageUrl = imageUrl; // 預設使用已經上傳的圖片 URL
    if (selectedImage && !imageUrl) {
      try {
        finalImageUrl = await uploadCover(selectedImage);
        if (!finalImageUrl) {
          alert("圖片上傳失敗，請重試");
          setIsSubmitting(false);
          return;
        }
      } catch (error) {
        alert("圖片上傳錯誤：" + error.message);
        setIsSubmitting(false);
        return;
      }
    }

    const newArticle = {
      title,
      category_id: Number(selectedCategory),
      content,
      article_img: finalImageUrl || "", // ✅ 確保圖片網址正確
      author_id: user.id,  
    };

    console.log("提交的文章:", JSON.stringify(newArticle, null, 2));

    try {
      await createArticle(newArticle);
      alert("文章發布成功！");
      setTitle('');
      setContent('');
      setSelectedCategory('');
      setSelectedImage(null);
      setImagePreview(null);
      setImageUrl('');
    } catch (error) {
      alert("文章提交失敗：" + error.message);
    } finally {
      setIsSubmitting(false);
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
            <h4>新增文章</h4>

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

            {/* 圖片上傳區域 */}
            <div style={{ margin: '20px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: '10px' }}
              />
              {imagePreview && (
                <div>
                  <h4>圖片預覽:</h4>
                  <img
                    src={imagePreview}
                    alt="預覽"
                    style={{ maxWidth: '100%', height: '250px', marginBottom: '10px' }}
                  />
                </div>
              )}
            </div>

            {/* 文章內容編輯器 */}
            <FroalaEditorWrapper onContentChange={setContent} />

            {/* 發布按鈕 */}
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
                disabled={isSubmitting} // ✅ 防止重複提交
              >
                {isSubmitting ? (
                  <i className="bi bi-hourglass-split"></i>
                ) : (
                  <i className="bi bi-check-circle"></i>
                )}
                {isSubmitting ? " 發布中..." : " 發布文章"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
