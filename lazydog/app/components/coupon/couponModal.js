"use client";

import styles from "../../../styles/modules/fontCoupon.module.css";

export default function CouponModal({ selectedCoupon }) {
  return (
    <div
      className="modal fade"
      id="couponModal"
      tabIndex="-1"
      aria-labelledby="couponModalLabel"
      aria-hidden={true}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content animate__bounceIn ${styles.suModalContent}`}>
          <div className="modal-header bg-warning">
            <h5 className="modal-title fw-bold" id="couponModalLabel">
              🎉 領取優惠券成功！
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-center">
            <div className={styles.suSuccessAnimation}>
              <div className={styles.suCheckmark}></div>
            </div>
            <p className="fs-5 fw-bold text-primary">
              {selectedCoupon ? selectedCoupon.name : "優惠券名稱"}
            </p>
            <p className={`text-danger ${styles.suCouponCode}`}>
              優惠券代碼：{selectedCoupon ? selectedCoupon.code : "XXXXXX"}
            </p>
            <p className="text-muted">
              有效期限：{selectedCoupon ? selectedCoupon.expiry_date : "2025/12/31"}
            </p>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="btn btn-success" data-bs-dismiss="modal">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
