"use client";

import React, { useEffect, useState } from "react";
import couponStyles from "./userCoupon.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import Product from "./_components/product";
import Course from "./_components/course";
import Hotel from "./_components/hotel";
import { useOrder } from "@/hooks/use-order";
export default function ProfileCouponPage(props) {
  const router = useRouter();
  const { orders, hotelOrders } = useOrder();
  const [activeTab, setActiveTab] = useState("全部");
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/hotel/hotel-images/page-image/Dog5.png");

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  // console.log(hotelOrders);

  // 根據選取的頁籤來決定要顯示的內容
  const renderContent = () => {
    switch (activeTab) {
      case "商品":
        return <Product orders={orders} />;
      case "課程":
        return <Course />;
      case "旅館":
        return <Hotel hotelOrders={hotelOrders} />;
      default:
        return (
          <>
            <Product orders={orders} />
            <Course />
            <Hotel hotelOrders={hotelOrders} />
          </>
        ); // 預設顯示全部
    }
  };
  //點擊頁籤時的事件
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className={` col-12 col-md-9 coupon-section ${couponStyles.container}`}>
      <h5 className="mb-3">我的訂單</h5>
      <ul className={`nav ${couponStyles.suNavTabs}`}>
        <li className="nav-item">
          <a
            className={`nav-link ${couponStyles.suNavLink} ${
              activeTab === "全部" ? "active" : ""
            }`}
            href="#"
            onClick={() => handleTabClick("全部")}
          >
            全部
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${couponStyles.suNavLink} ${
              activeTab === "商品" ? "active" : ""
            }`}
            href="#"
            onClick={() => handleTabClick("商品")}
          >
            商品 ({orders.length})
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${couponStyles.suNavLink} ${
              activeTab === "課程" ? "active" : ""
            }`}
            href="#"
            onClick={() => handleTabClick("課程")}
          >
            課程 ({"XXX"})
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${couponStyles.suNavLink} ${
              activeTab === "旅館" ? "active" : ""
            }`}
            href="#"
            onClick={() => handleTabClick("旅館")}
          >
            旅館 ({hotelOrders.length})
          </a>
        </li>
      </ul>

      {/* 根據選取的頁籤來渲染內容 */}
      {renderContent()}
    </div>


  );
}
