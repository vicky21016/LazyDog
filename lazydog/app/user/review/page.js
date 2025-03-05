"use client";
import React, { useEffect, useState, useRef } from "react";
import { useReview } from "@/hooks/useCourseReview";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import styles from "./operatorCamera.module.css";

export default function ReviewList() {
  const [modalData, setModalData] = useState({});
  const replyInputRef = useRef(null);
  const router = useRouter();

  const { id } = useParams();
  const { review } = useReview(id);
  console.log(review);

  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };

  const reviews = review.map((item) => ({
    customer: `${item.user_name}`,
    order: `${item.id}`,
    date: `${item.created_at}`,
    rating: `${item.rating}`,
    content: `${item.comment}`,
    replied: true,
    status: "公開",
  }));
  const loadReview = (review) => {
    setModalData(review);
  };

  const replyReview = () => {
    const replyContent = replyInputRef.current.value.trim();
    if (replyContent) {
      alert(`回覆成功：${replyContent}`);
      replyInputRef.current.value = ""; // 清空
    } else {
      alert("請先填寫回覆內容");
    }
  };

  return (
    <>
      <div className={`col-md-9`}>
        <h3 className="mb-4">評論列表</h3>
        <div className="table-responsive">
          <table className="table suTable table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>顧客名稱</th>
                <th>訂單編號</th>
                <th>評論日期</th>
                <th>評分</th>
                <th>評論內容</th>
                <th>是否回覆</th>
                <th>狀態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={index}>
                  <td>{review?.customer}</td>
                  <td>{review?.order}</td>
                  <td>{review?.date}</td>
                  <td>{review?.rating}</td>
                  <td>{review?.content}</td>
                  <td>{review.reply ? "已回覆" : "未回覆"}</td>
                  <td>
                    <span
                      className={`badge ${
                        review.status === "公開" ? [styles.btn3] : [styles.btn]
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${styles.btn}`}
                      data-bs-toggle="modal"
                      data-bs-target="#reviewModal"
                      onClick={() => loadReview(review)}
                    >
                      檢視 / 回覆
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        <div
          className="modal fade"
          id="reviewModal"
          tabIndex="-1"
          aria-labelledby="reviewModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="reviewModalLabel">
                  評論詳細資訊
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>顧客名稱：</strong> {modalData.customer || "N/A"}
                </p>
                <p>
                  <strong>訂單編號：</strong> {modalData.order || "N/A"}
                </p>
                <p>
                  <strong>評論日期：</strong> {modalData.date || "N/A"}
                </p>
                <p>
                  <strong>評分：</strong> {modalData.rating || "N/A"}
                </p>
                <p>
                  <strong>評論內容：</strong>
                </p>
                <p className="border p-2">{modalData.content || "N/A"}</p>
                <label className="form-label mt-3">回覆：</label>
                <textarea
                  ref={replyInputRef}
                  className="form-control"
                  rows="3"
                  placeholder={
                    review.reply ? review.reply : "請輸入回覆內容..."
                  }
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className={`btn ${styles.btn2}`}
                  data-bs-dismiss="modal"
                >
                  取消
                </button>
                <button
                  type="button"
                  className={`btn ${styles.btn}`}
                  onClick={replyReview}
                >
                  送出回覆
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
