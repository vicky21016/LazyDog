import React from "react";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import { useRouter } from "next/navigation";

const HotelCard = ({ image, name, description, review, reviewCount, link }) => {
  const router = useRouter();

  return (
    <div
      className={styles.suHotelCard}
      onClick={() => router.push(link)}
      style={{ cursor: "pointer" }}
    >
      <img src={image} alt={name} />
      <div className={styles.suHotelInfo}>
        <h5>{name}</h5>
        <p>{description}</p>
      </div>
      <div className={styles.suPriceBox}>
        <div className={`mb-3 ${styles.suReview}`}>很棒 ⭐ {review}</div>
        {reviewCount} 則評論
        <button
          className={`ms-3 ${styles.suBookBtn}`}
          onClick={(e) => {
            e.stopPropagation();
            router.push(link);
          }}
        >
          查看價格
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
