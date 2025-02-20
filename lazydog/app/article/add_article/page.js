'use client'

import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css';
import Froala from '../_components/add_article/content'

export default function AddArticlePage() {
  const [selectedValue, setSelectedValue] = useState('')

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-12">
            <button className="btn btn-primary mb-3">返回</button>
          </div>
          <div className="col-lg-9">
            <form
              action=""
              className="p-3 col"
              style={{ 
                maxWidth: '750px',
                backgroundColor: '#FFF6E8',
                boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.25)"
              }}
            >
              <h4>新增文章</h4>
              <select
                className="form-select my-3"
                value={selectedValue}
                style={{ width: '154px' }}
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <option selected>請選擇主題</option>
                <option value="1">保健與營養</option>
                <option value="2">行為知識</option>
                <option value="3">開箱</option>
                <option value="4">食譜</option>
                <option value="5">善終</option>
              </select>
              <input
                className="mb-5 ps-2 w-100 d-block"
                placeholder="標題"
                type="text"
              />
              
              {/* 保留 Froala 編輯器 */}
              <Froala/>
              
              <div className="d-flex justify-content-end">
                <button
                  className="mt-3"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};