import Link from "next/link";
import styles from "./page.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function MoreCard() {
    return (
        <>
            <div className="col-lg-3 col-sm-12">
                <img
                    src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
                    className="d-block w-100"
                    alt="..."
                />
                <Link className={`${styles.link}`} href="">
                    <p>「寵物四合一快速檢測」測什麼？貓狗的蟲蟲危機這樣.......</p>
                </Link>
            </div>
        </>
    )
}