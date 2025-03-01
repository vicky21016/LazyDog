"use client";

import React, { useState, useEffect } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import { useRouter } from "next/navigation";
import My from "../../components/hotel/my";
import Header from "../../components/layout/header";
import { getCoupons, softDeleteCoupon } from "@/services/couponService"; // 導入 API 函數

export default function CouponListPage() {
  const [coupons, setCoupons] = useState([]); // 存儲優惠券數據
  const [selectedCoupon, setSelectedCoupon] = useState(null); // 存儲當前選中的優惠券
  const router = useRouter();

  // 加載優惠券數據
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getCoupons(); // 調用 API 獲取優惠券
        console.log("API 返回的數據：", response); // 打印數據

        if (response && response.success && Array.isArray(response.data)) {
          setCoupons(response.data); // 確保存入的是 data
        } else {
          console.error("API 返回的數據格式錯誤：", response);
          setCoupons([]); // 設置為空數組
        }
      } catch (error) {
        console.error("獲取優惠券失敗：", error);
        setCoupons([]); // 設置為空數組
      }
    };

    fetchCoupons();
  }, []);

  // 切換頁面
  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };

  // 加載單個優惠券詳細信息
  const loadCoupon = (coupon) => {
    setSelectedCoupon(coupon);
  };

  // 刪除優惠券
  const handleDeleteCoupon = async (couponId) => {
    const confirmDelete = window.confirm("確定要刪除這張優惠券嗎？");
    if (!confirmDelete) return;

    try {
      const result = await softDeleteCoupon(couponId); // 調用 API 刪除優惠券
      if (result.success) {
        setCoupons((prevCoupons) =>
          prevCoupons.filter((coupon) => coupon.id !== couponId)
        ); // ✅ 確保 `setCoupons` 更新
        alert("優惠券已刪除");
      } else {
        alert("刪除失敗：" + result.message);
      }
    } catch (error) {
      console.error("刪除優惠券失敗：", error);
      alert("刪除優惠券時發生錯誤");
    }
  };

  // 編輯優惠券
  const handleEditCoupon = (couponId) => {
    router.push(`/hotel-coupon/editCoupon?id=${couponId}`); // ✅ 改用 `query string`
  };

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          {/* 左邊 */}
          <My />

          {/* 右邊 */}
          <div className="col-12 col-md-9">
            <h5 className="mb-4">優惠券列表</h5>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr className="text-center">
                    <th>優惠代碼</th>
                    <th>優惠名稱</th>
                    <th>優惠內容</th>
                    <th>開始日期</th>
                    <th>結束日期</th>
                    <th>使用次數</th>
                    <th>狀態</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.id} className="text-center">
                      <td>{coupon.code}</td>
                      <td>{coupon.name}</td>
                      <td>{coupon.value || "無"}</td>
                      {/* 確保 `details` 存在 */}
                      <td>
                        {
                          new Date(coupon.start_time)
                            .toISOString()
                            .split("T")[0]
                        }
                      </td>
                      <td>
                        {new Date(coupon.end_time).toISOString().split("T")[0]}
                      </td>

                      <td>{coupon.usage || 0}</td>
                      <td>
                        <span
                          className={`badge ${
                            coupon.status === "active"
                              ? "bg-success"
                              : coupon.status === "expired"
                              ? "bg-warning"
                              : "bg-secondary"
                          }`}
                        >
                          {coupon.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => loadCoupon(coupon)}
                        >
                          檢視
                        </button>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEditCoupon(coupon.id)}
                        >
                          編輯
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteCoupon(coupon.id)}
                        >
                          刪除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 優惠券 Modal */}
            {selectedCoupon && (
              <div
                className="modal fade show"
                style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
                tabIndex="-1"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">優惠券詳細資訊</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setSelectedCoupon(null)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>
                        <strong>優惠代碼：</strong> {selectedCoupon.code}
                      </p>
                      <p>
                        <strong>優惠名稱：</strong> {selectedCoupon.name}
                      </p>
                      <p>
                        <strong>優惠內容：</strong>{" "}
                        {selectedCoupon.value
                          ? Number(selectedCoupon.value).toFixed(2)
                          : "無"}
                      </p>
                      <p>
                        <strong>有效期限：</strong>
                        {selectedCoupon?.start_time
                          ? new Date(selectedCoupon.start_time)
                              .toISOString()
                              .split("T")[0]
                          : "未設定"}{" "}
                        ~{" "}
                        {selectedCoupon?.end_time
                          ? new Date(selectedCoupon.end_time)
                              .toISOString()
                              .split("T")[0]
                          : "未設定"}
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedCoupon(null)}
                      >
                        關閉
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEditCoupon(selectedCoupon.id)}
                      >
                        編輯
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => changepage("createCoupon")}
              >
                + 新增優惠券
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
