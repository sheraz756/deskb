import React, { useState } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/img/logo.png";

//MUI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Cancel from "@material-ui/icons/Cancel";
import { setToast } from "../../utils/toast";

//axios//Alert
import { permissionError } from "../../utils/Alert";
import axios from "axios";

const handelToggle = () => {
  console.log("data");
  $("html").toggleClass("sidebar-noneoverflow");
  $("body").toggleClass("sidebar-noneoverflow");
  $(".navbar-expand-sm").toggleClass("expand-header");
  $(".main-container ").toggleClass(" sidebar-closed sbar-open");
};

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [errors, setError] = useState({
    title: "",
    image: "",
    description: "",
    type: "",
  });

  const { admin } = useSelector((state) => state.admin);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleInputImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError({
      title: "",
      image: "",
      description: "",
      type: "",
    });
    setTitle("");
    setDescription("");
    setImageData(null);
    setImagePath(null);
    $("#file").val("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !imageData || !imagePath || !type) {
      const errors = {};

      if (!title) {
        errors.title = "Title can't be a blank!";
      }
      if (!description) {
        errors.description = "Description can't be a blank!";
      }

      if (!imageData || !imagePath) {
        errors.image = "Please select an Image!";
      }

      if (!type) {
        errors.type = "Please select type!";
      }

      return setError({ ...errors });
    }

    setError({ ...errors, image: "" });
    setOpen(false);

    const formData = new FormData();
    formData.append("image", imageData);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("notificationType", type);

    axios
      .post("notification/sendNotification", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          setToast("success", "Notification sent successfully!");
          setOpen(false);

          setError({
            title: "",
            image: "",
            description: "",
            type: "",
          });
          setTitle("");
          setDescription("");
          setImageData(null);
          setImagePath(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div class="sub-header-container fixed-top">
        <header class="header navbar navbar-expand-sm align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <a
              href={() => false}
              class="sidebarCollapse"
              data-placement="bottom"
            >
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
                class="feather feather-menu"
                onClick={handelToggle}
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </a>

            <div class="page-header">
              <nav class="breadcrumb-one" aria-label="breadcrumb">
                <Link to="/admin/dashboard">
                  <ol class="breadcrumb ">
                    <li class="breadcrumb-item">
                      <a
                        href={() => false}
                        style={{
                          color: "#e8538f",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        <div className="navLogo">
                          <span style={{ marginRight: "5px" }}>
                            <img src={logo} alt="" width={35} height={35} />
                          </span>
                          <span>Flirtzy</span>
                        </div>
                      </a>
                    </li>
                  </ol>
                </Link>
              </nav>
            </div>
          </div>

          <div>
            <ul class="navbar-nav flex-row ml-auto">
              <li class="nav-item dropdown notification-dropdown mr-1">
                <a
                  href={() => false}
                  class="nav-link dropdown-toggle"
                  onClick={handleClickOpen}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-bell"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span class="badge badge-success"></span>
                </a>
              </li>
              <li class="nav-item more-dropdown ">
                <div class="dropdown  custom-dropdown-icon  ">
                  {/* <Link
                  class="dropdown-toggle btn"
                  data-value="Mail"
                  to="/admin/profile"
                >
                  Profile
                </Link> */}
                  <Link to="/admin/profile">
                    <img
                      src={admin.image}
                      draggable="false"
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50px",
                      }}
                      alt=""
                    />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </header>

        {/* ------------Notification------------- */}
        <Dialog
          open={open}
          aria-labelledby="responsive-dialog-title"
          onClose={handleClose}
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth
          maxWidth="xs"
          style={{
            zIndex: 9999999,
          }}
        >
          <DialogTitle
            id="responsive-dialog-title"
            className="dialogue_background_color"
          >
            <span className="modal-title font-weight-bold h4">
              Notification
            </span>
          </DialogTitle>

          <IconButton
            style={{
              position: "absolute",
              right: 0,
              color: "#664dc9",
            }}
          >
            <Tooltip title="Close" placement="right">
              <Cancel className="modal-title" onClick={handleClose} />
            </Tooltip>
          </IconButton>

          <DialogContent>
            {/* <div  className="modal-body mt-0 px-1 pb-3"> */}
            <div className="d-flex flex-column text-center">
              <form>
                <div className="form-group mt-3">
                  <label className="float-left">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          title: "Title can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          title: "",
                        });
                      }
                    }}
                  />
                  {errors.title && (
                    <div className="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.title}
                      </Typography>
                    </div>
                  )}
                </div>
                <div className="form-group mt-3">
                  <label className="float-left">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          description: "Description can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          description: "",
                        });
                      }
                    }}
                  />
                  {errors.description && (
                    <div className="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.description}
                      </Typography>
                    </div>
                  )}
                </div>

                <div className="form-group mt-3">
                  <label className="float-left">Notification Type</label>
                  <select
                    name="type"
                    className="form-control form-control-line"
                    id="type"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          type: "Notification type is Required!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          type: "",
                        });
                      }
                    }}
                  >
                    <option>Select Type</option>
                    <option>user</option>
                    <option>host</option>
                  </select>
                  {errors.type && (
                    <div className="pl-1 text-left">
                      <Typography
                        variant="caption"
                        color="error"
                        style={{ fontFamily: "Circular-Loom" }}
                      >
                        {errors.type}
                      </Typography>
                    </div>
                  )}
                </div>

                <div className="form-group mt-3 mb-4 pb-3">
                  <label className="float-left">Image</label>
                  <input
                    className="form-control"
                    type="file"
                    id="customFile"
                    required=""
                    accept="image/*"
                    onChange={handleInputImage}
                  />

                  {imagePath ? (
                    <div className="row pl-3">
                      <img
                        src={imagePath}
                        style={{
                          boxShadow: "0 5px 15px 0 rgb(105 103 103 / 0%)",
                          border: "2px solid rgb(105 103 103 / 0%)",
                          borderRadius: "10px !important",
                          marginTop: 10,
                          float: "left",
                          objectFit: "cover",
                          height: "70px",
                          width: "70px",
                        }}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.image}
                      </Typography>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </DialogContent>

          <DialogActions>
            <button
              type="button"
              className="btn dark-icon btn-primary float-right mr-3 mb-3"
              onClick={handleSubmit}
            >
              <i className="ri-send-plane-fill mr-1 fs-6 mb-1"></i>
              Send
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Navbar;
