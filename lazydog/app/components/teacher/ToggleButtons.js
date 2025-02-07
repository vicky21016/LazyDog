"use client";

import React, { useState } from "react";


const ToggleButtons = ({ onRadioChange }) => {
    return (
      <div
        className="btn-group-vertical"
        role="group"
        aria-label="Vertical radio toggle button group"
      >
        <label
          className="btn btn-outline-secondary p-3 pb-4"
          style={{ pointerEvents: "none" }}
        >
          相關資訊
        </label>
        <input
          type="radio"
          className="btn-check"
          name="vbtn-radio"
          id="vbtn-radio1"
          autocomplete="off"
          onChange={() => onRadioChange("experience")}
          defaultChecked
        />
        <label
          className="btn btn-outline-secondary px-5 py-2"
          htmlFor="vbtn-radio1"
        >
          經歷
        </label>
        <input
          type="radio"
          className="btn-check"
          name="vbtn-radio"
          id="vbtn-radio2"
          autocomplete="off"
          onChange={() => onRadioChange("courses")}
        />
        <label
          className="btn btn-outline-secondary px-5 py-2"
          htmlFor="vbtn-radio2"
        >
          課程
        </label>
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