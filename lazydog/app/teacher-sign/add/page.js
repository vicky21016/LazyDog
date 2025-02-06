"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../css/teacherSignAdd.module.css";

export default function TeacherAddPage() {
  return (
    <>
        {/* 點擊圖片 Bs Modal (彈出視窗)  */}
        <div className={`modal ${styles.fade}`} id="imageModal" tabIndex={-1} aria-hidden="true">
          <div className={`modal-dialog modal-dialog-centered`}>
            <div className={`modal-content`}>
              <div className={`modal-body text-center`}>
                <img id="modalImage" className={`img-fluid`} src="" alt="放大圖片" />
              </div>
            </div>
          </div>
        </div>

        <div className={`container mt-5`}>
          <div className={`row`}>
            {/* 左邊sidebar */}
            <div className={`col-md-3`}>
              <div className={styles.left}>
                <div className={`border`}>
                  <div className={`text-center ${styles.top}`}>
                    <div className={`position-relative d-inline-block ${styles.camera}`}>
                      <img src="/course/img/25 (1).jpeg" className={`rounded-circle ${styles.avatarImg}`} alt="User Avatar" />
                      {/* 相機按鈕Dropdown) */}
                      <div className={styles.dropdown}>
                        <button className={`btn btn-light  p-0 ${styles.cameraIcon}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <img src="/course/img/camera.png" alt="相機" className={styles.cameraIconImg} />
                        </button>
                        <ul className={`dropdown-menu`}>
                          <li>
                            <button className={`dropdown-item text-danger`} id="deletePhoto">
                              刪除照片
                            </button>
                          </li>
                          <li>
                            <label htmlFor="uploadPhoto" className={`dropdown-item`}>上傳照片</label>
                            <input type="file" id="uploadPhoto" accept="image/*" className={`d-none`} />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h5 className={`m-3 ${styles.tName}`}>陳大方</h5>
                    <p className={`text-muted ${styles.tGmail}`}>165846hote@gmail.com</p>
                    <button className={`btn btn-outline btn-sm ${styles.outline}`}>已認證</button>
                  </div>
                  <ul className={`list-unstyled text-start m-0`}>
                  <li className={`p-4 ${styles.lis}`}>
                      <a href="opTeacherInfo.html" className={`text-decoration-none ${styles.liText}`}>
                      <i className={`bi bi-book-fill fs-6 pe-2 ${styles.icons}`}></i>我的師資
                      </a>
                    </li>
                    <li className={`p-4 ${styles.lis}`}>
                      <a href="opCourseList.html" className={`text-decoration-none ${styles.liText}`}>
                      <i className={`bi bi-calendar-week fs-6 pe-2 ${styles.icons}`}></i>我的課程
                      </a>
                    </li>
                    <li className={`p-4 ${styles.lis}`}>
                      <a href="opCourseList.html" className={`text-decoration-none ${styles.liText}`}>
                      <i className={`bi bi bi-chat-left-heart fs-6 pe-2 ${styles.icons}`}></i>課程評論
                      </a>
                    </li>
                    <li className={`p-4 ${styles.lis}`}>
                      <a href="opCoursePlace.html" className={`text-decoration-none ${styles.liText}`}>
                      <i className={`bi bi-building-fill  fs-6 pe-2 ${styles.icons}`}></i>開課地點
                      </a>
                    </li>
                    <li className={`p-4 ${styles.lis}`}>
                      <a href="opCoursePlace.html" className={`text-decoration-none ${styles.liText}`}>
                      <i className={`bi bi-person-fill fs-5 pe-2 ${styles.icons}`}></i>會員資料
                      </a>
                    </li>
                    <li className={`p-4 ${styles.lis}`}>
                      <a href="opCoursePlace.html" className={`text-decoration-none ${styles.liText}`}>
                      <i className={`bi bi-box-arrow-right fs-5 pe-2 ${styles.icons}`}></i>登出
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 右邊 */}
            <div className={`col-md-9`}>            
              <div className={`border p-5 ${styles.right}`}>
                <form>
                  <h3 className={`mb-4 ${styles.tTitle}`}>新增課程</h3>
                  <div className={` mb-2`}>
                    <div className={`row g-4`}>
                      <div className={`col-md-12`}>
                        <label className={`form-label`}>課程名稱<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={""}  />
                      </div>
                      <div className={`col-md-6`}>
                        <label className={`form-label`}>課程類別<span className={styles.must}>*</span></label>
                        <select className={`form-select  ${styles.controls}`}>
                          <option selected>請選擇</option>
                          <option>寵物美容</option>
                          <option>寵膳食育</option>
                          <option>寵物訓練</option>
                          <option>寵物照護</option>
                          <option>商業思維與專業培訓</option>
                        </select>
                      </div>
                      <div className={`col-md-6`}>
                        <label className={`form-label`}>課程金額<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={""} placeholder />
                      </div>
                      <div className={`col-md-6`}>
                        <label className={`form-label`}>開課日期<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={""} placeholder />
                      </div>
                      <div className={`col-md-6`}>
                        <label className={`form-label`}>開課地點<span className={styles.must}>*</span></label>
                        <select className={`form-select  ${styles.controls}`}>
                          <option selected>請選擇</option>
                          <option>台北</option>
                          <option>台中</option>
                          <option>高雄</option>
                          <option>線上直播</option>
                          <option>線上預錄</option>
                        </select>
                      </div>
                      <div className={`col-md-12 mt-4`}>
                        <label className={`form-label`}>該梯每堂課日期<span className={styles.must}>*</span><span className={styles.example}>範例 : 第二梯 08/17、08/24、08/31、09/07、09/14 、09/21、09/28</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue placeholder />
                      </div>
                      <div className={`col-md-12 mt-4`}>
                        <label className={`form-label`}>課程介紹<span className={styles.must}>*</span></label>
                        <textarea className={`form-control  ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                      </div>
                      <div className={`col-md-12 mt-4`}>
                        <label className={`form-label`}>注意事項<span className={styles.must}>*</span></label>
                        <textarea className={`form-control  ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={4} defaultValue={""} />
                      </div>
                      <div className={`col-md-12 mt-4`}>
                        <label className={`form-label`}>Q&amp;A<span className={styles.must}>*</span></label>
                        <textarea className={`form-control  ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={4} defaultValue={""} />
                      </div>
                      {/* 圖片 */}
                      <div className={`col-md-12 my-4`}>
                        <div>
                        <label className={`form-label`}>課程圖片
                          <span className={styles.must}>* </span>
                          <button type="button" className={`btn btn-primary btn-sm ${styles.addPicBtn}`} onclick="document.getElementById('imageUpload').click();">
                            新增
                          </button>
                        </label>
                          <div id="imagePreviewContainer" className={`d-flex flex-wrap gap-3 mb-2`}>
                            {/* <div class="imageCard">
                            <img
                              class="imgCr"
                              src=""
                              alt=""
                            />
                            <button type="button" class="deleteBtn deletPic">&times;</button>
                          </div>                          */}
                          </div>
                          <input type="file" id="imageUpload" className={`form-control d-none add`} accept="image/*" multiple />
                          
                          {/* <button type="button" className={`btn btn-primary btn-sm mt-2 ${styles.addPicBtn}`} onClick={()=> document.getElementById('imageUpload').click()}>
                            + 新增
                          </button> */}

                        </div>
                      </div>
                    </div>
                  </div>          
                  {/* 按鈕區 */}
                  <div className={`d-flex justify-content-end gap-3 border-top mt-4`}>
                    <button type="button" className={`btn btn-sm px-4 mt-4 ${styles.cancleBtn}`} onclick="location.href='opCourseList.html'">
                      <a className={styles.cancleBtnA} href="./opCourseList.html">取消</a>
                    </button>
                    <button type="submit" className={`btn btn-primary btn-sm px-4 mt-4 ${styles.submitBtn}`}>
                      <a className={styles.submitBtnA} href="./opCourseList.html">儲存</a>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      
    {/* <script>
        document
        .getElementById("imageUpload")
        .addEventListener("change", function (event) {
          const files = event.target.files;
          const previewContainer = document.getElementById(
            "imagePreviewContainer"
          );

          for (const file of files) {
            const reader = new FileReader();
            reader.onload = function (e) {
              const imgWrapper = document.createElement("div");
              imgWrapper.classList.add("image-card");

              const imgElement = document.createElement("img");
              imgElement.src = e.target.result;
              imgElement.classList.add("imgCr");

              const descriptionInput = document.createElement("input");
              descriptionInput.type = "text";
              descriptionInput.classList.add("form-control");
              descriptionInput.placeholder = "輸入圖片描述";

              const removeBtn = document.createElement("button");
              removeBtn.classList.add("delete-btn" , "deletPic");
              removeBtn.innerHTML = "&times;";
              removeBtn.onclick = function () {
                previewContainer.removeChild(imgWrapper);
              };

              imgWrapper.appendChild(imgElement);
              imgWrapper.appendChild(descriptionInput);
              imgWrapper.appendChild(removeBtn);

              previewContainer.appendChild(imgWrapper);
            };
            reader.readAsDataURL(file);
          }

           event.target.value = "";
        });

        //  deletPic 
        document.addEventListener("click", function (event) {
            if (event.target.classList.contains("deletPic")) {
                const imgCard = event.target.closest(".image-card");
                if (imgCard) {
                    imgCard.remove();
                }
            }
         });

        // 點擊圖片彈出視窗
        document.addEventListener("click", function (event) {
        if (event.target.classList.contains("imgCr")) {
            const imgSrc = event.target.src;  // 取得圖片路徑
            document.getElementById("modalImage").src = imgSrc;  // 設定 Modal 內的圖片
            const modal = new bootstrap.Modal(document.getElementById("imageModal"));
            modal.show();  // 顯示 Modal
        }
       });

    </script>
    <script
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
      integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
      integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
      crossorigin="anonymous"
    ></script> */}
    </>
  );
}
