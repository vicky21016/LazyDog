"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../../../../styles/modules/operatorCamera.module.css";
import { getCouponById, updateCoupon } from "@/services/couponService";
import Header from "../../../components/layout/header";
import Menu from "../../../components/hotel/menu";
import My from "../../../components/hotel/my";
export default function EditCouponPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const couponId = searchParams.get("id"); // ✅ 取得 URL 內的 `id`
    
    // ✅ 設定狀態來存放優惠券資料
    const [coupon, setCoupon] = useState({
      name: "",
      description: "",
      discountType: "",
      minAmount: "",
      usageLimit: "",
      startDate: "",
      endDate: "",
      targetAudience: "",
      status: "",
      remainingUses: "",
      notes: "",
    });
  
    // ✅ 讀取優惠券資料
    useEffect(() => {
      if (!couponId) return; // 避免沒有 `id` 時發送請求
  
      const fetchCoupon = async () => {
        try {
          const data = await getCouponById(couponId);
          console.log("編輯優惠券數據:", data);
  
          if (data) {
            setCoupon({
              name: data.name || "",
              description: data.details || "", // ✅ 確保 `details` 存在
              discountType: data.type || "",
              minAmount: data.min_order_value || "",
              usageLimit: data.max_usage || "",
              startDate: data.start_time ? data.start_time.split("T")[0] : "",
              endDate: data.end_time ? data.end_time.split("T")[0] : "",
              targetAudience: data.applicableTo || "",
              status: data.status || "",
              remainingUses: data.usage || "",
              notes: "優惠券不得與其他折扣活動併用",
            });
          }
        } catch (error) {
          console.error("獲取優惠券失敗:", error);
        }
      };
  
      fetchCoupon();
    }, [couponId]); // ✅ `couponId` 變更時重新請求
  
    // ✅ 更新狀態
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCoupon((prev) => ({ ...prev, [name]: value }));
    };
  
    // ✅ 提交更新優惠券
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const result = await updateCoupon(couponId, coupon);
        if (result.success) {
          alert("優惠券更新成功！");
          router.push("/hotel-coupon/couponList");
        } else {
          alert("更新失敗：" + result.message);
        }
      } catch (error) {
        console.error("更新優惠券失敗:", error);
        alert("發生錯誤，請稍後再試");
      }
    };
  
  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <My />
          <div className="col-12 col-md-9 mx-auto">
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
