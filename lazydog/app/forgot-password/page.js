"use client";
import { useState } from "react";
import styles from "./member.module.css";
import Link from "next/link";
import Header from "../components/layout/header";
// import useAuth from "../hooks/use-auth";
import { useAuth } from "@/hooks/use-auth";

export default function ForgetPasswordForm() {
  const { generateOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleGetOtp = async () => {
    if (!email) {
      setError("請輸入電子郵件地址");
      return;
    }
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const token = await generateOtp(email);
      setOtp(token);
      setMessage("驗證碼已發送至您的電子郵件");
    } catch (err) {
      console.log(err);

      setError("獲取驗證碼失敗，請稍後再試");
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="lumi-all-wrapper">
        <main className={`w-100 m-auto text-center ${styles["container"]}`}>
          <h4 className={`text-center mb-4 ${styles["text"]}`}>重設密碼</h4>
          <p className={`text-center mb-4 ${styles["text-note"]}`}>
            輸入你的會員電子郵件地址，按下"取得驗證碼"按鈕後，我們會將密碼重設指示寄送給你。
          </p>
          <form>
            <div className="row mb-4">
              <div className={`col-sm-12 ${styles["input"]}`}>
                <input
                  type="email"
                  className={`form-control w-100 ${styles["form-control"]}`}
                  placeholder="電子郵件地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className={`col-sm-12 ${styles["input"]}`}>
                <div className="input-group">
                  <input
                    type="text"
                    className={`form-control ${styles["form-control"]}`}
                    placeholder="電子郵件驗證碼"
                    value={otp}
                    readOnly
                  />
                  <button
                    className={`btn ${styles["submit"]}`}
                    type="button"
                    id="button-addon2"
                    onClick={handleGetOtp}
                    disabled={loading}
                  >
                    {loading ? "發送中..." : "取得驗證碼"}
                  </button>
                </div>
              </div>
            </div>
            {message && <p className={styles["success-message"]}>{message}</p>}
            {error && <p className={styles["error-message"]}>{error}</p>}
          </form>
        </main>
      </div>
    </>
  );
}
