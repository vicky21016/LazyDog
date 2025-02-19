// 'use client'

// import React from 'react'
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from 'next/link'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import styles from './page.module.css'
// import  useArticles  from '@/hooks/useArticle'
// const ArticleDetail = () => {
//   const router = useRouter();
//   const { article, comments, loading, error } = useArticles();
//   if (loading) return <p>載入中...</p>;
//   if (error) return <p>錯誤: {error}</p>
//   return (
//     <div className={`container ${styles.container}`}>
//       <nav
//         className={`my-4 ${styles.breadcrumb}`}
//         style={{ '--bs-breadcrumb-divider': '>' }}
//         aria-label="breadcrumb"
//       >
//         <ol className="breadcrumb ">
//           <li className="breadcrumb-item ">
//             <Link className={`${styles.link}`} href="#">毛孩文章</Link>
//           </li>
//           <li className="breadcrumb-item ">
//             <Link className={`${styles.link}`} href="#"> / {article.category_name}</Link>
//           </li>
//           <li className="breadcrumb-item active" aria-current="page"> / {article.title}
//           </li>
//         </ol>
//       </nav>
//       <h3>{article.title}</h3>
//       <div className={`${styles.autherDetail}`} style={{ margin: '15px 0' }}>
//         <div className={`${styles.floor}`}>樓主</div>
//         <div className={`${styles.auther}`} style={{ display: 'inline-block' }}>
//           {article.author_name}
//         </div>
//       </div>
//       <div className="time" style={{ margin: '10px 0' }}>
//         {article.created_at} 編輯
//       </div>
//       <p>{article.content}</p>
//       <div className="chat" style={{ background: '#FFF6E8', padding: '0.5px' }}>
//         <h3 className="mt-3 ms-3">留言</h3>
//         <ul className="list-unstyled">
//           <li className="d-flex py-3" style={{ margin: '10px' }}>
//             <div className={`${styles.auther}`}>
//               <div className="avatar ratio ratio-1x1 rounded-circle overflow-hidden">
//                 <img
//                   className="object-fit-cover"
//                   src="/article_img/batman.jpg"
//                   alt=""
//                 />
//               </div>
//             </div>
//             <div className="" style={{ marginLeft: '2rem', width: '100%' }}>
//               Looking to replicate the media object component from Bootstrap 4?
//               Recreate it in no time with a few flex utilities that allow even
//               more flexibility and customization than before.
//             </div>
//           </li>
//           <li className="d-flex py-3" style={{ margin: '10px' }}>
//             <div className={`${styles.auther}`}>
//               <div className="avatar ratio ratio-1x1 rounded-circle overflow-hidden">
//                 <img
//                   className="object-fit-cover"
//                   src="/article_img/batman.jpg"
//                   alt=""
//                 />
//               </div>
//             </div>
//             <div className="" style={{ marginLeft: '2rem', width: '100%' }}>
//               Looking to replicate the media object component from Bootstrap 4?
//               Recreate it in no time with a few flex utilities that allow even
//               more flexibility and customization than before.
//             </div>
//           </li>
//           <li className="d-flex py-3" style={{ margin: '10px' }}>
//             <div className={`${styles.auther}`}>
//               <div className="avatar ratio ratio-1x1 rounded-circle overflow-hidden">
//                 <img
//                   className="object-fit-cover"
//                   src="/article_img/batman.jpg"
//                   alt=""
//                 />
//               </div>
//             </div>
//             <div className="" style={{ marginLeft: '2rem', width: '100%' }}>
//               Looking to replicate the media object component from Bootstrap 4?
//               Recreate it in no time with a few flex utilities that allow even
//               more flexibility and customization than before.
//             </div>
//           </li>
//           <li className="d-flex py-3" style={{ margin: '10px' }}>
//             <div className={`${styles.auther}`}>
//               <div className="avatar ratio ratio-1x1 rounded-circle overflow-hidden">
//                 <img
//                   className="object-fit-cover"
//                   src="/article_img/batman.jpg"
//                   alt=""
//                 />
//               </div>
//             </div>
//             <textarea
//               type="text"
//               className="px-1"
//               style={{ marginLeft: '2rem', width: '100%' }}
//             ></textarea>
//           </li>
//         </ul>
//       </div>
//       <div className="more-read">
//         <h3 className="mt-5">延伸閱讀</h3>
//         <div className="row">
//           <div className="col-lg-3 col-sm-12">
//             <img
//               src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
//               className="d-block w-100"
//               alt="..."
//             />
//             <Link className={`${styles.link}`} href="">
//               <p>「寵物四合一快速檢測」測什麼？貓狗的蟲蟲危機這樣.......</p>
//             </Link>
//           </div>
//           <div className="col-lg-3 col-sm-12">
//             <img
//               src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
//               className="d-block w-100"
//               alt="..."
//             />
//             <Link className={`${styles.link}`} href="">
//               <p>「寵物四合一快速檢測」測什麼？貓狗的蟲蟲危機這樣.......</p>
//             </Link>
//           </div>
//           <div className="col-lg-3 col-sm-12">
//             <img
//               src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
//               className="d-block w-100"
//               alt="..."
//             />
//             <Link className={`${styles.link}`} href="">
//               <p>「寵物四合一快速檢測」測什麼？貓狗的蟲蟲危機這樣.......</p>
//             </Link>
//           </div>
//           <div className="col-lg-3 col-sm-12">
//             <img
//               src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
//               className="d-block w-100"
//               alt="..."
//             />
//             <Link className={`${styles.link}`} href="">
//               <p>「寵物四合一快速檢測」測什麼？貓狗的蟲蟲危機這樣.......</p>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ArticleDetail
