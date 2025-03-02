"use client";
import React, { useState, useEffect } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import couponStyles from "../../../styles/modules/userCoupon.module.css";
import { getCouponss, claimCouponByCode } from "@/services/couponService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Header from "../../components/layout/header";
import MyMenu from "../../components/layout/myMenu";

export default function ProfileCouponPage(props) {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = user?.id;
  const router = useRouter();
  const [couponCode, setCouponCode] = useState("");

  // 分類標籤
  const categories = ["已使用", "未使用", "逾期", "全部"];
  const [selectedCategory, setSelectedCategory] = useState("全部");

  // 對應後端的 `coupon_usage.status`
  const statusMapping = {
    "全部": "all",
    "已使用": "used",
    "未使用": "claimed",
    "逾期": "expired"
  };

  useEffect(() => {
    if (!userId) return;

    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const filter = statusMapping[selectedCategory] || "all";
        const response = await getCouponss(filter, "all");

        if (response && response.success) {
          const mappedCoupons = response.data.map((coupon) => ({
            id: coupon.id,
            status:
              coupon.status === "claimed"
                ? "未使用"
                : coupon.status === "used"
                ? "已使用"
                : "逾期",
            price: coupon.value,
            description: coupon.name,
            expiry: `${new Date(coupon.start_time).toLocaleDateString()} - ${new Date(
              coupon.end_time
            ).toLocaleDateString()}`
          }));

          setCoupons(mappedCoupons);
        } else {
          setError(response?.error || "獲取優惠券失敗，請稍後再試");
        }
      } catch (error) {
        setError("獲取優惠券失敗，請稍後再試");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [userId, selectedCategory]);

  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };

  if (loading) {
    return <p>加載中...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="d-none d-md-block col-md-3">
            <MyMenu />
          </div>
          <div className="col-12 col-md-9 coupon-section">
            <h5 className="mb-3">我的優惠券</h5>

            <div className="suFeatureLinks mb-3">
              <a
                className={couponStyles.suFeatureLinks1}
                onClick={() => changepage("fontcoupon")}
                style={{ cursor: "pointer" }}
              >
                領取免運券
              </a>
              <a
                className={couponStyles.suFeatureLinks2}
                onClick={() => changepage("profileCouponStatus")}
                style={{ cursor: "pointer" }}
              >
                查看歷史紀錄
              </a>
            </div>

            {/* 優惠券分類標籤 */}
            <ul className={`nav ${couponStyles.suNavTabs}`}>
              {categories.map((category) => (
                <li key={category} className="nav-item">
                  <a
                    className={`nav-link ${
                      selectedCategory === category ? "active" : ""
                    } ${couponStyles.suNavLink}`}
                    href="#"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>

            {/* 優惠券清單 */}
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className={`coupon-card ${couponStyles.suCouponCard} ${
                  styles[coupon.status]
                }`}
              >
                <span className={`price ${couponStyles.suPrice}`}>
                  {coupon.price}
                </span>
                <div className={`details ${couponStyles.suDetails}`}>
                  <p>
                    <strong>{coupon.description}</strong>
                  </p>
                  <p className="text-muted">有效期限: {coupon.expiry}</p>
                  {coupon.status === "逾期" && (
                    <p className={couponStyles.suExpired}>⚠ 已逾期</p>
                  )}
                  {coupon.status === "已使用" && (
                    <p className={couponStyles.suUsed}>⚠ 已使用</p>
                  )}
                </div>
                {coupon.status === "未使用" && (
                  <div className={couponStyles.suUnused}>尚未使用</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
