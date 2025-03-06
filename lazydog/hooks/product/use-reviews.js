"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";

export function useReviewsUpdate({
  id = "",
  productID = "",
  newRate = 0,
  comment = "",
  setRateUpdate = () => {},
  deleteRate = false,
  setDeleteRate = () => {},
  mutate = () => {},
}) {
  const fetcher = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("資料要求失敗");
      return res.json();
    } catch (err) {
      console.error("資料要求失敗:", err);
      throw err;
    }
  };
  const reviewsAPI = id
    ? `http://localhost:5000/api/products/reviews?userID=${id}`
    : null;
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    error: reviewsError,
    mutate: reviewsMutate,
  } = useSWR(reviewsAPI, fetcher);
  const [formData, setFormData] = useState({
    userID: `${id}`,
    productID: productID,
    rating: newRate,
    comment: comment,
    isDeleted: 0,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    updateReviews(formData);
    setRateUpdate(false);
  };
  const reviewsChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    setFormData({
      ...formData,
      rating: newRate,
    });
  }, [newRate]);
  useEffect(() => {
    if (deleteRate) {
      const isConfirmed = confirm("您確定要刪除您的評論嗎？");
      if (isConfirmed) {
        setFormData({
          ...formData,
          isDeleted: 1,
        });
        setRateUpdate(false);
        setDeleteRate(false);
        alert("評論已刪除！");
      } else {
        setRateUpdate(false);
        setDeleteRate(false);
      }
    }
  }, [deleteRate]);
  useEffect(() => {
    if (formData.isDeleted === 1) {
      updateReviews(formData);
    }
  }, [formData]);

  async function updateReviews(form) {
    let methodType = "PATCH";
    if (reviewsData?.data) {
      if (
        !reviewsData?.data?.find(
          (v) => v.productID === productID && v.is_deleted == 0
        )
      ) {
        methodType = "POST";
      }
    }
    if (id > 0) {
      let API = "http://localhost:5000/api/products/reviews";
      const formData = new FormData();
      for (const key in form) {
        if (form.hasOwnProperty(key)) {
          formData.append(key, form[key]);
        }
      }
      try {
        const res = await fetch(API, {
          method: methodType,
          body: formData,
        });
        const result = await res.json();
        if (result.status != "success") throw new Error(result.message);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    }
    reviewsMutate();
    mutate();
  }

  return {
    formData,
    handleSubmit,
    reviewsChange,
  };
}
