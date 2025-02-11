"use client";

import React, { useState } from "react";
import Link from "next/link";

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
      <div className="lumi-dog-container p-5">
        <div className="lumi-dog">
          <div>
            <div>803</div>
            <div>蛻變的狗狗</div>
          </div>

          <div>
            <div>5525</div>
            <div>為狗狗服務時數</div>
          </div>
        </div>
      </div>
      <div className="lumi-all-wrapper pb-5">
        <h3 className="my-5 lumi-m-title text-center">熱門師資</h3>
        <div className="row">
          {["1", "2", "3", "4"].map((_, index) => (
            <div className="col-3" key={index}>
              <Link
                href="/teacher/info"
                passHref
                className="text-decoration-none"
              >
                <div className="card" style={{ width: "18.75rem" }}>
                  <img src="..." className="card-img-top" alt="..." />
                  <div className="card-body fw-medium">
                    Zoe
                    <p
                      className="card-text mt-2"
                      style={{ fontSize: "12px", color: "#ff9538" }}
                    >
                      寵物訓練
                    </p>
                  </div>
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
