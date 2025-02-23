import React, { useState } from "react";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import { useDatePicker } from "@/hooks/useDatePicker";

const HotelSearchBar = ({
  location,
  locationModalRef,
  openModal,
  address,
  closeModal,
  confirmLocation,
  quantity,
  setQuantity,
  onSearch,
}) => {
  const dateRef = useDatePicker();
  const [selectedDate, setSelectedDate] = useState("");

 
  const handleSearchBarSubmit = () => {
    console.log("🔍 搜尋欄條件:", { address, quantity, selectedDate });

    if (onSearch) {
      onSearch({
        address,
        quantity,
        selectedDate,
      });
    }
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
            {address ? address : "選擇地區"}
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
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
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
         {/* 使用 `handleSearchBarSubmit` 作為搜尋函數 */}
         <button className={styles.suSearchBtn} onClick={handleSearchBarSubmit}>
          搜尋
        </button>
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
                  onClick={() => confirmLocation()}
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
