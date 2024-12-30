import DashboardViews from "@/views/dashboard/dashboard_views";
import LoginViews from "@/views/login/login_views";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  const [isAuth, setIsAuth] = useState(false);

  const loading = useRef(true);

  useEffect(() => {
    if (session.status === "authenticated") {
      setIsAuth(true);
      loading.current = false;
    }

    if(session.status === "loading") {
      loading.current = true;
    }

    if(session.status === "unauthenticated") {
      setIsAuth(false);
      loading.current = false;
    }
  }, [session.status]);

  return (
    <div className="text-white">
      {
        loading.current ? (
          <div>Loading...</div>
        ) : null
      }
      {
        isAuth ? (
          <DashboardViews />
        ) : (
          <LoginViews />
        )
      }
    </div>
  );
}
