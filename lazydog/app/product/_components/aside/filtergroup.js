"use client";

import React, { useEffect, useState } from "react";
import styles from "./aside.module.css";

export default function FilterGroup({
  category = {},
  name = {},
  keyword = {},
  setKeyword = () => {},
  setClearSearch = () => {},
  isChecked = true,
  setIsChecked = () => {},
  newUrl = "",
  changeUrl = () => {},
}) {
  const [showMore, setShowMore] = useState(false);
  const categorys = category;
  const categoryName = {};
  if (categorys) {
    categorys.forEach((v) => {
      if (!categoryName[v.class]) {
        categoryName[v.class] = [];
      }
      categoryName[v.class].push(v.name);
    });
  }
  // console.log(categoryName[name]);
  const categoryCheckbox = {};
  categoryName[name].forEach((v) => {
    categoryCheckbox[v] = false;
  });

  const [checkedItems, setCheckedItems] = useState(categoryCheckbox);

  const handleInputChange = () => {
    setCheckedItems((prev) => {
      const newCategoryCheckbox = Object.keys(prev).reduce((acc, v) => {
        acc[v] = false;
        return acc;
      }, {});
      return newCategoryCheckbox;
    });
    // setCheckedItems((prev) => {
    //   const newCategoryCheckbox = { ...prev };
    //   Object.keys(prev).forEach((v) => {
    //     if (prev[v] === true) {
    //       newCategoryCheckbox[v] = false;
    //       // 創建並觸發 change 事件
    //       const event = new Event("change", { bubbles: true });
    //       const inputElement = document.getElementById(`checkbox-${v}`);
    //       if (inputElement) {
    //         inputElement.dispatchEvent(event);
    //       }
    //     }
    //   });
    //   return newCategoryCheckbox;
    // });
  };

  useEffect(() => {
    if (isChecked == false) {
      handleInputChange();
      changeUrl(newUrl);
    }
    setIsChecked(true);
    console.log(checkedItems);
  }, [isChecked]);

  return (
    <>
      <div className={styles.FilterGroup}>
        <h5 className={styles.FilterTitle}>{name}</h5>
        {categoryName[name].map((v, i) => {
          if (i < 3) {
            return (
              <div
                key={`Filter${i}`}
                className={`form-check ${styles.FormCheck}`}
              >
                <input
                  className={`form-check-input ${styles.FormCheckInput}`}
                  type="checkbox"
                  id={`checkbox-${v}`}
                  checked={checkedItems[v]}
                  onChange={(e) => {
                    setCheckedItems((prev) => ({
                      ...prev,
                      [v]: e.target.checked,
                    }));
                    setClearSearch("");
                    if (v == "保健品") {
                      const newKeyword = { ...keyword };
                      if (!checkedItems[v]) {
                        newKeyword[name].push("保健");
                      } else {
                        newKeyword[name] = newKeyword[name].filter(
                          (e) => e !== "保健"
                        );
                      }
                      setKeyword(newKeyword);
                    } else if (v == "寢具服飾") {
                      const newKeyword = { ...keyword };
                      if (!checkedItems[v]) {
                        newKeyword[name].push("乳牛,床窩,衣");
                      } else {
                        newKeyword[name] = newKeyword[name].filter(
                          (e) => e !== "乳牛,床窩,衣"
                        );
                      }
                      setKeyword(newKeyword);
                    } else if (v == "外出用品") {
                      const newKeyword = { ...keyword };
                      if (!checkedItems[v]) {
                        newKeyword[name].push("項圈,背帶,外出");
                      } else {
                        newKeyword[name] = newKeyword[name].filter(
                          (e) => e !== "項圈,背帶,外出"
                        );
                      }
                      setKeyword(newKeyword);
                    } else if (v == "除蟲醫藥") {
                      const newKeyword = { ...keyword };
                      if (!checkedItems[v]) {
                        newKeyword[name].push("驅蟲,除蚤,防蚤");
                      } else {
                        newKeyword[name] = newKeyword[name].filter(
                          (e) => e !== "驅蟲,除蚤,防蚤"
                        );
                      }
                      setKeyword(newKeyword);
                    } else if (v == "美容保養除臭") {
                      const newKeyword = { ...keyword };
                      if (!checkedItems[v]) {
                        newKeyword[name].push("護理,養護,抑菌,洗毛,臭");
                      } else {
                        newKeyword[name] = newKeyword[name].filter(
                          (e) => e !== "護理,養護,抑菌,洗毛,臭"
                        );
                      }
                      setKeyword(newKeyword);
                    } else if (v == "強效潔牙") {
                      const newKeyword = { ...keyword };
                      if (!checkedItems[v]) {
                        newKeyword[name].push("牙,口腔保健");
                      } else {
                        newKeyword[name] = newKeyword[name].filter(
                          (e) => e !== "牙,口腔保健"
                        );
                      }
                      setKeyword(newKeyword);
                    } else if (v == "骨骼保健") {
                      const newKeyword = { ...keyword };
                      if (!checkedItems[v]) {
                        newKeyword[name].push("肌肉,關節,骨骼,軟骨");
                      } else {
                        newKeyword[name] = newKeyword[name].filter(
                          (e) => e !== "肌肉,關節,骨骼,軟骨"
                        );
                      }
                      setKeyword(newKeyword);
                    } else if (v == "補充營養") {
                      const newKeyword = { ...keyword };
                      if (!checkedItems[v]) {
                        newKeyword[name].push("營養");
                      } else {
                        newKeyword[name] = newKeyword[name].filter(
                          (e) => e !== "營養"
                        );
                      }
                      setKeyword(newKeyword);
                    } else if (v == "心血管保健") {
                      const newKeyword = { ...keyword };
                      if (!checkedItems[v]) {
                        newKeyword[name].push("心臟,血");
                      } else {
                        newKeyword[name] = newKeyword[name].filter(
                          (e) => e !== "心臟,血"
                        );
                      }
                      setKeyword(newKeyword);
                    } else if (v == "牛肉") {
                      const newKeyword = { ...keyword };
                      if (!checkedItems[v]) {
                        newKeyword[name].push("牛肉,牛");
                      } else {
                        newKeyword[name] = newKeyword[name].filter(
                          (e) => e !== "牛肉,牛"
                        );
                      }
                      setKeyword(newKeyword);
                    } else {
                      const newKeyword = { ...keyword };
                      if (!checkedItems[v]) {
                        newKeyword[name].push(v);
                      } else {
                        newKeyword[name] = newKeyword[name].filter(
                          (e) => e !== v
                        );
                      }
                      setKeyword(newKeyword);
                    }
                  }}
                />
                <label className="form-check-label" htmlFor={v}>
                  {v}
                </label>
              </div>
            );
          }
        })}
        {showMore && (
          <>
            {categoryName[name].map((v, i) => {
              if (i >= 3) {
                return (
                  <div
                    key={`Filter${i}`}
                    className={`form-check ${styles.FormCheck}`}
                  >
                    <input
                      className={`form-check-input ${styles.FormCheckInput}`}
                      type="checkbox"
                      id={v}
                      checked={checkedItems[v]}
                      onChange={() => {
                        setCheckedItems((prev) => ({
                          ...prev,
                          [v]: e.target.checked,
                        }));
                        setClearSearch("");
                        if (v == "護膚毛髮保健") {
                          const newKeyword = { ...keyword };
                          if (!checkedItems[v]) {
                            newKeyword[name].push("皮膚,毛髮");
                          } else {
                            newKeyword[name] = newKeyword[name].filter(
                              (e) => e !== "皮膚,毛髮"
                            );
                          }
                          setKeyword(newKeyword);
                        } else if (v == "飲水餐具用品") {
                          const newKeyword = { ...keyword };
                          if (!checkedItems[v]) {
                            newKeyword[name].push("水,碗");
                          } else {
                            newKeyword[name] = newKeyword[name].filter(
                              (e) => e !== "水,碗"
                            );
                          }
                          setKeyword(newKeyword);
                        } else if (v == "泌尿管保健") {
                          const newKeyword = { ...keyword };
                          if (!checkedItems[v]) {
                            newKeyword[name].push("尿");
                          } else {
                            newKeyword[name] = newKeyword[name].filter(
                              (e) => e !== "尿"
                            );
                          }
                          setKeyword(newKeyword);
                        } else if (v == "骨骼保健") {
                          const newKeyword = { ...keyword };
                          if (!checkedItems[v]) {
                            newKeyword[name].push("肌肉,關節,骨骼,軟骨");
                          } else {
                            newKeyword[name] = newKeyword[name].filter(
                              (e) => e !== "肌肉,關節,骨骼,軟骨"
                            );
                          }
                          setKeyword(newKeyword);
                        } else {
                          const newKeyword = { ...keyword };
                          if (!checkedItems[v]) {
                            newKeyword[name].push(v);
                          } else {
                            newKeyword[name] = newKeyword[name].filter(
                              (e) => e !== v
                            );
                          }
                          setKeyword(newKeyword);
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor={v}>
                      {v}
                    </label>
                  </div>
                );
              }
            })}
          </>
        )}
        {categoryName[name].length > 3 && (
          <span
            className={styles.ShowMore}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "收起 ▲" : "顯示全部 ▼"}
          </span>
        )}
      </div>
    </>
  );
}
