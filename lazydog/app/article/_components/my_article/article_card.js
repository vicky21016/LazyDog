"use client"

import styles from "./page.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from "react";
import Link from "next/link";
import { Button, Modal, Dropdown } from 'react-bootstrap' 

export default function MoreCard() {
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
        </>
    )
}


