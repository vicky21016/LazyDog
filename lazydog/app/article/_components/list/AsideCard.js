"use client"

import Link from "next/link";
import styles from "./ListCard.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function AsideCard({ id,title,cover_image,created_at }) {
    return (
        <>
            <div className={styles.asideRead}>
                <img
                    src={cover_image}
                    alt=""
                />
                <div
                    className={styles.tt}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Link href={{ pathname: `/article/detail/${id}`, query: { list: "true" } }}>{title}</Link>
                    <p style={{ color: '#9F9F9F' }}>{created_at}</p>
                </div>
            </div>
        </>
    )
}