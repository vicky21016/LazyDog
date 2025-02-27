"use client";

import React, { useState } from "react";
import useComment from "@/hooks/useComment";
import styles from '../../_components/detail/page.module.css';
import { useAuth } from "@/hooks/use-auth";
import { useParams, useRouter } from "next/navigation"; // 引入 useRouter

const CommentSection = () => {
    const [commentContent, setCommentContent] = useState(""); // 留言內容
    const { createComment, loading, error, data } = useComment();
    const { user } = useAuth();
    const { id } = useParams();
    const router = useRouter(); // 使用 useRouter 來刷新頁面

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentContent.trim()) {
            alert("請輸入留言內容");
            return;
        }
    
        try {
            const commentData = {
                content: commentContent,
                article_id: id,
                user_id: user.id,
            };
    
            await createComment(commentData);
            
            // 顯示成功訊息
            alert("新增成功");
    
            // 重新載入當前畫面
            window.location.reload(); 
    
            setCommentContent(""); // 清空輸入框
        } catch (err) {
            console.error("留言創建失敗:", err);
            alert("留言創建失敗，請稍後重試"); // 顯示錯誤訊息
        }
    };
    

    return (
        <li className="d-flex py-3" style={{ margin: "10px" }}>
            <div className={`${styles.auther}`}>
                <div className="avatar ratio ratio-1x1 rounded-circle overflow-hidden">
                    <img
                        className="object-fit-cover"
                        src="/article_img/batman.jpg"
                        alt=""
                    />
                </div>
            </div>
            <div className="w-100 d-flex" style={{ height: "40px" }}>
                <input
                    type="text"
                    style={{ marginLeft: "2rem", width: "100%", borderRadius: '5px' }}
                    placeholder="輸入留言..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn btn-primary ms-1"
                >
                    {/* {loading ? "提交中..." : ""} */}
                    <i className="bi bi-send-fill"></i>
                </button>
            </div>

            {/* 顯示錯誤訊息 */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* 顯示成功訊息 */}
            {data && <p style={{ color: "green" }}>{data.message}</p>}
        </li>
    );
};

export default CommentSection;