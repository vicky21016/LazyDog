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
    console.log("API 取得的商品收藏:", response); // 🟢 確保數據正確
    return { success: true, data: response.data }; // 確保 data 直接傳遞
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
      body: JSON.stringify({ hotel_id: hotelId }),
    });

    const result = await res.json();

    // **確保讀取到最內層的 success**
    if (result.success && result.data?.success) {
      return { success: true, message: result.data.message || "收藏成功" };
    }

    throw new Error(result.message || "新增 hotel 收藏失敗");
  } catch (error) {
    console.error("新增 hotel 收藏失敗:", error);
    return { success: false, error: error.message };
  }
};

// 移除收藏
export const removeHotelFavorite = async (id) => {
  const token = getToken();
  if (!token) return { success: false, error: "請先登入" };
  console.log("Removing favorite for hotel ID:", id);
  console.log("Token used for request:", storedToken);

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
    const res = await fetch(
      `${COURSE_FAVORITE_URL}/${favoriteId}?user_id=${userId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const result = await res.json();

    if (res.ok) {
      return { success: true, message: "刪除成功" };
    }

    // 如果後端返回 400，但已經刪除，仍然回傳 success: true
    if (res.status == 400 && result.message.includes("已經刪除")) {
      return { success: true, message: "該收藏已刪除" };
    }

    throw new Error(result.message || "移除課程收藏失敗");
  } catch (error) {
    return { success: false, error: error.message };
  }
};
