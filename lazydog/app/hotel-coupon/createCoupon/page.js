"use client";
import React, { useState, useEffect } from "react";
import styles from "../../../styles/modules/operatorHotel.module.css";
import { useRouter } from "next/navigation";
import Header from "../../components/layout/header";
import My from "../../components/hotel/my"
export default function CreateCouponPage() {
  const router = useRouter();

  const [couponCode, setCouponCode] = useState("");
  const [couponName, setCouponName] = useState("");
  const [description, setDescription] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };

  // 生成隨機優惠碼
  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 12).toUpperCase();
    setCouponCode(code);
  };

  // 提交表單
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ couponCode, couponName, description });
    alert("優惠券已儲存！");
  };

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          {/* 左邊*/}
          <My />
          <div className="col-md-9">
            <h3 className="mb-4">新增優惠券</h3>
            <div className="p-4 border rounded bg-light mb-4">
              <h5 className="mb-3">基本資訊</h5>
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">優惠券名稱 *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="輸入優惠券名稱"
                    value={couponName}
                    onChange={(e) => setCouponName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">優惠券代碼 *</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="couponCode"
                      placeholder="自動生成或手動輸入"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
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
                    placeholder="輸入優惠券描述"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border rounded bg-light mb-4">
              <h5 className="mb-3">使用條件</h5>
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label">折扣類型</label>
                  <select className="form-select" defaultValue="">
                    <option value="" disabled>
                      選擇折扣類型
                    </option>
                    <option value="amount">滿額折扣</option>
                    <option value="percentage">折扣百分比</option>
                    <option value="quantity">滿件折扣</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">最低使用金額</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="輸入最低使用金額"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">使用次數</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="輸入可使用次數"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border rounded bg-light mb-4">
              <h5 className="mb-3">有效期限</h5>
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">開始日期</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">結束日期</label>
                  <input type="date" className="form-control" />
                </div>
              </div>
            </div>

            <div className="p-4 border rounded bg-light mb-4">
              <h5 className="mb-3">其他資訊</h5>
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label">適用對象</label>
                  <select className="form-select" defaultValue="">
                    <option value="" disabled>
                      選擇適用對象
                    </option>
                    <option value="all">所有用戶</option>
                    <option value="members">會員限定</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">使用狀態</label>
                  <select className="form-select" defaultValue="enabled">
                    <option value="enabled">啟用</option>
                    <option value="expired">已過期</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">剩餘可用次數</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="輸入剩餘可用次數"
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">注意事項</label>
                  <textarea
                    className="form-control"
                    placeholder="輸入優惠券使用注意事項"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className={`btn btn-secondary btn-sm px-4 ${styles.suBtnSecondary}`}
                onClick={() => changepage("couponList")}
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
