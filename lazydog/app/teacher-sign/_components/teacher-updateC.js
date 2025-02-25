'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from "next/navigation";
import styles from "../css/teacherSignUpdate.module.css";

export default function TeacherUpdateC() {
  const params = useParams()
  const sessionCode = params.sessionId

  // cs 有course和session的資料
  const [cs, setCS] = useState([])
  const [mainpic, setMainpic] = useState([]);
  const [otherpics, setOtherpics] = useState([]);
  const [types, setTypes] = useState([])
  const [places, setPlaces] = useState([])

  // 更新至後台
  const [courseData, setCourseData] = useState({
    name: cs.name,
    type_id: cs.type_id,
    price: cs.price,
    duration: cs.duration,
    description: cs.description,
    notice: cs.notice,
    qa: cs.qa,
  })

  const [sessionData, setSessionData] = useState({
    max_people: cs.max_people,
    class_dates: cs.class_dates,
    start_date: cs.start_date,
    area_id: cs.area_id,
    start_time: cs.start_time,
    end_time: cs.end_time,    
    // curr_people: '',
    // teacher_id: '',
    // remaining_slots: '',
    // end_date: '',
    // deadline_date: '',
    
  });
  
  useEffect(() => {
    fetch(`http://localhost:5000/teacher/mycourse/${sessionCode}`,{
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("loginWithToken")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // console.log(data.data.courses[0]);
        // console.log(data.data.places);
        setCS(data.data.courses[0]);
        setMainpic(data.data.mainpic[0]);
        setOtherpics(data.data.otherpics);
        setTypes(data.data.types);
        setPlaces(data.data.places);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [sessionCode]);


  // 表單變更
  const handleChange = (e) =>{
    const { name, value } = e.target;

    if (name in courseData) {
      setCourseData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (name in sessionData) {
      setSessionData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      courseData,
      sessionData,
      images: [...otherpics], // 傳送更新後的圖片資訊
    };
    
    // const courseData = new FormData();
    // courseData.append("name", cs.name);
    // courseData.append("type_id", cs.type_id);
    // courseData.append("category_id", cs.category_id);
    // courseData.append("Introduce", cs.Introduce);
    // courseData.append("Experience", cs.Experience);
    // courseData.append("img", fileInputRef.current.files[0] || infos.img);

    // name: cs.name,
    // type_id: cs.type_id,
    // price: cs.price,
    // duration: cs.duration,
    // description: cs.description,
    // notice: cs.notice,
    // qa: cs.qa,

    // max_people: cs.max_people,
    // class_dates: cs.class_dates,
    // start_date: cs.start_date,
    // area_id: cs.area_id,
    // start_time: cs.start_time,
    // end_time: cs.end_time,  

    fetch(`http://localhost:5000/teacher/mycourse/${sessionCode}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("loginWithToken")}`,
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("資料更新成功！");
        console.log("更新成功:", data);
      })
      .catch((err) => console.error("Error updating data:", err));

  }

  const startDate = cs.start_date? new Date(cs.start_date).toISOString().split('T')[0]: '';
  const startTime = cs.start_time ? cs.start_time.slice(0, 5) : '';
  const endTime = cs.end_time ? cs.end_time.slice(0, 5) : '';

  return (
    <>
      <div className={`col-lg-9 col-md-12 col-12`}>
              <div className={`p-5 ${styles.right}`}>
                <h3 className={`mb-4 ${styles.tTitle}`}>編輯課程</h3>
                <form onSubmit={handleSubmit}>
                    <section className={`row g-4 mb-5 ${styles.section1}`}>
                      <div className={`col-md-12`}>
                        <label className={`form-label ${styles.labels}`}>課程名稱<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} value={cs.name} onChange={handleChange} />
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>課程類別<span className={styles.must}>*</span></label>
                        <select 
                          className={`form-select ${styles.controls}`} 
                          value={cs?.type_id}
                          // name="category_id"  
                          // onChange={handleChange}
                          >
                          {types.map((t)=>(
                            <option key={t.type_id} value={t.type_id}>{t.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>課程金額<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} value={cs.price} onChange={handleChange}/>
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>總時數<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} value={cs.duration} onChange={handleChange} />
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>報名人數限制<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} value={cs.max_people} onChange={handleChange}/>
                      </div>
                    </section>
                    <section className={`row g-4 mb-5 ${styles.section2}`}>
                      <div className={`col-md-12`}>
                        <label className={`form-label ${styles.labels}`}>該梯每堂課日期<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control ${styles.controls}`} placeholder={`範例: 2025 【台北】 08/17、08/24、08/31、09/07、09/14 、09/21、09/28`} value={cs.class_dates} onChange={handleChange}/>
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>開課日期<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} value={startDate} onChange={handleChange}/>
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>開課地點<span className={styles.must}>*</span></label>
                        <select 
                          className={`form-select ${styles.controls}`} 
                          value={cs?.area_id}
                          // name="category_id"  
                          // onChange={handleChange}
                          >
                          {places.map((p)=>(
                            <option key={p.id} value={p.id}>{p.region}</option>
                          ))}
                        </select>
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>上課時間<span className={styles.must}>*</span></label>
                        <div className={`d-flex`}>
                          <input type="text" className={`form-control  ${styles.controls}`} value={startTime} onChange={handleChange}/>
                          <span className={`align-self-center p-2`}>~</span>
                          <input type="text" className={`form-control  ${styles.controls}`} value={endTime} onChange={handleChange}/>
                        </div>
                        
                      </div>
                    </section> 
                    <section className={`row g-4 mb-5  ${styles.section3}`}>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>課程介紹<span className={styles.must}>*</span></label>
                        <textarea className={`form-control  ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={3} value={cs.description} />
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>注意事項</label>
                        <textarea className={`form-control  ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={4} value={cs.notice} />
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>Q&amp;A</label>
                        <textarea className={`form-control  ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={4} value={cs.qa} />
                      </div>
                    </section>
                    <section className={`row g-4 mb-5 ${styles.section4}`}>
                      <label className={`form-label`}>課程圖片
                          <span className={styles.must}>* </span>
                      </label>
                        <div className={`col-md-5 col-12 mt-4 mb-5 ${styles.mainPic}`}>
                          <div className={styles.imageCard}>
                            <img className={styles.imgCr} src={`/course/img/${mainpic.url}`} alt={`${cs.name}-課程主圖`} />
                            <button 
                            type="button" 
                            className={`${styles.deleteBtn1} ${styles.deletPic}`}
                            onClick={()=> setPreviewImage("")}>×</button>
                          </div>
                          <button type="button" className={`btn btn-primary btn-sm d-none ${styles.addPicBtn}`} >
                            新增
                          </button>
                          <input type="file" id="imageUpload" className={`form-control d-none add`} accept="image/*" />
                        </div>
                        <div className={`col-md-7 col-12 mt-4 mb-5 ${styles.otherPic}`}>
                          <div id="imageContainer" className={`d-flex flex-wrap gap-3 mb-2`}>
                            {otherpics.map((other)=>(
                              <div className={styles.imageCard}>
                                <img className={`${styles.imgCr} ${styles.pics}`} src={`/course/img/${other.url}`} alt={`${cs.name}-課程其他圖片`} />
                                <button 
                                type="button" 
                                className={`${styles.deleteBtn} ${styles.deletPic}`}
                                onClick={()=> setPreviewImage("")}>×</button>
                            </div>
                            ))}                           
                          </div>
                          <button type="button" className={`btn btn-primary btn-sm d-none ${styles.addPicBtn}`} >
                            新增
                          </button>
                          <input type="file" id="imageUpload" className={`form-control d-none add`} accept="image/*" multiple />
                        </div>
                    </section>




                    {/* 按鈕區 */}
                    <div className={`d-flex justify-content-end gap-3 border-top mt-5`}>
                      <button type="button" className={`btn btn-sm px-4 mt-4 ${styles.cancleBtn}`}>
                        <a className={styles.cancleBtnA} href={`/teacher-sign/list`}>取消</a>
                      </button>
                      <button type="submit" className={`btn btn-primary btn-sm px-4 mt-4 ${styles.submitBtn}`}>
                        <a className={styles.submitBtnA} href={`/teacher-sign/list`}>儲存</a>
                      </button>
                    </div>
                </form>
              </div>
            </div>
    </>
  )
}
