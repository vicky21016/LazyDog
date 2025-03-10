"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import styles from "../courseList.module.css";

export default function OtherCourseCard() {
  const [latest, setLatest] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % latest.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + latest.length) % latest.length);
  };

  return (
    <>
      <div className={styles.similarCourse}>
        <h2 className={styles.sTitle}>近期開課</h2>
        <div className={styles.sBars}>
          <div className={styles.sbar} />
          <div className={styles.btns}>
            <button
              type="button"
              className={styles.arrowLeft}
              onClick={prevSlide}
            >
              <FaArrowLeftLong className="fs-5" />
              {/* <img src="/course/img/arrow-left.png" alt={`往左箭頭`} /> */}
            </button>
            <button
              type="button"
              className={styles.arrowRight}
              onClick={nextSlide}
            >
              <FaArrowRightLong className="fs-5" />
              {/* <img src="/course/img/arrow-right.png" alt={`往右箭頭`} /> */}
            </button>
          </div>
        </div>
        {/* <div className={`row gy-5 ${styles.sCards}`}> */}
        <motion.div
          className={`row gy-5 ${styles.sCards}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ all: 0.1 }}
        >
          {latest
            ?.slice(currentIndex, currentIndex + itemsPerPage)
            .map((la) => (
              <motion.div
                key={la.courseId}
                layout
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ all: 0.1 }}
                className={`col-6 col-lg-3 m-0 ${styles.sCard}`}
              >
                <Link
                  href={`/course/${la.courseId}`}
                  className={styles.linkStyle}
                >
                  <img
                    className={styles.cardImg}
                    src={`/course/img/${la.img_url}`}
                    alt={la.courseName}
                  />
                  <h5 className={styles.cardName}>{la.courseName}</h5>
                </Link>
              </motion.div>
            ))}
        </motion.div>

        {/* {latest?.map((la) => (
            <Link
              className={`col-6 col-lg-3 m-0 ${styles.sCard}`}
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
          ))} */}
        {/* </div> */}
      </div>
    </>
  );
}
