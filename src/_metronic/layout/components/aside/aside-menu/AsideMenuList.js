/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { GetMenuListsByPermission } from "../../../../../app/modules/Auth/_redux/menu-permission/authMenuPermissionAction";

export function AsideMenuList({ layoutProps }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const getMenuItemActive = (url) => {
    return checkIsActive(location, url)
      ? " menu-item-active menu-item-open "
      : "";
  };

  useEffect(() => {
    dispatch(GetMenuListsByPermission());
  }, [dispatch]);

  const menuList = useSelector((state) => state.menu.menuList);

  console.log('====================================');
  console.log('menuList', menuList);
  console.log('====================================');

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* Modules */}
        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">Modules</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* end:: section */}

        {typeof menuList != 'undefined' &&
          menuList.map((menu, index) => (
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                menu.moduleRouteUrl
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
              key={index}
            >
              <NavLink
                className="menu-link menu-toggle"
                to={menu.moduleRouteUrl}
              >
                <span className="svg-icon menu-icon">
                  <SVG src={toAbsoluteUrl(menu.moduleImageIcon)} />
                </span>
                <span className="menu-text">{menu.moduleName}</span>
                <i className="menu-arrow" />
              </NavLink>

              {/* Sub Menus of Module */}
              {typeof menu.subModules !== 'undefined' && menu.subModules.map((subMenu, subIndex) => (
                <div className="menu-submenu " key={subIndex}>
                  <i className="menu-arrow" />
                  <ul className="menu-subnav">
                    <li
                      className="menu-item  menu-item-parent"
                      aria-haspopup="true"
                    >
                      <span className="menu-link">
                        <span className="menu-text">{menu.menuName}</span>
                      </span>
                    </li>
                    <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive(
                        subMenu.subModuleRouteUrl
                      )}`}
                      aria-haspopup="true"
                      data-menu-toggle="hover"
                    >
                      <NavLink
                        className="menu-link menu-toggle"
                        to="/google-material/inputs"
                      >
                        <i className={subMenu.subModuleIcon}>
                          <span />
                        </i>
                        <span className="menu-text">
                          {subMenu.subModuleName}
                        </span>
                        <i className="menu-arrow" />
                      </NavLink>
                      <div className="menu-submenu ">
                        <i className="menu-arrow" />
                        <ul className="menu-subnav">
                          {subMenu.features.map((featureMenu, featureIndex) => (
                            <li
                              className={`menu-item  ${getMenuItemActive(
                                featureMenu.featureRouteUrl
                              )}`}
                              aria-haspopup="true"
                              key={featureIndex}
                            >
                              <NavLink
                                className="menu-link"
                                to={featureMenu.featureRouteUrl}
                              >
                                <i className={featureMenu.featureIcon}>
                                  <span />
                                </i>
                                <span className="menu-text">
                                  {featureMenu.featureName}
                                </span>
                              </NavLink>
                            </li>
                          ))}
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
