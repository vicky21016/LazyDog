"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTeachers} from "../../../../hooks/useTeachers";
import { useTeacherDetail } from "../../../../hooks/useTeacherDetail";
// import { useParams } from "react-router-dom";
// import { useRouter } from "next/router";
import Header from "../../../components/layout/header";
import Breadcrumb from "../../../components/teacher/breadcrumb";
import Profile from "../../../components/teacher/Profile";
// import SocialLinks from '../../components/teacher/SocialLinks';
import ToggleButtons from "../../../components/teacher/ToggleButtons";
import OtherCourses from "../../../components/teacher/OtherCourses";
// import TeacherCard from "../../components/teacher/teacherCard";
import styles from "../info.module.css";
import OtherTeacher from "../../../components/teacher/otherTeacher";
import style from "../../../pages/menu.module.css";
import styles1 from "../../../../styles/modules/toggle.module.css";
export default function App () {
  const [selectedTab, setSelectedTab] = useState("experience");
const { teachers=[] } = useTeachers();
    const { id } = useParams();
    const { teacher } = useTeacherDetail(id);

    const [activeTab, setActiveTab] = useState("exps");

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

    if (!teacher) return
    <>
        <div className={style.container2}>
            <div className={style.loader27}></div>
           </div>
         </>
  };

  return (
    <>
      <Header />
      <div className="lumi-all-wrapper">
        <div className={styles.container}>
          <Breadcrumb
            links={[
              { label: "首頁 ", href: "/" },
              { label: " 師資服務", href: "/teacher" },
              {
                label: " 師資列表",
                href: "/teacher/list",
              },
              { label: "師資介紹", href: "/teacher/info", active: true },
            ]}
          />

          <Profile teacher={teacher} />
          {/* <SocialLinks /> */}
          <div className={`row ${styles.profile}`}>
            <div className="my-5 ">
              <div className="">
                {/* <ToggleButtons onRadioChange={handleRadioChange} /> */}
                <div className="row g-5">
                  <div className="col-12 col-md-6 col-lg-5">
                    <div className={styles1.infoCard}>
                      <h3 className={`mt-2 mb-4 ms-2 ${styles1.cardTitle}`}>
                        相關資訊
                      </h3>
                      <div
                        className={`${styles1.menuItem} ${
                          activeTab == "exps" ? styles1.active : ""
                        }`}
                        onClick={() => setActiveTab("exps")}
                      >
                        <i className={`"bi bi-person-fill ${styles1.icon}`}></i>
                        <span className="ms-1">老師經歷</span>
                      </div>
                      <div
                        className={`${styles1.menuItem} ${
                          activeTab === "course" ? styles1.active : ""
                        }`}
                        onClick={() => setActiveTab("course")}
                      >
                        <i
                          className={`bi bi-mortarboard-fill ${styles1.icon}`}
                        ></i>
                        <span className="ms-1">相關課程</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-7 ps-5">
                    {activeTab === "exps" && (
                      <div className="mb-5">
                        <h4 className="mb-3">經歷 :</h4>
                        <ul>
                          {teacher.Experience?.split("\n").map(
                            (line, index) => (
                              <li className="mb-2" key={index}>
                                {line}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {activeTab === "course" && (
                      <div className="mb-5">
                        <h4 className="mb-3">課程 :</h4>
                        <ul>
                          {teacher.course_names
                            ?.split(",")
                            .map((course, index) => {
                              const courseName = course.split(" (")[0]; // 去掉 ID
                              const courseId =
                                teacher.course_ids.split(",")[index];
                              return (
                                <li className={`mb-2`} key={index}>
                                  <Link
                                    className={` ${styles.course}`}
                                    href={`/course/${courseId}`}
                                    passHref
                                  >
                                    {courseName}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
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

