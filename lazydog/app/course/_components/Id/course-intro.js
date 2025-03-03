"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../courseId.module.css";
import { useCart } from "@/hooks/use-cart";
export default function CourseIntro({ course, session, place }) {
  const c = course?.[0];
  const s = session?.[0];

  const [expanded, setExpanded] = useState(false);
  const maxLength = 100; // 顯示的字數上限
  const displayText = expanded
    ? c?.description
    : c?.description?.length > maxLength
    ? c?.description.substring(0, maxLength) + "..."
    : c?.description;

  // const defaultTeachImg = "/course/img/user.jpg"
  // console.log(s);
  // console.log("CourseIntro - Course:", course);

  const [selectDate, setSelectDate] = useState(""); // 選擇的日期
  const [selectedTime, setSelectedTime] = useState("");
  const [filterSession, setFilterSession] = useState([]); // 過濾後的時段
  const { onAddCourse } = useCart();

  // 過濾出唯一的 class_dates 作為日期選單
  const uniqueDates = [...new Set(session.map((ss) => ss.class_dates))];

  // 當選擇日期時，過濾對應的時段
  const dateChange = (e) => {
    const selected = e.target.value;
    setSelectDate(selected);

    // 過濾出該日期的所有時段
    const times = session
      .filter((ss) => ss.class_dates === selected)
      .map((ss) => {
        const start = ss.start_time.split(":").slice(0, 2).join(":");
        const end = ss.end_time.split(":").slice(0, 2).join(":");
        return `${start}~${end}`;
      });

    setFilterSession(times);
  };

  const timeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleAddToCart = () => {
    if (!selectDate || !selectedTime) {
      Swal.fire({
        icon: "error",
        title: "請選擇梯次和時間",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
        timer: 900,
        showConfirmButton: false,
      });
    } else {
      console.log("加入購物車的數據:", { c, s, selectDate, selectedTime });
      onAddCourse(c, s, selectDate, selectedTime);
      Swal.fire({
        icon: "success",
        title: "已加入購物車",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
        timer: 700,
        showConfirmButton: false,
      });

      setSelectDate("");
      setSelectedTime("");
      setFilterSession([]);
    }
  };

  const handlePlaceClick = (p, index) => {
    if (index < 3) {
      // 第一～第三筆資料連結到 Google Maps
      const googleMapsUrl = `https://www.google.com/maps/search/?q=${encodeURIComponent(
        p.address
      )}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  return (
    <>
      <div className={`${styles.right} ${styles.courseIntro}`}>
        <img
          className={styles.mainPic}
          src={`/course/img/${c?.img_url}`}
          alt=""
        />

        <div className={styles.courseName}>
          <h2 className={styles.name}>{c?.name}</h2>
          <img
            className={styles.heartIcon}
            src="/course/img/heartIcon.svg"
            alt=""
          />
        </div>
        <p className={styles.description}>
          {displayText}{" "}
          {c?.description?.length > maxLength && (
            <span
              className={styles.toggleBtn}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? " ...收 " : "看更多"}
            </span>
          )}
        </p>

        <div className={styles.teacher}>
          <h2 className={styles.teachTitle}>關於講師</h2>
          <a
            href={
              s?.teacher_id
                ? `/teacher/info/${s?.teacher_id}`
                : `/course/img/user.jpg`
            }
            className={`d-flex gap-2 ${styles.tConnect}`}
          >
            <img
              className={styles.teachPic}
              src={`/teacher-img/${s?.teacher_img}`}
              alt={s?.teacher_name}
            />
            <h5 className={styles.teachName}>{s?.teacher_name}</h5>
          </a>
        </div>
        <div className={styles.info}>
          <h2 className={styles.infoTitle}>課程資訊</h2>
        </div>
        <div className={styles.startDate}>
          <img src="/course/img/flagIcon.svg" alt="" />
          <h5 className={styles.dateTitle}>近期開課</h5>
          <p className={styles.date}>
            {s?.start_date
              ? new Date(s.start_date).toISOString().split("T")[0]
              : ""}
          </p>
        </div>
        <div className={styles.duration}>
          <img src="/course/img/timeIcon.svg" alt="" />
          <h5 className={styles.durTitle}>課堂時數</h5>
          <p className={styles.hours}>{c?.duration}小時</p>
        </div>
        <div className={styles.area}>
          <img src="/course/img/flagIcon.svg" alt="" />
          <h5 className={styles.areaTitle}>上課地點</h5>
          {[...new Set(session.map((ss) => ss.region))].map(
            (region, index, array) => (
              <React.Fragment key={index}>
                <p className={styles.place}>{region}</p>
                {index < array.length - 1 && "/"}
              </React.Fragment>
            )
          )}
        </div>
        <h2 className={styles.price}>
          ${" "}
          <span className={styles.number}>
            {c?.price && Number(c?.price).toLocaleString("zh-Tw")}
          </span>
        </h2>

        {/* 日期 */}
        <select
          id="classdate"
          value={selectDate}
          className={`form-select ${styles.selects}`}
          aria-label="Default select example"
          onChange={dateChange}
        >
          <option value="" disabled>
            請選擇梯次
          </option>
          {uniqueDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>

        {/* 時間 */}
        <select
          id="classtime"
          value={selectedTime}
          className={`form-select ${styles.selects}`}
          aria-label="Default select example"
          onChange={timeChange}
        >
          <option value="" disabled>
            請選擇時間
          </option>
          {filterSession.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>

        <button className={styles.cartBtn} onClick={handleAddToCart}>
          加入購物車
        </button>
        <div className={styles.ps}>
          {/* 注意事項 */}
          <div
            type="button"
            className={styles.notice}
            data-bs-toggle="offcanvas"
            data-bs-target="#noticeOffcanvas"
            aria-controls="noticeOffcanvas"
          >
            <h5 className={styles.noticeTitle}>注意事項</h5>
            <img src="/course/img/rightBlack.svg" alt="" />
            <div
              className={`offcanvas offcanvas-end`} // offcanvas-end 表示從右邊滑出
              tabIndex="-1"
              id="noticeOffcanvas"
              aria-labelledby="noticeOffcanvasLabel"
              data-bs-backdrop="true"
            >
              <div className="offcanvas-header">
                <h5 id="noticeOffcanvasLabel">注意事項</h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div
                className={`offcanvas-body ${styles.scrollOrg} ${styles.offcanvaBody}`}
              >
                {c?.notice}
              </div>
            </div>
          </div>

          {/* QA */}
          <div
            type="button"
            className={styles.qa}
            data-bs-toggle="offcanvas"
            data-bs-target="#qaOffcanvas"
            aria-controls="qaOffcanvas"
          >
            <h5 className={styles.qaTitle}>Q&amp;A</h5>
            <img src="/course/img/rightBlack.svg" alt="" />
            <div
              className={`offcanvas offcanvas-end ${styles.offcanvas}`}
              tabIndex="-1"
              id="qaOffcanvas"
              aria-labelledby="qaOffcanvasLabel"
            >
              <div className="offcanvas-header">
                <h5 id="qaOffcanvasLabel">Q&amp;A</h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div
                className={`offcanvas-body ${styles.scrollOrg} ${styles.offcanvaBody}`}
              >
                {c?.qa}
              </div>
            </div>
          </div>

          {/* 其他 */}
          <div
            type="button"
            className={styles.other}
            data-bs-toggle="offcanvas"
            data-bs-target="#otherOffcanvas"
            aria-controls="otherOffcanvas"
          >
            <h5 className={styles.otherTitle}>其他</h5>
            <img src="/course/img/rightBlack.svg" alt="" />
            <div
              className={`offcanvas offcanvas-end ${styles.offcanvas}`}
              tabIndex="-1"
              id="otherOffcanvas"
              aria-labelledby="otherOffcanvasLabel"
            >
              <div className="offcanvas-header">
                <h5 id="otherOffcanvasLabel">其他</h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div
                className={`offcanvas-body ${styles.scrollOrg} ${styles.offcanvaBody}`}
              >
                <div className="container-fluid">
                  <h5 className="pb-3">上課地點</h5>
                  {place?.slice(0, 3).map((p, index) => (
                    <div key={p.id} className="row my-4 border-bottom">
                      <div className="col-12 col-md-3">{p.region}</div>
                      <div
                        className="col-12 col-md-9 pb-5"
                        onClick={() => handlePlaceClick(p, index)}
                      >
                        <span className={`${styles.address}`}>{p.address}</span>
                      </div>
                    </div>
                  ))}
                  {place?.slice(3, 5).map((p, index) => (
                    <div key={p.id} className="row my-4 border-bottom">
                      <div className="col-12 col-md-3">{p.region}</div>
                      <div
                        className="col-12 col-md-9 pb-4"
                        // onClick={() => handlePlaceClick(p, index + 3)}
                      >
                        {p.address}
                        <p className="mt-3">
                          <a
                            href="https://reurl.cc/XRdR6j"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "blue",
                              // textDecoration: "underline",
                            }}
                          >
                            <strong>ZOOM下載使用教學參考</strong>
                          </a>
                        </p>
                        <p>
                          <a
                            href="https://reurl.cc/nv9vz8"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "blue",
                              // textDecoration: "underline",
                            }}
                          >
                            <strong>直播觀看教學方式說明</strong>
                          </a>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
