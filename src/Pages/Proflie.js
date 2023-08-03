import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProfile,
  updateImage,
  profileUpdate,
  ChangePassword,
} from "../store/Admin/admin.action";

//toast
import { setToast } from "../utils/toast";

import $ from "jquery";
import { permissionError } from "../utils/Alert";

const Proflie = (props) => {
  const admin = useSelector((state) => state.admin.admin);
  const hasPermission = useSelector((state) => state.admin.admin.flag);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [type, setType] = useState("Profile");

  useEffect(() => {
    props.getProfile(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setName(admin.name);
    setEmail(admin.email);
    setImagePath(admin.image);
    setError({ name: "", email: "" });
  }, [admin]);

  const handleEditName = () => {
    if (!name || !email) {
      let error = {};
      if (!name) error.name = "name is required !";
      if (!email) error.email = "email is required !";
      return setError({ ...error });
    } else {
      let data = {
        name,
        email,
      };
      if (!hasPermission) return permissionError();
      props.profileUpdate(data);
    }
  };
  const handleUploadImage = (e) => {
    setImage(e.target.files[0]);
    setImagePath(URL.createObjectURL(e.target.files[0]));
  };

  const handleChangeImage = () => {
    if (image.length === 0) {
      setToast("info", "Please select image");
    } else {
      const formData = new FormData();
      formData.append("image", image);
      if (!hasPermission) return permissionError();
      props.updateImage(formData);
    }
  };

  const handleChangePassword = () => {
    if (!newPassword || !currentPassword || newPassword !== currentPassword) {
      let error = {};

      if (!newPassword) error.newPassword = "New Password Is Required !";
      if (!currentPassword)
        error.currentPassword = "confirm Password Is Required !";
      if (newPassword !== currentPassword)
        setToast("info", "New Password and Confirm Password doesn't match");

      return setError({ ...error });
    } else {
      let data = {
        confirmPass: currentPassword,
        newPass: newPassword,
      };
      if (!hasPermission) return permissionError();
      props.ChangePassword(admin.id, data);
    }
  };

  const handlePrevious = (url) => {
    window.open(url, "_blank");
  };

  const handleToggleType = (type) => {
    setType(type);
    $(document).on("click", ".user", function () {
      $(".user").removeClass("userEdit");
      $(this).addClass("userEdit");
    });
  };
  return (
    <>
      <div className="row py-2">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <h4>Profile</h4>
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 col-12 ">
          <div class="breadcrumb-four float-right">
            <ul class="breadcrumb">
              <li>
                <Link to="/admin/dashboard">
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
                </Link>
              </li>

              <li class="active">
                <a href={() => false}> Profile </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3 ">
          <div className="card">
            <div className="card-body ">
              <div className="position-relative">
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={(e) => handleUploadImage(e)}
                />
                <img
                  src={imagePath}
                  alt="admin"
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "50%",
                  }}
                  className="mx-auto p-1 border "
                  onClick={() => handlePrevious(imagePath)}
                />
                <div
                  className="position-absolute"
                  style={{ bottom: "1%", right: "33%" }}
                >
                  <div
                    style={{
                      background: "#1f1c30",
                      borderRadius: "50px",
                      height: "29px",
                    }}
                  >
                    <label for="file-input">
                      <i
                        class="fa-solid fa-camera d-flex justify-content-center  rounded-circle  p-2 cursorPointer"
                        style={{
                          fontSize: "15px",
                          color: "#ffff",
                          cursor: "pointer",
                        }}
                      ></i>
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-center my-4 pb-4 border-bottom ">
                <h2> {admin.name}</h2>
                <div className="mt-4">
                  <button
                    onClick={handleChangeImage}
                    className="text-end btn btn-info ml-2"
                  >
                    Upload Image
                  </button>
                </div>
              </div>

              <div style={{ color: "3c333de" }}>
                <ul
                  style={{
                    listStyle: "none",
                    fontSize: "15px",
                    paddingLeft: "10px",
                  }}
                >
                  <li
                    className="mt-2 user userEdit"
                    onClick={() => handleToggleType("Profile")}
                  >
                    <span>
                      <i className="fa fa-edit pr-4"></i>
                    </span>
                    <span>Edit Profile</span>
                  </li>

                  <li
                    className="mt-2 user "
                    onClick={() => handleToggleType("password")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>
                      <i className="fa fa-key pr-4"></i>
                    </span>
                    <span>Change Password</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xxl-9 ">
          <div className="row">
            <div className="col-12">
              <div className="card" style={{ height: "500px" }}>
                <div className="card-body">
                  {type === "Profile" && (
                    <>
                      <h4 className=" profile_box pb-2 my-3">Edit Profile</h4>
                      <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7 mx-auto my-5">
                        <div className="form-group  mr-4 mt-3">
                          <div className="mb-3">
                            <label
                              className="mb-2 text-gray ml-3"
                              style={{ fontSize: "18px" }}
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              placeholder="name"
                              className="form-control"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                if (!e.target.value) {
                                  return setError({
                                    ...error,
                                    name: "name is required !",
                                  });
                                } else {
                                  return setError({
                                    ...error,
                                    name: "",
                                  });
                                }
                              }}
                            />
                            {error.name && (
                              <span className="text-danger">{error.name}</span>
                            )}
                          </div>
                        </div>
                        <div className="form-group  mr-4">
                          <div className="mb-2">
                            <label
                              className="mb-2 text-gray ml-3"
                              style={{ fontSize: "18px" }}
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              placeholder="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (!e.target.value) {
                                  return setError({
                                    ...error,
                                    email: "email is required !",
                                  });
                                } else {
                                  return setError({
                                    ...error,
                                    email: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          {error.email && (
                            <span className="text-danger">{error.email}</span>
                          )}
                        </div>
                        <div className="d-flex flex-row-reverse mr-4 mt-4">
                          <button
                            onClick={handleEditName}
                            className="text-end btn btn-success"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {type === "password" && (
                    <>
                      <h4 className="profile_box pb-2 my-3">
                        Password Settings
                      </h4>
                      <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7 mx-auto">
                        {/* <div className="form-group ">
                          <div className="my-3">
                            <label className="mb-2 text-gray ml-3">
                              Old Password
                            </label>
                            <input
                              type="password"
                              placeholder="Old Password"
                              className="form-control"
                              onChange={(e) => {
                                setOldPassword(e.target.value);
                                if (!e.target.value) {
                                  return setError({
                                    ...error,
                                    oldPassword: "old Password is required !",
                                  });
                                } else {
                                  return setError({
                                    ...error,
                                    oldPassword: "",
                                  });
                                }
                              }}
                            />
                            {error.oldPassword && (
                              <span className="text-danger">
                                {error.oldPassword}
                              </span>
                            )}
                          </div>
                        </div> */}
                        <div className="form-group mt-4 ">
                          <div className="mb-2 my-4">
                            <label
                              className="mb-2 text-gray ml-3"
                              style={{ fontSize: "18px" }}
                            >
                              New Password
                            </label>
                            <input
                              type="password"
                              placeholder="New Password"
                              className="form-control"
                              style={{ color: "#7a9f9b" }}
                              onChange={(e) => {
                                setNewPassword(e.target.value);
                                if (!e.target.value) {
                                  return setError({
                                    ...error,
                                    newPassword: "New Password is required !",
                                  });
                                } else {
                                  return setError({
                                    ...error,
                                    newPassword: "",
                                  });
                                }
                              }}
                            />
                            {error.newPassword && (
                              <span className="text-danger">
                                {error.newPassword}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="form-group ">
                          <div className="mb-2">
                            <label
                              className="mb-2 text-gray ml-3"
                              style={{ fontSize: "18px" }}
                            >
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              placeholder="Confirm Password"
                              className="form-control"
                              onChange={(e) => {
                                setCurrentPassword(e.target.value);
                                if (!e.target.value) {
                                  return setError({
                                    ...error,
                                    currentPassword:
                                      "Confirm Password is required !",
                                  });
                                } else {
                                  return setError({
                                    ...error,
                                    currentPassword: "",
                                  });
                                }
                              }}
                            />
                            {error.currentPassword && (
                              <span className="text-danger">
                                {error.currentPassword}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row-reverse mt-4">
                          <button
                            onClick={handleChangePassword}
                            className="text-end btn btn-success "
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  getProfile,
  updateImage,
  profileUpdate,
  ChangePassword,
})(Proflie);
