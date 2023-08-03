import React from "react";
//MUI
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { CLOSE_GIFT_DIALOG } from "../../../store/Gift/gift.type";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGiftCategory } from "../../../store/GiftCategory/GiftCategory.action";
import { useState } from "react";
import { updateGift } from "../../../store/Gift/gift.action";

import { baseURL } from "../../../utils/Config";
import { permissionError } from "../../../utils/Alert";

function EditGift(props) {
  const [mongoId, setMongoId] = useState("");
  const [coin, setCoin] = useState("");
  const [category, setCategory] = useState("");
  const [platFormType, setPlatFormType] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [errors, setError] = useState("");
  const { dialogOpen: open, dialogData } = useSelector((state) => state.gift);
  const { giftCategory } = useSelector((state) => state.giftCategory);
  const hasPermission = useSelector((state) => state.admin.admin.flag);
  useEffect(() => {
    props.getGiftCategory();
  }, []);

  useEffect(() => {
    window.onbeforeunload = closePopup();
  }, []);

  useEffect(() => {
    setMongoId(dialogData?._id);
    setCoin(dialogData?.coin);
    setCategory(dialogData?.category);
    setPlatFormType(dialogData?.platFormType);
    setImagePath(baseURL + dialogData?.image);
  }, [dialogData]);

  const dispatch = useDispatch();
  const closePopup = () => {
    dispatch({ type: CLOSE_GIFT_DIALOG });
  };
  const GiftClick = localStorage.getItem("giftClick");

  const categoryDetail = JSON.parse(localStorage.getItem("category"));

  const HandleInputImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (!imageData && !imagePath) ||
      !coin ||
      platFormType === "Select PlatformType" ||
      (GiftClick !== null && (!category || category === "Select Category"))
    ) {
      let errors = {};
      if (!coin) errors.coin = "Coin is Required!";
      if (platFormType === "Select PlatformType")
        errors.platFormType = "Please select a Platform Type!";
      if (!imageData && !imagePath) errors.image = "Please select an Image!";

      if (GiftClick !== null && (category === "Select Category" || !category)) {
        errors.category = "Please select a Category!";
      }
      setError({ ...errors });
    } else {
      const coinValid = isNumeric(coin);
      if (!coinValid) {
        return setError({ ...errors, coin: "Invalid Coin!!" });
      }
      const formData = new FormData();

      formData.append("image", imageData);
      formData.append("coin", coin);
      GiftClick !== null && formData.append("category", category);
      formData.append("platFormType", platFormType);
      if (!hasPermission) return permissionError();
      props.updateGift(mongoId, formData);
      closePopup();
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
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      onClose={closePopup}
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
        <span className="modal-title font-weight-bold h4"> Gift </span>
      </DialogTitle>

      <IconButton
        style={{
          position: "absolute",
          right: 0,
          color: "#664dc9",
        }}
      >
        <Tooltip title="Close" placement="right">
          <Cancel className="modal-title cancelButton" onClick={closePopup} />
        </Tooltip>
      </IconButton>
      <DialogContent className="dialogue_background_color">
        <div className="modal-body pt-1 px-1 pb-3">
          <div className="d-flex flex-column">
            <form>
              <div className="row">
                <div className="col-md-12 my-2">
                  <label className="mb-2 dialog__input__title">Coin</label>
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
                          <span style={{ color: "#009688" }}>
                            {errors.coin}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="col-md-12 my-2">
                  <label className="dialog__input__title mb-2">Category</label>
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
                        onKeyPress={handleKeyPress}
                      >
                        <option value="Select Category" selected>
                          Select Category
                        </option>
                        {giftCategory.map((category) => {
                          return (
                            <>
                              <option value={category._id}>
                                {category.name}
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
                <div className="col-md-12">
                  <label
                    htmlFor="earning"
                    className="dialog__input__title mb-2"
                  >
                    Gift package
                  </label>
                  <select
                    name="type"
                    class="form-control form-control-line"
                    id="type"
                    value={platFormType}
                    onChange={(e) => {
                      setPlatFormType(e.target.value);

                      if (e.target.value === "Select PlatformType") {
                        return setError({
                          ...errors,
                          platFormType: "Please select a Platform Type!",
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
                      Select platForm Type
                    </option>

                    <option value="0">Android</option>
                    <option value="1">IOS</option>
                  </select>
                  {errors.platFormType && (
                    <div className="ml-2 mt-1">
                      {errors.platFormType && (
                        <div className="pl-1 text__left">
                          <span className="text-danger">
                            {errors.platFormType}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="col-md-12 my-2">
                  <label className="mb-2 dialog__input__title">
                    Select Image or GIF
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    required=""
                    onChange={HandleInputImage}
                    onKeyPress={handleKeyPress}
                  />
                  {errors.image && (
                    <div className="ml-2 mt-1">
                      {errors.image && (
                        <div className="pl-1 text__left">
                          <span style={{ color: "#009688" }}>
                            {errors.image}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  {imagePath && (
                    <>
                      <img
                        height="70px"
                        width="70px"
                        alt="app"
                        src={imagePath}
                        draggable="false"
                        style={{
                          marginTop: 10,
                          float: "left",
                          borderRadius: "12px",
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
              <DialogActions>
                <button
                  type="button"
                  className="btn  btn-success  mx-2"
                  onClick={handleSubmit}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger "
                  onClick={closePopup}
                >
                  Close
                </button>
              </DialogActions>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default connect(null, { getGiftCategory, updateGift })(EditGift);
