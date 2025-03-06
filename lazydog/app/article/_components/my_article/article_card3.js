"use client";

import useArticle from "@/hooks/useArticle"; // 確保導入正確的 Hook
import { useState } from "react";
import styles from "../my_article/page.module.css";
import Link from "next/link";

export default function MyCard3({ title, author_image, content, article_id }) {
    console.log(author_image)
    return (
        <>
            <Link
                href={{ pathname: `/article/detail/${article_id}`, query: { list: "true" } }}
                className="card mb-3"
                style={{
                    width: '100%',
                    height: '155px',
                    // paddingTop:'10px'
                }}>
                <div 
                className="row g-0"
                style={{height:'100%'}}
                >
                    {/* <div className="col-md-4">
                        <img src='http://localhost:5000/api/articles/image4.jpg'
                            className="img-fluid rounded-start"
                            style={{ width: '100%', height: '200px', objectFit: 'cover', overflow: 'hidden' }} />
                    </div> */}
                    <div
                        className="col-md-1 "
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '10px',height:'100%' }}
                    >
                        <div
                            // className="w-100"
                            style={{ width: '80px' }}
                        >
                            <div
                                className="avatar ratio ratio-1x1 rounded-circle overflow-hidden"
                            >
                                <img className="object-fit-cover" src={author_image} />
                            </div>
                            <div className="d-flex justify-content-center">
                                <div>傑哥</div>
                            </div>
                        </div>

                    </div>
                    <div
                        className="col-md-11 "
                        style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="card-body">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div
                                    className={`${styles.link}`}

                                // style={{ marginRight: '3px' }}
                                >
                                    {content}
                                </div>
                            </div>
                            <p
                                className="card-text mt-3"
                                style={{ maxHeight: '30px', overflow: 'hidden' }}
                            >
                                <small className="text-muted">文章標題 : {title}
                                </small></p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};
