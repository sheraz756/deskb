import React from "react";
import { Link, useHistory } from "react-router-dom";
//MUI
import { makeStyles, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { LOGOUT_ADMIN } from "../../store/Admin/admin.type";
import { warning } from "../../utils/Alert";
import $ from "jquery";

//css
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/plugins.css";
import "../../assets/css/structure.css";

//js
import "../../assets/js/bootstrap/js/bootstrap.min.js";
import "../../assets/js/bootstrap/js/popper.min.js";
import "../../assets/js/custom";
import "../../plugins/perfect-scrollbar/perfect-scrollbar.min.js";

//mui
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import BrandingWatermarkOutlinedIcon from "@material-ui/icons/BrandingWatermarkOutlined";

const useStyles = makeStyles(() => ({
  navLink: {
    "&.active": {
      background: "#e75381",
      boxShadow: "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
      borderRadius: "6px",
    },
    "&.active span": {
      color: "#fff !important",
    },

    "&.active svg": {
      color: "#fff !important",
    },
  },
}));

const Sidebar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = () => {
    const data = warning();
    data
      .then((logout) => {
        if (logout) {
          dispatch({ type: LOGOUT_ADMIN });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleGift = () => {
    localStorage.setItem("giftClick", true);
    localStorage.removeItem("GiftClick");
  };

  $(".dropdown-toggle").click(function () {
    $(".dropdown-toggle").removeClass("active");
    $(this).addClass("active");
    $(".dropdown-toggle").attr("aria-expanded", "false");
  });

  const handleToggle = () => {
    $(".collapse").removeClass("show");
  };

  return (
    <>
      <div className="sidebar-wrapper sidebar-theme">
        <nav id="sidebar">
          <ul
            className="list-unstyled menu-categories ps  pl-2"
            id="accordionExample"
          >
            {/* DashBoard */}
            <Tooltip title="Dashboard" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link
                  to={{
                    pathname: "/admin/dashboard",
                  }}
                  data-toggle="collapse"
                  className={`dropdown-toggle ${classes.navLink} `}
                >
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-home"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>Dashboard</span>
                  </div>
                </Link>
              </li>
            </Tooltip>

            {/* User */}
            <Tooltip title="User" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link
                  data-toggle="collapse"
                  to={{
                    pathname: "/admin/user",
                  }}
                  className={`dropdown-toggle ${classes.navLink}`}
                >
                  <div className>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-user"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>User</span>
                  </div>
                </Link>
              </li>
            </Tooltip>
            {/* host Request */}

            <Tooltip title="Host Request" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link
                  to="/admin/hostRequest"
                  className={`dropdown-toggle ${classes.navLink}`}
                  data-toggle="collapse"
                >
                  <div className>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-user"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Host Request</span>
                  </div>
                </Link>
              </li>
            </Tooltip>
            {/* host */}

            <Tooltip title="Host" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link
                  to="/admin/host"
                  className={`dropdown-toggle ${classes.navLink}`}
                  data-toggle="collapse"
                >
                  <div class="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-user-plus"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <line x1="20" y1="8" x2="20" y2="14"></line>
                      <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                    <circle cx="12" cy="7" r="4"></circle>
                    <span>Host</span>
                  </div>
                </Link>
              </li>
            </Tooltip>

            {/*  Plan */}

            <li className="menu">
              <a href="#app" data-toggle="collapse" className="dropdown-toggle">
                <div style={{ paddingRight: "10px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-dollar-sign"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  <span>Plan</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </a>
              <ul
                className="collapse submenu list-unstyled"
                id="app"
                data-parent="#accordionExample"
              >
                <Tooltip title="Coin Plan" placement="right">
                  <li>
                    <Link
                      to={{ pathname: "/admin/coinPlan" }}
                      className={`dropdown-toggle  my-1 ${classes.navLink}`}
                      data-toggle="collapse"
                    >
                      Coin Plan
                    </Link>
                  </li>
                </Tooltip>

                <Tooltip title="Purchase Plan" placement="right">
                  <li>
                    <Link
                      to={{
                        pathname: "/admin/purchasePlan",
                      }}
                      className={`dropdown-toggle  my-1 ${classes.navLink}`}
                      data-toggle="collapse"
                      onClick={handleGift}
                    >
                      Purchase Plan
                    </Link>
                  </li>
                </Tooltip>
              </ul>
            </li>

         
            {/*Banner  */}

            <Tooltip title="Banner" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link
                  to="/admin/banner"
                  className={`dropdown-toggle ${classes.navLink}`}
                  data-toggle="collapse"
                >
                  <div className="">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span>Banner</span>
                  </div>
                </Link>
              </li>
            </Tooltip>

            {/* sticker */}

            <Tooltip title="Sticker" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link
                  to="/admin/sticker"
                  className={`dropdown-toggle ${classes.navLink}`}
                  data-toggle="collapse"
                >
                  <div className="">
                    {/* <svg
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#a2b2d1"
                        stroke="none"
                      >
                        <path
                          d="M2370 5100 c-756 -78 -1398 -439 -1851 -1043 -288 -383 -463 -842
-509 -1332 -58 -628 131 -1283 519 -1800 96 -127 306 -343 436 -448 199 -160
474 -322 657 -386 165 -57 288 -75 518 -75 278 -1 470 31 733 119 489 163 930
461 1371 925 686 721 994 1555 834 2255 -38 169 -156 416 -299 630 -259 386
-607 691 -1024 895 -269 131 -493 201 -790 246 -119 18 -475 26 -595 14z m461
-320 c634 -64 1226 -398 1608 -907 98 -131 192 -288 252 -423 44 -97 49 -117
60 -231 30 -300 -43 -450 -273 -562 -51 -25 -192 -80 -313 -122 -121 -43 -267
-98 -325 -122 -437 -186 -715 -449 -938 -889 l-67 -133 -70 -13 c-107 -20
-371 -17 -480 6 -349 72 -654 279 -850 577 -67 101 -92 122 -157 134 -72 14
-159 -48 -174 -124 -11 -54 6 -100 78 -209 98 -147 293 -342 441 -440 276
-183 541 -267 885 -280 l172 -7 -79 -160 c-159 -323 -280 -459 -455 -510 -47
-14 -84 -16 -175 -12 -145 6 -254 36 -406 113 -433 220 -789 581 -1005 1019
-271 549 -312 1159 -119 1740 243 731 851 1300 1591 1489 122 31 284 61 383
69 93 8 320 6 416 -3z m1874 -2392 c-69 -242 -273 -606 -497 -884 -335 -417
-756 -762 -1170 -959 -105 -49 -318 -130 -318 -120 0 3 15 28 34 57 65 103
146 266 266 538 67 151 146 322 176 380 213 404 465 615 929 781 308 109 426
154 495 190 89 45 93 46 85 17z"
                        />
                        <path
                          d="M1685 3581 c-92 -24 -173 -91 -216 -176 -35 -72 -35 -198 0 -270 32
-63 92 -124 156 -155 41 -20 65 -25 135 -24 72 0 93 4 137 27 116 60 178 160
178 287 0 126 -63 228 -176 286 -55 27 -159 40 -214 25z"
                        />
                        <path
                          d="M3285 3581 c-92 -24 -173 -91 -216 -176 -20 -41 -24 -65 -24 -135 0
-102 22 -157 87 -222 69 -70 127 -93 228 -93 72 1 93 5 137 28 29 15 69 43 89
64 120 120 120 324 -1 447 -71 72 -207 112 -300 87z"
                        />
                      </g>
                    </svg> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#a2b2d1"
                        d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                      />
                    </svg>

                    <span>Sticker</span>
                  </div>
                </Link>
              </li>
            </Tooltip>

            {/*  Gift */}

            <li className="menu">
              <a
                href="#forms"
                data-toggle="collapse"
                className="dropdown-toggle"
                onClick={handleGift}
              >
                <div style={{ paddingRight: "10px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-gift"
                  >
                    <polyline points="20 12 20 22 4 22 4 12"></polyline>
                    <rect x="2" y="7" width="20" height="5"></rect>
                    <line x1="12" y1="22" x2="12" y2="7"></line>
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                  </svg>
                  <span>Gift</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </a>
              <ul
                className="collapse submenu list-unstyled"
                id="forms"
                data-parent="#accordionExample"
              >
                <Tooltip title="Category" placement="right">
                  <li>
                    <Link
                      to={{ pathname: "/admin/giftCategory" }}
                      onClick={handleGift}
                      className={`dropdown-toggle  my-1 ${classes.navLink}`}
                      data-toggle="collapse"
                    >
                      Category
                    </Link>
                  </li>
                </Tooltip>

                <Tooltip title="gift" placement="right">
                  <li>
                    <Link
                      to={{
                        pathname: "/admin/gift",
                      }}
                      className={`dropdown-toggle  my-1 ${classes.navLink}`}
                      data-toggle="collapse"
                      onClick={handleGift}
                    >
                      Gift
                    </Link>
                  </li>
                </Tooltip>
              </ul>
            </li>

             {/* complain */}

             <li class="menu">
              <a
                href="#elements"
                data-toggle="collapse"
                class="dropdown-toggle"
              >
                <div style={{ paddingRight: "10px" }}>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="css-i6dzq1"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <span>Complain</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-chevron-right "
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </a>
              <ul
                class="collapse submenu list-unstyled"
                id="elements"
                data-parent="#accordionExample"
              >
                <Tooltip title="Complain Pending" placement="right">
                  <li>
                    <Link
                      to="/admin/pendingComplaint"
                      className={`dropdown-toggle   my-1 ${classes.navLink}`}
                      data-toggle="collapse"
                    >
                      Pending
                    </Link>
                  </li>
                </Tooltip>
                <Tooltip title="Complain Solve" placement="right">
                  <li>
                    <Link
                      to="/admin/solvedComplaint"
                      className={`dropdown-toggle  my-1 ${classes.navLink}`}
                      data-toggle="collapse"
                    >
                      Solve
                    </Link>
                  </li>
                </Tooltip>
              </ul>
            </li>
            {/* redeem */}

            <li class="menu">
              <a href="#pages" data-toggle="collapse" class="dropdown-toggle">
                <div style={{ paddingRight: "10px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-key"
                  >
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                  </svg>
                  <span>Redeem</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-chevron-right "
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </a>
              <ul
                class="collapse submenu list-unstyled my-1"
                id="pages"
                data-parent="#accordionExample"
              >
                <Tooltip title="Complain Pending" placement="right">
                  <li>
                    <Link
                      to="/admin/pendingRedeem"
                      className={`dropdown-toggle  my-1 ${classes.navLink}`}
                      data-toggle="collapse"
                    >
                      Pending
                    </Link>
                  </li>
                </Tooltip>
                <Tooltip title="Complain Solve" placement="right">
                  <li>
                    <Link
                      to="/admin/acceptedRedeem"
                      className={`dropdown-toggle  my-1 ${classes.navLink}`}
                      data-toggle="collapse"
                    >
                      Accepted
                    </Link>
                  </li>
                </Tooltip>
                <Tooltip title="Complain Solve" placement="right">
                  <li>
                    <Link
                      to="/admin/declinedRedeem"
                      className={`dropdown-toggle ${classes.navLink}`}
                      data-toggle="collapse"
                    >
                      Declined
                    </Link>
                  </li>
                </Tooltip>
              </ul>
            </li>

   {/* withdraw */}

   <Tooltip title="Withdraw" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link
                  to="/admin/withdraw"
                  className={`dropdown-toggle ${classes.navLink}`}
                  data-toggle="collapse"
                >
                  <div className="">
                   
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      width="24"
                      height="24"
                    >
                      <path  fill="#a2b2d1" d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64H337.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64h64V320zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" />
                    </svg>
                    <span>Withdraw</span>
                  </div>
                </Link>
              </li>
            </Tooltip>

           

            {/* profile */}

            <Tooltip title="Profile" placement="right">
              <li className="menu" onClick={handleToggle}>
                <Link to="/admin/profile" className="dropdown-toggle">
                  <div class="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-trello"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <rect x="7" y="7" width="3" height="9"></rect>
                      <rect x="14" y="7" width="3" height="5"></rect>
                    </svg>

                    <span>Profile</span>
                  </div>
                </Link>
              </li>
            </Tooltip>

            {/* setting  */}
            {/* <li className="menu">
              <Link to="/admin/setting" className="dropdown-toggle">
                <div className>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-settings"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <span>Setting</span>
                </div>
              </Link>
            </li> */}

            <li class="menu">
              <a
                href="#components"
                data-toggle="collapse"
                class="dropdown-toggle gift"
              >
                <div style={{ paddingRight: "10px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-settings"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <span>Setting</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-chevron-right "
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </a>
              <ul
                class="collapse submenu list-unstyled"
                id="components"
                data-parent="#accordionExample"
              >
                <Tooltip title="App Setting" placement="right">
                  <li>
                    <Link
                      to="/admin/appSetting"
                      data-toggle="collapse"
                      className={`dropdown-toggle  my-1 ${classes.navLink}`}
                    >
                      App Setting
                    </Link>
                  </li>
                </Tooltip>

                <Tooltip title="Payment Setting" placement="right">
                  <li>
                    <Link
                      to="/admin/paymentSetting"
                      className={`dropdown-toggle   my-1 ${classes.navLink}`}
                      data-toggle="collapse"
                    >
                      Payment Setting
                    </Link>
                  </li>
                </Tooltip>
                {/* <li>
                  <a href="/admin/solvedComplaint"> Solve </a>
                </li> */}
              </ul>
            </li>
            <Tooltip title="Logout" placement="right">
              <li className="menu">
                <Link onClick={handleLogout} className="dropdown-toggle">
                  <div className>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>logout</span>
                  </div>
                </Link>
              </li>
            </Tooltip>
          </ul>
          {/* <div class="shadow-bottom"></div> */}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
