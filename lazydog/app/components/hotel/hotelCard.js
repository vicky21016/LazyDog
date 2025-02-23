import React from "react";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import { useRouter } from "next/navigation";

const HotelCard = ({ image, name, introduce, review, reviewCount, link }) => {
  const router = useRouter();
  const imageUrl = image.startsWith("http")
    ? image // 若為完整 URL，直接使用
    : `http://localhost:5000/uploads/hotel/${image}`;
  return (
    <div
      className={styles.suHotelCard}
      onClick={() => router.push(link)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={imageUrl}
        alt={name}
        onError={(e) => (e.target.src = "/hotel/loding.jpg")}
      />
      <div className={styles.suHotelInfo}>
        <h5>{name}</h5>
        <p>{introduce}</p>
      </div>
      <div className={styles.suPriceBox}>
        <div className={`mb-3 ${styles.suReview}`}>⭐ {review}</div>
        {reviewCount} 則評論
      </div>
    </div>
  );
};

export default HotelCard;
