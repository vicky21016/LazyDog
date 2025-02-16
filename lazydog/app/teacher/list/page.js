"use client";

import React, { useState } from "react";
import useTeachers from "../hooks/useTeachers";
import Header from "../../components/layout/header";
import Breadcrumb from "../../components/teacher/breadcrumb";
import Filter from "../../components/teacher/Filter";
import TeacherCard from "../../components/teacher/teacherCard";
import styles from "./list.module.css";
import Page from "../../components/hotel/page";
import style from "../../pages/menu.module.css";

const App = () => {
  const { teachers, loading, error } = useTeachers();


  // if (loading) return 
  //     <>
  //         <div className={style.container2}>
  //             <div className={style.loader27}></div>
  //            </div>
  //          </>
      
  return (
    <>
      <Header />
      <div className="lumi-all-wrapper">
        <div className={styles.container}>
          <Breadcrumb
            paths={[
              { name: "首頁 >", link: "/" },
              { name: "師資服務 >", link: "/teacher" },
              { name: "師資列表" },
            ]}
          />

          <section className={styles.pdArea}>
            <Filter />
            <div>
              <section className={styles.breadcrumbsTitle}>
                <div className={styles.teaTitle}>
                  <h4 className={styles.list}>師資列表</h4>
                  <div className={styles.titleFilter}>
                    <img src="./img/font/filter.png" alt="" />
                    <h6>依熱門排序</h6>
                  </div>
                </div>
              </section>
              <div>{/* {teacher.img} */}{/* {teacher.name} */}{/* {teacher.category} */}
                <TeacherCard
                  imgSrc="/teacher-img/Zoe.png"
                  col="col-6 col-md-4"
                  name="Zoe"
                  text="寵物訓練"
                  link="/teacher/info"
                />
                <TeacherCard
                  imgSrc="/teacher-img/Zoe.png"
                  col="col-6 col-md-4"
                  name="Zoe"
                  text="寵物訓練"
                  link="/teacher/info"
                />
                <TeacherCard
                  imgSrc="/teacher-img/Zoe.png"
                  col="col-6 col-md-4"
                  name="Zoe"
                  text="寵物訓練"
                  link="/teacher/info"
                />
                <TeacherCard
                  imgSrc="/teacher-img/Zoe.png"
                  col="col-6 col-md-4"
                  name="Zoe"
                  text="寵物訓練"
                  link="/teacher/info"
                />
              </div>
              <Page
                currentPage={1}
                totalPages={3}
                onPageChange={(page) => console.log("切換到第", page, "頁")}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default App;
