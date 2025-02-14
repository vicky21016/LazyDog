"use client";

import { fetchWithAuth } from "@/services/fetchWithAuth";

// 宣告 API 懶得打字
const API_URL = "http://localhost:5000/api/coupons";

// 取得所有優惠券
export const getAllCoupons = async () => {
  return await fetchWithAuth(API_URL);
};

// 取得特定優惠券
export const getCouponById = async (id) => {
  return await fetchWithAuth(`${API_URL}/${id}`);
};

// 領取優惠券
export const claimCoupon = async (data) => {
  return await fetchWithAuth(`${API_URL}/claim`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

//  新增優惠券
export const createCoupon = async (data) => {
  return await fetchWithAuth(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

//  更新
export const updateCoupon = async (id, data) => {
  return await fetchWithAuth(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

// 軟刪除
export const softDeleteCoupon = async (id) => {
  return await fetchWithAuth(`${API_URL}/${id}/soft-delete`, {
    method: "PATCH",
  });
};
