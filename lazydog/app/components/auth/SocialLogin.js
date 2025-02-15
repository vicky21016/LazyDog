/* eslint-disable @next/next/no-img-element */

import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
export default function SocialLogin() {
  const { googleLogin } = useAuth();

  return (
    <div className="lumi-social-login">
      {/* Google 登入按鈕 */}
      <button onClick={googleLogin} className="lumi-social-button">
        <img
          src="/images/Google.png"
          alt="google"
          className="lumi-google-icon"
        />
      </button>

      {/* LINE 登入按鈕 */}
      <Link href="/line/google-login" className="lumi-social-button">
        <img src="/images/line.webp" alt="line" className="lumi-line-icon" />
      </Link>
    </div>
  );
}
