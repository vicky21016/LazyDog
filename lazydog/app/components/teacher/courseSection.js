import React from 'react';
import styles from "../../../styles/modules/toggle.module.css";
function CourseSection() {
  return (
    <section>
      <div className="p-5 lumi-teacher-team text-center">
        <h6 className="mb-4 fw-medium">學習與毛孩共同成長的美好過程</h6>
        <h3 className="mb-5 lumi-m-title">課堂實影</h3>
        <div className="lumi-all-wrapper mb-5">
          <img
            className={` ${styles["img1"]}`}
            src="/teacher-img/img2.webp"
            alt=""
          />
          <img
            className={` ${styles["img"]}`}
            src="/teacher-img/img1.jpeg"
            alt=""
          />
          <img
            className={` ${styles["img"]}`}
            src="/teacher-img/img3.jpg"
            alt=""
          />
          <img
            className={` ${styles["img"]}`}
            src="/teacher-img/img6.png"
            alt=""
          />
          <img
            className={`${styles["img"]}`}
            src="/teacher-img/img5.jpg"
            alt=""
          />
          <img
            className={` ${styles["img1"]}`}
            src="/teacher-img/img4.webp"
            alt=""
          />
        </div>
      </div>
      <div className="mt-5 lumi-all-wrapper">
        <div className="row">
          <div className="col-6">
            <h6 className="my-3 lumi-s-title">提升毛孩健康的最佳選擇</h6>
            <h3 className="mb-4 lumi-m-title">寵膳食育</h3>

            <div className="mt-3  pe-5">
              <p className=" ">
                我們的寵膳食育課程致力於提供全面且高品質的毛孩飲食與健康知識，滿足您和毛孩的需求。由擁有豐富經驗的專業寵物老師領導，我們提供有關毛孩健康飲食、手作餐點、營養補充等課程，確保您的毛孩享有營養均衡且美味的餐點。
              </p>
              <div className="row mt-5">
                <img
                  className={`col-3  ${styles["person"]}`}
                  src="/teacher-img/teacher.jpg"
                  alt=""
                />
                <p className="col-9 mt-4">
                  我非常推薦寵膳食育課程！老師深知每隻毛孩的需求，並且透過生動的教學方式，帶領飼主們一起動手做健康的餐點，讓毛孩享受新鮮、美味且營養豐富的食物。
                </p>
              </div>
            </div>
          </div>
          <div className="mb-3 col-6">
            <img src="/teacher-img/eat.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseSection;
