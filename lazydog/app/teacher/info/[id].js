"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { useParams } from "react-router-dom";
import { useRouter } from "next/router";
import Header from "../../components/layout/header";
import Breadcrumb from "../../components/teacher/breadcrumb";
import Profile from "../../components/teacher/Profile";
// import SocialLinks from '../../components/teacher/SocialLinks';
import ToggleButtons from "../../components/teacher/ToggleButtons";
import OtherCourses from "../../components/teacher/OtherCourses";
// import TeacherCard from "../../components/teacher/teacherCard";
import styles from "./info.module.css";
import OtherTeacher from "../../components/teacher/otherTeacher";
// import style from "../../pages/menu.module.css";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("experience");
  const router = useRouter();
  const { id } = router.query; 

  const [teacher] = useTeacherDetail(id); 

  const teacherData = [
    {
      imgSrc: "/teacher-img/Zoe.png",
      col: "col-6 col-md-3",
      name: "Zoe",
      text: "寵物訓練",
      link: "/teacher/info",
    },
    {
      imgSrc: "/teacher-img/Zoe.png",
      col: "col-6 col-md-3",
      name: "Zoe",
      text: "寵物訓練",
      link: "/teacher/info",
    },
    {
      imgSrc: "/teacher-img/Zoe.png",
      col: "col-6 col-md-3",
      name: "Zoe",
      text: "寵物訓練",
      link: "/teacher/info",
    },
    {
      imgSrc: "/teacher-img/Zoe.png",
      col: "col-6 col-md-3",
      name: "Zoe",
      text: "寵物訓練",
      link: "/teacher/info",
    },
  ];

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

          <Profile teacher={teacher} />
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
          <OtherTeacher cards={teacherData} />
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
