/* eslint-disable @next/next/no-script-component-in-head */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import NavBar from "../NavBar";
import Script from "next/script";
import Footer from "../Footer";
import Header from "../Header";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getPermissionsMenu } from "@/utility/permission";
import { signOut, useSession } from "next-auth/react";
import NavbarEmpty from "../NavBar/navbar-empty";
import isAuthorized from "@/services/authorize";

type AppShellPros = {
  children: React.ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const disableNavbar = ["/auth/login", "/404"];

const AppShell = (props: AppShellPros) => {
  const { children } = props;
  const pathName = useRouter();
  const session: any = useSession();
  const router = useRouter();

  const [isLogin, setIsLogin]: any = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);

  const [menu, setMenu]: any = useState([]);

  const permissionList = async () => {
    let treeMenu: any = {
      name: "Menu",
      icon: "",
      children: [],
    };

    const user_id = session.data.user.id;
    const authToken = session.data.user.token;
    localStorage.setItem("authToken", authToken);
    const res = await fetch(
      process.env.API_BASE_URL + "/auth/get-akses-menu?id=" + user_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const result = await res.json();
    if (result.statusCode == 200) {
      const menus = result.data;
      menus.forEach((item: any) => {
        if (item.menu_parent == null || item.menu_parent == "") {
          item.name = item.menu_name;

          const children = menus.filter(
            (child: any) => child.menu_parent == item.menu_code
          );
          item.action = item.action == "" ? [] : item.action.split(",");
          if (children.length > 0) {
            item.children = children;
          }
          treeMenu.children.push(item);
        }
      });
    } else {
      if (result.statusCode == 401) {
      }
    }

    setMenu([treeMenu]);
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      setIsLogin(true);
      setLoadingPage(false);
      permissionList();
    }
    if (session.status == "unauthenticated") {
      setIsLogin(false);
      setLoadingPage(false);
    }
    if (session.status == "loading") {
      setLoadingPage(true);
    }
  }, [session]);

  useEffect(() => {
    if (session.status == "authenticated") {
      isAuthorized(session).then((res) => {
        setLoadingPage(false);
        setIsLogin(true);
        setAuthenticated(res);
      });
    }
  }, [session]);

  return loadingPage == true ? (
    <>
      <div className="auth-page-wrapper  py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  ) : (
    <>
      <>
        {isLogin == false ? (
          <>
            <div className="auth-page-wrapper  py-5 d-flex justify-content-center align-items-center min-vh-100">
              <div className="bg-overlay"></div>
              {children}
              <Footer />
            </div>
          </>
        ) : (
          <>
            <div id="layout-wrapper" className={inter.className}>
              <Header router={router} />
              <NavBar menu={menu} router={router} />
              <div className="vertical-overlay"></div>
              <div className="main-content">
                <div className="page-content">
                  <div className="container-fluid">{children}</div>
                </div>
                <Footer />
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default AppShell;
