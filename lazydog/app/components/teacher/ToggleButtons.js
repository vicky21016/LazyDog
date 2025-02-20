"use client";

import React, { useState, useEffect  } from "react";
import { useParams } from "react-router-dom"
import {useTeacherDetail } from "../../../hooks/useTeacherDetail";
import axios from "axios";
// import useTeacherDetail from "@/hooks/useTeacherDetail";
import styles from "../../../styles/modules/toggle.module.css";
import style from "../../pages/menu.module.css";

const ToggleButtons = ({ onRadioChange }) => {

  const { id } = useParams();
  const { teacher } = useTeacherDetail(id);

    if (!teacher) return 
    <>
        <div className={style.container2}>
            <div className={style.loader27}></div>
           </div>
         </>

  return (
    <div className="row g-5">
      <div className="col-12 col-md-6 col-lg-5">
        <div className={styles.infoCard}>
          <h3 className={`mb-4 ${styles.cardTitle}`}>相關資訊</h3>
          <div className={`${styles.menuItem} ${styles.active}`}>
            <i className={styles.icon}>👤</i>
            <span>經歷</span>
          </div>
          <div className={`${styles.menuItem} ${styles.disabled}`}>
            <i className={styles.icon}>🎟️</i>
            <span>課程</span>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-7 ps-5">
        <div className="mb-5">
          <h4 className="mb-4">經歷 :</h4>
          {/* {teacher.experience} */}
          <ul>
            <li>{teacher.Experience}</li>
            <li>六福村專案犬隻訓練講師</li>
            <li>曾指導許多知名大戲劇</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4">出版 :</h4>
          <ul>
            <li>《馬克先生的狗教室》</li>
            <li>《馬克先生的狗幼兒園》</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <div>
      <h6>經歷</h6>
      <ul>
        <li>嶺世界犬隻學習寵物表演訓練師</li>
        <li>六福村專案犬隻訓練講師</li>
        <li>曾指導許多知名大戲劇</li>
      </ul>
    </div>
  );
};

const Publications = () => {
  return (
    <div>
      <h6>出版</h6>
      <ul>
        <li>《馬克先生的狗教室》</li>
        <li>《馬克先生的狗幼兒園》</li>
      </ul>
    </div>
  );
};

export default ToggleButtons;
