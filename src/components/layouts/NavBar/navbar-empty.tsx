import { checkPermission, getPermissionsMenu } from "@/utility/permission";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NavbarEmpty = ({
  menu = []
}) => {
  const router = useRouter();  

  return (
    <>
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <Link href="" className="logo logo-dark">
            <span className="logo-sm">
              <Image
                src="/assets/images/logo-sm.png"
                alt=""
                height={22}
                width={22}
                fetchPriority="high"
              />
            </span>
            <span className="logo-lg">
            <div
                style={{
                  maxWidth: "200px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  padding: "10px",
                  marginTop: "10px",
                  boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
                }}
              >
                <Image
                  fetchPriority="high"
                  src={"/assets/images/logo_satoria.jpg"}
                  alt=""
                  width={180}
                  height={50}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </span>
          </Link>

          <Link href="" className="logo logo-light">
            <span className="logo-sm">
              <Image
                src="/assets/images/logo-sm.png"
                alt=""
                height={22}
                width={22}
                fetchPriority="high"
              />
            </span>
            <span className="logo-lg">
            <div
                style={{
                  maxWidth: "200px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  padding: "10px",
                  marginTop: "10px",
                  boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
                }}
              >
                <Image
                  fetchPriority="high"
                  src={"/assets/images/logo_satoria.jpg"}
                  alt=""
                  width={180}
                  height={50}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </span>
          </Link>
          <button
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>

        <div id="scrollbar">
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              
            </ul>
          </div>
        </div>

        <div className="sidebar-background"></div>
      </div>
    </>
  );
};

export default NavbarEmpty;
