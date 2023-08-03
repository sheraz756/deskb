import { Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// react dropzone
import ReactDropzone from "react-dropzone";
import { connect, useSelector } from "react-redux";
import { getGiftCategory } from "../../../store/GiftCategory/GiftCategory.action";
import { createGift } from "../../../store/Gift/gift.action";
import { useEffect } from "react";
import { permissionError } from "../../../utils/Alert";

const AddGift = (props) => {
  const { giftCategory } = useSelector((state) => state.giftCategory);
  useEffect(() => {
    props.getGiftCategory();
  }, []);

  const hasPermission = useSelector((state) => state.admin.admin.flag);

  const [coin, setCoin] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [platFormType, setPlatFormType] = useState("");
  const [errors, setError] = useState({
    image: "",
    coin: "",
    category: "",
  });

  const GiftClick = localStorage.getItem("giftClick");
  const categoryDetail = JSON.parse(localStorage.getItem("category"));

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !coin ||
      coin < 0 ||
      (GiftClick !== null && (category === "Select Category" || !category)) ||
      images.length === 0 ||
      !platFormType ||
      platFormType === "Select Package"
    ) {
      const errors = {};

      if (!coin) errors.coin = "Coin is Required!";
      if (coin < 0) errors.coin = "Invalid Coin!";
      if (!platFormType || platFormType === "Select Package")
        errors.platFormType = "Please select a Platform Type !";

      if (images.length === 0) errors.image = "Please select an Image!";

      if (GiftClick !== null && (category === "Select Category" || !category)) {
        errors.category = "Please select a Category!";
      }
      return setError({ ...errors });
    }

    const coinValid = isNumeric(coin);
    if (!coinValid) {
      return setError({ ...errors, coin: "Invalid Coin!" });
    }
    const formData = new FormData();

    formData.append("category", category ? category : categoryDetail?._id);
    formData.append("coin", coin);
    formData.append("platFormType", platFormType);
    for (let i = 0; i < images.length; i++) {
      formData.append("imageVideo", images[i]);
    }
    if (!hasPermission) return permissionError();
    props.createGift(formData);

    setTimeout(() => {
      GiftClick === null && history.push("/admin/giftCategory/gift");
    }, 3000);
  };
  const onPreviewDrop = (files) => {
    setError({ ...errors, image: "" });
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
  const isNumeric = (value) => {
    const val = value === "" ? 0 : value;
    const validNumber = /^\d+$/.test(val);
    return validNumber;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body card-overflow">
              <div class="d-sm-flex align-items-center justify-content-between mb-4"></div>

              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label class="float-left dialog__input__title">
                        Coin
                      </label>
                      <input
                        type="number"
                        className="form-control pe-1"
                        required=""
                        placeholder="20"
                        value={coin}
                        onChange={(e) => {
                          setCoin(e.target.value);
                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              coin: "Coin is Required!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              coin: "",
                            });
                          }
                        }}
                        onKeyPress={handleKeyPress}
                      />
                      {errors.coin && (
                        <div className="ml-2 mt-1">
                          {errors.coin && (
                            <div className="pl-1 text__left">
                              <span className="text-danger">{errors.coin}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label class="float-left dialog__input__title">
                        Category
                      </label>
                      {GiftClick === null ? (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Category Name"
                          value={categoryDetail?.name}
                        />
                      ) : (
                        <>
                          <select
                            class="form-select form-control"
                            aria-label="Default select example"
                            value={category}
                            onChange={(e) => {
                              setCategory(e.target.value);
                              if (e.target.value === "Select Category") {
                                return setError({
                                  ...errors,
                                  category: "Please select a Category!",
                                });
                              } else {
                                return setError({
                                  ...errors,
                                  category: "",
                                });
                              }
                            }}
                          >
                            <option value="Select Category" selected>
                              Select Category
                            </option>
                            {giftCategory.map((category) => {
                              return (
                                <>
                                  <option
                                    className="text-capitalize"
                                    value={category._id}
                                  >
                                    {category?.name}
                                  </option>
                                </>
                              );
                            })}
                          </select>
                          {errors.category && (
                            <div className="ml-2 mt-1">
                              {errors.category && (
                                <div className="pl-1 text__left">
                                  <span className="text-danger">
                                    {errors.category}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="earning"
                      className="dialog__input__title mb-2"
                    >
                      Coin package
                    </label>
                    <select
                      name="type"
                      className="form-control form-control-line"
                      id="type"
                      value={platFormType}
                      onChange={(e) => {
                        setPlatFormType(e.target.value);
                        if (e.target.value == "Select PlatformType") {
                          return setError({
                            ...errors,
                            platFormType: "Please select a Platform Type !",
                          });
                        } else {
                          return setError({
                            ...errors,
                            platFormType: "",
                          });
                        }
                      }}
                      onKeyPress={handleKeyPress}
                    >
                      <option value="Select PlatformType">
                        ---Select Package---
                      </option>

                      <option value="0">Android</option>
                      <option value="1">IOS</option>
                    </select>
                    {errors.platFormType && (
                      <div class="pl-1 text-left">
                        <div className="pl-1 text__left">
                          <span className="text-danger">
                            {errors.platFormType}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row my-4">
                  <div className="col-12 ">
                    <label class="float-left dialog__input__title ">
                      Select (Multiple) Image or GIF
                    </label>

                    <>
                      <ReactDropzone
                        onDrop={(acceptedFiles) => onPreviewDrop(acceptedFiles)}
                        accept="image/*"
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section className="mt-4">
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
                                  style={{ fontSize: 70 }}
                                ></i>
                              </div>
                            </div>
                          </section>
                        )}
                      </ReactDropzone>

                      {errors.image && (
                        <div className="ml-2 mt-1">
                          {errors.image && (
                            <div className="pl-1 text__left">
                              <span className="text-danger">
                                {errors.image}
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

                <div className="mt-5 d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn  btn-success my-3 mx-2"
                    onClick={handleSubmit}
                  >
                    Insert
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger my-3 "
                    onClick={() => {
                      GiftClick === null
                        ? history.push("/admin/giftCategory/gift")
                        : history.push("/admin/gift");
                    }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { createGift, getGiftCategory })(AddGift);
