"use client";

import Image from "next/image";
import styles from "../../../styles/modules/fontCoupon.module.css";

export default function CouponCard({ coupon, onClaim }) {
  return (
    <div className="col-lg-6 col-md-6 col-sm-12">
      <div className={styles.suCoupon}>
        <Image
          src="/hotel/hotel-images/page-image/coupon/coupon-Y.png"
          alt="優惠券背景"
          fill={true}
          style={{ objectFit: "cover" }}
        />
        <div className={styles.suCouponContent}>
          <div className={styles.suCouponName}>{coupon.name}</div>
          <div className={styles.suCouponCode}>{coupon.code}</div>
          <div className={styles.suCouponExpiry}>
            有效期限：{coupon.expiry_date}
          </div>
        </div>
        <button className={styles.suCouponButton} onClick={() => onClaim(coupon.id)}>
          點我領取
        </button>
      </div>
    </div>
  );
}
