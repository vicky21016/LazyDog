'use client'

import { useState, useEffect } from "react";

import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import Breadcrumb from "../components/teacher/breadcrumb";
import styles from "./fav.module.css"

export default function MenuFav() {
  return (
    <>
      <Header />
      <h3 className={`text-center ${styles['text']}`}>Favorites</h3>
      <div className="lumi-all-wrapper">
          <Breadcrumb
            paths={[
              { name: "首頁 > ", link: "/" },
              { name: "蒐藏列表" },
            ]}
          />
          <h5>蒐藏商品</h5>
          <h5>蒐藏老師</h5>
          <h5>蒐藏課程</h5>
          <h5>蒐藏旅館</h5>
          <h6 className="mt-5">看看其他精選商品...</h6>
       </div>
       {/* <Footer/> */}
    </>
  );
}
