import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { CLOSE_WITHDRAW } from "../../store/withdraw/withdraw.type";

import {
  updateWithdraw,
  createWithdraw,
} from "../../store/withdraw/withdraw.action";
import { baseURL } from "../../utils/Config";
import { permissionError } from "../../utils/Alert";
const WithdrawDialog = (props) => {
  const { dialog: open, dialogData } = useSelector((state) => state.withdraw);
  const hasPermission = useSelector((state) => state.admin.admin.flag);

  const [name, setName] = useState("");

  const [details, setDetails] = useState("");
  const [addDetails, setAddDetails] = useState([]);
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [error, setError] = useState("");

  //   const addDetailsList = (e) => {
  //     e.preventDefault();
  //     setAddDetails((old) => {
  //       return [...old, details];
  //     });
  //     setDetails("");
  //   };

  //   const onRemove = (id) => {
  //     setAddDetails((old) => {
  //       return old.filter((array, index) => {
  //         return index !== id;
  //       });
  //     });
  //   };

  const addDetailsList = (e) => {
    e.preventDefault();
    setAddDetails((old) => {
      return [...old, details];
    });
    setDetails("");
  };

  const onRemove = (id) => {
    setAddDetails((old) => {
      return old.filter((arry, index) => {
        return index !== id;
      });
    });
  };

  useEffect(() => {
    setName(dialogData?.name);
    setImagePath(baseURL + dialogData?.image);
    setAddDetails(dialogData?.details);
  }, [dialogData]);

  useEffect(
    () => () => {
      setName("");
      setImagePath("");

      setAddDetails([]);
      setError({ name: "", details: "", description: "", image: "" });
    },
    [open]
  );

  const handelSubmit = () => {
    if (!name) {
      const error = {};
      if (!name) error.name = "Name is required!";
      if (!details) error.details = "details is required!";

      if (image.length === 0) error.image = "image is required!";
      return setError({ ...error });
    } else {
      const formData = new FormData();
      formData.append("name", name);

      for (let i = 0; i < addDetails.length; i++) {
        formData.append("details", addDetails[i]);
      }

      formData.append("image", image);

      if (dialogData?._id) {
        if (!hasPermission) return permissionError();
        props.updateWithdraw(dialogData?._id, formData);
      } else {
        if (!hasPermission) return permissionError();
        props.createWithdraw(formData);
      }
      handleClose();
    }
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: CLOSE_WITHDRAW });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
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
          <span className="modal-title font-weight-bold h4"> Withdraw </span>
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
                  <label className="mb-2 text-gray">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required=""
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          name: "Name is Required !",
                        });
                      } else {
                        return setError({
                          ...error,
                          name: "",
                        });
                      }
                    }}
                    onKeyPress={handleKeyPress}
                  />
                  {error.name && (
                    <div className="ml-1 mt-1">
                      {error.name && (
                        <div className="pl-1 text__left">
                          <span className="text-danger">{error.name}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <p className="form-label fw-bold mt-1">Details</p>
                </div>

                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="Enter Details"
                    className="form-control mb-2 pe-1 "
                    value={details}
                    onChange={(e) => {
                      setDetails(e.target.value);
                    }}
                  />
                  {details !== "" && (
                    <div
                      className="bg-info px-3 py-3 text-white ml-2 d-flex align-items-center justify-content-center"
                      style={{
                        marginTop: "3px",
                        height: "45px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={addDetailsList}
                    >
                      <span>ADD</span>
                    </div>
                  )}
                </div>
                <div className="mb-2 pe-1">
                  <div className="displayCountry form-control border py-2">
                    {/* <span className="">India <i class="fa-solid fa-circle-xmark"></i></span> */}

                    {addDetails?.map((item, id) => {
                      return (
                        <>
                          <span className="">
                            {item}
                            <i
                              class="fa-solid fa-circle-xmark ms-2"
                              onClick={() => {
                                onRemove(id);
                              }}
                            ></i>
                          </span>
                        </>
                      );
                    })}
                  </div>
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
                      alt="withdraw"
                      draggable="false"
                      className="mt-3 "
                      style={{
                        height: "95px",
                        width: "130px",
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

export default connect(null, { createWithdraw, updateWithdraw })(
  WithdrawDialog
);
