"use client"

import styles from "./page.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function comment() {
    return (
        <>
            <li className="d-flex py-3" style={{ margin: '10px' }}>
                <div className={`${styles.auther}`}>
                    <div className="avatar ratio ratio-1x1 rounded-circle overflow-hidden">
                        <img
                            className="object-fit-cover"
                            src="/article_img/batman.jpg"
                            alt=""
                        />
                    </div>
                </div>
                <div className="" style={{ marginLeft: '2rem', width: '100%' }}>
                    Looking to replicate the media object component from Bootstrap 4?
                    Recreate it in no time with a few flex utilities that allow even
                    more flexibility and customization than before.
                </div>
            </li>
        </>
    )
}