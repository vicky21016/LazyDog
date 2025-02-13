"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login"); // 未登入時，導向登入頁
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>歡迎, {user.displayName}</p> : <p>載入中...</p>}
    </div>
  );
}
