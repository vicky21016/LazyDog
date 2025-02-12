"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../../styles/modules/toggle.module.css"

const TeacherSection = () => {
  const [state, setState] = useState(null);

  return (
    <section className=" mb-3">
      <div className="lumi-teacher-team p-5 text-center">
        <h3 className="mb-5 lumi-m-title">嚴選的師資團隊</h3>
        <div className=" mb-5">
          <p>
            我們對寵物師資的挑選份外嚴格，必須有豐富的經驗、耐心、傾聽能力、堅強的心志，才能陪伴飼主和狗狗一起經歷改變。
          </p>
          <p>
            我們的宗旨是：用愛與同理將每個毛孩當成自己的孩子來教導與照護，用正向的方式引導毛孩的心理及生理，相信每個毛孩都有機會改變！
          </p>
        </div>

        <div className="d-flex justify-content-center">
          <Link
            className="lumi-teacher-btn text-center text-decoration-none"
            href="/teacher/list"
          >
            read more
          </Link>
        </div>
      </div>
      <div className="lumi-dog-container p-5 text-center">
        <div className="lumi-dog text-center">
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
      <div className="lumi-all-wrapper pb-5">
        <h3 className="my-5 lumi-m-title ">熱門師資</h3>
        <div className="row g-5">
          {["1", "2", "3", "4"].map((_, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
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
      </div>
    </section>
  );
};

export default TeacherSection;
