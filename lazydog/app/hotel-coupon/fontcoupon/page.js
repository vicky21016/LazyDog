"use client";

import React from "react";
import styles from "../../../styles/modules/fontCoupon.module.css";
import Image from "next/image";
import Header from "../../components/layout/header";
export default function CouponPage() {
  return (
    <>
    <Header />
      <div
        className="modal fade"
        id="couponModal"
        tabIndex="-1"
        aria-labelledby="couponModalLabel"
        aria-hidden={true}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className={`modal-content animate__bounceIn ${styles.suModalContent}`}
          >
            <div className="modal-header bg-warning">
              <h5 className="modal-title fw-bold" id="couponModalLabel">
                🎉 領取優惠券成功！
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <div className={styles.suSuccessAnimation}>
                <div className={styles.suCheckmark}></div>
              </div>
              <p className="fs-5 fw-bold text-primary" id="couponName">
                優惠券名稱
              </p>
              <p
                className={`text-danger ${styles.suCouponCode}`}
                id="couponCode"
              >
                優惠券代碼：XXXXXX
              </p>
              <p className="text-muted" id="couponExpiry">
                有效期限：2025/12/31
              </p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 第一個優惠券區塊 */}
      <div className={`container-fluid ${styles.suCouponContainer}`}>
        <div className="container">
          <div className="row d-flex justify-content-center">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="col-lg-6 col-md-6 col-sm-12">
                <div className={styles.suCoupon}>
                  <Image
                    src="/hotel/hotel-images/page-image/coupon/coupon-Y.png"
                    alt="優惠券背景"
                    fill={true}
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.suCouponContent}>
                    <div className={styles.suCouponName}>🐶 狗狗專屬優惠</div>
                    <div className={styles.suCouponCode}>SKUDIWEK54K64L</div>
                    <div className={styles.suCouponExpiry}>
                      有效期限：2025/12/31
                    </div>
                  </div>
                  <button className={styles.suCouponButton} type="button">
                    點我領取
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 第二個區塊 (促銷圖片 + 3 張優惠券) */}
      <div className={`container-fluid ${styles.suSecondSection}`}>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            {/* 左側圖片 */}
            <div className="col-lg-5 col-md-5 col-sm-12 text-center">
              <img
                src="/hotel/hotel-images/page-image/coupon/ADS product.png"
                alt="促銷圖片"
                style={{ width: "100%", maxWidth: "430px", height: "auto" }}
              />
            </div>
            {/* 右側 3 張優惠券 */}
            <div className="col-lg-6 col-md-6 col-sm-12 text-center">
              <div className={styles.suCoupon}>
                <Image
                  src="/hotel/hotel-images/page-image/coupon/coupon-B.png"
                  alt="優惠券背景"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.suCouponContent}>
                  <div className={styles.suCouponName}>🐶 狗狗專屬優惠</div>
                  <div className={styles.suCouponCode}>SKUDIWEK54K64L</div>
                  <div className={styles.suCouponExpiry}>
                    有效期限：2025/12/31
                  </div>
                </div>
                <button className={styles.suCouponButton} type="button">
                  點我領取
                </button>
              </div>
              <div className={styles.suCoupon}>
                <Image
                  src="/hotel/hotel-images/page-image/coupon/coupon-B.png"
                  alt="優惠券背景"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.suCouponContent}>
                  <div className={styles.suCouponName}>🐶 狗狗專屬優惠</div>
                  <div className={styles.suCouponCode}>SKUDIWEK54K64L</div>
                  <div className={styles.suCouponExpiry}>
                    有效期限：2025/12/31
                  </div>
                </div>
                <button className={styles.suCouponButton} type="button">
                  點我領取
                </button>
              </div>
              <div className={styles.suCoupon}>
                <Image
                  src="/hotel/hotel-images/page-image/coupon/coupon-B.png"
                  alt="優惠券背景"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.suCouponContent}>
                  <div className={styles.suCouponName}>🐶 狗狗專屬優惠</div>
                  <div className={styles.suCouponCode}>SKUDIWEK54K64L</div>
                  <div className={styles.suCouponExpiry}>
                    有效期限：2025/12/31
                  </div>
                </div>
                <button className={styles.suCouponButton} type="button">
                  點我領取
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 第三個區塊  */}

      <div className={`container-fluid  ${styles.suThirdSection}`}>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-5 col-md-5 col-sm-12 mt-5 text-center">
              <div className={styles.suCoupon}>
                <Image
                  src="/hotel/hotel-images/page-image/coupon/coupon-Y.png"
                  alt="優惠券背景"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.suCouponContent}>
                  <div className={styles.suCouponName}>🐶 狗狗專屬優惠</div>
                  <div className={styles.suCouponCode}>SKUDIWEK54K64L</div>
                  <div className={styles.suCouponExpiry}>
                    有效期限：2025/12/31
                  </div>
                </div>
                <button className={styles.suCouponButton} type="button">
                  點我領取
                </button>
              </div>

              <div className={styles.suCoupon}>
                <Image
                  src="/hotel/hotel-images/page-image/coupon/coupon-Y.png"
                  alt="優惠券背景"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.suCouponContent}>
                  <div className={styles.suCouponName}>🐶 狗狗專屬優惠</div>
                  <div className={styles.suCouponCode}>SKUDIWEK54K64L</div>
                  <div className={styles.suCouponExpiry}>
                    有效期限：2025/12/31
                  </div>
                </div>
                <button className={styles.suCouponButton} type="button">
                  點我領取
                </button>
              </div>

              <div className={styles.suCoupon}>
                <Image
                  src="/hotel/hotel-images/page-image/coupon/coupon-Y.png"
                  alt="優惠券背景"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.suCouponContent}>
                  <div className={styles.suCouponName}>🐶 狗狗專屬優惠</div>
                  <div className={styles.suCouponCode}>SKUDIWEK54K64L</div>
                  <div className={styles.suCouponExpiry}>
                    有效期限：2025/12/31
                  </div>
                </div>
                <button className={styles.suCouponButton} type="button">
                  點我領取
                </button>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 text-center">
              <img
                src="/hotel/hotel-images/page-image/coupon/ADS-1.png"
                alt="第二張促銷DM"
                style={{
                  width: "100%",
                  maxWidth: "550px",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 第四個區塊 */}
      <div className={`container-fluid ${styles.suForthSection}`}>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-5 col-md-5 col-sm-12 text-center">
              <video
                className="coupon-video"
                src="/hotel/hotel-images/page-image/coupon/ADS-7.mp4"
                style={{ width: "100%", maxWidth: "550px", height: "auto" }}
                autoPlay
                loop
                onEnded={(e) => e.target.play()}
              ></video>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className={styles.suCoupon}>
                <Image
                  src="/hotel/hotel-images/page-image/coupon/coupon-G.png"
                  alt="優惠券背景"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.suCouponContent}>
                  <div className={styles.suCouponName}>🐶 狗狗專屬優惠</div>
                  <div className={styles.suCouponCode}>SKUDIWEK54K64L</div>
                  <div className={styles.suCouponExpiry}>
                    有效期限：2025/12/31
                  </div>
                </div>
                <button className={styles.suCouponButton} type="button">
                  點我領取
                </button>
              </div>

              <div className={styles.suCoupon}>
                <Image
                  src="/hotel/hotel-images/page-image/coupon/coupon-B.png"
                  alt="優惠券背景"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.suCouponContent}>
                  <div className={styles.suCouponName}>🐶 狗狗專屬優惠</div>
                  <div className={styles.suCouponCode}>SKUDIWEK54K64L</div>
                  <div className={styles.suCouponExpiry}>
                    有效期限：2025/12/31
                  </div>
                </div>
                <button className={styles.suCouponButton} type="button">
                  點我領取
                </button>
              </div>

              <div className={styles.suCoupon}>
                <Image
                  src="/hotel/hotel-images/page-image/coupon/coupon-G.png"
                  alt="優惠券背景"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.suCouponContent}>
                  <div className={styles.suCouponName}>🐶 狗狗專屬優惠</div>
                  <div className={styles.suCouponCode}>SKUDIWEK54K64L</div>
                  <div className={styles.suCouponExpiry}>
                    有效期限：2025/12/31
                  </div>
                </div>
                <button className={styles.suCouponButton} type="button">
                  點我領取
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 第五個區塊  */}
      <div className={`container-fluid ${styles.suFifthSection}`}>
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4 ">
              <div className={`user-event ${styles.suEvent}`}>
                <h5 className={`text-primary mt-2 ${styles.suEventTitle}`}>
                  首購會員
                </h5>
                <h2 className={`text-warning mt-2 ${styles.suEventDiscount}`}>
                  現折50
                </h2>
                <p className={`mt-2 ${styles.suEventDesc}`}>
                  單筆消費滿 $500 即可使用
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className={styles.suEvent}>
                <div className={styles.suEventIcon}>
                  <img
                    src="/hotel/hotel-images/page-image/coupon/shipping-fast.png"
                    alt="滿額免運"
                  />
                </div>
                <h5 className={`text-danger ${styles.suEventTitle}`}>
                  滿額免運
                </h5>
                <p className={styles.suEventDesc}>超取 $1500 / 宅配 $2000</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className={styles.suEvent}>
                <div className={styles.suEventIcon}>
                  <img
                    src="/hotel/hotel-images/page-image/coupon/coins-dollar-line.png"
                    alt="購物金回饋"
                  />
                </div>
                <h5 className={`text-warning ${styles.suEventTitle}`}>
                  購物金回饋
                </h5>
                <p className={styles.suEventDesc}>
                  會員最高享 <span className="text-danger">8%</span> 回饋
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
