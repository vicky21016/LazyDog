"use client";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ReviewList = () => {
  const [modalData, setModalData] = useState({});
  const fileInputRef = useRef(null);
  const avatarRef = useRef(null);
  const replyInputRef = useRef(null);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

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

  const uploadPhoto = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        avatarRef.current.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePhoto = () => {
    avatarRef.current.src =
      "/images/hotel/hotel-images/page-image/default-avatar.png";
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
    <div className="container mt-5">
      <div className="row">
        {/* 左邊*/}
        <div className="col-md-3">
          <div className="card p-3">
            <div className="text-center">
              <div className="position-relative d-inline-block">
                <img
                  ref={avatarRef}
                  src="/images/hotel/hotel-images/page-image/Dog2.png"
                  alt="User Avatar"
                  className="rounded-circle avatar-img"
                />

                <div className="dropdown">
                  <button
                    className="btn btn-light camera-icon p-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={uploadPhoto}
                  >
                    <img
                      src="/images/hotel/hotel-images/page-image/icon-camera.png"
                      alt="相機"
                      className="camera-icon-img"
                    />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        id="deletePhoto"
                        onClick={deletePhoto}
                      >
                        刪除照片
                      </button>
                    </li>
                    <li>
                      <label htmlFor="uploadPhoto" className="dropdown-item">
                        上傳照片
                      </label>
                      <input
                        type="file"
                        id="uploadPhoto"
                        accept="image/*"
                        className="d-none"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <h5 className="mt-2">陳大方</h5>
              <p className="text-muted">165846hote@gmail.com</p>
              <button className="btn btn-outline-success btn-sm">已認證</button>
            </div>

            <hr />
            <ul className="list-unstyled text-start">
              <li className="py-2">
                <a href="#" className="text-decoration-none text-dark">
                  <i className="bi bi-person-fill me-2"></i>負責人資訊
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="text-decoration-none text-dark">
                  <i className="bi bi-house-heart-fill me-2"></i>旅館資訊
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="text-decoration-none text-dark">
                  <i className="bi bi-card-list me-2"></i>旅館評論
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="text-decoration-none text-dark">
                  <i className="bi bi-ticket-perforated me-2"></i>旅館優惠券
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 右邊 */}
        <div className="col-md-9">
          <h3 className="mb-4">評論列表</h3>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
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
                          review.status === "公開" ? "bg-success" : "bg-warning"
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
  );
};

export default ReviewList;
