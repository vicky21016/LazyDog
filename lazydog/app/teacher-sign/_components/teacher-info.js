'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from "../css/teacherSignInfo.module.css"

export default function TeacherInfo() {
  
  const [infos, setInfos] = useState({});  
  const [types, setTypes] = useState([])

  // 撈後台資料
  useEffect(() => {
    fetch(`http://localhost:5000/teacher/info`,{
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("loginWithToken")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        console.log(data?.data?.infos[0]);

        setInfos(data?.data?.infos[0]);
        setTypes(data.data.types);


      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  // 圖片
  const fileInputRef = useRef(null); // 🔹 建立 useRef 來取得 input 元素
  const [previewImage, setPreviewImage] = useState(""); // 🔹 存儲預覽圖片 URL 
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // ✅ 透過 ref 觸發點擊
    }
  };

   // 處理圖片變更
   const handleImageChange = (e) => {
    const file = e.target.files[0]; // 取得選擇的檔案
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // 設定預覽圖片
      };
      reader.readAsDataURL(file);
    }
  };

 
  // 表單變更
  const handleChange = (e) =>{
    const { name, value } = e.target;
    setInfos((prevInfos) => ({
      ...prevInfos,
      [name]: value,
    })); 
  }


  // 儲存表單
  const handleSubmit = (e) => {
    e.preventDefault();

    // const updateData = {
    //   name: infos.name, 
    //   category_id: infos.category_id, 
    //   Introduce: infos.Introduce, 
    //   Experience: infos.Experience, 
    //   img: infos.img
    // }

    const updateData = new FormData();
    updateData.append("name", infos.name);
    updateData.append("category_id", infos.category_id);
    updateData.append("Introduce", infos.Introduce);
    updateData.append("Experience", infos.Experience);
    updateData.append("img", fileInputRef.current.files[0] || infos.img);


    fetch(`http://localhost:5000/teacher/info`, {
      method: "PUT", // 或者使用 PUT
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginWithToken")}`,
      },
      body: updateData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("資料更新成功！");
        console.log("更新成功:", data);
      })
      .catch((err) => console.error("Error updating data:", err));
  };


  return (
    <>
      <div className={`col-lg-9 col-md-12 col-12`}>
              <form onSubmit={handleSubmit}>
                <div className={`${styles.right} p-5`}>
                  <h3 className={`mb-4 ${styles.tTitle}`}>師資內容</h3>
                  <div className={`mb-4`}>
                    <div className={`row`}>
                      <div className={`col-md-6`}>
                        <label className={`form-label ${styles.labels}`}>姓名<span className={styles.must}>*</span></label>
                        <input 
                          type="text" 
                          className={`form-control ${styles.controls}`}
                          name="name" 
                          value={infos?.name} 
                          onChange={handleChange} />
                      </div>
                      <div className={`col-md-6`}>
                        <label className={`form-label ${styles.labels}`}>教學類別<span className={styles.must}>*</span></label>
                        <select 
                          className={`form-select ${styles.controls}`} 
                          value={infos?.category_id}
                          name="category_id"  
                          onChange={handleChange}>
                          {types.map((t)=>(
                            <option key={t.type_id} value={t.type_id}>{t.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>個人介紹<span className={styles.must}>*</span></label>
                        <textarea 
                          className={`form-control ${styles.controls} ${styles.scrollOrg}`} 
                          style={{resize: 'none'}} 
                          id="exampleFormControlTextarea1" 
                          rows={6}
                          name="Introduce"  
                          value={infos?.Introduce} 
                          onChange={handleChange}/>
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>經歷<span className={styles.must}>*</span></label>
                        <textarea 
                          className={`form-control ${styles.controls} ${styles.scrollOrg}`} 
                          style={{resize: 'none'}} 
                          id="exampleFormControlTextarea1" 
                          rows={6}
                          name="Experience" 
                          value={infos?.Experience} 
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`col-md-12 mt-3`}>
                    <label className={`form-label ${styles.labels}`}>師資照片
                      <span className={styles.must}>* </span>
                      <button 
                        type="button" 
                        className={`btn btn-primary btn-sm ${styles.addPicBtn}`} 
                        onClick={handleUploadClick}>
                        更換
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className={`form-control d-none`}
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <div id="imagePreviewContainer" className={`d-flex flex-wrap gap-3 my-2`}>
                      <div className={styles.imageCard}>
                        <img 
                        className={styles.imgCr} 
                        src={previewImage || `/teacher-img/${infos?.img}`} 
                        alt={`${infos?.name}老師圖片`} />
                        <button 
                        type="button" 
                        className={`${styles.deleteBtn} ${styles.deletPic}`}
                        onClick={()=> setPreviewImage("")}>×</button>
                      </div>                  
                    </div>
                  </div>
                  {/* 按鈕區 */}
                  <div className={`d-flex justify-content-end border-top mt-5`}>
                    <button type="submit" className={`btn btn-primary btn-sm px-4 mt-4 ${styles.submitBtn}`}>
                      儲存
                    </button>
                  </div>
                </div>
              </form>
            </div>
    </>
  )
}
