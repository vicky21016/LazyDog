"use client"

import { useEffect, useState } from "react";
import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import useArticles from '@/hooks/useArticle'
import MainCard from '../_components/article_list/ListCard'
import AsideCard from '../_components/article_list/AsideCard'

const ArticlePage = () => {
  const { articles, loading, error } = useArticles()
  if (loading) return <p>載入中...</p>
  if (error) return <p className="text-red-500">錯誤：{error}</p>
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
          <div
            className="input-group my-3"
            style={{ border: '.2px solid grey', borderRadius: '5px' }}
          >
            <input
              type="text"
              className="form-control"
              style={{ border: 'none', height: '40px', borderRadius: '5px' }}
            />
            <label
              className="input-group-text"
              style={{ background: 'none', border: 'none' }}
            >
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
            {["全部", '保健與營養', '開箱', '行為知識', '食譜', '善終'].map(
              (category, index) => (
                <a key={index} href="#">
                  <p>{category}</p>
                </a>
              )
            )}
          </div>
          {/* <select className="form-select form-select-lg">
            <option>類別</option>
            {['保健與營養', '開箱', '行為知識', '食譜', '善終'].map(
              (option, index) => (
                <option key={index} value={index + 1}>
                  {option}
                </option>
              )
            )}
          </select> */}
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
          {articles.map((article) => (
            <MainCard
              key={article.id}
              {...article}
            />
          ))}
        </div>

        {/* 右側欄 */}
        <div className={styles.bottom}>
          <h4>延伸閱讀</h4>
          <AsideCard />
          <AsideCard />
          <AsideCard />
          <AsideCard />
          <AsideCard />
        </div>
      </div>

      {/* 分頁 */}
      <div
        className={'container d-flex justify-content-center'}
        style={{ position: 'relative', top: '3200px' }}
      >

        <nav>
          <ul className={styles.ArticlePage}>
            <li className={`${styles.PageItem} page-item`}>
              <a className={`${styles.PageLink} page-link`} href="">
                1
              </a>
            </li>
            <li className={`${styles.PageItem} page-item`}>
              <a className={`${styles.PageLink} page-link`} href="">
                2
              </a>
            </li>
            <li className={`${styles.PageItem} page-item`}>
              <a className={`${styles.PageLink} page-link`} href="">
                3
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default ArticlePage
