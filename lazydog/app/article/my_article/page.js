'use client'

import { useState, useRef } from 'react'
import { Button, Modal, Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './page.module.css'
import { usePhotoUpload } from '@/hooks/usePhotoUpload'
import { useRouter } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Link from 'next/link'

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
                  <div
                    className={`${styles.articleHisHieght} row my-3 `}
                    style={{ backgroundColor: 'white', width: '100%' }}
                  >
                    <img
                      className="col-md-4 "
                      src="/article_img/2df54e20-d6c0-11ee-beff-f3978ced.jpg"
                      alt=""
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="col-md-8">
                      <div className="row h-100">
                        <div className="col-md-10 py-2">
                          <div className={`${styles.linkheight}`}>
                            <Link
                              className={`${styles.link}`}
                              href="/article/article_detail"
                            >
                              為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的 6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6 大好處;
                            </Link>
                          </div>
                          <p
                            className="mt-2"
                            style={{ fontSize: '16px', color: 'gray' }}
                          >
                            2025-01-01
                          </p>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                              className={`${styles.customToggle}`} // 自定義樣式
                            >
                              <i className="bi bi-three-dots"></i>{' '}
                              {/* 三點圖標 */}
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                              className={`${styles.customDropdownMenu}`}
                              style={{
                                width: '25px',
                                backgroundColor: '#FFF6E8',
                              }}
                            >
                              <Dropdown.Item
                                className={`${styles.item}`}
                                href="#"
                              >
                                檢視
                              </Dropdown.Item>
                              <Dropdown.Item
                                className={`${styles.item}`}
                                href="#"
                              >
                                編輯
                              </Dropdown.Item>
                              <Dropdown.Item
                                className={`${styles.item}`}
                                onClick={handleShow}
                              >
                                刪除
                              </Dropdown.Item>{' '}
                              {/* 點擊刪除觸發 Modal */}
                            </Dropdown.Menu>
                          </Dropdown>

                          {/* Modal  */}
                          <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>確認刪除</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              你確定要刪除嗎？此操作無法復原。
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                取消
                              </Button>
                              <Button variant="danger" onClick={handleDelete}>
                                確認刪除
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.articleHisHieght} row my-3 `}
                    style={{ backgroundColor: 'white', width: '100%' }}
                  >
                    <img
                      className="col-md-4 "
                      src="/article_img/2df54e20-d6c0-11ee-beff-f3978ced.jpg"
                      alt=""
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="col-md-8">
                      <div className="row h-100">
                        <div className="col-md-10 py-2">
                          <div className={`${styles.linkheight}`}>
                            <Link
                              className={`${styles.link}`}
                              href="/article/article_detail"
                            >
                              為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的 6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6 大好處;
                            </Link>
                          </div>
                          <p
                            className="mt-2"
                            style={{ fontSize: '16px', color: 'gray' }}
                          >
                            2025-01-01
                          </p>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                              className={`${styles.customToggle}`} // 自定義樣式
                            >
                              <i className="bi bi-three-dots"></i>{' '}
                              {/* 三點圖標 */}
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                              className={`${styles.customDropdownMenu}`}
                              style={{
                                width: '25px',
                                backgroundColor: '#FFF6E8',
                              }}
                            >
                              <Dropdown.Item
                                className={`${styles.item}`}
                                href="#"
                              >
                                檢視
                              </Dropdown.Item>
                              <Dropdown.Item
                                className={`${styles.item}`}
                                href="#"
                              >
                                編輯
                              </Dropdown.Item>
                              <Dropdown.Item
                                className={`${styles.item}`}
                                onClick={handleShow}
                              >
                                刪除
                              </Dropdown.Item>{' '}
                              {/* 點擊刪除觸發 Modal */}
                            </Dropdown.Menu>
                          </Dropdown>

                          {/* Modal  */}
                          <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>確認刪除</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              你確定要刪除嗎？此操作無法復原。
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                取消
                              </Button>
                              <Button variant="danger" onClick={handleDelete}>
                                確認刪除
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.articleHisHieght} row my-3 `}
                    style={{ backgroundColor: 'white', width: '100%' }}
                  >
                    <img
                      className="col-md-4 "
                      src="/article_img/2df54e20-d6c0-11ee-beff-f3978ced.jpg"
                      alt=""
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="col-md-8">
                      <div className="row h-100">
                        <div className="col-md-10 py-2">
                          <div className={`${styles.linkheight}`}>
                            <Link
                              className={`${styles.link}`}
                              href="/article/article_detail"
                            >
                              為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的 6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6 大好處;
                            </Link>
                          </div>
                          <p
                            className="mt-2"
                            style={{ fontSize: '16px', color: 'gray' }}
                          >
                            2025-01-01
                          </p>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                              className={`${styles.customToggle}`} // 自定義樣式
                            >
                              <i className="bi bi-three-dots"></i>{' '}
                              {/* 三點圖標 */}
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                              className={`${styles.customDropdownMenu}`}
                              style={{
                                width: '25px',
                                backgroundColor: '#FFF6E8',
                              }}
                            >
                              <Dropdown.Item
                                className={`${styles.item}`}
                                href="#"
                              >
                                檢視
                              </Dropdown.Item>
                              <Dropdown.Item
                                className={`${styles.item}`}
                                href="#"
                              >
                                編輯
                              </Dropdown.Item>
                              <Dropdown.Item
                                className={`${styles.item}`}
                                onClick={handleShow}
                              >
                                刪除
                              </Dropdown.Item>{' '}
                              {/* 點擊刪除觸發 Modal */}
                            </Dropdown.Menu>
                          </Dropdown>

                          {/* Modal  */}
                          <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>確認刪除</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              你確定要刪除嗎？此操作無法復原。
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                取消
                              </Button>
                              <Button variant="danger" onClick={handleDelete}>
                                確認刪除
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.articleHisHieght} row my-3 `}
                    style={{ backgroundColor: 'white', width: '100%' }}
                  >
                    <img
                      className="col-md-4 "
                      src="/article_img/2df54e20-d6c0-11ee-beff-f3978ced.jpg"
                      alt=""
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="col-md-8">
                      <div className="row h-100">
                        <div className="col-md-10 py-2">
                          <div className={`${styles.linkheight}`}>
                            <Link
                              className={`${styles.link}`}
                              href="/article/article_detail"
                            >
                              為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的 6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6
                              大好處;為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的
                              6 大好處;
                            </Link>
                          </div>
                          <p
                            className="mt-2"
                            style={{ fontSize: '16px', color: 'gray' }}
                          >
                            2025-01-01
                          </p>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                              className={`${styles.customToggle}`} 
                            >
                              <i className="bi bi-three-dots"></i>{' '}
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                              className={`${styles.customDropdownMenu}`}
                              style={{
                                width: '25px',
                                backgroundColor: '#FFF6E8',
                              }}
                            >
                              <Dropdown.Item
                                className={`${styles.item}`}
                                href="#"
                              >
                                檢視
                              </Dropdown.Item>
                              <Dropdown.Item
                                className={`${styles.item}`}
                                href="#"
                              >
                                編輯
                              </Dropdown.Item>
                              <Dropdown.Item
                                className={`${styles.item}`}
                                onClick={handleShow}
                              >
                                刪除
                              </Dropdown.Item>{' '}
                              {/* 點擊刪除觸發 Modal */}
                            </Dropdown.Menu>
                          </Dropdown>

                          {/* Modal  */}
                          <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>確認刪除</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              你確定要刪除嗎？此操作無法復原。
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                取消
                              </Button>
                              <Button variant="danger" onClick={handleDelete}>
                                確認刪除
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
