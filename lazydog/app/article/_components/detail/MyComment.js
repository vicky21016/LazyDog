"use client";

import React, { useState, useEffect } from "react";
import useComment from "@/hooks/useComment";
import styles from '../../_components/detail/page.module.css';
import { useAuth } from "@/hooks/use-auth";
import { useParams } from "next/navigation";

const CommentSection = () => {
    const [commentContent, setCommentContent] = useState("");
    const { createComment, loading, error, data } = useComment();
    const { id } = useParams();
    const { user, loading: authLoading } = useAuth();

    // 設置默認頭像
    const defaultAvatar = '/path/to/default-avatar.jpg';
    const modifiedAvatar = user?.avatar ? user.avatar.replace('/images/', '/') : defaultAvatar;

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
            alert("新增成功");
            window.location.reload();
            setCommentContent("");
        } catch (err) {
            console.error("留言創建失敗:", err);
            alert("留言創建失敗，請稍後重試");
        }
    };

    if (authLoading) {
        return <div>加載中...</div>;
    }

    return (
        <li className="d-flex py-3" style={{ margin: "10px" }}>
            <div className={`${styles.auther}`}>
                <div className="avatar ratio ratio-1x1 rounded-circle overflow-hidden">
                    <img
                        className="object-fit-cover"
                        src={modifiedAvatar}
                        alt=""
                    />
                </div>
            </div>
            <div className="w-100 d-flex" style={{ height: "40px" }}>
                <textarea
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
                    <i className="bi bi-send-fill"></i>
                </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {data && <p style={{ color: "green" }}>{data.message}</p>}
        </li>
    );
};

export default CommentSection;