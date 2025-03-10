'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import FroalaEditorWrapper from '../../_components/update/content';
import Link from 'next/link';
import useArticles from "@/hooks/useArticle";
import useUploadCover from "@/hooks/uploadCover";
import { useAuth } from "@/hooks/use-auth";
import Header from "../../../components/layout/header";
import Breadcrumb from "../../../components/teacher/breadcrumb";
import style from '../../../../styles/modules/operatorCamera.module.css';
import styles from './page.module.css';

// 將表單的不同部分拆分為子元件
import TitleInput from '../../_components/update/TitleInput';
import CategorySelect from '../../_components/update/CategorySelect';
import ImageUpload from '../../_components/update/ImageUpload';

export default function UpdateArticlePage({ params }) {
  const { updateArticle, getArticle } = useArticles();
  const { uploadCover, isLoading, error } = useUploadCover();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const articleId = params.id;
  console.log("我在編輯頁這")

  // 類別選項
  const categoryOptions = useMemo(() => [
    { id: 1, name: '保健與營養' },
    { id: 2, name: '食譜' },
    { id: 3, name: '善終' },
    { id: 4, name: '行為知識' },
    { id: 5, name: '開箱' }
  ], []);

  // 獲取文章資料
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await getArticle(articleId);
        setTitle(article.title);
        setContent(article.content);
        setSelectedCategory(article.category_id);
        setImageUrl(article.cover_image);
      } catch (error) {
        console.error("獲取文章資料失敗:", error);
      }
    };

    fetchArticle();
  }, [articleId, getArticle]);

  // 處理圖片變更
  const handleImageChange = useCallback((file) => {
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  // 提交文章
  const handleSubmit = useCallback(async () => {
    if (!title.trim() || !selectedCategory) {
      alert("請填寫標題並選擇分類");
      return;
    }

    if (!user) {
      alert("請先登入");
      return;
    }

    let uploadedImageUrl = imageUrl;
    if (selectedImage) {
      try {
        uploadedImageUrl = await uploadCover(selectedImage);
      } catch (err) {
        console.error("圖片上傳失敗:", err);
        alert("圖片上傳失敗，請重試");
        return;
      }
    }

    const updatedArticle = {
      title,
      category_id: Number(selectedCategory),
      content,
      article_img: uploadedImageUrl || "",
      author_id: user.id
    };

    try {
      await updateArticle(articleId, updatedArticle);
      alert("文章更新成功！");
    } catch (error) {
      console.error("提交文章失敗:", error);
      alert("提交文章失敗，請檢查網路連線");
    }
  }, [title, selectedCategory, user, imageUrl, selectedImage, uploadCover, updateArticle, articleId]);

  return (
    <>
      <Header />
      <div className='lumi-all-wrapper'>
        <Breadcrumb
          links={[
            { label: "首頁 ", href: "/" },
            { label: " 我的文章", href: "/user/my_article" },
            { label: ` 編輯文章`, href: "/article/list/detail", active: true },
          ]}
        /></div>
      <div className="container" style={{ marginTop: '55px' }}>
        <div className="row">
          <div className="col-lg-3 col-sm-12">
            <Link href="/user/my_article" className={`btn mb-3 ${style.btn3}`}>
              回我的文章
            </Link>
          </div>
          <div className="col-lg-9">
            <form
              className="p-3 col"
              style={{
                maxWidth: '750px',
                backgroundColor: '#FDFAF5',
                boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.25)"
              }}
            >
              <h4>編輯文章</h4>

              {/* 標題輸入 */}
              <TitleInput title={title} setTitle={setTitle} />

              {/* 類別選擇 */}
              <CategorySelect
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categoryOptions={categoryOptions}
              />

              {/* 圖片上傳 */}
              <ImageUpload
                imageUrl={imageUrl}
                imagePreview={imagePreview}
                handleImageChange={handleImageChange}
                error={error}
              />

              {/* 文章內容編輯器 */}
              <FroalaEditorWrapper
                onContentChange={setContent}
                initialContent={content}
              />

              {/* 保存按鈕 */}
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className={`mt-3 ${styles.post}`}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? '保存中...' : (
                    <>
                      <Link
                        href="http://localhost:3000/user/my_article"
                        className={styles.postLink}
                      >
                        <i className="bi bi-check-circle"></i> 保存文章
                      </Link>
                    </>
                  )}
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}