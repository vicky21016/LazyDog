import React from 'react';
import Link from 'next/link'; // 如果你使用的是 Next.js 的 Link 元件
import couponStyles from './userCoupon.module.css';

const Product = ({ orders }) => {
  //過濾出商品類型的訂單
  const productOrders = orders.filter(order => order.orderID);

    return (
        <>
            {productOrders.map((order) => (
                <div key={order.orderID} className={`mt-2 ${couponStyles.suCouponCard}`}>
                    <Link href="">
                        <img
                            src="http://localhost:5000/api/articles/2df54e20-d6c0-11ee-beff-f3978ced.jpg"
                            style={{ maxHeight: '100px' }}
                            alt={order.orderID}
                        />
                    </Link>
                    <div className={couponStyles.suDetails}>
                        <Link href="" style={{ color: '#f5842b' }}>
                            訂單編號:{order.orderID}
                        </Link>
                        <p className="text-muted">訂購時間:{order.created_at}</p>

                    </div>
                    <span className={couponStyles.suPrice}>NT{order.final_amount}</span>
                </div>
            ))}
        </>
    );
};

export default Product;
