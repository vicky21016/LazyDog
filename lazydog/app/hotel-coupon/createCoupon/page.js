"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createCoupon } from "@/services/couponService";
import Header from "../../components/layout/header";
import { useAuth } from "@/hooks/use-auth";

import My from "../../components/hotel/my";
import styles from "../../../styles/modules/operatorHotel.module.css";

export default function CreateCouponPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [coupon, setCoupon] = useState({
    name: "",
    code: "",
    description: "",
    discount_type: "fixed", // 預設為固定金額
    discount_value: "", // 優惠金額或折扣百分比
    min_order_value: "",
    max_usage: "",
    start_time: "",
    end_time: "",
    status: "active",
    max_usage_per_user: "",
  });

  // 生成隨機優惠碼
  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 12).toUpperCase();
    setCoupon((prev) => ({ ...prev, code }));
  };

  // 處理表單輸入變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prev) => ({ ...prev, [name]: value }));
  };

  // 提交表單
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!token) {
      alert("請先登入");
      return;
    }
  
    const formattedCoupon = {
      name: coupon.name,
      code: coupon.code,
      discount_type: coupon.discount_type,
      is_global: coupon.targetAudience === "all" ? 1 : 0, 
      content: coupon.description,
      value: Number(coupon.discount_value),
      min_order_value: Number(coupon.min_order_value),
      max_usage: Number(coupon.max_usage),
      max_usage_per_user: Number(coupon.max_usage_per_user),
      start_time: coupon.start_time ? `${coupon.start_time}T00:00:00Z` : "",
      end_time: coupon.end_time ? `${coupon.end_time}T23:59:59Z` : "",
      status: coupon.status,
    };
  
    console.log(" 送出的資料:", formattedCoupon);
  
    try {
      const result = await createCoupon(formattedCoupon, token); 
      if (result.success) {
        alert("優惠券新增成功！");
        router.push("/hotel-coupon/couponList");
      } else {
        alert(`新增失敗：${result.error}`);
      }
    } catch (error) {
      console.error("新增優惠券失敗:", error);
      alert("發生錯誤，請稍後再試");
    }
  };
  
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          {/* 左邊 */}
          <My />
          <div className="col-12 col-md-9">
            <h3 className="mb-4">新增優惠券</h3>

            {/* 基本資訊 */}
            <div className="p-4 border rounded bg-light mb-4">
              <h5 className="mb-3">基本資訊</h5>
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">優惠券名稱 *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={coupon.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">優惠券代碼 *</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      value={coupon.code}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className={`btn btn-secondary ${styles.suBtnSuccess}`}
                      onClick={generateCode}
                    >
                      生成
                    </button>
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                  <label className="form-label">描述 *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={coupon.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* 使用條件 */}
            <div className="p-4 border rounded bg-light mb-4">
              <h5 className="mb-3">使用條件</h5>
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label">折扣類型</label>
                  <select
                    className="form-select"
                    name="discount_type"
                    value={coupon.discount_type}
                    onChange={handleChange}
                  >
                    <option value="fixed">固定金額</option>
                    <option value="percentage">百分比</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">
                    {coupon.discount_type === "fixed"
                      ? "優惠金額"
                      : "折扣百分比"}{" "}
                    *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="discount_value"
                    value={coupon.discount_value}
                    onChange={handleChange}
                    placeholder={
                      coupon.discount_type === "fixed"
                        ? "例如：100"
                        : "例如：10%"
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">最低使用金額</label>
                  <input
                    type="text"
                    className="form-control"
                    name="min_order_value"
                    value={coupon.min_order_value}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">使用次數</label>
                  <input
                    type="text"
                    className="form-control"
                    name="max_usage"
                    value={coupon.max_usage}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* 有效期限 */}
            <div className="p-4 border rounded bg-light mb-4">
              <h5 className="mb-3">有效期限</h5>
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">開始日期</label>
                  <input
                    type="date"
                    className="form-control"
                    name="start_time"
                    value={coupon.start_time}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">結束日期</label>
                  <input
                    type="date"
                    className="form-control"
                    name="end_time"
                    value={coupon.end_time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* 其他資訊 */}
            <div className="p-4 border rounded bg-light mb-4">
              <h5 className="mb-3">其他資訊</h5>
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label">適用對象</label>
                  <select
                    className="form-select"
                    name="targetAudience"
                    value={coupon.targetAudience}
                    onChange={handleChange}
                  >
                    <option value="all">所有用戶</option>
                    <option value="members">會員限定</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">使用狀態</label>
                  <select
                    className="form-select"
                    name="status"
                    value={coupon.status}
                    onChange={handleChange}
                  >
                    <option value="active">啟用</option>
                    <option value="inactive">未啟用</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">剩餘可用次數</label>
                  <input
                    type="text"
                    className="form-control"
                    name="max_usage_per_user"
                    value={coupon.max_usage_per_user}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* 表單內容 */}
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className={`btn btn-secondary btn-sm px-4 ${styles.suBtnSecondary}`}
                onClick={() => router.push("/hotel-coupon/couponList")}
              >
                取消
              </button>
              <button
                type="button"
                className={`btn btn-outline-primary btn-sm px-4 ${styles.suBtnSuccess}`}
                onClick={handleSubmit}
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
