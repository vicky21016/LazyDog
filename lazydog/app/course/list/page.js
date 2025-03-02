"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../_components/courseList.module.css";
import Header from "@/app/components/layout/header";
import News from "../_components/list/news";
import SideBar from "../_components/list/sideBar";
import CourseCard from "../_components/list/course-card";
import Pagination from "../_components/list/pagination";
import OtherCourseCard from "../_components/list/other-course-card";

export default function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "", // 新增搜尋關鍵字
    types: [],
    places: [],
    minPrice: 600,
    maxPrice: 8000,
  });

  // 取得篩選後的課程
  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams();

    if (filters.keyword) query.append("keyword", filters.keyword);
    if (filters.types.length) query.append("types", filters.types.join(","));
    if (filters.places.length) query.append("places", filters.places.join(","));
    query.append("minPrice", filters.minPrice);
    query.append("maxPrice", filters.maxPrice);

    fetch(`http://localhost:5000/api/course?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data?.data?.courses || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, [filters]);

  // 分頁
  // const [currPage, setCurrPage] = useState(1);
  // const perPage = 9;
  // const totalPages = Math.max(1, Math.ceil((course?.length || 0) / perPage));

  // const startIndex = (currPage - 1) * perPage;
  // const currentCourses = course?.slice(startIndex, startIndex + perPage);
  return (
    <>
      <Header />
      <News />
      <main className={styles.list}>
        <div className={`container ${styles.section1}`}>
          <div className={`row `}>
            <SideBar filters={filters} setFilters={setFilters} />
            <CourseCard courses={courses} loading={loading} />
            {/* <Pagination
              totalPages={totalPages}
              currPage={currPage}
              setCurrPage={setCurrPage}
            /> */}
          </div>
        </div>
        <div className={`container ${styles.section2}`}>
          <OtherCourseCard />
        </div>
      </main>
    </>
  );
}
