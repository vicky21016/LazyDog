import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap-icons/font/bootstrap-icons.css'

// import {
//   faMagnifyingGlass,
//   faFilter,
//   FaUser,
//   faCalendar,
//   faTag,
//   faChevronLeft,
//   faChevronRight,
// } from '@fortawesome/free-solid-svg-icons'
// import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

const ArticlePage = () => {
  // 假設的數據，可替換為真實數據
  const cards = Array(6).fill({
    img: './public/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp',
    author: 'Tom',
    date: '2025-01-01',
    category: '保健與營養',
    title: '為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的 6 大好處',
  })

  const readings = Array(5).fill({
    img: './public/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp',
    title: '「寵物四合一快速檢測」測什麼？.......',
    date: '2025-01-01',
  })

  return (
    <>
      <div className={`${styles.mainDog} mb-3`}>
        <h1 style={{ fontWeight: 'bold' }}>毛孩文章</h1>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.postButton}>
          <button className={styles.post}>
            <i className="bi bi-check-circle"></i> 發布文章
          </button>
        </div>

        {/* 左側欄 */}
        <div className={styles.top}>
          <div
            className="input-group my-3"
            style={{ border: '.2px solid grey', borderRadius: '5px' }}
          >
            <input
              type="text"
              className="form-control"
              style={{ border: 'none', height: '40px', borderRadius: '5px' }}
            />
            <label
              className="input-group-text"
              style={{ background: 'none', border: 'none' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </label>
          </div>

          <div className={styles.asideCategory}>
            <h2>類別</h2>
            {['保健與營養', '開箱', '行為知識', '食譜', '善終'].map(
              (category, index) => (
                <a key={index} href="#">
                  <p>{category}</p>
                </a>
              )
            )}
          </div>

          <select className="form-select form-select-lg">
            <option>類別</option>
            {['保健與營養', '開箱', '行為知識', '食譜', '善終'].map(
              (option, index) => (
                <option key={index} value={index + 1}>
                  {option}
                </option>
              )
            )}
          </select>
        </div>

        {/* 主要內容 */}
        <div className={styles.middle}>
          <button className={styles.filter}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-filter"
              viewBox="0 0 16 16"
            >
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
            </svg>{' '}
            依時間排序
          </button>

          <div className={styles.card}>
            <img
              src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
              alt="文章封面"
            />

            <div className={styles.cardDetail} style={{ color: '#9F9F9F' }}>
              <div className={styles.author}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>{' '}
                Tom
              </div>
              <div className={styles.time}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-calendar"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>{' '}
                2025-01-01
              </div>
              <div className={styles.category}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-tag-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>{' '}
                保健與營養
              </div>
            </div>

            <p>為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的 6 大好處</p>
            <a href="#">
              <p>Read more</p>
            </a>
          </div>
          <div className={styles.card}>
            <img
              src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
              alt="文章封面"
            />

            <div className={styles.cardDetail} style={{ color: '#9F9F9F' }}>
              <div className={styles.author}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>{' '}
                Tom
              </div>
              <div className={styles.time}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-calendar"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>{' '}
                2025-01-01
              </div>
              <div className={styles.category}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-tag-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>{' '}
                保健與營養
              </div>
            </div>

            <p>為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的 6 大好處</p>
            <a href="#">
              <p>Read more</p>
            </a>
          </div>
          <div className={styles.card}>
            <img
              src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
              alt="文章封面"
            />

            <div className={styles.cardDetail} style={{ color: '#9F9F9F' }}>
              <div className={styles.author}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>{' '}
                Tom
              </div>
              <div className={styles.time}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-calendar"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>{' '}
                2025-01-01
              </div>
              <div className={styles.category}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-tag-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>{' '}
                保健與營養
              </div>
            </div>

            <p>為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的 6 大好處</p>
            <a href="#">
              <p>Read more</p>
            </a>
          </div>
          <div className={styles.card}>
            <img
              src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
              alt="文章封面"
            />

            <div className={styles.cardDetail} style={{ color: '#9F9F9F' }}>
              <div className={styles.author}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>{' '}
                Tom
              </div>
              <div className={styles.time}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-calendar"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>{' '}
                2025-01-01
              </div>
              <div className={styles.category}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-tag-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>{' '}
                保健與營養
              </div>
            </div>

            <p>為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的 6 大好處</p>
            <a href="#">
              <p>Read more</p>
            </a>
          </div>
          <div className={styles.card}>
            <img
              src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
              alt="文章封面"
            />

            <div className={styles.cardDetail} style={{ color: '#9F9F9F' }}>
              <div className={styles.author}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>{' '}
                Tom
              </div>
              <div className={styles.time}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-calendar"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>{' '}
                2025-01-01
              </div>
              <div className={styles.category}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-tag-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>{' '}
                保健與營養
              </div>
            </div>

            <p>為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的 6 大好處</p>
            <a href="#">
              <p>Read more</p>
            </a>
          </div>
        </div>

        {/* 右側欄 */}
        <div className={styles.bottom}>
          <h4>延伸閱讀</h4>
          <div className={styles.asideRead}>
            <img
              src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
              alt="寵物四合一快速檢測"
            />
            <div
              className={styles.tt}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <a href="#">「寵物四合一快速檢測」測什麼？.......</a>
              <p style={{ color: '#9F9F9F' }}>2025-01-01</p>
            </div>
          </div>
          <div className={styles.asideRead}>
            <img
              src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
              alt="寵物四合一快速檢測"
            />
            <div
              className={styles.tt}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <a href="#">「寵物四合一快速檢測」測什麼？.......</a>
              <p style={{ color: '#9F9F9F' }}>2025-01-01</p>
            </div>
          </div>
          <div className={styles.asideRead}>
            <img
              src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
              alt="寵物四合一快速檢測"
            />
            <div
              className={styles.tt}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <a href="#">「寵物四合一快速檢測」測什麼？.......</a>
              <p style={{ color: '#9F9F9F' }}>2025-01-01</p>
            </div>
          </div>
          <div className={styles.asideRead}>
            <img
              src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
              alt="寵物四合一快速檢測"
            />
            <div
              className={styles.tt}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <a href="#">「寵物四合一快速檢測」測什麼？.......</a>
              <p style={{ color: '#9F9F9F' }}>2025-01-01</p>
            </div>
          </div>
          <div className={styles.asideRead}>
            <img
              src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
              alt="寵物四合一快速檢測"
            />
            <div
              className={styles.tt}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <a href="#">「寵物四合一快速檢測」測什麼？.......</a>
              <p style={{ color: '#9F9F9F' }}>2025-01-01</p>
            </div>
          </div>
        </div>
      </div>

      {/* 分頁 */}
      <div
        className={'container d-flex justify-content-center'}
        style={{ position: 'relative', top: '3200px' }}
      >
        <div className={styles.page}>
          <nav aria-label="Page navigation">
            <ul className="pagination pagination-lg">
              <li className="page-item disabled">
                <span className="page-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-left"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
                  </svg>
                </span>
              </li>
              {[1, 2, 3].map((page) => (
                <li
                  key={page}
                  className={`page-item ${page === 1 ? 'active' : ''}`}
                >
                  <span className="page-link">{page}</span>
                </li>
              ))}
              <li className="page-item">
                <a className="page-link" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
  <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
</svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default ArticlePage
