"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import Header from "../../components/layout/header";
import MyMenu from "../../components/layout/myMenu";
import MyCard from "../_components/my_article/article_card";
import { useAuth } from "@/hooks/use-auth";
import useArticles from "@/hooks/useArticle";

export default function MyArticle() {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id;

  const { articles, loading, error, getArticlesByAuthor } = useArticles();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (userId) {
      getArticlesByAuthor(userId);
      setTimeout(() => setReload(true), 200); // 200ms 後重新加載
    }
  }, [userId, getArticlesByAuthor, reload]);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="d-none d-md-block col-md-3">
            <MyMenu />
          </div>
          <div className="col-md-9">
            <div className="w-100">
              <div>
                <div className="d-flex justify-content-between my-2">
                  <h4>我的文章</h4>
                  <button style={{ border: "none", backgroundColor: "#FFBD00", color: "white", borderRadius: "5px" }}>
                    <Link href="/article/add_article" style={{ textDecoration: "none", color: "white" }}>
                      <i className="bi bi-check-circle"></i> 發布文章
                    </Link>
                  </button>
                </div>
                <div className="py-1" style={{ backgroundColor: "#EDEDED", borderRadius: "5px", height: "750px", overflowY: "scroll" }}>
                  {loading && <p>加載中...</p>}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {articles.length > 0 ? articles.map((article) => (
                    <MyCard key={article.id} id={article.id} title={article.title} cover_image={article.cover_image || "/images/default-cover.jpg"} created_at={new Date(article.created_at).toLocaleDateString()} />
                  )) : <p>您尚未發布任何文章。</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
