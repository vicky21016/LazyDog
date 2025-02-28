"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useHotel } from "@/hooks/useHotel";
import { useRouter } from "next/navigation";
import Header from "../../../components/layout/header";
import My from "../../../components/hotel/my";

export default function HotelDetailPage() {
  const router = useRouter();
  const { id } = useParams(); // 取得動態參數 `id`
  const { hotel } = useHotel(id); // 取得該旅館的詳細資訊

  const changepage = (path) => {
    router.push(`/hotel-coupon/${path}/${id}`); // 🔹 改成 `hotelEdit/${id}`
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          <My />
          <div className="col-md-9">
            <h5 className="mb-3">旅館資訊</h5>
            <div className="mb-3">
              <label className="form-label">旅館名稱</label>
              <input type="text" className="form-control" value={hotel.name} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">地址</label>
              <input type="text" className="form-control" value={`${hotel.county}${hotel.district}${hotel.address}`} readOnly />
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button type="button" className="btn btn-success btn-sm px-4" onClick={() => changepage("hotelList")}>
                返回
              </button>
              <button type="button" className="btn btn-warning btn-sm px-4" onClick={() => changepage("hotelEdit")}>
                編輯
              </button>
              <button type="button" className="btn btn-danger btn-sm px-4">
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
