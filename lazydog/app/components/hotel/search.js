import React from "react";
import styles from "../../../styles/modules/fontHotelHome.module.css";

const HotelSearchBar = ({
  location,
  openModal,
  quantity,
  setQuantity,
  onSearch,
}) => {
  return (
    <div className="container mt-4">
      <div className={styles.suSearchBar}>
        <div className={styles.suSearchGroup}>
          <img
            className={styles.suIcon}
            src="/hotel/hotel-images/page-image/icon-search.png"
            alt=""
          />
          <input
            type="text"
            className={styles.suSearchInput}
            placeholder="搜尋關鍵字、地區..."
            value={location}
            readOnly
            onClick={openModal}
          />
        </div>
        <div className={styles.suSearchGroup}>
          <img
            className={styles.suIcon}
            src="/hotel/hotel-images/page-image/icon-Calendar.png"
            alt=""
          />
          <input
            type="text"
            id="date-date"
            className={styles.suSearchDate}
            placeholder="入住日期 → 退房日期"
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
        <button className={styles.suSearchBtn} onClick={onSearch}>
          搜尋
        </button>
      </div>
    </div>
  );
};

export default HotelSearchBar;
