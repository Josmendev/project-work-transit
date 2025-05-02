/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ADMIN_USERS_ROUTES, BASE_ROUTES } from "../../utils/constants";
import { Button } from "../Button/Button";
import { Icon } from "../Icon";
import { Image } from "../Image";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const {
    PRIVATE: { DASHBOARD, ADMIN },
  } = BASE_ROUTES;

  const { USERS, ROLES, STAFF } = ADMIN_USERS_ROUTES;

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target))
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`sidebar lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="sidebar-header">
        <NavLink to={"/" + DASHBOARD}>
          <Image
            src="/logo-dark.webp"
            alt="Logo de WorkTransitApp"
            className="sidebar-header-logo"
          />
        </NavLink>

        <Button
          ref={trigger}
          title="Close Sidebar"
          id="btn-close-sidebar"
          classButton="block lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          ariaControls="sidebar"
          ariaExpanded={sidebarOpen}
          iconLeft={<Icon.ArrowLeft color="#C1CDE0" strokeWidth={1.5} />}
        />
      </div>

      {/* <!-- SIDEBAR HEADER --> */}

      <div className="sidebar-menu">
        {/* <!-- Sidebar Menu --> */}
        <nav className="navbar">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="navbar-title mt-12 lg:mt-0">MENU</h3>

            <ul className="menu">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to={"/" + DASHBOARD}
                  className={`menu-list text-white group ${
                    pathname.includes("dashboard") && "!bg-primary-600"
                  }`}
                >
                  <Icon.DashBoard color="#C1CDE0" />
                  <p>Inicio</p>
                </NavLink>
              </li>
              {/* <!-- Menu Item Dasboard --> */}

              {/* <!-- Menu Item Adm. Usuarios --> */}
              <SidebarLinkGroup
                activeCondition={pathname === `/${ADMIN}` || pathname.includes(ADMIN)}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`menu-list relative group ${
                          (pathname === `/${ADMIN}` || pathname.includes(ADMIN)) &&
                          "!bg-secondary-600"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (sidebarExpanded) handleClick();
                          else setSidebarExpanded(true);
                        }}
                      >
                        <p className="text-paragraph-medium">ADMIN. USUARIOS</p>
                        <Icon.Chevron
                          color="#C1CDE0"
                          className={`ml-auto ${open && "rotate-180"}`}
                        />
                      </NavLink>

                      {/* <!-- Dropdown Menu Start --> */}
                      <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                        <ul className="flex flex-col gap-2.5 pl-2">
                          <li>
                            <NavLink
                              to={`/${ADMIN}/${USERS}`}
                              className={({ isActive }) =>
                                `group relative menu-item ${isActive ? "bg-primary-500" : ""}`
                              }
                            >
                              <Icon.User className="menu-item-icon" />
                              <p className="menu-item-text ">Usuarios</p>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={`/${ADMIN}/${ROLES}`}
                              className={({ isActive }) =>
                                `group relative menu-item ${isActive ? "bg-primary-500" : ""}`
                              }
                            >
                              <Icon.Role className="menu-item-icon" />
                              <p className="menu-item-text">Roles</p>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={`/${ADMIN}/${STAFF}`}
                              className={({ isActive }) =>
                                `group relative menu-item ${isActive ? "bg-primary-500" : ""}`
                              }
                            >
                              <Icon.Staff className="menu-item-icon" />
                              <p className="menu-item-text">Personal</p>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Adm. Usuarios --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
