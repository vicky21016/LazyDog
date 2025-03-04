import React from "react";
import Link from "next/link";
import couponStyles from "./userCoupon.module.css";

const Hotel = ({ hotelOrders }) => {
  // 過濾出旅館類型的訂單，如果全部都是旅館訂單可以不用過濾
  // const filteredHotelOrders = hotelOrders.filter((order) => order.hotel_id);
  console.log(hotelOrders);

  return (
    <>
      {hotelOrders.map((order) => (
        <div key={order.id} className={`mt-2 ${couponStyles.suCouponCard}`}>
          {/* 假設圖片路徑是由 hotel_id 決定，需要根據資料庫設計調整 */}
          <Link href="">
            <img
              src={`/images/hotel/hotel-images/page-image/hotel${order.img}`} // 根據hotel_id替換圖片
              style={{ maxHeight: "100px" }}
              alt={`旅館訂單 ${order.id}`}
            />
          </Link>
          <div className={couponStyles.suDetails}>
            <Link href="" style={{ color: "#f5842b" }}>
              旅館編號: {order.hotel_id}{" "}
              {/* 假設有旅館名稱，可以換成旅館名稱 */}
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
