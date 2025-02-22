"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import { useLocationSelector } from "@/hooks/useLocationSelector";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Header from "../../components/layout/header";
import HotelCard from "@/app/components/hotel/hotelCard";
import SearchBar from "../../components/hotel/search";
import Aside from "@/app/components/hotel/sideBar";
import Page from "../../components/hotel/page";
import Breadcrumb from "../../components/teacher/breadcrumb";

export default function HotelHomePage() {
  const router = useRouter();
  const [filteredHotels, setFilteredHotels] = useState([]); // 存篩選後的飯店資料
  const [quantity, setQuantity] = useState(1);

  const {
    location,
    locationModalRef,
    openModal,
    address,
    closeModal,
    confirmLocation,
    onSearch,
  } = useLocationSelector();

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    import("flatpickr").then(({ default: flatpickr }) => {
      console.log("flatpickr 載入成功！");
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
    }).catch((error) => {
      console.error("flatpickr 載入失敗:", error);
    });
  }, []);
  
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
            address={address}
            openModal={openModal}
            closeModal={closeModal}
            locationModalRef={locationModalRef}
            quantity={quantity}
            confirmLocation={confirmLocation}
            setQuantity={setQuantity}
            onSearch={setFilteredHotels}
          />
        </div>
        <div className="lumi-all-wrapper mt-5">
          <Breadcrumb
            links={[
              { label: "首頁 ", href: "/" },
              {
                label: "旅館列表",
                href: "/hotel-coupon/fonthotelHome",
                active: true,
              },
            ]}
          />
        </div>

        <div className="container mt-4">
          <div className="row">
            {/* 側邊篩選欄 */}
            <aside className={`col-lg-3 ${styles.suSidebar}`}>
            <Aside onSearch={setFilteredHotels} />
            </aside>

            {/* 飯店列表 */}
            <section className="col-lg-9">
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    image={hotel.main_image_url || "/hotel/default.png"}
                    name={hotel.name}
                    description={hotel.description}
                    review={hotel.avg_rating || "無評分"}
                    reviewCount={hotel.review_count || 0}
                    link={`/hotel-coupon/${hotel.id}`}
                  />
                ))
              ) : (
                <p className="text-center">沒有符合條件的飯店</p>
              )}
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
