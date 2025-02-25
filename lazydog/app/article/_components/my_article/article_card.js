"use client";

import useArticle from "@/hooks/useArticle"; // 確保導入正確的 Hook
import { useState } from "react";
import styles from "../my_article/page.module.css";
import Link from "next/link";
import { Dropdown, Modal, Button } from "react-bootstrap";

export default function MyCard({ id, title, cover_image, created_at }) {
    const { deleteArticle } = useArticle(); // 取得刪除文章的函數
    const [showModal, setShowModal] = useState(false);

    // 控制 Modal 的顯示與隱藏
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // 處理刪除操作
    const handleDelete = async () => {
        try {
            await deleteArticle(id); // 調用刪除 API
            handleClose(); // 關閉 Modal
            window.location.reload()
        } catch (error) {
            console.error("刪除文章失敗:", error);
        }
    };

    return (
        <>
            <div className={`${styles.articleHisHieght} row my-3`} style={{ backgroundColor: 'white', width: '100%' }}>
                <img className="col-md-4" src={cover_image} alt="" style={{ maxHeight:'193.96px',objectFit: 'cover' }} />
                <div className="col-md-8">
                    <div className="row h-100">
                        <div className="col-md-10 py-2">
                            <div className={`${styles.linkheight}`}>
                                <Link className={`${styles.link}`} href={{ pathname: `/article/detail/${id}`, query: { list: "true" } }}>
                                    {title}
                                </Link>
                            </div>
                            <p className="mt-2" style={{ fontSize: '16px', color: 'gray' }}>{created_at}</p>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic" className={`${styles.customToggle}`}>
                                    <i className="bi bi-three-dots"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={`${styles.customDropdownMenu}`} style={{ width: '25px', backgroundColor: '#FFF6E8' }}>
                                    <Dropdown.Item className={`${styles.item}`} href="#">
                                    <Link
                                    className={`${styles.link2}`}
                                    href={{ pathname: `/article/detail/${id}`, query: { list: "true" } }}
                                    >檢視
                                    </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item className={`${styles.item}`} href="#"><Link
                                    className={`${styles.link2}`}
                                    href={{ pathname: `/article/update/${id}`, query: { list: "true" } }}
                                    >編輯
                                    </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item className={`${styles.item}`} onClick={handleShow}>刪除</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* Modal 確認刪除 */}
                            <Modal show={showModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>確認刪除</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>你確定要刪除嗎？此操作無法復原。</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>取消</Button>
                                    <Button variant="danger" onClick={handleDelete}>確認刪除</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}