"use client";

import React, { useState } from "react";
import styles from "../../teacher/list/list.module.css";
import Link from "next/link";

export default function Filter() {

  return (
    <aside className={`mt-4 ${styles["pdFilter"]}`}>
      <table className={styles.pdFilterTable}>
        <thead>
          <tr>
            <td className={`${styles.tdTable} ${styles.searchTable}`}>
              <img src="/product/font/search.png" alt="" />
              <input
                className={styles.searchP}
                type="text"
                placeholder="搜尋商品"
                
              />
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.menuTable}`}>
              <h5 className="my-3">課程類別</h5>
              <img src="./img/font/down.png" alt="" />
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="train" type="checkbox" />
              <label htmlFor="train">寵物訓練</label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="eat" type="checkbox" />
              <label htmlFor="eat" className={styles.checkboxLabel}>
                寵膳食育
              </label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="salon" type="checkbox" />
              <label htmlFor="salon" className={styles.checkboxLabel}>
                寵物美容
              </label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="beef" type="checkbox" />
              <label htmlFor="beef" className={styles.checkboxLabel}>
                寵物照護
              </label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="bussiness" type="checkbox" />
              <label htmlFor="bussiness" className={styles.checkboxLabel}>
                商業思維與專業培訓
              </label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.menuTable}`}>
              <h5 className="my-3">老師性別</h5>
              <img src="./img/font/down.png" alt="" />
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="male" type="checkbox" />
              <label htmlFor="male" className={styles.checkboxLabel}>
                男
              </label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="female" type="checkbox" />
              <label htmlFor="female" className={styles.checkboxLabel}>
                女
              </label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <button className={styles.clear} >
                清除搜尋
              </button>
            </td>
          </tr>
        </thead>
      </table>
      {/* <div className={styles.con1}>廣告</div> */}
      <figure>
        <Link href="/product/list">
          <img
            src="/product/DM/DM_aside.png"
            alt="廣告"
            className="img-fluid"
          />
        </Link>
      </figure>
    </aside>
  );
}
