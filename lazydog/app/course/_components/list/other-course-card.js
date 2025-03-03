"use client";

import React, { useState, useEffect } from "react";
import styles from "../courseList.module.css";
import Link from "next/link";
import Slider from "react-slick";

export default function OtherCourseCard() {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/course/`)
      .then((res) => res.json())
      .then((data) => {
        setLatest(data.data.latest);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  // console.log(latest);

  // Slick carousel 設定
  // const settings = {
  //   dots: true, // 顯示底部圓點導航
  //   infinite: true, // 開啟循環播放
  //   speed: 500, // 滑動速度
  //   slidesToShow: 3, // 每次顯示 3 張卡片
  //   slidesToScroll: 1, // 每次滑動 1 張
  //   autoplay: true, // 啟用自動播放
  //   autoplaySpeed: 2000, // 每 2 秒自動切換
  //   pauseOnHover: true, // 滑鼠懸停時暫停自動播放
  //   nextArrow: (
  //     <img
  //       className={styles.arrowRight}
  //       src="/course/img/arrow-right.png"
  //       alt="往右箭頭"
  //     />
  //   ),
  //   prevArrow: (
  //     <img
  //       className={styles.arrowLeft}
  //       src="/course/img/arrow-left.png"
  //       alt="往左箭頭"
  //     />
  //   ),
  // };

  return (
    <>
      <div className={styles.similarCourse}>
        <h2 className={styles.sTitle}>近期開課</h2>
        <div className={styles.sBars}>
          <div className={styles.sbar} />
          <div className={styles.btns}>
            {/* <img
              className={styles.arrowLeft}
              src="/course/img/arrow-left.png"
              alt={`往左箭頭`}
            />
            <img
              className={styles.arrowRight}
              src="/course/img/arrow-right.png"
              alt={`往右箭頭`}
            /> */}
          </div>
        </div>
        <div className={styles.sCards}>
          {/* <Slider {...settings}> */}
          {latest?.map((la) => (
            <Link
              className={styles.sCard}
              key={la.courseId}
              href={`/course/${la.courseId}`}
            >
              <img
                className={styles.cardImg}
                src={`/course/img/${la.img_url}`}
                alt={la.courseName}
              />
              <h5 className={styles.cardName}>{la.courseName}</h5>
            </Link>
          ))}
          {/* </Slider> */}
        </div>
      </div>
    </>
  );
}
