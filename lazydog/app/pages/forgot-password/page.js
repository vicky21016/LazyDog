import styles from "./member.module.css";
import Link from "next/link";
import Header from "../../components/layout/header";

export default function ForgetPasswordForm() {
  return (
    <>
      <Header />
      <div className={`${styles.wrapper}`}>
        <main className={`w-100 m-auto text-center ${styles["container"]}`}>
          <h4 className={`text-center mb-4 ${styles["text"]}`}>重設密碼</h4>
          <p className={`text-center mb-4 ${styles["text-note"]}`}>
            輸入你的會員電子郵件地址，按下&quot;取得驗證碼&ldquo;按鈕後，我們會將密碼重設指示寄送給你。
          </p>
          <form>
            <div className="row mb-4">
              <div className={`col-sm-12 ${styles["input"]}`}>
                <input
                  type="email"
                  className={`form-control w-100 ${styles["form-control"]} ${styles["invalid"]} `}
                  placeholder="電子郵件地址"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className={`col-sm-12 ${styles["input"]}`}>
                <div className="input-group">
                  <input
                    type="text"
                    className={`form-control ${styles["form-control"]} ${styles["invalid"]} `}
                    placeholder="電子郵件驗證碼"
                  />
                  <button
                    className={`btn ${styles["submit"]}`}
                    type="button"
                    id="button-addon2"
                  >
                    取得驗證碼
                  </button>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-sm-12">
                <input
                  type="password"
                  className={`form-control w-100 ${styles["form-control"]} ${styles["invalid"]} `}
                  placeholder="密碼"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-sm-12">
                <input
                  type="password"
                  className={`form-control w-100 ${styles["form-control"]} ${styles["invalid"]} `}
                  placeholder="確認密碼"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`btn mb-4 w-100 ${styles["submit"]}`}
            >
              確定
            </button>

            <div className="row mt-2">
              <p className={`${styles["notice"]}`}>
                還不是會員？
                <Link className={`${styles["join"]}`} href="/register">
                  加入我們
                </Link>
                。
              </p>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
