"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../../styles/modules/toggle.module.css"
import OtherTeacher from "./otherTeacher";
import style from "../../../styles/modules/teacher.module.css"
export default function TeacherSection () {
  const [state, setState] = useState(null);
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

  return (
    <section className="">
      <div className="lumi-teacher-team pt-5 text-center">
        <h3 className="mb-5 lumi-m-title">嚴選的師資團隊</h3>
        <div className=" mb-5">
          <p>
            我們對寵物師資的挑選份外嚴格，必須有豐富的經驗、耐心、傾聽能力、堅強的心志，才能陪伴飼主和狗狗一起經歷改變。
          </p>
          <p>
            我們的宗旨是：用愛與同理將每個毛孩當成自己的孩子來教導與照護，用正向的方式引導毛孩的心理及生理，相信每個毛孩都有機會改變！
          </p>
        </div>

        <div className="d-flex mb-5 justify-content-center">
          <Link
            className={` text-center text-decoration-none ${
              style.teacherBtn
            }`}
            href="/teacher/list"
          >
            read more
          </Link>
        </div>
        <div>
          <img className="" src="/teacher-img/yellow.png" alt="" />
        </div>
      </div>

      <div className={` text-center ${style.container}`}>
        <div className={` text-center ${style.dog}`}>
          <div className={` ${styles["cube"]}`}>
            <div>803</div>
            <div>蛻變的狗狗</div>
          </div>
          <div className="">
            <img
              className={` ${styles["dog-image"]}`}
              src="/teacher-img/dog.png"
              alt=""
            />
          </div>
          <div className={`ms-2 ${styles["cube"]}`}>
            <div>5525</div>
            <div>為狗狗服務時數</div>
          </div>
        </div>
      </div>
      <div>
        <img className="" src="/teacher-img/yello2.png" alt="" />
      </div>
      <div className="lumi-all-wrapper pb-5">
        <h3 className="my-5 lumi-m-title ">熱門師資</h3>
        <OtherTeacher cards={teacherData} />
      </div>
      <div>
        <img className="" src="/teacher-img/rice.png" alt="" />
      </div>
    </section>
  );
};
