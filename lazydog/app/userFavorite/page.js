"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/components/layout/header";
import MyMenu from "@/app/components/layout/myMenu";
import {
  getProductFavorites,
  deleteProductFavorite,
  getHotelFavorites,
  removeHotelFavorite,
  ById,
} from "@/services/allFavoriteService";
import { useAuth } from "@/hooks/use-auth";
import Bread from "../components/teacher/breadcrumb";
import styles from "../../styles/modules/operatorCamera.module.css"

export default function UserFavoritePage() {
  const { user } = useAuth();
  const [productFavorites, setProductFavorites] = useState([]); // 商品收藏
  const [hotelFavorites, setHotelFavorites] = useState([]); // 旅館收藏
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("User Data:", user);
    if (user?.id) {
      fetchFavorites();
    }
  }, [user]);

  // 獲取商品詳情
  const fetchProductDetails = async (productFavorites) => {
    try {
      const productsWithDetails = await Promise.all(
        productFavorites.map(async (fav) => {
          const productDetail = await ById(fav.productID_list); 
          console.log("商品詳情 API 回應:", productDetail);
          return { ...fav, ...productDetail.data };
        })
      );
      setProductFavorites(productsWithDetails);
    } catch (error) {
      console.error("獲取商品詳細資訊失敗:", error);
    }
  };

  // 獲取所有收藏資料
  const fetchFavorites = async () => {
    try {
      setLoading(true);

      // 取得旅館收藏
      const hotelResponse = await getHotelFavorites();
      console.log("旅館收藏 API 回應:", hotelResponse); 

      if (hotelResponse.success && Array.isArray(hotelResponse.data.data)) {
        console.log("更新 hotelFavorites:", hotelResponse.data.data);
        setHotelFavorites([...hotelResponse.data.data]);
      } else {
        console.log("未獲取到旅館收藏");
      }

      // 取得商品收藏
      const productResponse = await getProductFavorites();
      console.log("商品收藏 API 回應:", productResponse);

      if (productResponse.success && Array.isArray(productResponse.data)) {
        fetchProductDetails(productResponse.data);
      } else {
        console.log("未獲取到商品收藏");
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  // 移除商品收藏
  const handleRemoveProductFavorite = async (favoriteId) => {
    try {
      const response = await deleteProductFavorite(favoriteId);
      if (response.success) {
        setProductFavorites((prevFavorites) =>
          prevFavorites.filter((item) => item.id !== favoriteId)
        );
      }
    } catch (error) {
      console.error("Failed to remove product favorite:", error);
    }
  };

  // 移除旅館收藏
  const handleRemoveHotelFavorite = async (favoriteId) => {
    try {
      const response = await removeHotelFavorite(favoriteId);
      if (response.success) {
        setHotelFavorites((prevFavorites) =>
          prevFavorites.filter((item) => item.id !== favoriteId)
        );
      }
    } catch (error) {
      console.error("Failed to remove hotel favorite:", error);
    }
  };

  useEffect(() => {
    console.log("更新後的 productFavorites:", productFavorites);
  }, [productFavorites]);

  useEffect(() => {
    console.log("更新後的 hotelFavorites:", hotelFavorites);
  }, [hotelFavorites]);

  return (
    <>
      <Header />
      <div className={`container ${styles.wrapper}`}>
      <Bread
          links={[
            { label: "首頁 ", href: "/" },

            {
              label: "個人資料",
              href: "/pages",
              active: true,
            },
          ]}
        />
        <div className="mt-4 row">
          {/* 左側選單 */}
          
            <MyMenu />
          

          {/* 右側內容 */}
          <div className="col-md-9">
            <div className="d-flex justify-content-between my-2">
              <h4 className="text-center mb-4">我的最愛</h4>
            </div>

            {loading ? (
              <p className="text-center">載入中...</p>
            ) : (
              <>
                {/* 商品收藏 */}
                <div className="mb-5">
                  <h6>商品收藏</h6>
                  <div className="row">
                    {productFavorites.length > 0 ? (
                      productFavorites.map((item) => (
                        <div className="col-md-4" key={item.id}>
                          <div
                            className="card position-relative mb-4 shadow-sm"
                            style={{
                              overflow: "hidden",
                              borderRadius: "10px",
                            }}
                          >
                            {/* 移除按鈕 */}
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
                              onClick={() =>
                                handleRemoveProductFavorite(item.id)
                              }
                            >
                              ✖
                            </button>

                            {/* 商品圖片 */}
                            <img
                              src={item.image_url || "/lazydog.png"}
                              className="card-img-top"
                              alt={item.name || "商品圖片"}
                              onError={(e) => (e.target.src = "/lazydog.png")}
                              style={{ height: "200px", objectFit: "cover" }}
                            />

                            <div className="card-body text-center">
                              <h5 className="card-title">{item.name}</h5>
                              <p className="card-text">${item.price}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center">目前沒有收藏的商品。</p>
                    )}
                  </div>
                </div>

                {/* 旅館收藏 */}
                <div className="mb-5">
                  <h6>旅館收藏</h6>
                  <div className="row">
                    {hotelFavorites.length > 0 ? (
                      hotelFavorites.map((item) => (
                        <div className="col-md-4" key={item.id}>
                          <div
                            className="card position-relative mb-4 shadow-sm"
                            style={{
                              overflow: "hidden",
                              borderRadius: "10px",
                            }}
                          >
                            {/* 移除按鈕 */}
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
                              onClick={() =>
                                handleRemoveHotelFavorite(item.id)
                              }
                            >
                              ✖
                            </button>

                            {/* 旅館圖片 */}
                            <img
                              src={item.main_image_url || "/lazydog.png"}
                              className="card-img-top"
                              alt={item.name || "旅館圖片"}
                              onError={(e) => (e.target.src = "/lazydog.png")}
                              style={{ height: "200px", objectFit: "cover" }}
                            />

                            <div className="card-body text-center">
                              <h5 className="card-title">{item.name}</h5>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center">目前沒有收藏的旅館。</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}