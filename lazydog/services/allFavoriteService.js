"use client";

const PRODUCTS_FAVORITE_URL = "http://localhost:5000/api/products/favorite";
const HOTEL_FAVORITE_URL = "http://localhost:5000/api/hotel_favorites";

const getToken = () => localStorage.getItem("loginWithToken");

// 取得用戶收藏的產品
export const getProductFavorites = async () => {
  const token = getToken();
  if (!token) return { success: false, error: "請先登入" };

  try {
    const res = await fetch(`${PRODUCTS_FAVORITE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("獲取產品收藏失敗");
    return await res.json();
  } catch (error) {
    console.error("獲取產品收藏失敗:", error);
    return { success: false, error: error.message };
  }
};

// 移除用戶產品收藏
export const deleteProductFavorite = async () => {
  const token = getToken();
  if (!token) return { success: false, error: "請先登入" };

  try {
    const res = await fetch(`${PRODUCTS_FAVORITE_URL}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("移除產品收藏失敗");
    return await res.json();
  } catch (error) {
    console.error("移除產品收藏失敗:", error);
    return { success: false, error: error.message };
  }
};

// 取得用戶收藏
export const getHotelFavorites = async () => {
  const token = getToken();
  if (!token) return { success: false, error: "請先登入" };

  try {
    const res = await fetch(HOTEL_FAVORITE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("獲取hotel收藏失敗");
    return await res.json();
  } catch (error) {
    console.error("獲取hotel收藏失敗:", error);
    return { success: false, error: error.message };
  }
};

// 新增收藏
export const addHotelFavorite = async (hotelId) => {
  const token = getToken();
  if (!token) return { success: false, error: "請先登入" };

  try {
    const res = await fetch(HOTEL_FAVORITE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ hotelId }),
    });
    if (!res.ok) throw new Error("新增hotel收藏失敗");
    return await res.json();
  } catch (error) {
    console.error("新增hotel收藏失敗:", error);
    return { success: false, error: error.message };
  }
};

// 移除收藏
export const removeHotelFavorite = async (id) => {
  const token = getToken();
  if (!token) return { success: false, error: "請先登入" };

  try {
    const res = await fetch(`${HOTEL_FAVORITE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("移除hotel收藏失敗");
    return await res.json();
  } catch (error) {
    console.error("移除hotel收藏失敗:", error);
    return { success: false, error: error.message };
  }
};
