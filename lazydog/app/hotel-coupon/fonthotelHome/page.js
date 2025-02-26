"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocationSelector } from "@/hooks/useLocationSelector";
import { getAllHotels, getFilteredHotelsS } from "@/services/hotelService";
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
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false); //  追蹤是否篩選

  const {
    location,
    locationModalRef,
    openModal,
    city,
    district,
    closeModal,
    confirmLocation,
    clearLocation,
  } = useLocationSelector();

  const [searchParams, setSearchParams] = useState({
    city: null,
    district: null,
    checkInDate: null,
    checkOutDate: null,
    quantity: 1,
    minPrice: 0,
    maxPrice: 10000,
    roomType: null,
    tags: [],
    rating: null,
  });

  //  避免 `useEffect` 觸發多次篩選
  const isFirstRender = useRef(true);

  // 只有當 `isFiltered == false` 時載入所有飯店
  useEffect(() => {
    if (!isFiltered) {
      getAllHotels()
        .then((hotelData) => {
          setHotels(hotelData);
          setFilteredHotels(hotelData);
        })
        .catch((error) => console.error("獲取飯店失敗:", error));
    }
  }, [isFiltered]);

  //  監聽 `filteredHotels`，更新分頁數
  useEffect(() => {
    setTotalPages(
      Math.max(1, Math.ceil(filteredHotels.length / hotelsPerPage))
    );
    console.log(" 更新篩選結果:", filteredHotels);
  }, [filteredHotels]);

  //  確保當前頁數不超過最大頁數
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  //  觸發篩選 API
  const handleSearch = async (newParams, isSidebar = false) => {
    setIsFiltered(true);

    const updatedParams = {
      ...searchParams, // 🔥 先保留現有條件
      ...newParams, // 再合併新的篩選條件
      minPrice:
        newParams.minPrice !== undefined
          ? Number(newParams.minPrice)
          : searchParams.minPrice,
      maxPrice:
        newParams.maxPrice !== undefined
          ? Number(newParams.maxPrice)
          : searchParams.maxPrice,
      rating:
        newParams.rating !== undefined
          ? Number(newParams.rating)
          : searchParams.rating,
      roomType: newParams.roomType ? Number(newParams.roomType) : null,
      tags:
        newParams.tags && newParams.tags.length > 0
          ? newParams.tags.map(Number)
          : [],
      checkInDate:
        newParams.checkInDate !== undefined
          ? newParams.checkInDate
          : searchParams.checkInDate,
      checkOutDate:
        newParams.checkOutDate !== undefined
          ? newParams.checkOutDate
          : searchParams.checkOutDate,
      city: newParams.city !== undefined ? newParams.city : searchParams.city,
      district:
        newParams.district !== undefined
          ? newParams.district
          : searchParams.district,
      quantity:
        newParams.quantity !== undefined
          ? Number(newParams.quantity)
          : searchParams.quantity,
    };

    console.log("🔍 送出 API 查詢:", updatedParams);

    setSearchParams(updatedParams);

    try {
      let data = await getFilteredHotelsS(updatedParams);
      console.log("✅ API 回應:", data);
      setFilteredHotels(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("篩選飯店錯誤:", error);
      setFilteredHotels([]);
    }
  };

  //  清除篩選條件
  const handleClearFilters = async () => {
    console.log("🧹 清除篩選條件");
    setIsFiltered(false);

    clearLocation();
    setSearchParams({
      city: null,
      district: null,
      checkInDate: null,
      checkOutDate: null,
      quantity: 1,
      minPrice: 0,
      maxPrice: 10000,
      roomType: null, // 確保只有一個 roomType
      tags: [],
      rating: null,
    });

    try {
      const data = await getAllHotels();
      setFilteredHotels(data);
      setCurrentPage(1);
    } catch (error) {
      console.error(" 獲取飯店失敗:", error);
    }
  };

  //  計算當前頁面顯示的飯店
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = Array.isArray(filteredHotels)
    ? filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel)
    : [];

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
            city={city}
            district={district}
            openModal={openModal}
            closeModal={closeModal}
            locationModalRef={locationModalRef}
            quantity={quantity}
            confirmLocation={confirmLocation}
            clearLocation={clearLocation}
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
              <Aside
                searchParams={searchParams}
                onSearch={handleSearch}
                onClear={handleClearFilters}
              />
            </aside>

            {/* 飯店列表 */}
            <section className="col-lg-9">
              {currentHotels.length > 0 ? (
                currentHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
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
