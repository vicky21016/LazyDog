import React from "react";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import { useRouter } from "next/navigation";

const HotelCard = ({ image,hotel }) => {
  const router = useRouter();

  // 確保 `image` 存在
  const imageUrl = image ? image : "/hotel/loding.jpg";

  const goToDetail = () => {
    if (hotel?.id) {
      router.push(`/hotel-coupon/fonthotelDetail/${hotel.id}/`);    }
  };
  return (
    <div className="row">
      <div className={styles.suHotelCard} onClick={goToDetail}>
        <img
          src={hotel.main_image_url || "/hotel/loding.jpg"}
          alt={hotel.name}
          className="col-md-4 col-3"
        />
        <div className={`col-md-5 col-6 ${styles.suHotelInfo}`}>
          <h5>{hotel.name}</h5>
          <p>{hotel.introduce}</p>
        </div>
        <div className={`col-md-3 col-3 ${styles.suPriceBox}`}>
          <div className={`mb-3 ${styles.suReview}`}>⭐ {hotel.avg_rating}</div>
          {hotel.review_count || 0}則評論
          <button className={`ms-4 ${styles.suBookBtn}`} onClick={goToDetail}>
            查看價格
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
