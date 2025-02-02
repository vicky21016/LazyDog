"use client";
import react, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ReviewList = () => {
  const [modalData, setModalData] = useState({});

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

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card p-3 text-center">
            <img
              src="./hotel-images/page-image/Dog2.png"
              className="rounded-circle avatar-img"
              alt="User Avatar"
            />
            <h5 className="mt-2">陳大方</h5>
            <p className="text-muted">165846hote@gmail.com</p>
            <button className="btn btn-outline-success btn-sm">已認證</button>
          </div>
        </div>

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
                    <td>
                      <span className="stars">{review.rating}</span>
                    </td>
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
                <strong>顧客名稱：</strong> {modalData.customer}
              </p>
              <p>
                <strong>訂單編號：</strong> {modalData.order}
              </p>
              <p>
                <strong>評論日期：</strong> {modalData.date}
              </p>
              <p>
                <strong>評分：</strong> {modalData.rating}
              </p>
              <p>
                <strong>評論內容：</strong>
              </p>
              <p className="border p-2">{modalData.content}</p>
              <label className="form-label mt-3">回覆：</label>
              <textarea
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
              <button type="button" className="btn btn-primary">
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
