"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import Header from "../../components/layout/header";
import MyMenu from "../../components/layout/myMenu";
import MyCard from '../_components/my_article/article_card'
export default function ProfileCouponPage(props) {
  const router = useRouter();
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");
  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
     <Header />
           <div className="container mt-5">
             <div className="row">
               {/* 左邊*/}
               <div className="d-none d-md-block col-md-3">
                 <MyMenu />
               </div>
          {/* 右側欄位 */}
          <div className="col-md-9">
            <div className="w-100 ">
              <div>
                <div className="d-flex justify-content-between my-2">
                  <h4>我的文章</h4>
                  <button
                    style={{
                      border: 'none',
                      backgroundColor: '#FFBD00',
                      color: 'white',
                      borderRadius: '5px',
                    }}
                  >
                    <i className="bi bi-check-circle"></i> 發布文章
                  </button>
                </div>
                <div
                  className="py-1"
                  style={{
                    backgroundColor: '#EDEDED',
                    borderRadius: '5px',
                    height: '750px',
                    overflowY: 'scroll',
                  }}
                >
                <MyCard/>
                <MyCard/>
                <MyCard/>
                <MyCard/>
                <MyCard/> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
