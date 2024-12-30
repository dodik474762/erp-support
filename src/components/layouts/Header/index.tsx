import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ActivityItem from "./activity-item";
import { useEffect, useState } from "react";

const Header = (props: any) => {
  const { router = 0 } = props;
  const { data }: any = useSession();
  const session = useSession();
  const [logs, setLogs] = useState(0);
  const [dataLogs, setDataLogs] = useState([]);

  const fetchActivityLog = async () => {
    const base_url = "/log/activity-log";
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL + base_url}/countAll`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const result = await response.json();
      setLogs(result.data);

      await fetchDataActivityLog();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataActivityLog = async () => {
    const base_url = "/log/activity-log";
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL + base_url}/getAll?limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const result = await response.json();
      setDataLogs(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignout = async (e: any) => {
    e.preventDefault();
    await localStorage.removeItem("authToken");
    signOut({
      redirect: false,
    });

    await router.push("/auth/login");
    // window.location.reload();
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    router.push("/auth/change-password");
  };

  const handleExpandSidebar = () => {
    document.querySelector("html")?.getAttribute("data-sidebar-size") === "sm"
      ? document.querySelector("html")?.setAttribute("data-sidebar-size", "lg")
      : document.querySelector("html")?.setAttribute("data-sidebar-size", "sm");
  };

  const handleThemeMode = () => {
    document.querySelector("html")?.getAttribute("data-layout-mode") === "dark"
      ? document
          .querySelector("html")
          ?.setAttribute("data-layout-mode", "light")
      : document
          .querySelector("html")
          ?.setAttribute("data-layout-mode", "dark");
  };

  const handleFullScreen = () => {
    document.body.classList.toggle("fullscreen-enable");
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      // fetchActivityLog();
      fetchDataActivityLog();
    }
  }, []);

  return (
    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box horizontal-logo">
              <Link href="/dashboard" className="logo logo-dark">
                <span className="logo-sm">
                  <Image
                    src="/assets/images/logo-sm.png"
                    alt=""
                    height="22"
                    fetchPriority="high"
                    width={22}
                  />
                </span>
                <span className="logo-lg">
                  <Image
                    src="/assets/images/logo_satoria.jpg"
                    alt=""
                    height="17"
                    fetchPriority="high"
                    width={100}
                  />
                </span>
              </Link>

              <Link href="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <Image
                    src="/assets/images/logo-sm.png"
                    alt=""
                    height="22"
                    fetchPriority="high"
                    width={22}
                  />
                </span>
                <span className="logo-lg">
                  <Image
                    src="/assets/images/logo_satoria.jpg"
                    alt=""
                    height="17"
                    fetchPriority="high"
                    width={100}
                  />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={handleExpandSidebar}
              className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
              id="topnav-hamburger-icon"
            >
              <span className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>

          <div className="d-flex align-items-center">
            <div className="dropdown d-md-none topbar-head-dropdown header-item">
              <button
                type="button"
                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                id="page-header-search-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bx bx-search fs-22"></i>
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <button className="btn btn-primary" type="submit">
                        <i className="mdi mdi-magnify"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="ms-1 header-item d-none d-sm-flex">
              <button
                type="button"
                onClick={handleFullScreen}
                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen fs-22"></i>
              </button>
            </div>

            <div className="ms-1 header-item d-none d-sm-flex">
              <button
                type="button"
                onClick={handleThemeMode}
                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
              >
                <i className="bx bx-moon fs-22"></i>
              </button>
            </div>

            <div className="dropdown topbar-head-dropdown ms-1 header-item">
              <button
                type="button"
                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                id="page-header-notifications-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bx bx-bell fs-22"></i>
                <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                  {logs}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-notifications-dropdown"
              >
                <div className="dropdown-head bg-primary bg-pattern rounded-top">
                  <div className="p-3">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0 fs-16 fw-semibold text-white">
                          {" "}
                          Log Activity{" "}
                        </h6>
                      </div>
                      <div className="col-auto dropdown-tabs">
                        <span className="badge badge-soft-light fs-13">
                          {" "}
                          {dataLogs.length} New
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-2 pt-2">
                    <ul
                      className="nav nav-tabs dropdown-tabs nav-tabs-custom"
                      data-dropdown-tabs="true"
                      id="notificationItemsTab"
                      role="tablist"
                    >
                      <li className="nav-item waves-effect waves-light">
                        <a
                          className="nav-link active"
                          data-bs-toggle="tab"
                          href="#all-noti-tab"
                          role="tab"
                          aria-selected="true"
                        >
                          All ({logs})
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="tab-content" id="notificationItemsTabContent">
                  <div
                    className="tab-pane fade show active py-2 ps-2"
                    id="all-noti-tab"
                    role="tabpanel"
                  >
                    <div
                      data-simplebar
                      style={{ maxHeight: "300px" }}
                      className="pe-2"
                    >                    
                      {/* {dataLogs.length > 0 ? 
                        dataLogs.map((item: any, index: number) => {
                          return <>
                            <p key={index}>oke</p>
                          </>
                        }) : null} */}

                      <div className="my-3 text-center">
                        <button
                          type="button"
                          className="btn btn-soft-success waves-effect waves-light"
                        >
                          View All Logs{" "}
                          <i className="ri-arrow-right-line align-middle"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dropdown ms-sm-3 header-item topbar-user">
              <button
                type="button"
                className="btn"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
                  <Image
                    className="rounded-circle header-profile-user"
                    src="/assets/images/ic_profile.png"
                    alt="Header Avatar"
                    fetchPriority="high"
                    width={32}
                    height={32}
                  />
                  <span className="text-start ms-xl-2">
                    <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                      {data && data.user?.name}!
                    </span>
                    <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                      {data && data.user?.username}!
                    </span>
                  </span>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <h6 className="dropdown-header">
                  Welcome {data && data.user?.name}!
                </h6>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  href=""
                  onClick={handleChangePassword}
                >
                  <i className="mdi mdi-account text-muted fs-16 align-middle me-1"></i>{" "}
                  <span className="align-middle" data-key="t-change-password">
                    Change Password
                  </span>
                </a>
                <a className="dropdown-item" href="" onClick={handleSignout}>
                  <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
                  <span className="align-middle" data-key="t-logout">
                    Logout
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
