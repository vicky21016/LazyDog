"use client";

import React, { useEffect, useContext } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Card from "../../_components/detail/MoreCard";
import Comment from "../../_components/detail/Comment";
import Content from "../../_components/detail/Content";
import styles from "./page.module.css";
import useArticles from "@/hooks/useArticle";
import Header from "../../../components/layout/header";
import Breadcrumb from "../../../components/teacher/breadcrumb";

export default function ArticleDetail() {
  const { id } = useParams(); // 取得網址中的文章 ID
  const searchParams = useSearchParams();
  const isFromList = searchParams.get("list"); // 解析 Query String
  const { articles, article, comments, getArticle, loading, error, cover_image } = useArticles()

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
      <div className="container" style={{ marginTop: '70px' }}>
        <div className="w-100 d-flex justify-content-center">

          <div
            style={{ width: '750px' }}
          >
            <div className="mb-5">
              <Breadcrumb
                links={[
                  { label: "首頁 ", href: "/" },
                  { label: " 我的文章", href: "/user/my_article" },
                  { label: ` ${article?.title || "標題尚未加載"}`, href: "/article/list/detail", active: true },
                ]}
              />
             </div>
              {/* 文章內容 */}
              <Content article={article} /> {/* 傳遞文章資料給 Content 組件 */}
            </div>
          </div>
        </div>
      </>
      );
}