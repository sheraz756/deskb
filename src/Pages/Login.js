import React, { useState } from "react";
import { connect } from "react-redux";
import "../assets/css/authentication/form-2.css";
import { loginAdmin } from "../store/Admin/admin.action";

import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      let error = {};
      if (!email) error.email = "Email Is Required !";
      if (!password) error.password = "password is required !";
      return setError({ ...error });
    } else {
      let login = {
        email,
        password,
      };

      props.loginAdmin(login);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <div class="form-container outer">
        <div class="form-form">
          <div class="form-form-wrap">
            <div class="form-container">
              <div class="form-content" style={{ backgroundColor: "#312a44" }}>
                <div>
                  <img
                    src={logo}
                    style={{
                      width: "120px",
                      height: "120px",
                    }}
                    alt=""
                    className="mx-auto"
                    draggable="false"
                  />
                </div>
                <h2 class="fw-bold mt-2">Log in to Flirtzy</h2>
                {/* <h6 className="text-muted">
                  Enter your email and password to access admin panel.
                </h6> */}

                <form class="text-left">
                  <div class="form">
                    <div id="username-field" class="field-wrapper input">
                      <label for="username" style={{ fontSize: "15px" }}>
                        Email
                      </label>

                      <input
                        className="text-white"
                        id="username"
                        name="username"
                        type="Email"
                        class="form-control p-3"
                        placeholder="email"
                        onChange={(e) => {
                          setEmail(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...error,
                              email: "Email is required !",
                            });
                          } else {
                            return setError({
                              ...error,
                              email: "",
                            });
                          }
                        }}
                        onKeyPress={handleKeyPress}
                      />
                      {error.email && (
                        <span className="text-danger">{error.email}</span>
                      )}
                    </div>

                    <div id="password-field" class="field-wrapper input mb-2">
                      <div class="d-flex justify-content-between">
                        <label for="password" style={{ fontSize: "15px" }}>
                          Password
                        </label>
                      </div>

                      <input
                        className="text-white"
                        id="password"
                        name="password"
                        type="password"
                        class="form-control p-3"
                        placeholder="Password"
                        onChange={(e) => {
                          setPassword(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...error,
                              password: "password is required !",
                            });
                          } else {
                            return setError({
                              ...error,
                              password: "",
                            });
                          }
                        }}
                        onKeyPress={handleKeyPress}
                      />
                      {error.password && (
                        <span className="text-danger">{error.password}</span>
                      )}
                    </div>

                    <div className="row mb-2">
                      {/* <div className="col-md-6 col-12">
                        <Link to="/code" style={{ fontSize: "15px" }}>
                          {" "}
                          Update Purchase Code
                        </Link>
                      </div> */}
                      <div className="col-md-6 col-12 ">
                        <Link to="/login" style={{ fontSize: "15px" }}>
                          {" "}
                          Forgot Password
                        </Link>
                      </div>
                    </div>

                    <div class="d-sm-flex justify-content-between">
                      <div class="field-wrapper">
                        <button
                          type="button"
                          class="btn text-white btnSubmit"
                          onClick={handleSubmit}
                          value=""
                        >
                          Log In
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { loginAdmin })(Login);