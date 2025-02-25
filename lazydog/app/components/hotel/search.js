import React, { useState } from "react";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import { useDatePicker } from "@/hooks/useDatePicker";
import { getFilteredHotelsS, } from "@/services/hotelService";

const HotelSearchBar = ({
  location,
  locationModalRef,
  openModal,
  city,
  district,
  closeModal,
  confirmLocation,
  clearLocation,
  quantity,
  setQuantity,
  onSearch,
  onClear,
}) => {
  const { dateRef, selectedDate, setSelectedDate, clearDate } = useDatePicker();
  const [isSearching, setIsSearching] = useState(true);

  const handleSearchBarSubmit = async () => {
    confirmLocation(); // 確保選擇地區後更新 `city` 和 `district`
    
    const searchParams = {
      city: city || null,
      district: district || null,
      quantity: quantity || 1,
      checkInDate: null,
      checkOutDate: null,
    };

    // 確保 `checkInDate` 和 `checkOutDate` 正確
    if (selectedDate.includes(" 至 ")) {
      const [checkInDate, checkOutDate] = selectedDate.split(" 至 ");
      searchParams.checkInDate = checkInDate.trim() || null;
      searchParams.checkOutDate = checkOutDate.trim() || null;
    }


    try {
      const result = await getFilteredHotelsS(searchParams);

      if (onSearch) {
        onSearch(searchParams);
      }

      setIsSearching(false);
    } catch (error) {
      console.error(" 搜尋 API 錯誤:", error);
    }
  };

  const handleClearSearch = () => {
    console.log(" 清除搜尋條件");

    clearLocation();
    clearDate();
    setQuantity(1);

    if (onClear) {
      onClear();
    }
  
    setIsSearching(true); // 恢復搜尋狀態
    
  };

  return (
    <div className="container mt-4">
      <div className={styles.suSearchBar}>
        <div className={styles.suSearchGroup}>
          <img className={styles.suIcon} src="/hotel/hotel-images/page-image/icon-search.png" alt="" />
          <button className={styles.suSearchInput} onClick={openModal}>
            {city ? `${city} ${district || ""}` : "選擇地區"}
          </button>
        </div>
        <div className={styles.suSearchGroup}>
          <img className={styles.suIcon} src="/hotel/hotel-images/page-image/icon-Calendar.png" alt="" />
          <input
            type="text"
            ref={dateRef}
            className={styles.suSearchDate}
            placeholder="入住日期 → 退房日期"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className={styles.suSearchGroup}>
          <img className={styles.suIcon} src="/hotel/hotel-images/page-image/Icon-mimi.png" alt="" />
          <span className="text">數量</span>
          <button className={styles.suQuantityBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            -
          </button>
          <span className={styles.suQuantityNumber}>{quantity}</span>
          <button className={styles.suQuantityBtn} onClick={() => setQuantity(quantity + 1)}>
            +
          </button>
        </div>

        {/* 搜尋按鈕 */}
        <button className={styles.suSearchBtn} onClick={isSearching ? handleSearchBarSubmit : handleClearSearch}>
          {isSearching ? "搜尋" : "清除篩選"}
        </button>

        {/* 地區選擇 Modal */}
        <div className="modal fade" ref={locationModalRef} tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">選擇地區</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div id="twzipcode">
                  <select className="county"></select>
                  <select className="district"></select>
                </div>
              </div>
              <div className="modal-footer">
                <button className={styles.suSearchBtn} onClick={confirmLocation}>
                  確定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSearchBar;
