"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../_components/courseList.module.css"
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import News from "../_components/list/news";
import SideBar from "../_components/list/sideBar";
import CourseCard from "../_components/list/course-card";
import OtherCourseCard from "../_components/list/other-course-card";

export default function CourseListPage() {
  return (
    <>
      <Header/>
      <News/>
      <main className={styles.list}>
        <div className={`container ${styles.section1}`}>
          <div className={`row`}>
            <SideBar/>
            <CourseCard/>
          </div>
        </div>
        <div className={`container ${styles.section2}`}>
          <OtherCourseCard/>
        </div>
      </main>
      <Footer/>          
    </>
  );
}
