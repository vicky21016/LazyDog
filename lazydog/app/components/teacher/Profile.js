"use client";

import React, { useState } from "react";
import styles from '../../teacher/info/info.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faInstagram, faShareFromSquare } from '@fortawesome/free-brands-svg-icons';
// import '@fortawesome/fontawesome-svg-core/styles.css';

const Profile = () => {
  return (
    <>
      <div className={`my-5 ${styles["profile"]}`}>
        <div className="row g-5">
          <div className="col-12 col-md-6 col-lg-5">
            <img
              src="/teacher-img/馬克.jpg"
              className={styles.profileImg}
              alt="馬克"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-7 ps-5">
            <h6 className={`mb-4 ${styles["type"]}`}>寵物訓練</h6>
            <h4 className={`mb-4 ${styles["mark"]}`}>馬克</h4>
            <p>
              「在我們的生命中，有一隻無條件愛著自己的狗是何等的幸福。如果可以，我希望牠一生都快樂又逍遙。」
            </p>
            <p>
              10年前，有點像是命運的洪流，把我推向動物表演訓練，讓我愛上了訓練師這份工作，也時常在思考，怎麼樣才能成為一位更好的訓練師？怎麼樣才能透過教學，讓動物過上更好的生活？
            </p>
            <p>
              離開動物表演後投身導盲犬的訓練，對我影響最深的莫過於導盲犬的幼犬教育，了解到導盲犬的成功養成並非偶然，是透過完整的教育來成就出一隻生理及心理都健康的狗狗。那我們自己的狗狗也能做得到嗎？當然可以！而這訓練成功的關鍵，會建立在我們人與狗的能力水準都共同成長的時候。
            </p>
            <p>
              很榮幸有機會加入犬研室，一起為狗狗與飼主的共同美好生活來做努力。
            </p>
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

export default Profile;
