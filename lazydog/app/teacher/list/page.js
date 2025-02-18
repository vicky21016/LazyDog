"use client";

import React, { useState, useEffect } from "react";
import {useTeachers} from "@/hooks/useTeachers";
import Header from "../../components/layout/header";
import Breadcrumb from "../../components/teacher/breadcrumb";
import Filter from "../../components/teacher/Filter";
import TeacherCard from "../../components/teacher/teacherCard";
import styles from "./list.module.css";
import Page from "../../components/hotel/page";
import style from "../../pages/menu.module.css";
import style1 from "../../product/list/list.module.css";

const App = () => {
  const { teachers = [] } = useTeachers();

useEffect(() => {
  
}, [teachers]); 
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
          <section className={style1.DmArea}>
            <a href="">
              <figure>
                <img src="/product/DM/DM_7.png" alt="" />
              </figure>
            </a>
          </section>
          <section className={style1.BreadcrumbsTitle}>
            <Breadcrumb
              links={[
                { label: "首頁 ", href: "/" },
                { label: " 師資服務", href: "/teacher" },
                {
                  label: " 師資列表",
                  href: "/teacher/list",
                  active: true,
                },
              ]}
            />
            <div className={`mt-4 ${style1.Title}`}>
              <h3 className={style1.list}>師資列表</h3>
              <div className={style1.TitleFilter}>
                <img src="/product/font/filter.png" alt="" />
                <h5>依熱門排序</h5>
              </div>
            </div>
          </section>
          <section className={styles.pdArea}>
            <Filter />
            <div>
              {/* <section className={styles.breadcrumbsTitle}>
                <div className={styles.teaTitle}>
                  <h4 className={styles.list}>師資列表</h4>
                  <div className={styles.titleFilter}>
                    <img src="./img/font/filter.png" alt="" />
                    <h6>依熱門排序</h6>
                  </div>
                </div>
              </section> */}
              <div>
                <div className="row my-1 g-5">
                  {Array.isArray(teachers) &&
                    teachers.map((teacher) => (
                      <TeacherCard
                        key={teacher.id}
                        imgSrc={`/teacher-img/${teacher.img}`}
                        col="col-6 col-md-4"
                        name={teacher.name}
                        text={teacher.category_name}
                        link={`/teacher/info/${teacher.id}`}
                      />
                    ))}
                </div>
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
