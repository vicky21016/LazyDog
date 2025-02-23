"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocationSelector } from "@/hooks/useLocationSelector";
import styles from "../../../styles/modules/fontHotelHome.module.css";
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
  } = useLocationSelector();

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
                    image={hotel.main_image_url || "/hotel/loding.jpg"}
                    name={hotel.name}
                    introduce={hotel.introduce}
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
