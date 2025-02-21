"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import { useRouter } from "next/navigation";
import Header from "../../components/layout/header";
import My from "../../components/hotel/my"
// ReviewList
// reviews.js 裡get+post+delete+put做API連結後台，
//下面都是假資料參考用就好
const ReviewList = () => {
  const [modalData, setModalData] = useState({});
  const replyInputRef = useRef(null);
  const router = useRouter();
  

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };

  const reviews = [
    {
      customer: "王大明",
      order: "SB001",
      date: "2024/03/10",
      rating: "⭐⭐⭐⭐⭐",
      content: "房間很乾淨，服務很好！",
      replied: true,
      status: "公開",
    },
    {
      customer: "李小華",
      order: "SB002",
      date: "2024/03/09",
      rating: "⭐⭐⭐",
      content: "整體不錯，但早餐選擇少了一點。",
      replied: false,
      status: "待處理",
    },
  ];

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
    <Header />
      <div className="container mt-5">
        <div className="row">
          {/* 左邊*/}
         <My/>

          {/* 右邊 */}
          <div className="col-md-9">
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
                      <td>{review.customer}</td>
                      <td>{review.order}</td>
                      <td>{review.date}</td>
                      <td>{review.rating}</td>
                      <td>{review.content}</td>
                      <td>{review.replied ? "已回覆" : "未回覆"}</td>
                      <td>
                        <span
                          className={`badge ${
                            review.status === "公開"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          {review.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
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
          </div>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="reviewModal"
          tabIndex="-1"
          aria-labelledby="reviewModalLabel"
          aria-hidden={true}
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
                  placeholder="請輸入回覆內容..."
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  取消
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
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
};

export default ReviewList;
