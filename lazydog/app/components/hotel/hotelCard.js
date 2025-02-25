import React from "react";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import { useRouter } from "next/navigation";

const HotelCard = ({ image, name, introduce, review, reviewCount, link }) => {
  const router = useRouter();
  
  // 確保 `image` 存在，避免 `.startsWith("http")` 錯誤
  const imageUrl = image ? image : "/hotel/loding.jpg";

  return (
    <div
      className={styles.suHotelCard}
      onClick={() => router.push(link)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={imageUrl}
        alt={name}
        onError={(e) => (e.target.src = "/hotel/loding.jpg")} //  圖片錯誤時使用預設圖片
      />
      <div className={styles.suHotelInfo}>
        <h5>{name}</h5>
        <p>{introduce}</p>
      </div>
      <div className={styles.suPriceBox}>
        <div className={`mb-3 ${styles.suReview}`}>⭐ {review}</div>
        {reviewCount} 則評論
        <button className={styles.suBookBtn}>查看價格</button>
      </div>
    </div>
  );
};

export default HotelCard;
