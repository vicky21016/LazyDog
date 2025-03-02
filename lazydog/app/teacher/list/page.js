"use client";

import React, { useState, useEffect } from "react";
import { useTeachers } from "@/hooks/useTeachers";
import Header from "../../components/layout/header";
import Breadcrumb from "../../components/teacher/breadcrumb";
import Filter from "../../components/teacher/Filter";
import TeacherCard from "../../components/teacher/teacherCard";
import styles from "./list.module.css";
import Page from "../../course/_components/list/pagination";
import style1 from "../../product/list/list.module.css";

export default function App() {
  const { teachers = [] } = useTeachers();
  const [filtered, setFiltered] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false); // 控制篩選選單開關

  // 當 `teachers` 資料載入時，設定 `filtered` 預設為所有老師
  useEffect(() => {
    if (teachers.length > 0) {
      setFiltered(teachers);
    }
  }, [teachers]);

  // 分頁
  const [page, setPage] = useState(1);
  const perPage = 9;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const startIndex = (page - 1) * perPage;
  const currentTeacher = filtered.slice(startIndex, startIndex + perPage);

  // 處理篩選條件
  const filter = (searchText, selectCategories, selectGenders) => {
    const filterData = teachers.filter(
      (teacher) =>
        (searchText === "" || teacher.name.includes(searchText) || teacher.category_name.includes(searchText)) &&
        (selectCategories.length === 0 || selectCategories.includes(teacher.category_name)) &&
        (selectGenders.length === 0 || selectGenders.includes(teacher.gender))
    );

    setFiltered(filterData);
    setPage(1); // 篩選後重置分頁到第 1 頁
  };

  // 點擊畫面其他地方時，自動關閉篩選選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterOpen && !event.target.closest(`.${styles.asideContainer}`) && !event.target.closest(`.${styles.filterButton}`)) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [filterOpen]);

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
                { label: " 師資列表", href: "/teacher/list", active: true },
              ]}
            />
            <div className={`mt-4 ${style1.Title}`}>
              <h3 className={style1.list}>師資列表</h3>
              <div className={`${style1.TitleFilter} ${styles.filterButton}`} onClick={() => setFilterOpen(!filterOpen)}>
                <img src="/product/font/filter.png" alt="篩選" />
                <h6>依熱門排序</h6>
              </div>
            </div>
          </section>
          <section className={styles.pdArea}>
            <div className="row">
              {/* 桌機版篩選選單 */}
              <div className={`col-3 ${styles.asideContainer}`}>
                <Filter filterChange={filter} />
              </div>

              {/* 手機版篩選選單 (滑入效果) */}
              <div className={`${styles.mobileFilter} ${filterOpen ? styles.showFilter : ""}`}>
                <Filter filterChange={filter} />
                <button className={styles.closeButton} onClick={() => setFilterOpen(false)}>關閉</button>
              </div>

              {/* 師資列表 */}
              <div className="col-md-9 col-12">
                <div className="row mt-1 g-5 mb-5">
                  {currentTeacher.length > 0 ? (
                    currentTeacher.map((teacher) => (
                      <TeacherCard
                        key={teacher.id}
                        imgSrc={`/teacher-img/${teacher.img}`}
                        col="col-6 col-md-4"
                        name={teacher.name}
                        text={teacher.category_name}
                        link={`/teacher/info/${teacher.id}`}
                      />
                    ))
                  ) : (
                    <p className="text-center">沒有符合條件的老師</p>
                  )}
                </div>
                <Page totalPages={totalPages} currPage={page} setCurrPage={setPage} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
