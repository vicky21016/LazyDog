'use client'

import { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './page.module.css'
import { usePhotoUpload } from '@/hooks/usePhotoUpload'
import { useRouter } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'
import MyCard from '../_components/my_article/article_card'

export default function MyArticlePage(props) {
  const router = useRouter()
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload('/article_img/batman.jpg')
  const changepage = (path) => {
    if (path) {
      router.push(`/my_article/${path}`)
    }
  }
  const [showModal, setShowModal] = useState(false)

  // 控制 Modal 的顯示與隱藏
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  // 處理刪除操作
  const handleDelete = () => {
    handleClose()
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {/* 左側欄位 */}
          <div className="col-md-3">
            <div className="card p-3">
              <div className="text-center">
                <div className="position-relative d-inline-block">
                  <img
                    ref={avatarRef}
                    src="/article_img/batman.jpg"
                    alt="User Avatar"
                    className={`rounded-circle ${styles.suAvatarImg}`}
                  />

                  <div className={styles.dropdownItem}>
                    <button
                      className={`btn btn-light ${styles.suCameraIcon}`}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="/article_img/DownloadCamera.jpg"
                        alt="相機"
                        className={styles.suCameraIconImg}
                      />
                    </button>
                    <ul className={`dropdown-menu ${styles.suDropdownMenu}`}>
                      <li>
                        <button
                          className={`text-danger dropdown-item ${styles.suDropdownItem}`}
                          onClick={deletePhoto}
                        >
                          刪除照片
                        </button>
                      </li>
                      <li>
                        <label
                          onClick={uploadPhoto}
                          className={`dropdown-item ${styles.dropdownItem}`}
                        >
                          上傳照片
                        </label>
                        <input
                          type="file"
                          id="uploadPhoto"
                          accept="image/*"
                          className="d-none"
                          ref={fileInputRef}
                          onChange={fileChange}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <h5 className="mt-2">陳大方</h5>
                <p className="text-muted">165846hote@gmail.com</p>
                <button className="btn btn-outline-success btn-sm">
                  已認證
                </button>
              </div>
              <hr />
              <ul className="list-unstyled text-start">
                <li
                  className="py-2"
                  onClick={() => changepage('operatorDetail')}
                >
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="bi bi-person-fill me-2"></i>會員資料
                  </a>
                </li>
                <li
                  className="py-2"
                  onClick={() => changepage('operatorHotel')}
                >
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="bi bi-bag-check me-2"></i>訂單紀錄
                  </a>
                </li>
                <li
                  className="py-2"
                  onClick={() => changepage('profileCoupon')}
                >
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="bi bi-ticket-perforated me-2"></i>我的優惠券
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage('couponList')}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="bi bi-house-heart-fill me-2"></i>我的收藏
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage('couponList')}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="bi bi-card-list me-2"></i>我的文章
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage('couponList')}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="bi bi-hammer me-2"></i>修改密碼
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage('couponList')}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>登出
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
