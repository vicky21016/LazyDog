"use client"

import styles from "./page.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Comment({ content, author, author_img }) {
    return (
        <>
            <li className="d-flex py-3" style={{ margin: '10px' }}>
                <div className={`${styles.auther}`}>
                    <div className="avatar ratio ratio-1x1 rounded-circle overflow-hidden">
                        <img
                            className="object-fit-cover"
                            src={author_img}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <div>{author}</div>
                    </div>
                </div>
                <div className="" style={{ marginLeft: '2rem', width: '90%' }}>
                    {content}
                </div>
            </li>
        </>
    )
}