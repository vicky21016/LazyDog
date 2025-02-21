"use client";

import EventCard from "./eventCard";
import styles from "../../../styles/modules/fontCoupon.module.css";

export default function EventSection() {
  const events = [
    {
      title: "首購會員",
      color: "primary",
      content: "現折50",
      description: "單筆消費滿 $500 即可使用",
    },
    {
      title: "滿額免運",
      color: "danger",
      description: "超取 $1500 / 宅配 $2000",
      icon: "/hotel/hotel-images/page-image/coupon/shipping-fast.png",
    },
    {
      title: "購物金回饋",
      color: "warning",
      description: "會員最高享 8% 回饋",
      icon: "/hotel/hotel-images/page-image/coupon/coins-dollar-line.png",
    },
  ];

  return (
    <div className={`container-fluid ${styles.suFifthSection}`}>
      <div className="container">
        <div className="row justify-content-center mt-5">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
