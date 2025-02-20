"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Header from "../components/layout/header";
import MyMenu from "../components/layout/myMenu";
import Input from "../components/forms/Input";
import styles from "./menu.module.css";
import style from "../../styles/modules/menu.module.css"
// import { auth, signOut, onAuth } from "./firebase";

export default function Menu() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { user, save } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    nickname: "",
    birthday: "",
    phone: "",
    email: "",
    location: "",
    city: "",
    district: "",
    road: "",
    section: "",
    lane: "",
    number: "",
    floor: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCancel = (e) => {
    setFormData({
      name: user?.name || "",
      gender: user?.gender || "",
      nickname: user?.nickname || "",
      birthday: user?.birthday || "",
      phone: user?.phone || "",
      email: user?.email || "",
      location: user?.location || "",
      city: user?.city || "",
      district: user?.district || "",
      road: user?.road || "",
      section: user?.section || "",
      lane: user?.lane || "",
      number: user?.number || "",
      floor: user?.floor || "",
    });
    router.push("/pages");
  };
  const handleSubmit = async (e) => {
    console.log(user.id);

    e.preventDefault();

    try {
      await save(
        formData.name,
        formData.email,
        formData.gender,
        formData.birthday,
        formData.phone
      );
    } catch (error) {
      alert("更新失敗");
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setCheckingAuth(false);
      setFormData({
        name: user.name || "",
        gender: user.gender || "",
        nickname: user.nickname || "",
        birthday: user.birthday || "",
        phone: user.phone || "",
        email: user.email || "",
        location: user.location || "",
        city: user.city || "",
        district: user.district || "",
        road: user.road || "",
        section: user.section || "",
        lane: user.lane || "",
        number: user.number || "",
        floor: user.floor || "",
      });
    }
  }, [user]);

  if (checkingAuth) {
    return (
      <div className={styles.container2}>
        <div className={styles.loader27}></div>
      </div>
    );
  }
  const formattedDate = formData.birthday
    ? new Date(formData.birthday).toISOString().split("T")[0]
    : "";

  return (
    <>
      <Header />
      <div className="row">
      <div className={`${style.wrapper}`}>
        <div className="col-3">
        <MyMenu />
        </div>
        <div className="col-9">
        <div className={`${styles["container"]}`}>
          <h4 className={`mb-4 ${styles["information"]}`}>基本資料</h4>
          <form onSubmit={handleSubmit} className={styles["form-container"]}>
            <div className={styles.formGroup}>
              <h6>
                姓名<span className={`${styles["important"]}`}> *</span>
              </h6>
              <Input
                name="name"
                placeholder="姓名"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <h6>
                性別<span className={`${styles["important"]}`}> *</span>
              </h6>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={styles["select"]}
                required
              >
                <option value="">請選擇性別</option>
                <option value="male">男</option>
                <option value="female">女</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <h6>
                生日<span className={`${styles["important"]}`}> *</span>
              </h6>
              <Input
                type="date"
                name="birthday"
                value={formattedDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className={`${styles.formGroup} ${styles.phone}`}>
              <h6>
                聯絡電話<span className={`${styles["important"]}`}> *</span>
              </h6>
              <Input
                name="phone"
                placeholder="聯絡電話"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <h6>
                聯絡信箱<span className={`${styles["important"]}`}> *</span>
              </h6>
              <Input
                type="email"
                name="email"
                placeholder="聯絡信箱"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <h6>
                所在地區<span className={`${styles["important"]}`}> *</span>
              </h6>
              <Input
                name="location"
                placeholder="所在地區"
                value={formData.location}
                onChange={handleChange}
              />

              <div className={styles.addressRow}>
                <select
                  name="city"
                  className={`mb-3 me-2 ${styles["select"]}`}
                  onChange={handleChange}
                  value={formData.city}
                >
                  <option>縣/市</option>
                  <option>台北市</option>
                  <option>新北市</option>
                </select>
                <select
                  name="district"
                  className={`${styles["select"]}`}
                  onChange={handleChange}
                  value={formData.district}
                >
                  <option>街/區</option>
                </select>
                <Input
                  name="road"
                  placeholder="路"
                  value={formData.road}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.addressRow}>
                <Input
                  name="section"
                  placeholder="段"
                  value={formData.section}
                  onChange={handleChange}
                />
                <Input
                  name="lane"
                  placeholder="巷/弄"
                  value={formData.lane}
                  onChange={handleChange}
                />
                <Input
                  name="number"
                  placeholder="號"
                  value={formData.number}
                  onChange={handleChange}
                />
                <Input
                  name="floor"
                  placeholder="樓"
                  value={formData.floor}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="button"
              className={styles.exStore}
              onClick={handleCancel}
            >
              取消
            </button>
            <button type="submit" className={styles.store}>
              儲存
            </button>
          </form>
        </div>
        </div>
      </div>
      </div>
      </>
  );
}
