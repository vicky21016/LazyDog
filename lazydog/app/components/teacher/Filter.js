"use client";

import React, { useState, useEffect } from "react";
import styles from "../../teacher/list/list.module.css";
import Link from "next/link";

export default function Filter({ onFilterChange }) {

  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);

  const categories = [
    { id: "train", label: "寵物訓練" },
    { id: "eat", label: "寵膳食育" },
    { id: "salon", label: "寵物美容" },
    { id: "beef", label: "寵物照護" },
    { id: "bussiness", label: "商業思維與專業培訓" },
  ];

  const genders = [
    { id: "male", label: "男", value:1 },
    { id: "female", label: "女",value:2 },
  ];

  // 處理分類選擇
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // 處理性別選擇
  const handleGenderChange = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  // 清除篩選
  const handleClearFilters = () => {
    setSearchText("");
    setSelectedCategories([]);
    setSelectedGenders([]);
    onFilterChange([], []);
  };

  // 當篩選條件改變時，通知父元件
  useEffect(() => {
    onFilterChange(selectedCategories, selectedGenders);
  }, [selectedCategories, selectedGenders]);

  
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
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.menuTable}`}>
              <h5 className="my-3">課程類別</h5>
              <img src="./img/font/down.png" alt="" />
            </td>
          </tr>
          {/* <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="train" type="checkbox" />
              <label htmlFor="train">寵物訓練</label>
            </td>
          </tr> */}
           {categories.map((category) => (
            <tr key={category.id}>
              <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
                <input
                  id={category.id}
                  type="checkbox"
                  checked={selectedCategories.includes(category.label)}
                  onChange={() => handleCategoryChange(category.label)}
                />
                <label htmlFor={category.id} className={styles.checkboxLabel}>
                  {category.label}
                </label>
              </td>
            </tr>
          ))}
          {/* <tr>
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
          </tr> */}
          <tr>
            <td className={`${styles.tdTable} ${styles.menuTable}`}>
              <h5 className="my-3">老師性別</h5>
              <img src="./img/font/down.png" alt="" />
            </td>
          </tr>
          {/* <tr>
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
          </tr> */}
           {genders.map((gender) => (
            <tr key={gender.id}>
              <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
                <input
                  id={gender.id}
                  type="checkbox"
                  checked={selectedGenders.includes(gender.value)}
                  onChange={() => handleGenderChange(gender.value)}
                />
                <label htmlFor={gender.id} className={styles.checkboxLabel}>
                  {gender.label}
                </label>
              </td>
            </tr>
           ))}
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <button className={styles.clear} onClick={handleClearFilters}>
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
