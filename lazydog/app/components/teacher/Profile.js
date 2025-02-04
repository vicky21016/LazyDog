"use client";

import React, { useState } from "react";
import styles from '../../teacher/info/info.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faInstagram, faShareFromSquare } from '@fortawesome/free-brands-svg-icons';
// import '@fortawesome/fontawesome-svg-core/styles.css';

const Profile = () => {
  return (
    <>
      <div className={styles.profile}>
        <div className="row">
          <div className="col-5">
            <img src="mark.jpg" className={styles.profileImg} alt="馬克" />
          </div>
          <div className="col-7">
            <h6 className={styles.type}>寵物訓練</h6>
            <h4 className={styles.mark}>馬克</h4>
            <p>「在我們的生命中，有一隻無條件愛著自己的狗是何等的幸福。如果可以，我希望它一生都能又溫暖又過得好。」</p>
            <p>10年前，為傳承金雞的法寶，把愛推向動物表達訓練，讓愛更上一層樓。</p>
          </div>
        </div>
      </div>
      <div className={styles.socialLinks}>
        <span>分享到</span>
        {/* <a className={`text-decoration-none ${styles["icon"]}`} href="#"> <FontAwesomeIcon icon={faFacebook} /></a>
        <a className={`text-decoration-none ${styles["icon"]}`} href="#"> <FontAwesomeIcon icon={faInstagram} /></a>
        <a className={`text-decoration-none ${styles["icon"]}`} href="#"><FontAwesomeIcon icon={faShareFromSquare} /></a> */}
      </div>
    </>
  );
};

export default Profile;
