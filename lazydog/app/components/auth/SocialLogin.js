/* eslint-disable @next/next/no-img-element */

import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
export default function SocialLogin() {
  const { googleLogin, user, logout } = useAuth();

  return (
    <div className="lumi-social-login">
      {user ? (
        <div>
          <p>歡迎, {user.name}</p>
          <img src={user.avatar} alt="User Avatar" width="50" />
          <button onClick={logout}>登出</button>
        </div>
      ) : (
        <button onClick={googleLogin} className="lumi-social-button">
          <img
            src="/images/Google.png"
            alt="google"
            className="lumi-google-icon"
          />
        </button>
      )}
      {/* LINE 登入按鈕 */}
      <Link href="/line/google-login" className="lumi-social-button">
        <img src="/images/line.webp" alt="line" className="lumi-line-icon" />
      </Link>
    </div>
  );
}
