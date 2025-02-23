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
  const [hotels, setHotels] = useState([]); // 存放所有飯店數據
  const [filteredHotels, setFilteredHotels] = useState([]); // 存放篩選後的飯店數據
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 10; // 每頁顯示的飯店數量
  const [searchParams, setSearchParams] = useState({});
  const {
    location,
    locationModalRef,
    openModal,
    address,
    closeModal,
    confirmLocation,
  } = useLocationSelector();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelData = await getAllHotels();
        setHotels(hotelData);
        setFilteredHotels(hotelData); // 初次載入時設定篩選數據
      } catch (error) {
        console.error("獲取飯店失敗:", error);
      }
    };

    fetchHotels();
  }, []);
 // 搜尋欄觸發的搜尋
 const handleSearchBarSubmit = async (params) => {
  console.log("🔍 觸發搜尋條件:", params);
  setSearchParams(params); // 存儲搜尋條件

  try {
    const data = await getFilteredHotels(params); //  傳遞條件給 API
    setFilteredHotels(data); // 更新篩選後的飯店數據
    setCurrentPage(1); // 重設到第 1 頁
  } catch (error) {
    console.error("搜尋飯店失敗:", error);
  }
};

// 篩選器觸發的搜尋
const handleSearchFromFilters = async (params) => {
  console.log("🔍 篩選條件:", params);
  setSearchParams((prev) => ({ ...prev, ...params })); // 合併篩選條件

  try {
    const data = await getFilteredHotels({ ...searchParams, ...params });
    setFilteredHotels(data);
    setCurrentPage(1);
  } catch (error) {
    console.error("篩選飯店失敗:", error);
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
            onSearch={handleSearchBarSubmit}
          />
        </div>

        {/* 麵包屑導航 */}
        <div className="lumi-all-wrapper mt-5">
          <Breadcrumb
            links={[
              { label: "首頁", href: "/" },
              { label: "旅館列表", href: "/hotel-coupon/fonthotelHome", active: true },
            ]}
          />
        </div>

        {/* 主要內容 */}
        <div className="container mt-4">
          <div className="row">
            {/* 側邊篩選欄 */}
            <aside className={`col-lg-3 ${styles.suSidebar}`}>
            <Aside onSearch={handleSearchFromFilters} />
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
          totalPages={Math.ceil(filteredHotels.length / hotelsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
