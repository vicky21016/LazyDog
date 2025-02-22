import Link from "next/link";
import 'bootstrap-icons/font/bootstrap-icons.css'
import styles from "./page.module.css";

export default function MoreCard({ id,title,cover_image }) {
    return (
        <>
            <div className="col-lg-3 col-sm-12">
                <img
                    src={cover_image}
                    style={{ width: "100%", height: "230px",objectFit: "cover" }}
                />
                <Link href={{ pathname: `/article/detail/${id}`, query: { list: "true" } }} className={styles.customLink}>{title}</Link>
            </div>
        </>
    )
}