import React from "react";
import Link from "next/link";
import styles from "../../../styles/modules/fontHotelHome.module.css"; 

const HotelCard = ({ image, name, description, review, reviewCount, link }) => {
  return (
    <Link href="/hotel-coupon/fonthotelDetail" className={styles.suHotelCard}>
      <img src={image} alt={name} />
      <div className={styles.suHotelInfo}>
        <h5>{name}</h5>
        <p>{description}</p>
      </div>
      <div className={styles.suPriceBox}>
        <div className={`mb-3 ${styles.suReview}`}>很棒 ⭐ {review}</div>
        {reviewCount} 則評論
        <Link href={link} className={`ms-3 ${styles.suBookBtn}`}>
          查看價格
        </Link>
      </div>
    </Link>
  );
};

export default HotelCard;
