"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/layout/header";
import Breadcrumb from "../../components/teacher/breadcrumb";
import Profile from "../../components/teacher/Profile";
// import SocialLinks from '../../components/teacher/SocialLinks';
import ToggleButtons from "../../components/teacher/ToggleButtons";
import OtherCourses from "../../components/teacher/OtherCourses";
import TeacherCard from "../../components/teacher/teacherCard";
import styles from "./info.module.css";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("experience");

  const handleRadioChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <Header />
      <div className="lumi-all-wrapper">
        <div className={styles.container}>
          <Breadcrumb
            paths={[
              { name: "首頁 > ", link: "/" },
              { name: "師資服務 >", link: "/teacher" },
              { name: "師資列表 >", link: "/teacher/list" },
              { name: "師資介紹" },
            ]}
          />

          <Profile />
          {/* <SocialLinks /> */}
          <div className={`row ${styles.profile}`}>
            <div className="my-5 ">
              <div className="">
                <ToggleButtons onRadioChange={handleRadioChange} />
              </div>
              <div className="col-7">
                {/* {selectedTab === "experience" && <Experience />}
            {selectedTab === "courses" && <Publications />} */}
              </div>
            </div>
          </div>
          <div className="mb-4">看看其他優良師資...</div>
          <TeacherCard
            imgSrc="/teacher-img/Zoe.png"
            col="col-3"
            name="Zoe"
            text="寵物訓練"
            link="/teacher/info"
          />
          <div className="mb-4">看看其他優良課程...</div>
          <div className="row mb-5">
            <OtherCourses
              imgSrc="/teacher-img/course.png"
              name="狗兒的50道基礎訓練"
              link="/course"
            />
            <OtherCourses
              imgSrc="/teacher-img/course.png"
              name="狗兒的50道基礎訓練"
              link="/course"
            />
            <OtherCourses
              imgSrc="/teacher-img/course.png"
              name="狗兒的50道基礎訓練"
              link="/course"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
