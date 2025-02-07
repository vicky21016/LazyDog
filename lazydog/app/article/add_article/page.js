'use client'

import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AddArticlePage(props) {
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
              style={{  backgroundColor: '#FFF6E8' }}
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
                className="my-3 ps-2 w-100 d-block"
                placeholder="標題"
                type="text"
              />
              <textarea
                className="my-3 px-2 w-100 d-block"
                name="title"
                style={{ height: '672px' }}
              ></textarea>
              <div className={`${styles.button}`}>
                <button className={`${styles.img}`}>
                  <FontAwesomeIcon icon="fa-solid fa-image" />
                  插入圖片
                </button>
                <button className={`${styles.video}`}>
                  <FontAwesomeIcon icon="fa-solid fa-video" />
                  插入影片
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
