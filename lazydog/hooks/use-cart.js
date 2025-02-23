"use client";
import { createContext, useContext, useState, useEffect } from 'react';

// 創建統一的 CartContext
const CartContext = createContext(null);

CartContext.displayName = 'CartContext';

// Provider管理商品、課程、旅館的邏輯
export function CartProvider({ children }) {
  const [productItems, setProductItems] = useState([]);
  const [courseItems, setCourseItems] = useState([]);
  const [hotelItems, setHotelItems] = useState([]);

  const [didMount, setDidMount] = useState(false);

  // 商品增減邏輯
  const onAddProduct = (product) => {
    const foundIndex = productItems.findIndex((v) => v.id === product.id);
    if (foundIndex !== -1) {
      const nextItems = productItems.map((v) => v.id === product.id ? { ...v, count: v.count + 1 } : v);
      setProductItems(nextItems);
    } else {
      const newItem = { ...product, count: 1 };
      setProductItems([newItem, ...productItems]);
    }
  };

  // 課程增減邏輯
  const onAddCourse = (course) => {
    const foundIndex = courseItems.findIndex((v) => v.id === course.id);
    if (foundIndex !== -1) {
      const nextItems = courseItems.map((v) => v.id === course.id ? { ...v, count: v.count + 1 } : v);
      setCourseItems(nextItems);
    } else {
      const newItem = { ...course, count: 1 };
      setCourseItems([newItem, ...courseItems]);
    }
  };

  // 旅館增減邏輯
  const onAddHotel = (hotel) => {
    const foundIndex = hotelItems.findIndex((v) => v.id === hotel.id);
    if (foundIndex !== -1) {
      const nextItems = hotelItems.map((v) => v.id === hotel.id ? { ...v, count: v.count + 1 } : v);
      setHotelItems(nextItems);
    } else {
      const newItem = { ...hotel, count: 1 };
      setHotelItems([newItem, ...hotelItems]);
    }
  };

  // 計算商品、課程、旅館的總數量和總金額
  const totalProductQty = productItems.reduce((acc, v) => acc + v.count, 0);
  const totalProductAmount = productItems.reduce((acc, v) => acc + v.count * v.price, 0);

  const totalCourseQty = courseItems.reduce((acc, v) => acc + v.count, 0);
  const totalCourseAmount = courseItems.reduce((acc, v) => acc + v.count * v.price, 0);

  const totalHotelQty = hotelItems.reduce((acc, v) => acc + v.count, 0);
  const totalHotelAmount = hotelItems.reduce((acc, v) => acc + v.count * v.price, 0);

  useEffect(() => {
    setProductItems(JSON.parse(localStorage.getItem('productCart')) || []);
    setCourseItems(JSON.parse(localStorage.getItem('courseCart')) || []);
    setHotelItems(JSON.parse(localStorage.getItem('hotelCart')) || []);
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      localStorage.setItem('productCart', JSON.stringify(productItems));
      localStorage.setItem('courseCart', JSON.stringify(courseItems));
      localStorage.setItem('hotelCart', JSON.stringify(hotelItems));
    }
  }, [productItems, courseItems, hotelItems]);

  return (
    <CartContext.Provider
      value={{
        productItems,
        courseItems,
        hotelItems,
        totalProductQty,
        totalProductAmount,
        totalCourseQty,
        totalCourseAmount,
        totalHotelQty,
        totalHotelAmount,
        onAddProduct,
        onAddCourse,
        onAddHotel,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
