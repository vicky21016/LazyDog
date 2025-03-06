"use client";

const PRODUCTS_FAVORITE_URL = "http://localhost:5000/api/products/favorite";
const HOTEL_FAVORITE_URL = "http://localhost:5000/api/hotel_favorites";
const COURSE_FAVORITE_URL = "http://localhost:5000/api/course_favorites";

const getToken = () => localStorage.getItem("loginWithToken");

export const getId = async (productId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${productId}`);
    if (!res.ok) throw new Error("獲取商品詳細資訊失敗");
    return await res.json();
  } catch (error) {
    console.error("獲取商品資訊錯誤:", error);
    return null;
  }
};
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

    const response = await res.json();
    console.log("API 取得的商品收藏:", response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("獲取產品收藏失敗:", error);
    return { success: false, error: error.message };
  }
};

// 更新收藏狀態 (軟刪除)
export const updateProductFavoriteStatus = async (
  userID,
  productIDlist,
  isDeleted
) => {
  if (!userID || productIDlist.length == 0)
    return { success: false, error: "缺少必要參數" };

  try {
    const formData = new FormData();
    formData.append("userID", userID);
    formData.append("productIDlist", productIDlist.join(","));
    formData.append("is_deleted", isDeleted ? 1 : 0);

    const res = await fetch(PRODUCTS_FAVORITE_URL, {
      method: "PATCH",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const result = await res.json();

    if (result.status !== "success") throw new Error(result.message);
    return { success: true, message: "更新成功" };
  } catch (error) {
    console.error(" 更新收藏錯誤:", error);
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

// 取得用戶收藏的課程
export const getCourseFavorites = async (id) => {
  const token = getToken();
  if (!token) return { success: false, error: "請先登入" };

  try {
    const res = await fetch(`${COURSE_FAVORITE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("獲取課程收藏失敗");

    const response = await res.json();
    console.log("API 取得的課程收藏:", response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("獲取課程收藏失敗:", error);
    return { success: false, error: error.message };
  }
};

// 新增課程收藏
export const addCourseFavorite = async (courseId) => {
  const token = getToken();
  if (!token) return { success: false, error: "請先登入" };

  try {
    const res = await fetch(COURSE_FAVORITE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ course_id: courseId }),
    });

    if (!res.ok) throw new Error("新增課程收藏失敗");
    return await res.json();
  } catch (error) {
    console.error("新增課程收藏失敗:", error);
    return { success: false, error: error.message };
  }
};

// 移除課程收藏
export const removeCourseFavorite = async (favoriteId, userId) => {
  const token = getToken();
  if (!token) return { success: false, error: "請先登入" };

  try {
    const res = await fetch(`${COURSE_FAVORITE_URL}/${favoriteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: userId }),
    });

    if (!res.ok) throw new Error("移除課程收藏失敗");
    return await res.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
};
