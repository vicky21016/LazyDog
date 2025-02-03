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

  const fileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (avatarRef.current) {
          avatarRef.current.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
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
