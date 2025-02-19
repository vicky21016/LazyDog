"use client";

import  { useState, useEffect } from "react";
import { useFetch } from "@/hooks/product/use-fetch";
import { useParams } from "next/navigation";
import styles from "../_components/courseId.module.css";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import Breadcrumb from "../_components/Id/breadcrumb";
import CoursePics from "../_components/Id/course-pics";
import SimilarCourseCard from "../_components/Id/similar-course-card";
import CourseIntro from "../_components/Id/course-intro";

export default function CourseIdPage() {
  // 可以從網址上的搜尋參數取得courseCode參數
  const params = useParams()
  const courseCode = params.courseId

  // console.log(params);
  // console.log(courseCode);

  // 注意data應為物件資料類型才渲染
  const { data, loading, error } = useFetch(
    `http://localhost:5000/api/course/${courseCode}`
  )
  console.log(data);

  return (
    <>
      <Header/>
      <Breadcrumb/>
      <div>
        <div className={styles.section1}>
          <CoursePics/>
          <div className={styles.right}>
            <CourseIntro data={data}/>
          </div>
        </div>
        <div className={styles.section2}>
          <img
            className={styles.brownWave}
            src="/course/img/brownWave.png"
            alt
          />
          <SimilarCourseCard />
        </div>
      </div>
      <Footer/>
    </>
  );
}
