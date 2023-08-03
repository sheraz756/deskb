import React from "react";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { CLOSE_BANNER } from "../../store/Banner/banner.type";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { useEffect } from "react";
import { baseURL } from "../../utils/Config";
import { createBanner, editBanner } from "../../store/Banner/banner.action";

//toast
import { setToast } from "../../utils/toast";

import { permissionError } from "../../utils/Alert";

const BannerDialog = (props) => {
  const { dialog: open, dialogData } = useSelector((state) => state.banner);
  const hasPermission = useSelector((state) => state.admin.admin.flag);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUrl(dialogData?.url);
    setImagePath(baseURL + dialogData?.image);
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        url: "",
        imagePath: "",
      });
      setUrl("");
      setImagePath("");
      setImage([]);
    },
    [open]
  );

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: CLOSE_BANNER });
  };

  const handelSubmit = () => {
    if (!url || !imagePath) {
      let error = {};
      if (!url) error.url = "url is Required!";
      if (image.length === 0) error.image = "image is required!";
      return setError({ ...error });
    } else {
      const formData = new FormData();
      formData.append("url", url);
      formData.append("image", image);
      if (dialogData?._id) {
        if (image.length === 0) {
          setToast("info", "Please enter url or image");
        } else {
          if (!hasPermission) return permissionError();
          props.editBanner(formData, dialogData?._id);
        }
      } else {
        if (!hasPermission) return permissionError();
        props.createBanner(formData);
      }
    }
    handleClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handelSubmit();
    }
  };

  // show dialog image
  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImagePath(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="dialogue_background_color"
        >
          <span className="modal-title font-weight-bold h4"> Banner </span>
        </DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          <Tooltip title="Close">
            <Cancel className="modal-title" onClick={handleClose} />
          </Tooltip>
        </IconButton>
        <DialogContent className="dialogue_background_color">
          <div className="modal-body pt-1 px-1 pb-3">
            <div className="d-flex flex-column">
              <form>
                <div className="form-group ">
                  <label className="mb-2 text-gray">Url</label>
                  <input
                    type="text"
                    className="form-control"
                    required=""
                    placeholder="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          url: "Url is Required !",
                        });
                      } else {
                        return setError({
                          ...error,
                          url: "",
                        });
                      }
                    }}
                    onKeyPress={handleKeyPress}
                  />
                  {error.url && (
                    <div className="ml-1 mt-1">
                      {error.url && (
                        <div className="pl-1 text__left">
                          <span className="text-danger">{error.url}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <div className="form-group mb-0">
                    <p className="form-label fw-bold mt-3">Image</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control "
                    autocomplete="off"
                    onChange={(e) => handleImage(e)}
                    onKeyPress={handleKeyPress}
                  />
                  {imagePath && (
                    <img
                      src={imagePath}
                      alt="banner"
                      draggable="false"
                      className="mt-3 "
                      width="150"
                      height="95"
                      style={{
                        borderRadius: "12px",
                        display: "block",
                      }}
                    />
                  )}
                  {error.image && (
                    <div className="ml-1 mt-1">
                      {error.image && (
                        <div className="pl-1 text__left">
                          <span className="text-danger">{error.image}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-5 float-right">
                  {dialogData ? (
                    <button
                      type="button"
                      class="btn btn-info px-3"
                      onClick={handelSubmit}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="btn btn-info px-3"
                      onClick={handelSubmit}
                    >
                      Insert
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn ml-2 btn-danger px-3"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default connect(null, { createBanner, editBanner })(BannerDialog);
