import React from "react";
import Link from "next/link";
import couponStyles from "./userCoupon.module.css";

const Hotel = ({ hotelOrders }) => {
  if (!hotelOrders || hotelOrders.length === 0) {
    return <p>目前沒有旅館訂單</p>;
  }

  console.log("Hotel Orders:", hotelOrders);

  return (
    <>
      {hotelOrders.map((order) => (
        <div key={order.id} className={`mt-2 ${couponStyles.suCouponCard}`}>
          <Link href="">
            <img
              src={order.images && order.images.length > 0 ? order.images[0].url : "/default-image.jpg"}
              style={{ maxHeight: "100px" }}
              alt={`旅館訂單 ${order.id}`}
            />
          </Link>
          <div className={couponStyles.suDetails}>
            <Link href="" style={{ color: "#f5842b" }}>
              旅館編號: {order.hotel_id}{" "}
            </Link>
            <p className="text-muted">
              入住時間: {order.check_in}~{order.check_out}
            </p>
          </div>
          <span className={couponStyles.suPrice}>NT{order.final_amount}</span>
        </div>
      ))}
    </>
  );
};

export default Hotel;
