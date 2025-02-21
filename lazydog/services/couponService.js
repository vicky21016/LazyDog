"use client";

// import { auth } from "@/hooks/use-auth";

// 宣告 API 懶得打字
const API_URL = "http://localhost:5000/api/coupon";
const COUPON_USAGE_URL = "http://localhost:5000/api/coupon/usage";
const COUPON_RESTRICTION_URL = "http://localhost:5000/api/coupon/restrictions";

const getToken = () => localStorage.getItem("loginWithToken");

//詳細role限制請看server端
//API URL的part
// 取得所有優惠券
export const getAllCoupons = async () => {
  const token = getToken();
  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status == 401) {
    console.warn("未授權，請重新登入");
    window.location.href = "/login";
    return null;
  }

  return await res.json();
};

// 取得特定優惠券
export const getCouponById = async (id) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};
// code查詢優惠券
export const getCouponByCode = async (code) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/code/${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

//  新增優惠券
export const createCoupon = async (data) => {
  const token = getToken();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

//  更新
export const updateCoupon = async (id, data) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

// 軟刪除
export const softDeleteCoupon = async (id) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}/soft-delete`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserCoupons = async () => {
  const token = getToken();
  const res = await fetch(COUPON_USAGE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};
// 領取優惠券(手領)
export const claimCoupon = async (couponId) => {
  const token = localStorage.getItem("loginWithToken");
  if (!token) {
    alert("請先登入");
    window.location.href = "/login";
    return;
  }
  const res = await fetch(`${COUPON_USAGE_URL}/claim`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ couponId }),
  });

  return await res.json();
};
// 透過code領取優惠券(打字領)
export const claimCouponByCode = async (code) => {
  const token = getToken();
  const res = await fetch(`${COUPON_USAGE_URL}/typing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ code }),
  });

  return await res.json();
};
// 使用優惠券
export const useCoupon = async (couponId) => {
  const token = getToken();
  const res = await fetch(`${COUPON_USAGE_URL}/use/${couponId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};
// 刪除使用者優惠券 //可以考慮不要用
export const deleteUserCoupon = async (couponId) => {
  const token = getToken();
  const res = await fetch(`${COUPON_USAGE_URL}/delete/${couponId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};
// 取得優惠券的使用限制
export const getCouponRestrictions = async (couponId) => {
  const token = getToken();
  const res = await fetch(`${COUPON_RESTRICTION_URL}/${couponId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};
//新增同上
export const createCouponRestriction = async (couponId, data) => {
  const token = getToken();
  const res = await fetch(`${COUPON_RESTRICTION_URL}/${couponId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};
//delete 同上 ...待測試
export const deleteCouponRestriction = async (restrictionId) => {
  const token = getToken();
  const res = await fetch(`${COUPON_RESTRICTION_URL}/${restrictionId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};
