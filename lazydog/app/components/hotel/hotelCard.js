import React from "react";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import { useRouter } from "next/navigation";

const HotelCard = ({ image, name, introduce, review, reviewCount, link,hotel }) => {
  const router = useRouter();

  // 確保 `image` 存在，避免 `.startsWith("http")` 錯誤
  const imageUrl = image ? image : "/hotel/loding.jpg";

  const goToDetail = () => {
    if (hotel?.id) {
      router.push(`/hotel-coupon/${hotel.id}`);
    }
  };
  return (
    <div
      className={styles.suHotelCard}
      onClick={goToDetail}
    >
      <img src={hotel.main_image_url || "/hotel/loding.jpg"} alt={hotel.name} />
      <div className={styles.suHotelInfo}>
        <h5>{hotel.name}</h5>
        <p>{hotel.introduce}</p>
      </div>
      <div className={styles.suPriceBox}>
        <div className={`mb-3 ${styles.suReview}`}>⭐ {hotel.review}</div>
        {hotel.review_count || 0}則評論
        <button className={styles.suBookBtn} onClick={goToDetail}>
          查看價格
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
