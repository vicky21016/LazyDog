"use client";

import React, { useEffect } from "react";
// import styles from "../../styles/modules/operatorCamera.module.css";
import couponStyles from "./userCoupon.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import Header from "../components/layout/header";
import MyMenu from "../components/layout/myMenu";
import Link from "next/link";
import Product from './_components/product'
import Course from './_components/course'
import Hotel from './_components/hotel'
import { useOrder } from "@/hooks/use-order";
export default function ProfileCouponPage(props) {
    const router = useRouter();
    const { orders } = useOrder();
    const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
        usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");
    const changepage = (path) => {
        if (path) {
            router.push(`/hotel-coupon/${path}`);
        }
    };
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    {/* 左邊*/}
                    <div className="d-none d-md-block col-md-3">
                        <MyMenu />
                    </div>
                    {/* 右邊 */}
                    <div className=" col-12 col-md-9 coupon-section">
                        <h5 className="mb-3">我的訂單</h5>
                        <ul className={`nav ${couponStyles.suNavTabs}`}>
                            <li className="nav-item">
                                <a
                                    className={`nav-link active ${couponStyles.suNavLink}`}
                                    href="#"
                                >
                                    全部
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${couponStyles.suNavLink}`} href="#">
                                    商品 (05)
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${couponStyles.suNavLink}`} href="#">
                                    課程 (10)
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${couponStyles.suNavLink}`} href="#">
                                    旅館 (10)
                                </a>
                            </li>
                        </ul>

                       
                        <Product orders={orders} />
                        {/* 商品 */}
                        <Course/>
                       
                         {/* 課程 */}
                         <Hotel/>
                        {/* <div className={`mt-2 ${couponStyles.suCouponCard}`}>
                            <Link href="">
                                <img
                                    src="http://localhost:5000/api/articles/2df54e20-d6c0-11ee-beff-f3978ced.jpg"
                                    style={{maxHeight:'100px'}}
                                />
                            </Link>
                            <div className={couponStyles.suDetails}>
                                <Link 
                                style={{color:'#f5842b'}}
                                href="" 
                                >小森林寵物美容旅館</Link>
                                <p className="text-muted">入住時間: 2024/12/31~2025/12/31</p>
                            </div>
                            <span className={couponStyles.suPrice}>NT2000000000</span>
                            
                        </div> */}
                         {/* 旅館 */}
                    </div>
                </div>
            </div>
        </>
    );
}
