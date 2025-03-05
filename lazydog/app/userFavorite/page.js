"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/components/layout/header";
import MyMenu from "@/app/components/layout/myMenu";
import {
  getHotelFavorites,
  removeHotelFavorite,
} from "@/services/allFavoriteService";
import { useAuth } from "@/hooks/use-auth";

export default function UserFavoritePage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("User Data:", user);
    if (user?.id) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await getHotelFavorites();

      if (response.success) {
        setFavorites([...response.data.data]);
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("State 變更後的 favorites:", favorites);
  }, [favorites]);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      const response = await removeHotelFavorite(favoriteId);
      if (response.success) {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((item) => item.id !== favoriteId)
        );
      }
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          {/* 左側選單 */}
          <div className="d-none d-md-block col-md-3">
            <MyMenu />
          </div>

          {/* 右側內容 */}
          <div className="col-md-9">
            <div className="d-flex justify-content-between my-2">
              <h1 className="text-center">我的最愛</h1>
            </div>

            {loading ? (
              <p className="text-center">載入中...</p>
            ) : (
              <div className="row">
                {favorites.length > 0 ? (
                  favorites.map((item) => {
                    return (
                      <div className="col-md-4" key={item.id}>
                        <div
                          className="card position-relative mb-4 shadow-sm"
                          style={{ overflow: "hidden", borderRadius: "10px" }}
                        >
                          {/* 右上角 X 按鈕 */}
                          <button
                            className="btn btn-danger position-absolute"
                            style={{
                              right: "10px",
                              top: "10px",
                              zIndex: 10,
                              width: "30px",
                              height: "30px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 0,
                              borderRadius: "50%",
                              fontSize: "16px",
                            }}
                            onClick={() => handleRemoveFavorite(item.id)}
                          >
                            ✖
                          </button>

                          {/* 圖片 */}
                          <img
                            src={item.main_image_url || "/lazydog.png"}
                            className="card-img-top"
                            alt={item.name || "飯店圖片"}
                            onError={(e) => (e.target.src = "/lazydog.png")}
                            style={{ height: "200px", objectFit: "cover" }}
                          />

                          <div className="card-body text-center">
                            <h5 className="card-title">{item.name}</h5>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center">目前沒有收藏的旅館。</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
