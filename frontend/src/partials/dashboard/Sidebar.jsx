import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { HomeIcon } from "@heroicons/react/24/solid";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { calendar, chart, messages, square, starshine, task } from "../../data/icons";
import Icon from "../../components/Icon";
// import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const sitemap = [
    {
      title: "撰寫日記",
      path: "edit",
      svgMeta: starshine,
    },
    {
      title: "歷史紀錄",
      path: "zoo/form/calendar",
      svgMeta: calendar,
    },
    // {
    //   title: "Chart",
    //   path: "chart",
    //   svgMeta: chart
    // },
    // {
    //   title: "Chat",
    //   path: "chat",
    //   svgMeta: messages
    // },
    // {
    //   title: "React Hook",
    //   path: "hook",
    //   svgMeta: task
    // },
    // {
    //   title: "Form",
    //   path: "form",
    //   svgMeta: calendar,
    //   sublinks: [
    //     {
    //       title: "typical",
    //       path: "typical"
    //     },
    //     {
    //       title: "file",
    //       path: "file"
    //     },
    //     {
    //       title: "calendar",
    //       path: "calendar"
    //     },
    //   ]
    // },
    // {
    //   title: "Table",
    //   path: "table",
    //   svgMeta: square
    // },
    // {
    //   title: "MUI",
    //   path: "mui",
    //   svgMeta: starshine,
    //   sublinks: [
    //     {
    //       title: "modal",
    //       path: "modal"
    //     },
    //     {
    //       title: "pagination",
    //       path: "pagination"
    //     },
    //     {
    //       title: "carousel",
    //       path: "carousel"
    //     },
    //   ]
    // },
  ];

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-amber-600 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-2 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden  text-orange-950 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">關閉側欄</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* <a href="/">
            <img className="w-20 mt-2" src={logoSrc} alt="logo" />
          </a> */}
        </div>

        {/* Links */}
        <div className="h-full flex flex-col justify-between space-y-8">
          {/* Pages group */}
          <div>
            <Link to="/" className="text-orange-950 pl-3 text-xl font-semibold mb-6 flex hover:text-white"><HomeIcon className="mr-1" width="15" />首頁</Link>
            <h3 className="text-xl uppercase text-grey-950 font-medium pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                選單
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              {sitemap.map((category) =>
                category.sublinks ? (
                  <SidebarLinkGroup
                    activecondition={pathname.includes(category.path)}
                  >
                    {(handleClick, open) => (
                      <>
                        <a
                          href="#0"
                          className={`block text-orange-950 truncate transition duration-150 ${
                            pathname.includes(category.path)
                              ? "hover:text-slate-200"
                              : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Icon
                                path={category.path}
                                meta={category.svgMeta}
                              />
                              <span className="text-lg font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                {category.title}
                              </span>
                            </div>
                            {/* arrow */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-orange-950 ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            {category.sublinks.map((subCategory) => (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to={`/zoo/${category.path}/${subCategory.path}`}
                                  className={({ isActive }) =>
                                    `block transition duration-150 truncate ${
                                      isActive
                                        ? "text-orange-950"
                                        : "text-slate-400 hover:text-slate-200"
                                    }`
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    {subCategory.title}
                                  </span>
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </SidebarLinkGroup>
                ) : (
                  <li
                    className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                      pathname.includes(category.path) && "bg-orange-600/75"
                    }`}
                  >
                    <NavLink
                      end
                      to={`/${category.path}`}
                      className={`block text-orange-950 truncate transition duration-150 font-medium ${
                        pathname.includes(category.path)
                          ? "hover:text-slate-200"
                          : "hover:text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon path={category.path} meta={category.svgMeta} />
                        <span className="text-lg font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          {category.title}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
          {/* More group */}
          {/* <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                More
              </span>
            </h3>
            <ul className="mt-3">
              Authentication
              <SidebarLinkGroup>
                {(handleClick, open) => (
                  <>
                    <a
                      href="#0"
                      className={`block text-slate-200 truncate transition duration-150 ${
                        open ? "hover:text-slate-200" : "hover:text-white"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        sidebarExpanded
                          ? handleClick()
                          : setSidebarExpanded(true);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                            <path
                              className="fill-current text-slate-600"
                              d="M8.07 16H10V8H8.07a8 8 0 110 8z"
                            />
                            <path
                              className="fill-current text-slate-400"
                              d="M15 12L8 6v5H0v2h8v5z"
                            />
                          </svg>
                          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Authentication
                          </span>
                        </div>
                        Icon
                        <div className="flex shrink-0 ml-2">
                          <svg
                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                              open && "rotate-180"
                            }`}
                            viewBox="0 0 12 12"
                          >
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                          </svg>
                        </div>
                      </div>
                    </a>
                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/sign-in"
                            className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Sign in
                            </span>
                          </NavLink>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/sign-up"
                            className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Sign up
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </SidebarLinkGroup>
            </ul>
          </div> */}
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">展開/闔起側欄</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
