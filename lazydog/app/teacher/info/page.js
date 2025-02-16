"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { useParams } from "react-router-dom";
import Header from "../../components/layout/header";
import Breadcrumb from "../../components/teacher/breadcrumb";
import Profile from "../../components/teacher/Profile";
// import SocialLinks from '../../components/teacher/SocialLinks';
import ToggleButtons from "../../components/teacher/ToggleButtons";
import OtherCourses from "../../components/teacher/OtherCourses";
import TeacherCard from "../../components/teacher/teacherCard";
import styles from "./info.module.css";
// import axios from "axios";
// import style from "../../pages/menu.module.css";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("experience");
  // const { id } = useParams();
  // const [teacher, setTeacher] = useState(null);

  const handleRadioChange = (tab) => {
    setSelectedTab(tab);

  //   useEffect(() => {
  //     axios.get(`/teachers/${id}`)
  //         .then(res => setTeacher(res.data))
  //         .catch(err => console.error("取得老師詳細資訊失敗", err));
  // }, [id]);

  // if (!teacher) return 
  // <>
  //     <div className={style.container2}>
  //         <div className={style.loader27}></div>
  //        </div>
  //      </>
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
          <h5 className="my-4 fw-semibold">看看其他優良師資...</h5>
          <div className="row mb-5 g-5">
            {["1", "2", "3", "4"].map((_, index) => (
              <div className="col-6 col-md-3" key={index}>
                <Link
                  href="/teacher/info"
                  passHref
                  className="text-decoration-none"
                >
                  <div className={styles.card6} style={{ width: "18.75rem" }}>
                    <img
                      src="/teacher-img/Zoe.png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className={styles.card6Title} style={{}}>
                      Zoe
                    </div>
                    <p
                      className={styles.card6Description}
                      style={{ color: "#ff9538" }}
                    >
                      寵物訓練
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <h5 className="my-4 fw-semibold">看看其他優良課程...</h5>
          <div className="row mb-5 g-4">
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
