import React from 'react';
import Link from 'next/link'; // 如果你使用的是 Next.js 的 Link 元件
import couponStyles from './userCoupon.module.css'; 

const CouponCard = ({ imageUrl, productName, orderDate, price }) => {
  return (
    <div className={`mt-2 ${couponStyles.suCouponCard}`}>
      <Link href="">
        <img
          src="http://localhost:5000/api/articles/2df54e20-d6c0-11ee-beff-f3978ced.jpg"
          style={{ maxHeight: '100px' }}
          alt={productName}
        />
      </Link>
      <div className={couponStyles.suDetails}>
        <Link href="" style={{ color: '#f5842b' }}>
        鼎食狗罐 DS5雞肉+濃郁起司 110克 (1入)(狗副食餐罐)
        </Link>
        <p className="text-muted">訂購時間: 2025/12/31</p>
      </div>
      <span className={couponStyles.suPrice}>NT200</span>
    </div>
  );
};

export default CouponCard;