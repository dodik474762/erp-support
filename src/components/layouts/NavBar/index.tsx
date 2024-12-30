import { getPermissionsMenu } from "@/utility/permission";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useRef, useState } from "react";

const NavBar = (props: any) => {
  const { menu = [], router } = props;

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
                  priority={true}
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
                fetchPriority="high"
                height={22}
                width={22}
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
              {menu.map((item: any, index_parent: number) => {
                return (
                  <React.Fragment key={index_parent}>
                    {item.children ? (
                      <React.Fragment key={"fragment-parent-"+index_parent}>
                        <li className="menu-title">
                          <span key={index_parent} data-key="t-menu">
                            {item.menu_name}
                          </span>
                        </li>
                        {item.children.map((child: any, index: number) => {
                          return (
                            <React.Fragment key={"fragment-child-"+index}>
                              {child.children ? (
                                <React.Fragment key={"fragment-child-child-"+index}>
                                  <li className="nav-item">
                                    <Link
                                      className={
                                        "nav-link menu-link collapsed" +
                                        (router.pathname.includes(
                                          child.menu_name.toLowerCase()
                                        )
                                          ? " active"
                                          : "")
                                      }
                                      href={"#sidebar" + index}
                                      data-bs-toggle="collapse"
                                      role="button"
                                      aria-expanded={
                                        router.pathname.includes(
                                          child.menu_name
                                            .toLowerCase()
                                            .replace(" ", "-")
                                        )
                                          ? "true"
                                          : "false"
                                      }
                                      aria-controls={"sidebar" + index}
                                    >
                                      <i className={child.icon}></i>{" "}
                                      <span data-key={"t-dashboards" + index}>
                                        {child.menu_name}
                                      </span>
                                    </Link>
                                    <div
                                      className={
                                        "collapse menu-dropdown " +
                                        (router.pathname.includes(
                                          child.menu_name
                                            .toLowerCase()
                                            .replace(" ", "-")
                                        )
                                          ? " show"
                                          : "")
                                      }
                                      id={"sidebar" + index}
                                    >
                                      <ul className="nav nav-sm flex-column">
                                        {child.children.map(
                                          (item_child: any, i: number) => {
                                            return (
                                              <li
                                                className="nav-item menu-link"
                                                key={"detail-item-" + i}
                                              >
                                                <Link
                                                  href={item_child.path}
                                                  id={item_child.path}
                                                  className={`nav-link ${
                                                    router.pathname.includes(
                                                      item_child.path
                                                    )
                                                      ? "active"
                                                      : ""
                                                  }`}
                                                >
                                                  {item_child.menu_name}
                                                </Link>
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    </div>
                                  </li>
                                </React.Fragment>
                              ) : (
                                <li className="nav-item" key={"item-" + index}>
                                  <Link
                                    href={child.path}
                                    id={child.path}
                                    className={`nav-link menu-link ${
                                      router.pathname === child.path
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    <i className={child.icon}></i>{" "}
                                    <span data-key="t-dashboards">
                                      {child.menu_name}
                                    </span>
                                  </Link>
                                </li>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    ) : (
                      <div></div>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="sidebar-background"></div>
      </div>
    </>
  );
};

export default NavBar;
