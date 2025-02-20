"use client";

import { auth } from "@/hooks/use-auth";

// 宣告 API 懶得打字
const API_URL = "http://localhost:5000/api/coupons";

const getToken = () => localStorage.getItem("loginWithToken");

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

// 領取優惠券
export const claimCoupon = async (couponId) => {
  const token = localStorage.getItem("loginWithToken");
  if (!token) {
    alert("請先登入");
    window.location.href = "/login";
    return;
  }
  const res = await fetch(`http://localhost:5000/api/coupon_usage/claim`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ couponId }),
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
