"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import useComment from "@/hooks/useComment";
import MyCard3 from "@/app/article/_components/my_article/article_card3";
import Link from "next/link";
import {
  ScrollMotionContainer,
  ScrollMotionItem,
} from "@/app/article/ListMotion";
import styles from "./page.module.css";

export default function MyArticle() {
  const { user } = useAuth();
  const userid = user?.id;
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { comments, getComments, loading } = useComment(userid);

  const trueUrl = (imagePath) => {
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return `http://localhost:5000/auth/${imagePath}`;
  };

  // console.log(comments)
  // console.log("userid:"+userid)
  // console.log("comments:"+comments)
  // console.log("我這裡是使用者留言的頁面")

  useEffect(() => {
    if (userid) {
      getComments(userid)
        .then(() => setCheckingAuth(false))
        .catch((err) => {
          console.error("獲取留言失敗:", err);
          setCheckingAuth(false);
        });
    }
  }, [userid]);

  if (checkingAuth || loading) {
    return (
      <div className={styles.container2}>
        <div className={styles.loader27}></div>
      </div>
    );
  }

  // useEffect(() => {
  //   if (!comments.length) return; 
  //   setCheckingAuth(false);
  // }, [comments]);
  // if (checkingAuth) {
  //   return (
  //     <div className={styles.container2}>
  //       <div className={styles.loader27}></div>
  //     </div>
  //   );
  // }

  return (
    <div className="col-12 col-md-9">
      <div className="w-100">
        <div>
          <div className="d-flex justify-content-between my-2">
            <h4>我的文章</h4>
            <button
              className={styles.post}
            >
              <Link
                href="/article/add_article"
                className={styles.postLink}
              >
                <i className="bi bi-check-circle"></i> 發布文章
              </Link>
            </button>
          </div>
          <ul className="nav nav-tabs mt-4">
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                href="/user/my_article"
                style={{ color: '#f5842b' }}
              >文章</Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                href=""
                style={{ color: 'white', backgroundColor: '#f5842b' }}
              >留言</Link>
            </li>

          </ul>
          <ScrollMotionContainer
            // element="div"
            style={{
              borderRadius: "5px",
              height: "750px",
              overflowY: "scroll",
            }}
          >
            {comments.length > 0 &&
              comments.map((comment) => (
                <ScrollMotionItem
                  // element="div"
                  className={styles.card}
                  key={comment.id}
                  type="up"
                >
                  <MyCard3
                    key={comment.id}
                    article_id={comment.article_id}
                    author={user.name}
                    title={comment.title}
                    content={comment.content}
                    author_image={
                      trueUrl(comment.user_img || "/images/default-cover.jpg")
                    }

                  />{" "}
                </ScrollMotionItem>
              ))}

          </ScrollMotionContainer>
        </div>
      </div>
    </div>
  );
}
