import React from 'react';
import Link from 'next/link'; // 如果你使用的是 Next.js 的 Link 元件
import couponStyles from './userCoupon.module.css'; // 假設你有一個 CSS 模組

const CouponCard = () => {
  // 靜態資料
  const staticData = {
    imageUrl: "http://localhost:5000/api/articles/2df54e20-d6c0-11ee-beff-f3978ced.jpg",
    productName: "一對一寵物美容教學實作",
    courseDate: "2024/12/31~2025/12/31",
    price: "NT2000000000",
  };

  return (
    <div className={`mt-2 ${couponStyles.suCouponCard}`}>
      <Link href="">
        <img
          src={staticData.imageUrl}
          style={{ maxHeight: '100px' }}
          alt={staticData.productName}
        />
      </Link>
      <div className={couponStyles.suDetails}>
        <Link href="" style={{ color: '#f5842b' }}>
          {staticData.productName}
        </Link>
        <p className="text-muted">上課時間: {staticData.courseDate}</p>
      </div>
      <span className={couponStyles.suPrice}>{staticData.price}</span>
    </div>
  );
};

export default CouponCard;