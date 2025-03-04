"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./rate.module.css";
import StarGroup from "./stargroup";

import { useReviewsUpdate } from "@/hooks/product/use-reviews";

export default function Ratecard({
  rateNow = false,
  id = "",
  productID = "",
  user = "",
  img = "",
  rate = "",
  comment = "",
  goodNum = 0,
  date = "",
}) {
  const router = useRouter();
  const rateNum = rate.toString();
  const years = date.slice(0, 4);
  const months = date.slice(5, 7);
  const days = date.slice(8, 10);
  const [hover, setHover] = useState(false);
  const [good, setGood] = useState(false);
  const [rateUpdate, setRateUpdate] = useState(false);
  const [newRate, setNewRate] = useState(rateNum);
  const [deleteRate, setDeleteRate] = useState(false);
  const { formData, handleSubmit, reviewsChange } = useReviewsUpdate({
    id,
    productID,
    newRate,
    comment,
    setRateUpdate,
    deleteRate,
    setDeleteRate,
  });

  return (
    <div className={`${styles.RateCard}`}>
      {!rateUpdate && (
        <>
          <div className={styles.RateCardText}>
            <div className={styles.RateCardUser}>
              <button
                type="button"
                onClick={() => {
                  setTimeout(() => {
                    router.push("/pages");
                  }, 100);
                }}
              >
                <img src={`http://localhost:5000/auth/${img}`} alt="" />
                <h6>{user}</h6>
                <h6>{rateNow ? "(您)" : ""}</h6>
              </button>
              <div className={styles.StarGroup}>
                <StarGroup rate={rateNum} />
              </div>
            </div>
            <p>{comment}</p>
          </div>
          <div className={styles.RateCardBtnDate}>
            <div className={styles.RateCardGood}>
              <button
                className={styles.RateCardBtn}
                type="button"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => setGood(!good)}
              >
                <img
                  src={`/product/font/${
                    good || hover ? "good-fill" : "good"
                  }.png`}
                  alt=""
                />
              </button>
              <p>{goodNum}</p>
            </div>
            {rateNow && (
              <button
                className={styles.UpdateRateBtn}
                type="button"
                onClick={() => setRateUpdate(true)}
              >
                編輯評論
              </button>
            )}
            <p>
              {years} {months} {days}
            </p>
          </div>
        </>
      )}
      {rateUpdate && (
        <form onSubmit={handleSubmit}>
          <div className={styles.RateCardText}>
            <div className={styles.RateCardUser}>
              <button
                type="button"
                onClick={() => {
                  setTimeout(() => {
                    router.push("/pages");
                  }, 100);
                }}
              >
                <img src={`http://localhost:5000/auth/${img}`} alt="" />
                <h6>{user}</h6>
                <h6>{rateNow ? "(您)" : ""}</h6>
              </button>
              <div className={styles.StarGroup}>
                <p>評分更新：</p>
                <StarGroup
                  rateUpdate={rateUpdate}
                  rate={rateNum}
                  newRate={newRate}
                  setNewRate={setNewRate}
                />
              </div>
            </div>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={reviewsChange}
            />
          </div>
          <div className={styles.RateCardBtnDate}>
            <div style={{ width: "47.13px" }}>
              <button
                style={{ "white-space": "nowrap" }}
                type="button"
                className={styles.UpdateRateBtn}
                onClick={() => {
                  setDeleteRate(true);
                }}
              >
                刪除評論
              </button>
            </div>
            {rateNow && (
              <button type="submit" className={styles.UpdateRateBtn}>
                更新評論
              </button>
            )}
            <p>
              {years} {months} {days}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
