"use client";

import DOMPurify from 'dompurify'
import Image from 'next/image'
import styles from "./page.module.css"

export default function Content({ article }) {
  // 消毒處理
  const cleanHTML = DOMPurify.sanitize(article?.content || '', {
    ALLOWED_TAGS: ['p', 'h3', 'h4', 'ul', 'li', 'img', 'strong', 'em', 'br'],
    ALLOWED_ATTR: ['src', 'alt', 'class', 'style']
  })

  // 圖片處理 (Next.js 優化)
  const processedHTML = cleanHTML.replace(
    /<img([^>]+)src="([^"]+)"([^>]*)>/g,
    (match, before, src, after) => {
      return `
        <Image 
          src="${src}" 
          ${before}${after}
          layout="responsive"
          width={800} 
          height={450}
          objectFit="contain"
          loading="lazy"
        />
      `
    }
  )

  return (
    <div className={`${styles.content} mt-4`}>
      <h1>{article?.title}</h1>
      <div className={`${styles.autherDetail}`} style={{ margin: '15px 0' }}>
        <div className={`${styles.floor}`}>作者</div>
        <div className={`${styles.auther}`} style={{ display: 'inline-block' }}>
          {article?.author_name}
        </div>
      </div>
      <div
        className={`${styles.articleContent}`}
        dangerouslySetInnerHTML={{ __html: processedHTML }}
      />
    </div>
  )
}