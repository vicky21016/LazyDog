//思考要不要轉moudles
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import "nouislider/dist/nouislider.css";
import noUiSlider from "nouislider";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useLocationSelector } from "@/hooks/useLocationSelector";
import Header from "../../components/layout/header";
import HotelCard from "@/app/components/hotel/hotelCard";
import SearchBar from "../../components/hotel/search";
import Aside from "../../product/_components/aside/aside"
import Page from "../../components/hotel/page";
import Breadcrumb from "../../components/teacher/breadcrumb";
export default function HotelHomePage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const priceSliderRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  const {
    location,
    locationModalRef,
    googleMapUrl,
    openModal,
    closeModal,
    confirmLocation,
    openMap,
  } = useLocationSelector();

  useEffect(() => {
    if (typeof window === "undefined") return;

    flatpickr("#date-date", {
      mode: "range",
      dateFormat: "Y-m-d",
      minDate: "today",
      locale: {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ["日", "一", "二", "三", "四", "五", "六"],
          longhand: [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
          ],
        },
        rangeSeparator: " 至 ",
      },
    });

    if (!priceSliderRef.current) return;

    // 初始化滑桿
    noUiSlider.create(priceSliderRef.current, {
      start: [minPrice, maxPrice],
      connect: true,
      range: { min: 0, max: 10000 },
      step: 100,
    });

    // 滑桿更新時同步 `state`
    priceSliderRef.current.noUiSlider.on("change", (values) => {
      setMinPrice(parseFloat(values[0]));
      setMaxPrice(parseFloat(values[1]));
    });

    return () => {
      if (priceSliderRef.current?.noUiSlider) {
        priceSliderRef.current.noUiSlider.destroy();
      }
    };
  }, []);
  const handleMinPriceChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setMinPrice(""); // 清空
      return;
    }

    value = Number(value);
    if (isNaN(value)) return;
    if (value < 0) value = 0;
    if (value > maxPrice) value = maxPrice;

    setMinPrice(value);

    // 滑桿不會影響使用者輸入
    if (priceSliderRef.current?.noUiSlider) {
      priceSliderRef.current.noUiSlider.set([value, maxPrice]);
    }
  };

  const handleMaxPriceChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setMaxPrice(""); // 清空
      return;
    }

    value = Number(value);
    if (isNaN(value)) return;
    if (value > 10000) value = 10000;
    if (value < minPrice) value = minPrice;

    setMaxPrice(value);

    if (priceSliderRef.current?.noUiSlider) {
      priceSliderRef.current.noUiSlider.set([minPrice, value]);
    }
  };
 const handleSearch = () => {
   console.log("開始搜尋飯店...");
 };
  return (
    <>
      <Header />
      <div className="suBody">
        <div
          className={styles.suSearchBg}
          style={{
            backgroundImage: `url("/hotel/hotel-images/services-banner-dog-boarding.2203041608391.jpg")`,
          }}
        >
          {" "}
          <SearchBar
            location={location}
            openModal={openModal}
            quantity={quantity}
            setQuantity={setQuantity}
            onSearch={handleSearch}
          />
        </div>
        <div className="lumi-all-wrapper mt-5">
          <Breadcrumb
            links={[
              { label: "首頁 ", href: "/" },
              { label: "旅館列表", href: "/hotel-coupon/fonthotelHome" ,
              
                active: true,
              },
            ]}
          />
        </div>
        <div className="container mt-4">
          <div className="row">
            {/* 篩選 */}
            <aside className={`col-lg-3 ${styles.suSidebar}`}>
              <Aside />
            </aside>
            <section className="col-lg-9">
              <HotelCard
                image="/hotel/hotel-uploads/1-outside.png"
                name="烏來Spring Spa溫泉山莊"
                description="烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池..."
                review="8"
                reviewCount="1,258"
                link="/hotel-coupon/fonthotelDetail"
              />
              <HotelCard
                image="/hotel/hotel-uploads/1-outside.png"
                name="烏來Spring Spa溫泉山莊"
                description="烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池..."
                review="8"
                reviewCount="1,258"
                link="/hotel-coupon/fonthotelDetail"
              />
              <HotelCard
                image="/hotel/hotel-uploads/1-outside.png"
                name="烏來Spring Spa溫泉山莊"
                description="烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池..."
                review="8"
                reviewCount="1,258"
                link="/hotel-coupon/fonthotelDetail"
              />
              <HotelCard
                image="/hotel/hotel-uploads/1-outside.png"
                name="烏來Spring Spa溫泉山莊"
                description="烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池..."
                review="8"
                reviewCount="1,258"
                link="/hotel-coupon/fonthotelDetail"
              />
              <HotelCard
                image="/hotel/hotel-uploads/1-outside.png"
                name="烏來Spring Spa溫泉山莊"
                description="烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池..."
                review="8"
                reviewCount="1,258"
                link="/hotel-coupon/fonthotelDetail"
              />
              <HotelCard
                image="/hotel/hotel-uploads/1-outside.png"
                name="烏來Spring Spa溫泉山莊"
                description="烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池..."
                review="8"
                reviewCount="1,258"
                link="/hotel-coupon/fonthotelDetail"
              />
              <HotelCard
                image="/hotel/hotel-uploads/1-outside.png"
                name="烏來Spring Spa溫泉山莊"
                description="烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池..."
                review="8"
                reviewCount="1,258"
                link="/hotel-coupon/fonthotelDetail"
              />
              <HotelCard
                image="/hotel/hotel-uploads/1-outside.png"
                name="烏來Spring Spa溫泉山莊"
                description="烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池..."
                review="8"
                reviewCount="1,258"
                link="/hotel-coupon/fonthotelDetail"
              />
            </section>
          </div>
        </div>
        <Page
          currentPage={1}
          totalPages={3}
          onPageChange={(page) => console.log("切換到第", page, "頁")}
        />
      </div>
    </>
  );
}
