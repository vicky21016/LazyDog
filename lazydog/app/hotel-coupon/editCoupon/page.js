"use client";

"use client";
import React, { useState, useEffect } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import { useRouter } from "next/navigation";

import Header from "../../components/layout/header";
import Menu from "../../components/hotel/menu";
import My from "../../components/hotel/my";
export default function EditCouponPage(props) {
  const router = useRouter();


  const [couponName, setCouponName] = useState("新春折扣");
  const [description, setDescription] = useState("適用於全館，滿 1000 減 200");
  const [discountType, setDiscountType] = useState("滿額折扣");
  const [minAmount, setMinAmount] = useState("1000");
  const [usageLimit, setUsageLimit] = useState("1");
  const [startDate, setStartDate] = useState("2024-03-01");
  const [endDate, setEndDate] = useState("2024-03-10");
  const [targetAudience, setTargetAudience] = useState("所有用戶");
  const [status, setStatus] = useState("啟用");
  const [remainingUses, setRemainingUses] = useState("1");
  const [notes, setNotes] = useState("優惠券不得與其他折扣活動併用");
  const handleSubmit = (e) => {
    e.preventDefault();
    const couponData = {
      couponName,
      description,
      discountType,
      minAmount,
      usageLimit,
      startDate,
      endDate,
      targetAudience,
      status,
      remainingUses,
      notes,
    };
    console.log("已儲存優惠券：", couponData);
    alert("優惠券已儲存！");
  };

  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
<My/>
          <div className="col-md-9 mx-auto">
            <h3 className="mb-4">編輯優惠券</h3>

            {/* 基本資訊 */}
            <div className="p-4 border rounded bg-light mb-4">
              <h5 className="mb-3">基本資訊</h5>
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">優惠券名稱 *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={couponName}
                    onChange={(e) => setCouponName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">優惠券代碼 *</label>
                  <input
                    type="text"
                    className="form-control"
                    value="SWW2024"
                    readOnly
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <label className="form-label">描述 *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                  >
                    <option>滿額折扣</option>
                    <option>折扣百分比</option>
                    <option>滿件折扣</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">最低使用金額</label>
                  <input
                    type="text"
                    className="form-control"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">使用次數</label>
                  <input
                    type="text"
                    className="form-control"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
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
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">結束日期</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
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
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  >
                    <option>所有用戶</option>
                    <option>會員限定</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">使用狀態</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>啟用</option>
                    <option>已過期</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">剩餘可用次數</label>
                  <input
                    type="text"
                    className="form-control"
                    value={remainingUses}
                    onChange={(e) => setRemainingUses(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">注意事項</label>
                  <textarea
                    className="form-control"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* 按鈕區 */}
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-success btn-sm px-4"
                onClick={() => changepage("couponList")}
              >
                返回
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm px-4"
                onClick={handleSubmit}
              >
                儲存
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm px-4"
                onClick={() => alert("優惠券已刪除！")}
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
