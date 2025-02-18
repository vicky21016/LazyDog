"use client";
import { useRef } from "react";

export const usePhotoUpload = (
  defaultAvatar = "/images/hotel/hotel-images/page-image/default-avatar.png"
) => {
  const fileInputRef = useRef(null);
  const avatarRef = useRef(null);

  const uploadPhoto = () => {
    fileInputRef.current.click();
  };

  const fileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (avatarRef.current) {
          avatarRef.current.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const resresponse = await fetch(
          "http://localhost:5000/api/upload-hotel-image",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.filename) {
          console.log("圖片上傳成功:", data.filename);
        }
      } catch (error) {
        console.error("圖片上船失敗", error);
      }
    }
  };

  const deletePhoto = () => {
    if (avatarRef.current) {
      avatarRef.current.src = defaultAvatar;
    }
  };

  return {
    fileInputRef,
    avatarRef,
    uploadPhoto,
    fileChange,
    deletePhoto,
  };
};
