import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faFilter,
  FaUser,
  faCalendar,
  faTag,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

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
            {/* <FontAwesomeIcon icon={faCircleCheck} />*/} 發布文章
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
              <FontAwesomeIcon icon={faMagnifyingGlass} />
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
            {/* <FontAwesomeIcon icon={faFilter} />*/} 依時間排序
          </button>

          <div className={styles.card}>
            <img
              src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
              alt="文章封面"
            />

            <div className={styles.cardDetail} style={{ color: '#9F9F9F' }}>
              <div className={styles.author}>
                {/* <FaUser /> */}
                Tom
              </div>
              <div className={styles.time}>
                {/* <FaCalendar /> */}
                2025-01-01
              </div>
              <div className={styles.category}>
                {/* <FaTag /> */}
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
                {/* <faUser /> */}
                Tom
              </div>
              <div className={styles.time}>
                <faCalendar />
                2025-01-01
              </div>
              <div className={styles.category}>
                {/* <FaTag /> */}
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
                {/* <FaUser /> */}
                Tom
              </div>
              <div className={styles.time}>
                {/* <FaCalendar /> */}
                2025-01-01
              </div>
              <div className={styles.category}>
                {/* <FaTag /> */}
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
                {/* <FaUser /> */}
                Tom
              </div>
              <div className={styles.time}>
                {/* <FaCalendar /> */}
                2025-01-01
              </div>
              <div className={styles.category}>
                {/* <FaTag /> */}
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
                {/* <FaUser /> */}
                Tom
              </div>
              <div className={styles.time}>
                {/* <FaCalendar /> */}
                2025-01-01
              </div>
              <div className={styles.category}>
                {/* <FaTag /> */}
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
                  <FontAwesomeIcon icon={faChevronLeft} />
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
                  <FontAwesomeIcon icon={faChevronRight} />
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
