"use client";

import React, { useState } from "react";
import { auth, provider, signInPopup } from "./firebase";
import { useRouter } from "next/router";


// 因瀏覽器安全限制，改用signInWithPopup，詳見以下討論
// https://github.com/orgs/mfee-react/discussions/129
function GoogleSignIn() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const googleLogin = async () => {
    try {
      const result = await signInPopup(auth, provider);
      const user = result.user;
      console.log("Google 登入成功", user);
      router.push("/pages"); 
    } catch (error) {
      setError("登入失敗：" ,error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={googleLogin}>使用 Google 登入</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default GoogleSignIn;
