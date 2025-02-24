"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocationSelector } from "@/hooks/useLocationSelector";
import { getAllHotels, getFilteredHotels } from "@/services/hotelService";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import Header from "../../components/layout/header";
import HotelCard from "@/app/components/hotel/hotelCard";
import SearchBar from "../../components/hotel/search";
import Aside from "@/app/components/hotel/sideBar";
import Page from "../../components/hotel/page";
import Breadcrumb from "../../components/teacher/breadcrumb";

export default function HotelHomePage() {
  const router = useRouter();
  const [hotels, setHotels] = useState([]); // 所有飯店
  const [filteredHotels, setFilteredHotels] = useState([]); // 篩選後飯店
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 10;
  const [searchParams, setSearchParams] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const {
    location,
    locationModalRef,
    openModal,
    address,
    closeModal,
    confirmLocation,
  } = useLocationSelector();

  // 🔹 初次載入所有飯店
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelData = await getAllHotels();
        setHotels(hotelData);
        setFilteredHotels(hotelData);
      } catch (error) {
        console.error("獲取飯店失敗:", error);
      }
    };
    fetchHotels();
  }, []);

  // 🔹 更新分頁數
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(filteredHotels.length / hotelsPerPage)));
  }, [filteredHotels]);

  // 🔹 確保當前頁數不超過最大頁數
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  // 搜尋觸發
  const handleSearch = async (params) => {
    console.log("🔍 搜尋條件:", params);
    setSearchParams(params);

    try {
      // 直接使用 `getFilteredHotels` 來獲取篩選飯店
      const data = await getFilteredHotels(params);
      setFilteredHotels(data);
      setCurrentPage(1); // **確保篩選後從第一頁開始**
    } catch (error) {
      console.error("篩選飯店時發生錯誤:", error);
    }
  };

  //  清除篩選條件
  const handleClearFilters = async () => {
    console.log("🧹 清除篩選條件");
    setSearchParams(null);

    try {
      const hotelData = await getAllHotels();
      setFilteredHotels(hotelData);
      setCurrentPage(1);
    } catch (error) {
      console.error("獲取飯店失敗:", error);
    }
  };

  // 計算當前頁面的飯店數據
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);



  return (
    <>
      <Header />
      <div className="suBody">
        {/* 搜尋欄背景 */}
        <div
          className={styles.suSearchBg}
          style={{
            backgroundImage: `url("/hotel/hotel-images/services-banner-dog-boarding.2203041608391.jpg")`,
          }}
        >
          <SearchBar
            location={location}
            address={address}
            openModal={openModal}
            closeModal={closeModal}
            locationModalRef={locationModalRef}
            quantity={quantity}
            confirmLocation={confirmLocation}
            setQuantity={setQuantity}
            onSearch={handleSearch}
            onClear={handleClearFilters}
          />
        </div>

        {/* 麵包屑導航 */}
        <div className="lumi-all-wrapper mt-5">
          <Breadcrumb
            links={[
              { label: "首頁", href: "/" },
              {
                label: "旅館列表",
                href: "/hotel-coupon/fonthotelHome",
                active: true,
              },
            ]}
          />
        </div>

        {/* 主要內容 */}
        <div className="container mt-4">
          <div className="row">
            {/* 側邊篩選欄 */}
            <aside className={`col-lg-3 ${styles.suSidebar}`}>
              <Aside onSearch={setFilteredHotels} onClear={handleClearFilters} />
            </aside>

            {/* 飯店列表 */}
            <section className="col-lg-9">
              {currentHotels.length > 0 ? (
                currentHotels.map((hotel) => (
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

        {/* 分頁功能 */}
        <Page
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
