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
import { connect, useDispatch, useSelector } from "react-redux";
import { CLOSE_STICKER } from "../../store/Sticker/Sticker.type";
import ReactDropzone from "react-dropzone";
import { useEffect } from "react";
import { editSticker, createSticker } from "../../store/Sticker/Sticker.action";
import { baseURL } from "../../utils/Config";
import { permissionError } from "../../utils/Alert";

const StickerDialog = (props) => {
  const { dialog: open, dialogData } = useSelector((state) => state.sticker);
  const hasPermission = useSelector((state) => state.admin.admin.flag);
  const [type, setType] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState("");

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: CLOSE_STICKER });
  };

  useEffect(() => {
    if (dialogData) {
      setImagePath(baseURL + dialogData?.sticker);
      setType(dialogData?.type);
    } else {
      setImagePath("");
      setType("");
      setImages([]);
      setImage([]);
      setError({ image: "", images: "", type: "" });
    }
  }, [dialogData]);

  const handelSubmit = (e) => {
    if (!dialogData) {
      if (!type || type === "select Type") {
        let error = {};
        if (!type || type === "select Type") error.type = "type Is Required !";
        if (images.length === 0) error.image = "Sticker is Required!";

        return setError({ ...error });
      }
    } else {
      if (!type || type === "select Type") {
        let error = {};
        if (!type || type === "select Type") error.type = "type Is Required !";
        if (!image && !imagePath) error.image = "Sticker is Required!";
        return setError({ ...error });
      }
    }

    const formData = new FormData();

    if (!dialogData) {
      for (let i = 0; i < images.length; i++) {
        formData.append("sticker", images[i]);
      }
      formData.append("type", type);
      if (!hasPermission) return permissionError();
      props.createSticker(formData);
      handleClose();
    } else {
      formData.append("sticker", image);
      if (!hasPermission) return permissionError();
      props.editSticker(formData, dialogData?._id);
      formData.append("type", type);

      handleClose();
    }
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

  const onPreviewDrop = (files) => {
    setError({ ...error, image: "" });
    files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages(images.concat(files));
  };

  const removeImage = (file) => {
    if (file.preview) {
      const image = images.filter((ele) => {
        return ele.preview !== file.preview;
      });
      setImages(image);
    }
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
          <span className="modal-title font-weight-bold h4"> Sticker </span>
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
                  <label className="mb-2 text-gray">Type</label>
                  <select
                    type="text"
                    className="form-control"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                      if (e.target.value === "select Type") {
                        return setError({
                          ...error,
                          type: "Type is Required !",
                        });
                      } else {
                        return setError({
                          ...error,
                          type: "",
                        });
                      }
                    }}
                    onKeyPress={handleKeyPress}
                  >
                    <option value="select Type">Select Type</option>
                    <option value="love">Love</option>
                    <option value="emoji">Emojis</option>
                  </select>
                  {error.type && (
                    <div className="ml-1 mt-1">
                      {error.type && (
                        <div className="pl-1 text__left">
                          <span className="text-danger">{error.type}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {!dialogData ? (
                  <>
                    <div className="row mt-4">
                      <div className="col-6">
                        <label class="float-left dialog__input__title ">
                          Select (Multiple) Image or Sticker
                        </label>

                        <>
                          <ReactDropzone
                            onDrop={(acceptedFiles) =>
                              onPreviewDrop(acceptedFiles)
                            }
                            accept="image/*"
                          >
                            {({ getRootProps, getInputProps }) => (
                              <section className="m-4">
                                <div {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  <div
                                    style={{
                                      height: 130,
                                      width: 130,
                                      border: "2px dashed gray",
                                      textAlign: "center",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <i
                                      className="fas fa-plus"
                                      style={{ paddingTop: 30, fontSize: 70 }}
                                    ></i>
                                  </div>
                                </div>
                              </section>
                            )}
                          </ReactDropzone>

                          {error.image && (
                            <div className="ml-2 mt-1">
                              {error.image && (
                                <div className="pl-1 text__left">
                                  <span className="text-danger">
                                    {error.image}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      </div>
                      <div className="col-lg-6 mt-4">
                        {images.length > 0 && (
                          <>
                            {images.map((file, index) => {
                              return (
                                file.type?.split("image")[0] === "" && (
                                  <>
                                    <img
                                      height="60px"
                                      width="60px"
                                      alt="app"
                                      src={file.preview}
                                      style={{
                                        boxShadow:
                                          "0 5px 15px 0 rgb(105 103 103 / 00%)",
                                        border: "2px solid #fff",
                                        borderRadius: 10,
                                        marginTop: 10,
                                        float: "left",
                                        objectFit: "contain",
                                        marginRight: 15,
                                      }}
                                      draggable="false"
                                    />
                                    <div
                                      class="img-container"
                                      style={{
                                        display: "inline",
                                        position: "relative",
                                        float: "left",
                                      }}
                                    >
                                      <i
                                        class="fas fa-times-circle text-danger"
                                        style={{
                                          position: "absolute",
                                          right: "10px",
                                          top: "4px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => removeImage(file)}
                                      ></i>
                                    </div>
                                  </>
                                )
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
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
                          alt="sticker"
                          draggable="false"
                          className="mt-3"
                          width="148"
                          height="80"
                          style={{
                            borderRadius: "12px",
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
                  </>
                )}

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

export default connect(null, { editSticker, createSticker })(StickerDialog);
