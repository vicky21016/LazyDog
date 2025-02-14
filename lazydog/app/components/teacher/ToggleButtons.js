"use client";

import React, { useState } from "react";
import styles from "../../../styles/modules/toggle.module.css";

const ToggleButtons = ({ onRadioChange }) => {
  return (
    <div className="row g-5">
      <div className="col-12 col-md-6 col-lg-5">
        <div className={styles.infoCard}>
          <h5 className={`mb-4 ${styles.cardTitle}`}>相關資訊</h5>
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
          <h6>經歷 :</h6>
          <ul>
            <li>嶺世界犬隻學習寵物表演訓練師</li>
            <li>六福村專案犬隻訓練講師</li>
            <li>曾指導許多知名大戲劇</li>
          </ul>
        </div>
        <div>
          <h6>出版 :</h6>
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
