'use client'

import React from 'react'
// import { useEffect } from "react";
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Card from '../_components/article_detail/MoreCard'
import Comment from '../_components/article_detail/Comment'
import Content from '../_components/article_detail/Content'
import styles from './page.module.css' // Import the CSS module

const ArticleDetail = () => {
  return (
    <div className={`container ${styles.container}`}>
      <nav
        className={`my-4 ${styles.breadcrumb}`}
        style={{ '--bs-breadcrumb-divider': '>' }}
        aria-label="breadcrumb"
      >
        <ol className="breadcrumb ">
          <li className="breadcrumb-item ">
            <Link className={`${styles.link}`} href="#">毛孩文章</Link>
          </li>
          <li className="breadcrumb-item ">
            <Link className={`${styles.link}`} href="#"> / 保健與營養</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
             / 貓狗甲狀腺疾病
          </li>
        </ol>
      </nav>
      <Content/>
      <div className="chat" style={{ background: '#FFF6E8', padding: '0.5px' }}>
        <h3 className="mt-3 ms-3">留言</h3>
        <ul className="list-unstyled">
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
          <li className="d-flex py-3" style={{ margin: '10px' }}>
            <div className={`${styles.auther}`}>
              <div className="avatar ratio ratio-1x1 rounded-circle overflow-hidden">
                <img
                  className="object-fit-cover"
                  src="/article_img/batman.jpg"
                  alt=""
                />
              </div>
            </div>
            <textarea
              type="text"
              className="px-1"
              style={{ marginLeft: '2rem', width: '100%' }}
            ></textarea>
          </li>
        </ul>
      </div>
      <div className="more-read">
        <h3 className="mt-5">延伸閱讀</h3>
        <div className="row">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail
