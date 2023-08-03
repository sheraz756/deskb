import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

import "../assets/css/custom.css";

const Error404 = () => {
  return (
    <>
      <div className="error404 text-center">
        <div
          class="container-fluid error-content d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <div class="">
            <div className="names">
              <img src={logo} alt="" />
            </div>
            <h1 class="error-number" style={{ color: "#F94C84" }}>
              404
            </h1>
            <p class="mini-text">Oops!</p>
            <p class="error-text mb-4 mt-1">
              The page you requested was not found!
            </p>
            <Link to="/" class="btn btn-primary mt-5">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
