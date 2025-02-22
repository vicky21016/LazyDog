"use client";

import { useState } from "react";
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import useArticles from '@/hooks/useArticle';
import MainCard from '../_components/article_list/ListCard';
import AsideCard from '../_components/article_list/AsideCard';

const ArticlePage = () => {
  const { articles, loading, error } = useArticles();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null); // 新增分類狀態
  const itemsPerPage = 5;

  if (loading) return <p>載入中...</p>;
  if (error) return <p className="text-red-500">錯誤：{error}</p>;

  // 過濾文章
  const filteredArticles = selectedCategory
    ? articles.filter(article => article.category_id === selectedCategory)
    : articles;

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const currentArticles = filteredArticles.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // 處理分類選擇
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1); // 切換分類時重置頁碼
  };

  // 分頁數字生成（保持原樣）
  const generatePageNumbers = () => {
    if (totalPages <= 3) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    } else {
      if (page === 1) {
        return [1, 2, 3];
      } else if (page === totalPages) {
        return [totalPages - 2, totalPages - 1, totalPages];
      } else {
        return [page - 1, page, page + 1];
      }
    }
  };

  return (
    <>
      <div className={`${styles.mainDog} mb-3`}>
        <h1 style={{ fontWeight: 'bold' }}>毛孩文章</h1>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.postButton}>
          <button className={styles.post}>
            <i className="bi bi-check-circle"></i> 發布文章
          </button>
        </div>

        {/* 左側欄 */}
        <div className={styles.top}>
          <div className="input-group my-3" style={{ border: '.2px solid grey', borderRadius: '5px' }}>
            <input
              type="text"
              className="form-control"
              style={{ border: 'none', height: '40px', borderRadius: '5px' }}
            />
            <label className="input-group-text" style={{ background: 'none', border: 'none' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </label>
          </div>

          <div className={styles.asideCategory}>
            <h2 className='mb-3'>類別</h2>
            <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelect(null); }}>
              <p>全部</p>
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelect(1); }}>
              <p>保健與營養</p>
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelect(5); }}>
              <p>開箱</p>
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelect(2); }}>
              <p>食譜</p>
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelect(3); }}>
              <p>善終</p>
            </a>
                
            
          </div>
        </div>

        {/* 主要內容 */}
        <div className={styles.middle}>
          <button className={styles.filter}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-filter"
              viewBox="0 0 16 16"
            >
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
            </svg>{' '}
            依時間排序
          </button>
          {currentArticles.map((article) => (
            <MainCard key={article.id} {...article} />
          ))}
        </div>

        {/* 左側欄延伸閱讀 */}
        <div className={styles.bottom}>
          <h4>延伸閱讀</h4>
          {articles
            .sort(() => Math.random() - 0.5) // 亂數排序
            .slice(0, 5) // 取前五篇
            .map((article) => (
              <AsideCard key={article.id} {...article} />
            ))}
        </div>
      </div>

      {/* 分頁 */}
      <div className={'container d-flex justify-content-center'} style={{ position: 'relative', top: '3200px' }}>
        <nav>
          <ul className={styles.ArticlePage}>
            <li className={`${styles.PageItem} page-item`}>
              <a
                className={`${styles.PageLink} page-link`}
                href="#"
                onClick={() => handlePageChange(page - 1)}
              >
                <i class="bi bi-arrow-left"></i>
              </a>
            </li>
            {generatePageNumbers().map((pageNumber) => (
              <li key={pageNumber} className={`${styles.PageItem} page-item`}>
                <a
                  className={`${styles.PageLink} page-link`}
                  href="#"
                  onClick={() => handlePageChange(pageNumber)}
                  style={page === pageNumber ? { fontWeight: 'bold' } : {}}
                >
                  {pageNumber}
                </a>
              </li>
            ))}
            <li className={`${styles.PageItem} page-item`}>
              <a
                className={`${styles.PageLink} page-link`}
                href="#"
                onClick={() => handlePageChange(page + 1)}
              >
                <i class="bi bi-arrow-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ArticlePage;
