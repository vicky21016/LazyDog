"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Card from "../../_components/detail/MoreCard";
import Comment from "../../_components/detail/Comment";
import Content from "../../_components/detail/Content";
import MyComment from "../../_components/detail/MyComment"
import styles from "./page.module.css";
import useArticles from "@/hooks/useArticle";
import Header from "../../../components/layout/header";
import Breadcrumb from "../../../components/teacher/breadcrumb";

export default function ArticleDetail() {
  const { id } = useParams(); // 取得網址中的文章 ID
  const { articles, article, comments, getArticle, loading, error } = useArticles()
  console.log(comments)
  
  

  // **當 ID 變更時，載入對應的文章**
  useEffect(() => {
    if (id) {
      getArticle(id);
    }
  }, [id]);

  if (loading) return <p>載入中...</p>;
  if (error) return <p>錯誤: {error}</p>;
  if (!article) return <p>文章不存在</p>;



  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: '100px' }}>
      <Breadcrumb
              links={[
                { label: "首頁 ", href: "/" },
                { label: " 毛孩文章", href: "/article/list" },
                { label:` ${article?.title || "標題尚未加載"}`, href: "/article/list/detail", active: true },
              ]}
            />
        
        {/* 文章內容 */}
        <Content article={article} /> {/* 傳遞文章資料給 Content 組件 */}

        {/* 留言區 */}
        <div className="chat" style={{ background: "#FFF6E8", padding: "15px", marginTop: "150px", borderRadius:'20px',border:'none '}}>
          <h3 className="mt-3 ms-3">留言</h3>
          <ul className="list-unstyled">
            {comments.length === 0 ? (
              <p className="mt-3 ms-3">暫無評論，快來發表你的看法吧！</p>
            ) : (
              comments.map((comment, index) => (
                <Comment
                  key={index}
                  content={comment.content}
                  author={comment.author}
                  author_img={comment.author_img}
                  id={comment.id}
                />
              ))
            )}
            <MyComment />
            {/* <li className="d-flex py-3" style={{ margin: "10px" }}>
            <div className={`${styles.auther}`}>
              <div className="avatar ratio ratio-1x1 rounded-circle overflow-hidden">
                <img
                  className="object-fit-cover"
                  src="/article_img/batman.jpg"
                  alt=""
                />
              </div>
            </div>
            <input
              type="text"
              className="px-1"
              style={{ marginLeft: "2rem", width: "100%" }}
            ></input>
          </li> */}
          </ul>
        </div>

        {/* 延伸閱讀 */}
        <div className="more-read">
          <h3 className="mt-5 mb-4">延伸閱讀</h3>
          <div className="row">
            {articles
              .sort(() => Math.random() - 0.5) // 亂數排序
              .slice(0, 4) // 取前五篇
              .map((article) => (
                <Card key={article.id} {...article} />
              ))}
          </div>
        </div>
      </div>

    </>
  );
}


/**/