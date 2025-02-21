"use client"

import Link from "next/link";
import styles from "./ListCard.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function AsideCard({ title,cover_image,created_at }) {
    return (
        <>
            <div className={styles.asideRead}>
                <img
                    src={cover_image}
                    alt="寵物四合一快速檢測"
                />
                <div
                    className={styles.tt}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Link href="">{title}</Link>
                    <p style={{ color: '#9F9F9F' }}>{created_at}</p>
                </div>
            </div>
        </>
    )
}