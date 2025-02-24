import React, { useState } from "react";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import { useDatePicker } from "@/hooks/useDatePicker";

const HotelSearchBar = ({
  location,
  locationModalRef,
  openModal,
  city,
  district,
  closeModal,
  confirmLocation, // ✅ 這裡的 `confirmLocation` 需要正確更新
  quantity,
  setQuantity,
  onSearch,
  onClear,
}) => {
  const dateRef = useDatePicker(); 
  const [selectedDate, setSelectedDate] = useState("");

  const handleSearchBarSubmit = () => {
    console.log("🔍 搜尋欄條件:", { city, district, selectedDate, quantity });

    if (onSearch) {
      const searchParams = {
        city: city || undefined,
        district: district || undefined,
        selectedDate: selectedDate || undefined,
        quantity: quantity || 1,
      };

      const cleanParams = Object.fromEntries(
        Object.entries(searchParams).filter(([_, v]) => v !== undefined)
      );

      onSearch(cleanParams);
    }
  };

  const handleClearSearch = () => {
    console.log("🧹 清除搜尋條件");

    setSelectedDate("");
    if (dateRef.current) dateRef.current.value = "";
    if (onClear) onClear();
  };

  return (
    <div className="container mt-4">
      <div className={styles.suSearchBar}>
        <div className={styles.suSearchGroup}>
          <img
            className={styles.suIcon}
            src="/hotel/hotel-images/page-image/icon-search.png"
            alt=""
          />
          <button className={styles.suSearchInput} onClick={openModal}>
            {/* ✅ 這裡顯示選擇的地區 */}
            {city ? `${city} ${district || ""}` : "選擇地區"}
          </button>
        </div>
        <div className={styles.suSearchGroup}>
          <img
            className={styles.suIcon}
            src="/hotel/hotel-images/page-image/icon-Calendar.png"
            alt=""
          />
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
          <img
            className={styles.suIcon}
            src="/hotel/hotel-images/page-image/Icon-mimi.png"
            alt=""
          />
          <span className="text">數量</span>
          <button
            className={styles.suQuantityBtn}
            onClick={() => setQuantity(Math.max(1, quantity - 1))} // 最小為 1
          >
            -
          </button>

          <span className={styles.suQuantityNumber}>{quantity}</span>
          <button
            className={styles.suQuantityBtn}
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        {/* 搜尋按鈕 */}
        <button className={styles.suSearchBtn} onClick={handleSearchBarSubmit}>
          搜尋
        </button>

        {/* 地區選擇 Modal */}
        <div
          className="modal fade"
          ref={locationModalRef}
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">選擇地區</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div id="twzipcode">
                  <select className="county"></select>
                  <select className="district"></select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className={styles.suSearchBtn}
                  onClick={() => confirmLocation()} // ✅ 確保這裡更新 `city` 和 `district`
                >
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
