import React from "react";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import { useRouter } from "next/navigation";

const HotelCard = ({ image, hotel }) => {
  const router = useRouter();

  // 確保 `image` 存在
  const imageUrl = image ? image : "/hotel/loding.jpg";

  const goToDetail = () => {
    if (hotel?.id) {
      router.push(`/hotel-coupon/fonthotelDetail/${hotel.id}/`);
    }
  };
  return (
    <div className="">
      <div className={styles.suHotelCard} onClick={goToDetail}>
        <div className="col-lg-4 col-3">
        <img
          src={hotel.main_image_url || "/hotel/loding.jpg"}
          alt={hotel.name}
         
        /></div>
        <div className={`col-lg-5 col-6 ${styles.suHotelInfo}`}>
          <h5>{hotel.name}</h5>
          <p>{hotel.introduce}</p>
        </div>
        <div className={`col-lg-3 col-3 ${styles.suPriceBox}`}>
          <div className={`mb-3 ${styles.suReview}`}>
            <img
              src="/product/font/star-fill.png"
              style={{ width: "27px", height: "24px" }}
            />{" "}
            {hotel.avg_rating}
          </div>
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
