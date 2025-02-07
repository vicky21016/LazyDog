'use client'

import { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaEllipsis, FaEye, FaEdit, FaTrash } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";


function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // 控制 Modal 顯示
  const dropdownRef = useRef(null);

  // 點擊按鈕切換下拉選單顯示
  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // 點擊外部時關閉下拉選單
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  document.addEventListener("click", handleClickOutside);

  // 處理刪除按鈕點擊，打開 Modal
  const handleDeleteClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  // 確認刪除邏輯
  const confirmDelete = () => {
    setShowModal(false);
    alert("項目已刪除！"); // 這裡可以改為 API 請求刪除資料
  };

  return (
    <>
      {/* 下拉選單 */}
      <div className="dropdown" ref={dropdownRef}>
        <a href="#" className="dropbtn" onClick={toggleDropdown}>
          <FaEllipsis />
        </a>

        {isOpen && (
          <div className="dropdown-content">
            <a href="#">
              <FaEye /> 檢視
            </a>
            <a href="#">
              <FaEdit /> 編輯
            </a>
            <a href="#" className="delete" onClick={handleDeleteClick}>
              <FaTrash /> 刪除
            </a>
          </div>
        )}
      </div>

      {/* 刪除確認 Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>確認刪除</Modal.Title>
        </Modal.Header>
        <Modal.Body>你確定要刪除此項目嗎？這個動作無法復原。</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            取消
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            確認刪除
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Dropdown;
