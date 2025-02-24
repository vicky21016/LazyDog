"use client";
import { createContext, useContext, useState, useEffect } from "react";

// 創建統一的 CartContext
const CartContext = createContext(null);

CartContext.displayName = "CartContext";

// Provider管理商品、課程、旅館的邏輯
export function CartProvider({ children }) {
  // const [productItems, setProductItems] = useState([]);
  // const [courseItems, setCourseItems] = useState([]);
  // const [hotelItems, setHotelItems] = useState([]);

  const [productItems, setProductItems] = useState([
    {
      id: "product1",
      name: "商品 A",
      price: 1000,
      count: 2,
      img: "/images/productA.png",
    },
    {
      id: "product2",
      name: "商品 B",
      price: 2000,
      count: 1,
      img: "/images/productB.png",
    },
  ]);
  const [courseItems, setCourseItems] = useState([
    {
      id: "course1",
      name: "課程 A",
      price: 5000,
      count: 1,
      img: "/images/courseA.png",
    },
  ]);
  const [hotelItems, setHotelItems] = useState([
    {
      id: "hotel1",
      name: "旅館 A",
      price: 3000,
      count: 1,
      img: "/images/hotelA.png",
    },
  ]);

  const [didMount, setDidMount] = useState(false);

  // 商品增減邏輯
  const onAddProduct = (product) => {
    const foundIndex = productItems.findIndex((v) => v.id === product.id);
    if (foundIndex !== -1) {
      const nextItems = productItems.map((v) =>
        v.id === product.id ? { ...v, count: v.count + 1 } : v
      );
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
      const nextItems = courseItems.map((v) =>
        v.id === course.id ? { ...v, count: v.count + 1 } : v
      );
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
      const nextItems = hotelItems.map((v) =>
        v.id === hotel.id ? { ...v, count: v.count + 1 } : v
      );
      setHotelItems(nextItems);
    } else {
      const newItem = { ...hotel, count: 1 };
      setHotelItems([newItem, ...hotelItems]);
    }
  };

  // 計算商品、課程、旅館的總數量和總金額
  const totalProductQty = productItems.reduce((acc, v) => acc + v.count, 0);
  const totalProductAmount = productItems.reduce(
    (acc, v) => acc + v.count * v.price,
    0
  );

  const totalCourseQty = courseItems.reduce((acc, v) => acc + v.count, 0);
  const totalCourseAmount = courseItems.reduce(
    (acc, v) => acc + v.count * v.price,
    0
  );

  const totalHotelQty = hotelItems.reduce((acc, v) => acc + v.count, 0);
  const totalHotelAmount = hotelItems.reduce(
    (acc, v) => acc + v.count * v.price,
    0
  );

  // useEffect(() => {
  //   setProductItems(JSON.parse(localStorage.getItem("productCart")) || []);
  //   setCourseItems(JSON.parse(localStorage.getItem("courseCart")) || []);
  //   setHotelItems(JSON.parse(localStorage.getItem("hotelCart")) || []);
  //   setDidMount(true);
  // }, []);

  useEffect(() => {
    if (didMount) {
      localStorage.setItem("productCart", JSON.stringify(productItems));
      localStorage.setItem("courseCart", JSON.stringify(courseItems));
      localStorage.setItem("hotelCart", JSON.stringify(hotelItems));
    }
  }, [productItems, courseItems, hotelItems]);
  // 遞增商品數量
  const onIncrease = (cartItemId) => {
    const nextCartItems = [...productItems, ...courseItems, ...hotelItems].map(
      (v) => {
        if (v.id === cartItemId) return { ...v, count: v.count + 1 };
        else return v;
      }
    );
    setProductItems(
      nextCartItems.filter((item) => productItems.some((p) => p.id === item.id))
    );
    setCourseItems(
      nextCartItems.filter((item) => courseItems.some((c) => c.id === item.id))
    );
    setHotelItems(
      nextCartItems.filter((item) => hotelItems.some((h) => h.id === item.id))
    );
  };

  // 遞減商品數量
  const onDecrease = (cartItemId) => {
    const nextCartItems = [...productItems, ...courseItems, ...hotelItems].map(
      (v) => {
        if (v.id === cartItemId) {
          if (v.count <= 1) return v; // 若數量小於等於1，��不��動
          else return { ...v, count: v.count - 1 };
        } else return v;
      }
    );
    setProductItems(
      nextCartItems.filter((item) => productItems.some((p) => p.id === item.id))
    );
    setCourseItems(
      nextCartItems.filter((item) => courseItems.some((c) => c.id === item.id))
    );
    setHotelItems(
      nextCartItems.filter((item) => hotelItems.some((h) => h.id === item.id))
    );
  };

  // 刪除商品
  const onRemove = (cartItemId) => {
    setProductItems(productItems.filter((v) => v.id !== cartItemId));
    setCourseItems(courseItems.filter((v) => v.id !== cartItemId));
    setHotelItems(hotelItems.filter((v) => v.id !== cartItemId));
  };
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
        onIncrease,
        onDecrease,
        onRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
