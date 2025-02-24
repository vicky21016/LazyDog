"use client";

const API_URL = "http://localhost:5000/api/hotels";
const HOTEL_TAGS_URL = "http://localhost:5000/api/hotel_tags";
const HOTEL_ROOM_TYPES_URL = "http://localhost:5000/api/hotel_room_types";
const ROOM_BASE_PRICE_URL = "http://localhost:5000/api/room_base_price";
const ROOM_TYPES_URL = "http://localhost:5000/api/read/room_types";
const ROOM_INVENTORY_URL = "http://localhost:5000/api/room_inventory";
const HOTEL_IMAGES_URL = "http://localhost:5000/api/hotel_images";
const HOTEL_ORDERS_URL = "http://localhost:5000/api/hotel_orders";
const ORDER_DOGS_URL = "http://localhost:5000/api/order_dogs";
const HOTEL_FAVORITES_URL = "http://localhost:5000/api/hotel_favorites";
const HOTEL_REVIEW_URL = "http://localhost:5000/api/hotel_review";

const getToken = () => localStorage.getItem("loginWithToken");
//  統一 處理
const fetchAPI = async (url, method = "GET", body = null) => {
  try {
    const options = { method, headers: {} };
    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(` API 錯誤 (${method} ${url}):`, error);
    return null;
  }
};

//  自動附帶 `Authorization`
const fetchAuthAPI = async (url, method = "GET", body = null) => {
  const token = getToken();
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  if (body) options.body = JSON.stringify(body);
  return fetchAPI(url, method, body);
};

// 所有 C
export const getAllHotels = async () => fetchAPI(API_URL);
export const getHotelById = async (id) => fetchAPI(`${API_URL}/${id}`);
export const fetchHotelsCount = async () => fetchAPI(`${API_URL}/count`);
export const getPaginatedHotels = async (page = 1, limit = 10) =>
  fetchAPI(`${API_URL}/paginated?limit=${limit}&offset=${(page - 1) * limit}`);

export const getFilteredHotels = (params) => fetchAPI(`${API_URL}/filter?${new URLSearchParams(params)}`);

export const getOperatorHotels = async () => fetchAuthAPI(`${API_URL}/operator`);
export const createHotel = async (formData) => fetchAuthAPI(API_URL, "POST", formData);
export const updateHotel = async (id, formData) => fetchAuthAPI(`${API_URL}/${id}`, "PATCH", formData);
export const softDeleteHotel = async (id) => fetchAuthAPI(`${API_URL}/${id}/soft-delete`, "PATCH");
//標籤C
export const getAllTags = async () => fetchAPI(`${HOTEL_TAGS_URL}/tags`);
export const getHotelTags = async (hotelId) => fetchAPI(`${HOTEL_TAGS_URL}/${hotelId}`);
export const removeHotelTag = async (hotelId, tagId) =>
  fetchAuthAPI(`${HOTEL_TAGS_URL}/${hotelId}/${tagId}`, "PATCH");
//價格
// 取得所有飯店的價格範圍
export const getGlobalPriceRange = async () => fetchAPI(`${ROOM_BASE_PRICE_URL}/range`);
export const getRoomBasePrices = async () => fetchAPI(`${ROOM_BASE_PRICE_URL}`);
export const getHotelPriceRange = async (hotelId) => fetchAPI(`${ROOM_BASE_PRICE_URL}/range/${hotelId}`);
//房型跟庫存
export const getAllRoomTypes = async () => fetchAPI(ROOM_TYPES_URL);
export const getHotelRoomById = async (roomId) => fetchAPI(`${HOTEL_ROOM_TYPES_URL}/${roomId}`);

//OP ONLY
export const createHotelRoom = async (roomData) => fetchAuthAPI(HOTEL_ROOM_TYPES_URL, "POST", roomData);

export const updateHotelRoom = async (roomId, updateData) =>fetchAuthAPI(`${HOTEL_ROOM_TYPES_URL}/${roomId}`, "PATCH", updateData);

export const deleteHotelRoom = async (roomId) => fetchAuthAPI(`${HOTEL_ROOM_TYPES_URL}/${roomId}`, "DELETE");

//OP END

//房間庫存
export const getRoomInventory = async () => fetchAPI(ROOM_INVENTORY_URL);

//OP ONLY
export const updateRoomInventory = async (roomInventoryId, updateData) =>fetchAuthAPI(`${ROOM_INVENTORY_URL}/${roomInventoryId}`, "PATCH", updateData);
//OP END

//hotel的圖C
export const getAllHotelImages = async () => fetchAPI(HOTEL_IMAGES_URL);
export const getByHotelId = async (hotelId) => fetchAPI(`${HOTEL_IMAGES_URL}/hotel/${hotelId}`);

//訂單C
export const getAllHotelOrders = async () => fetchAuthAPI(HOTEL_ORDERS_URL);
export const getOrderById = async (orderId) => fetchAuthAPI(`${HOTEL_ORDERS_URL}/${orderId}`);
export const createNewOrder = async (orderData) => fetchAuthAPI(HOTEL_ORDERS_URL, "POST", orderData);
// OP ONLY
export const updateOrder = async (orderId, updateData) =>fetchAuthAPI(`${HOTEL_ORDERS_URL}/${orderId}`, "PATCH", updateData);
export const changeOrderStatus = async (orderId, status) =>fetchAuthAPI(`${HOTEL_ORDERS_URL}/${orderId}/status`, "PATCH", { status });
export const updateOrderPayment = async (orderId, paymentStatus) =>fetchAuthAPI(`${HOTEL_ORDERS_URL}/${orderId}/payment`, "PATCH", { paymentStatus });
export const softDeleteOrder = async (orderId) => fetchAuthAPI(`${HOTEL_ORDERS_URL}/${orderId}/soft-delete`, "PATCH");
//OP END

//訂單裡面狗的資料
export const getAllOrderDogs = async () => fetchAuthAPI(ORDER_DOGS_URL);

export const getOrderDogs = async (orderId) => fetchAuthAPI(`${ORDER_DOGS_URL}/${orderId}`);

export const createOrderDog = async (dogData) => fetchAuthAPI(ORDER_DOGS_URL, "POST", dogData);

export const updateOrderDog = async (dogId, updateData) =>fetchAuthAPI(`${ORDER_DOGS_URL}/${dogId}`, "PATCH", updateData);

export const deleteOrderDog = async (dogId) => fetchAuthAPI(`${ORDER_DOGS_URL}/${dogId}`, "DELETE");
//END

//收藏C
export const getUserFavorites = async () => fetchAuthAPI(HOTEL_FAVORITES_URL);
export const addHotelToFavorites = async (hotelId) =>fetchAuthAPI(HOTEL_FAVORITES_URL, "POST", { hotelId });
export const removeHotelToFavorites = async (hotelId) =>fetchAuthAPI(`${HOTEL_FAVORITES_URL}/${hotelId}`, "DELETE");

//ReviewC
export const getHotelReviews = async (hotelId) => fetchAPI(`${HOTEL_REVIEW_URL}/${hotelId}`);
export const addHotelReview = async (hotelId, reviewData) =>fetchAuthAPI(HOTEL_REVIEW_URL, "POST", { hotelId, ...reviewData });
export const replyHotelReview = async (reviewId, replyData) =>fetchAuthAPI(`${HOTEL_REVIEW_URL}/${reviewId}/reply`, "POST", replyData);
export const deleteHotelReview = async (reviewId) => fetchAuthAPI(`${HOTEL_REVIEW_URL}/${reviewId}`, "DELETE");
export const ratingAv = async () => fetchAPI(`${HOTEL_REVIEW_URL}/average`);