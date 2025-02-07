'use client';

import React, { useState } from "react";
import Header from '../../components/layout/header';
import Breadcrumb from '../../components/teacher/breadcrumb';
import Profile from '../../components/teacher/Profile';
// import SocialLinks from '../../components/teacher/SocialLinks';
import ToggleButtons from '../../components/teacher/ToggleButtons';
import OtherCourses from '../../components/teacher/OtherCourses';
import styles from './info.module.css';

const App = () => {
  const [selectedTab, setSelectedTab] = useState("experience");

  const handleRadioChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <Header />
      <div className="lumi-all-wrapper">
        <div className={styles.container}>
          <Breadcrumb
            paths={[
              { name: "首頁 > ", link: "/" },
              { name: "師資服務 >", link: "/teacher" },
              { name: "師資列表 >", link: "/teacher/list" },
              { name: "師資介紹" },
            ]}
          />

          <Profile />
          {/* <SocialLinks /> */}
          <div className={styles.profile}>
            <div className="m-5 row">
              <div className="">
                <ToggleButtons onRadioChange={handleRadioChange} />
              </div>
              <div className="col-7">
                {/* {selectedTab === "experience" && <Experience />}
            {selectedTab === "courses" && <Publications />} */}
              </div>
            </div>
          </div>
          <OtherCourses name="優良師資..." />
          <OtherCourses name="優良課程..." />
        </div>
      </div>
    </>
  );
};

export default App;
