"use client";

import { useState } from "react";
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from "next/link";
import useArticles from '@/hooks/useArticle';
import MainCard from '../_components/list/ListCard';
import AsideCard from '../_components/list/AsideCard';
import useAuth from '@/hooks/use-auth';

const ArticlePage = () => {
  const { articles, loading, error } = useArticles();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  // 搜尋處理
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // 每次搜尋重置頁碼
  };

  // 過濾分類
  const filteredByCategory = selectedCategory
    ? articles.filter(article => article.category_id === selectedCategory)
    : articles;

  // 過濾搜尋結果
  const filteredArticles = filteredByCategory.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 排序文章
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);
  const currentArticles = sortedArticles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // 分類選擇
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  // 排序切換
  const handleSortToggle = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    setPage(1);
  };

  // 分頁處理
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  if (loading) return <p>載入中...</p>;
  if (error) return <p className="text-red-500">錯誤：{error}</p>;

  return (
    <>
      <div className={`${styles.mainDog} mb-3`}>
        <h1 style={{ fontWeight: 'bold' }}>毛孩文章</h1>
      </div>

      <div className={`container`}>
        {/* 發布文章按鈕 */}
        <div className={styles.postButton}>
          <button
            className={styles.post}>
            <Link
              href="http://localhost:3000/article/add_article"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <i className="bi bi-check-circle"></i> 發布文章
            </Link>
          </button>
        </div>

        {/* 左側搜尋與分類 */}
        <div className={styles.content}>
          <aside >
            <div className="input-group my-3" style={{ border: '.2px solid grey', borderRadius: '5px' }}>
              <input
                type="text"
                className="form-control"
                style={{ border: 'none', height: '40px', borderRadius: '5px' }}
                placeholder="搜尋文章..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <label className="input-group-text" style={{ background: 'none', border: 'none' }}>
                <i className="bi bi-search"></i>
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
            <div >
              <h4>延伸閱讀</h4>
              {articles
                .sort(() => Math.random() - 0.5)
                .slice(0, 5)
                .map((article) => (
                  <AsideCard key={article.id} {...article} />
                ))}
            </div>
          </aside>

          {/* 主要內容 */}
          <main >
            <button className={styles.filter} onClick={handleSortToggle}>
              <i className="bi bi-filter"></i> 依時間排序 {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
            {currentArticles.length > 0 ? (
              currentArticles.map((article) => (
                <MainCard key={article.id} {...article} />
              ))
            ) : (
              <p>沒有符合條件的文章</p>
            )}
            {/* 分頁 */}

          </main>

        </div>
        {totalPages > 1 && (
          <nav className="page">
            <ul className={styles.ArticlePage}>
              <li className={`${styles.PageItem} page-item`}>
                <a
                  className={`${styles.PageLink} page-link`}
                  href="#"
                  onClick={(e) => { e.preventDefault(); handlePageChange(page - 1); }}
                >
                  <i className="bi bi-arrow-left"></i>
                </a>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i + 1} className={`${styles.PageItem} page-item`}>
                  <a
                    className={`${styles.PageLink} page-link`}
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                    style={page === i + 1 ? { fontWeight: 'bold' } : {}}
                  >
                    {i + 1}
                  </a>
                </li>
              ))}
              <li className={`${styles.PageItem} page-item`}>
                <a
                  className={`${styles.PageLink} page-link`}
                  href="#"
                  onClick={(e) => { e.preventDefault(); handlePageChange(page + 1); }}
                >
                  <i className="bi bi-arrow-right"></i>
                </a>
              </li>
            </ul>
          </nav>

        )}



      </div>


    </>
  );
};

export default ArticlePage;
