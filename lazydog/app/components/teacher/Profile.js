"use client";

import React, { useState, useEffect  } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import {useTeacherDetail } from "../../../hooks/useTeacherDetail";
import styles from '../../teacher/info/info.module.css';
import style from "../../pages/menu.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faInstagram, faShareFromSquare } from '@fortawesome/free-brands-svg-icons';
// import '@fortawesome/fontawesome-svg-core/styles.css';

export default function Profile () {
 const { id } = useParams();
    const { teacher } = useTeacherDetail(id);

 if (!teacher) {
   return (
     <div className={style.container2}>
       <div className={style.loader27}></div>
     </div>
   );
 }


  return (
    <>
      <div className={`my-5 ${styles["profile"]}`}>
        <div className="row g-5">
          <div className="col-12 col-md-6 col-lg-5">
            <img
              src={`/teacher-img/${teacher.img}`}
              className={styles.profileImg}
              alt={teacher.name}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-7 ps-5">
            <h5 className={`mb-4 ${styles["type"]}`}>{teacher.category_name}</h5>
            <h3 className={`mb-4 ${styles["mark"]}`}> {teacher.name}</h3>{" "}
            <p  dangerouslySetInnerHTML={{
    __html: teacher.Introduce?.replace(/\n/g, "<br>") || "",
  }}></p>
           
          </div>
        </div>
      </div>
      <div className={styles.socialLinks}>
        <span className="">分享到</span>
        {/* <a className={`text-decoration-none ${styles["icon"]}`} href="#"> <FontAwesomeIcon icon={faFacebook} /></a>
        <a className={`text-decoration-none ${styles["icon"]}`} href="#"> <FontAwesomeIcon icon={faInstagram} /></a>
        <a className={`text-decoration-none ${styles["icon"]}`} href="#"><FontAwesomeIcon icon={faShareFromSquare} /></a> */}
      </div>
    </>
  );
};
