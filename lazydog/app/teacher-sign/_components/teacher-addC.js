"use client";

import React, { useState, useEffect } from "react";
import styles from "../css/teacherSignAdd.module.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function TeacherAddC() {
  const router = useRouter();
  const [types, setTypes] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/teacher/createGet`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("loginWithToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTypes(data.data.types);
        setPlaces(data.data.places);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  // 表單
  const handleChange = (event) => {
    setSelected(event.target.value); // 更新選中的值
  };

  // 表單送出
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const animationConfig = {
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    };

    fetch(`http://localhost:5000/teacher/mycourse`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginWithToken")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("新增成功:", data);
        Swal.fire({
          title: "新增成功！",
          icon: "success",
          confirmButtonText: "確定",
          ...animationConfig,
        });
      })
      .catch((err) => {
        console.error("Error updating data:", err);
        Swal.fire({
          title: "新增失敗",
          text: "新增時發生錯誤，請稍後再試。",
          icon: "error",
          confirmButtonText: "確定",
          ...animationConfig,
        });
      });
  };

  // 跳頁
  const changepage = (path) => {
    if (path) {
      router.push(`/teacher-sign/${path}`);
    }
  };

  return (
    <>
      <div className={`col-lg-9 col-md-12 col-12`}>
        <div className={`p-5 ${styles.right}`}>
          <h3 className={`mb-4 ${styles.tTitle}`}>新增課程</h3>
          <form>
            <section className={`row g-4 mb-4 ${styles.section1}`}>
              <div className={`col-md-12`}>
                <label className={`form-label ${styles.labels}`}>
                  課程名稱<span className={styles.must}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control  ${styles.controls}`}
                  value
                  name="name"
                />
                <label className={`form-label d-none ${styles.labels}`}>
                  老師ID<span className={styles.must}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control d-none ${styles.controls}`}
                  value
                  name="teacher_id"
                />
              </div>
              <div className={`col-md-6 mt-3`}>
                <label className={`form-label ${styles.labels}`}>
                  課程類別<span className={styles.must}>*</span>
                </label>
                <select
                  className={`form-select  ${styles.controls}`}
                  value
                  name="type_id"
                  onChange={handleChange}
                >
                  <option className={styles.pleaseChoose} selected readonly>
                    請選擇
                  </option>
                  {types.map((t) => (
                    <option key={t.type_id} value={t.type_id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={`col-md-6 mt-3`}>
                <label className={`form-label ${styles.labels}`}>
                  課程金額<span className={styles.must}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control  ${styles.controls}`}
                  value
                  name="price"
                />
              </div>
              <div className={`col-md-6 mt-3`}>
                <label className={`form-label ${styles.labels}`}>
                  總時數<span className={styles.must}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control  ${styles.controls}`}
                  value
                  name="duration"
                />
              </div>
              <div className={`col-md-6 mt-3`}>
                <label className={`form-label ${styles.labels}`}>
                  報名人數限制<span className={styles.must}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control  ${styles.controls}`}
                  value
                  name="max_people"
                />
              </div>
            </section>
            <section className={`row g-4 mb-5 ${styles.section2}`}>
              <div className={`col-md-12`}>
                <label className={`form-label ${styles.labels}`}>
                  該梯每堂課日期<span className={styles.must}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control  ${styles.controls}`}
                  placeholder={`範例 :  2025 【台北】 08/17、08/24、08/31、09/07、09/14 、09/21、09/28`}
                  value
                  name="class_dates"
                />
              </div>
              <div className={`col-md-6 mt-3`}>
                <label className={`form-label ${styles.labels}`}>
                  開課日期<span className={styles.must}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control  ${styles.controls}`}
                  value
                  name="start_date"
                  defaultValue={""}
                />
              </div>
              <div className={`col-md-6 mt-3`}>
                <label className={`form-label ${styles.labels}`}>
                  開課地點<span className={styles.must}>*</span>
                </label>
                <select
                  className={`form-select  ${styles.controls}`}
                  value
                  name="area_id"
                  onChange={handleChange}
                >
                  <option className={styles.optionDisabled} value="" disabled>
                    請選擇
                  </option>
                  {places.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.region}
                    </option>
                  ))}
                </select>
              </div>
              <div className={`col-md-12 mt-3`}>
                <label className={`form-label ${styles.labels}`}>
                  上課時間<span className={styles.must}>*</span>
                </label>
                <div className={`d-flex`}>
                  <input
                    type="text"
                    className={`form-control  ${styles.controls}`}
                    value
                    name="start_time"
                  />
                  <span className={`align-self-center p-2`}>~</span>
                  <input
                    type="text"
                    className={`form-control  ${styles.controls}`}
                    value
                    name="end_time"
                  />
                </div>
              </div>
            </section>
            <section className={`row g-4 mb-5  ${styles.section3}`}>
              <div className={`col-md-12 mt-3`}>
                <label className={`form-label ${styles.labels}`}>
                  課程介紹<span className={styles.must}>*</span>
                </label>
                <textarea
                  className={`form-control  ${styles.controls} ${styles.scrollOrg}`}
                  style={{ resize: "none" }}
                  id="exampleFormControlTextarea1"
                  rows={3}
                  value
                  name="desciption"
                />
              </div>
              <div className={`col-md-12 mt-3`}>
                <label className={`form-label ${styles.labels}`}>
                  注意事項
                </label>
                <textarea
                  className={`form-control  ${styles.controls} ${styles.scrollOrg}`}
                  style={{ resize: "none" }}
                  id="exampleFormControlTextarea1"
                  rows={4}
                  value
                  name="notice"
                />
              </div>
              <div className={`col-md-12 mt-3`}>
                <label className={`form-label ${styles.labels}`}>Q&amp;A</label>
                <textarea
                  className={`form-control  ${styles.controls} ${styles.scrollOrg}`}
                  style={{ resize: "none" }}
                  id="exampleFormControlTextarea1"
                  rows={4}
                  value
                  name="qa"
                />
              </div>
            </section>
            <section className={`row g-4 mb-5 ${styles.section4}`}>
              {/* 圖片 */}
              <label className={`form-label`}>
                課程圖片
                <span className={styles.must}>* </span>
              </label>
              <div className={`gap-3 ${styles.pics}`}>
                <div className={`col-md-4 mt-4 mb-5 ${styles.mainPic}`}>
                  <button
                    type="button"
                    className={`btn btn-primary btn-sm ${styles.addPicBtn}`}
                  >
                    + 課程封面圖
                  </button>
                  <input
                    type="file"
                    id="imageUpload"
                    className={`form-control d-none add`}
                    accept="image/*"
                    multiple
                  />
                </div>
                <div className={`col-md-7 mt-4 mb-5 ${styles.otherPic}`}>
                  <div
                    id="imagePreviewContainer"
                    className={`d-flex flex-wrap gap-3 mb-2`}
                  >
                    {/* <div class="imageCard">
                            <img
                              class="imgCr"
                              src=""
                              alt=""
                            />
                            <button type="button" class="deleteBtn deletPic">&times;</button>
                          </div>                          */}
                  </div>
                  <button
                    type="button"
                    className={`btn btn-primary btn-sm ${styles.addPicBtn}`}
                  >
                    + 課程其他圖片
                  </button>
                  <input
                    type="file"
                    id="imageUpload"
                    className={`form-control d-none add`}
                    accept="image/*"
                    multiple
                  />
                </div>
              </div>
            </section>
            {/* 按鈕區 */}
            <div className={`d-flex justify-content-end gap-3 border-top mt-5`}>
              <button
                type="button"
                className={`btn btn-sm px-4 mt-4 ${styles.cancleBtn}`}
                onClick={() => changepage("list")}
              >
                返回
              </button>
              <button
                type="submit"
                className={`btn btn-primary btn-sm px-4 mt-4 ${styles.submitBtn}`}
                onClick={handleSubmit}
              >
                儲存
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
