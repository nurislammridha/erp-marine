/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import Spinner from 'react-bootstrap/Spinner';
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { GetMenuListsByPermission } from "../../../../../app/modules/Auth/_redux/menu-permission/authMenuPermissionAction";

export function AsideMenuList({ layoutProps }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const getMenuItemActive = (url) => {
    return checkIsActive(location, url)
      ? " menu-item-active menu-item-open "
      : "";
  };

  const menuList = useSelector((state) => state.menu.menuList);
  const isMenuLoading = useSelector((state) => state.menu.isMenuLoading);

  useEffect(() => {
    dispatch(GetMenuListsByPermission());
  }, [dispatch]);

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">Main Menu</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* end:: section */}

        <li
          className={`menu-item ${getMenuItemActive("/dashboard")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/sidebar/dashboard.svg")}
              />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* Modules */}

        {
          isMenuLoading &&
          <li className="menu-item menu-item-submenu text-center mt-5 text-white">
            <p className="text-center">
              <Spinner animation="grow" />
            </p>
            {/* Loading Menus... */}
          </li>
        }
        {typeof menuList != "undefined" &&
          menuList.map((menu, index) => (
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                menu.strRouteURL
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
              key={index}
            >
              <NavLink
                className="menu-link menu-toggle"
                to={menu.strRouteURL}
              >
                <span className="svg-icon menu-icon">
                  <SVG src={toAbsoluteUrl(menu.strIcon)} />
                </span>
                <span className="menu-text">{menu.strName}</span>
                <i className="menu-arrow" />
              </NavLink>

              {/* Sub Menus of Module */}
              {typeof menu.childs !== "undefined" &&
                menu.childs.map((subMenu, subIndex) => (
                  <div className="menu-submenu " key={subIndex}>
                    <i className="menu-arrow" />
                    <ul className="menu-subnav">
                      <li
                        className="menu-item  menu-item-parent"
                        aria-haspopup="true"
                      >
                        <span className="menu-link">
                          <span className="menu-text">{menu.strName}</span>
                        </span>
                      </li>
                      <li
                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                          subMenu.strRouteURL
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                      >
                        {
                          subMenu.childs.length === 0 && (
                            <NavLink
                              className="menu-link menu-toggle"
                              to={
                                subMenu.childs.length === 0
                                  ? subMenu.strRouteURL
                                  : ""
                              }
                              onClick={() =>
                                history.push(
                                  subMenu.childs.length === 0
                                    ? subMenu.strRouteURL
                                    : ""
                                )
                              }
                            >
                              <i className={subMenu.strIcon}>
                                <span />
                              </i>
                              <span className="menu-text">
                                {subMenu.strName}
                              </span>
                              <i className="menu-arrow" />
                            </NavLink>
                          )}

                        {
                          subMenu.childs.length > 0 && (
                            <NavLink
                              className="menu-link menu-toggle"
                              to={subMenu.strRouteURL}
                            >
                              <i className={subMenu.strIcon}>
                                <span />
                              </i>
                              <span className="menu-text">
                                {subMenu.strName}
                              </span>
                              <i className="menu-arrow" />
                            </NavLink>
                          )}

                        <div className="menu-submenu ">
                          <i className="menu-arrow" />
                          <ul className="menu-subnav">
                            {subMenu.childs.length > 0 &&
                              subMenu.childs.map(
                                (featureMenu, featureIndex) => (
                                  <li
                                    className={`menu-item  ${getMenuItemActive(
                                      featureMenu.strRouteURL
                                    )}`}
                                    aria-haspopup="true"
                                    key={featureIndex}
                                  >
                                    <NavLink
                                      className="menu-link"
                                      to={featureMenu.strRouteURL}
                                    >
                                      <i className={featureMenu.strIcon}>
                                        <span />
                                      </i>
                                      <span className="menu-text">
                                        {featureMenu.strName}
                                      </span>
                                    </NavLink>
                                  </li>
                                )
                              )}
                          </ul>
                        </div>
                      </li>
                      {/*end::2 Level*/}
                    </ul>
                  </div>
                ))}
            </li>
          ))}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
