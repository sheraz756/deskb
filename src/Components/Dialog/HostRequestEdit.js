import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as ActionType from "../../store/hostRequest/hostRequest.type";
// mui
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Tooltip,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import Cancel from "@material-ui/icons/Cancel";
import { hostRequestUpdate } from "../../store/hostRequest/hostRequest.action";
import { permissionError } from "../../utils/Alert";

const HostRequestEdit = (props) => {
  const { dialog: open, dialogData } = useSelector(
    (state) => state.hostRequest
  );

  const hasPermission = useSelector((state) => state.admin.admin.flag);

  const [name, setName] = useState("");

  const [bio, setBio] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState("");

  const [error, setError] = useState({
    name: "",
    password: "",
    bio: "",
    age: "",
    image: "",
    gender: "",
    email: "",
    oldAgency: "",
    country: "",
  });

  useEffect(() => {
    if (dialogData) {
      setName(dialogData?.name);
      setEmail(dialogData?.email);
      setCountry(dialogData?.country);
      setAge(dialogData?.age);
      setGender(dialogData?.gender);
      setBio(dialogData?.bio);
      setImagePath(dialogData?.image);
      setError({
        name: "",
        age: "",
        country: "",
        email: "",
        image: "",
        gender: "",
        bio: "",
      });
    }
  }, [dialogData]);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImagePath(URL.createObjectURL(e.target.files[0]));
  };
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: ActionType.CLOSE_HOST_REQUEST_DIALOG });
  };
  useEffect(() => {
    window.onbeforeunload = handleClose();
  }, []);
  const handleSubmit = () => {
    if (!name || !bio || !age || !gender || !email || !country || !imagePath) {
      let error = {};
      if (!name) error.name = "Name Is Required!";
      if (!email) error.email = "Email Is Required!";
      if (!gender) error.gender = "Gender Is Required!";
      if (!age) error.age = "Age Is Required!";
      if (!country) error.country = "Country Is Required!";
      if (!imagePath) error.image = "Image Is Required!";
      return setError({ ...error });
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("age", age);
      formData.append("country", country);
      formData.append("image", image);
      formData.append("email", email);
      formData.append("gender", gender);
      formData.append("bio", bio);
      if (!hasPermission) return permissionError();
      props.hostRequestUpdate(formData, dialogData._id);

      handleClose();
    }
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
        <span className="modal-title font-weight-bold h4"> Host Request </span>
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
        <div className="row">
          <div className="col-6">
            <div>
              <div className="form-group mb-0">
                <p className="form-label fw-bold mt-3"> Name </p>
              </div>
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                autocomplete="off"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!e.target.value)
                    return setError({
                      ...error,
                      name: "Name Is Required !",
                    });
                  else {
                    return setError({
                      ...error,
                      name: "",
                    });
                  }
                }}
                onKeyPress={handleKeyPress}
              />
              {error.name && (
                <div class="pl-1 text-left">
                  <Typography
                    variant="caption"
                    color="error"
                    style={{ fontFamily: "Circular-Loom" }}
                  >
                    {error.name}
                  </Typography>
                </div>
              )}
            </div>
          </div>

          <div className="col-6">
            <div>
              <div className="form-group mb-0">
                <p className="form-label fw-bold mt-3"> Email </p>
              </div>
              <input
                type="text"
                min="0"
                placeholder="Email"
                className="form-control pe-1"
                autocomplete="off"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!e.target.value)
                    return setError({
                      ...error,
                      email: "Email  Is Required !",
                    });
                  else {
                    return setError({
                      ...error,
                      email: "",
                    });
                  }
                }}
                onKeyPress={handleKeyPress}
              />
              {error.email && (
                <div class="pl-1 text-left">
                  <Typography
                    variant="caption"
                    color="error"
                    style={{ fontFamily: "Circular-Loom" }}
                  >
                    {error.email}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div>
              <div>
                <div className="form-group mb-0">
                  <p className="form-label fw-bold mt-3"> Bio</p>
                </div>
                <input
                  type="text"
                  placeholder="Bio"
                  value={bio}
                  className="form-control "
                  autocomplete="off"
                  onChange={(e) => {
                    setBio(e.target.value);
                    if (!e.target.value)
                      return setError({
                        ...error,
                        bio: "Bio Is Required !",
                      });
                    else {
                      return setError({
                        ...error,
                        bio: "",
                      });
                    }
                  }}
                  onKeyPress={handleKeyPress}
                />
              </div>
              {error.bio && (
                <div class="pl-1 text-left">
                  <Typography
                    variant="caption"
                    color="error"
                    style={{ fontFamily: "Circular-Loom" }}
                  >
                    {error.bio}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div>
              <div>
                <div className="form-group mb-0">
                  <p className="form-label fw-bold mt-3"> Age</p>
                </div>
                <input
                  type="number"
                  min="0"
                  placeholder="Age"
                  value={age}
                  className="form-control pe-1"
                  autocomplete="off"
                  onChange={(e) => {
                    setAge(
                      (e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 2))
                    );
                    if (!e.target.value)
                      return setError({
                        ...error,
                        age: "Age Is Required !",
                      });
                    else {
                      return setError({
                        ...error,
                        age: "",
                      });
                    }
                  }}
                  onKeyPress={handleKeyPress}
                />
              </div>
              {error.age && (
                <div class="pl-1 text-left">
                  <Typography
                    variant="caption"
                    color="error"
                    style={{ fontFamily: "Circular-Loom" }}
                  >
                    {error.age}
                  </Typography>
                </div>
              )}
            </div>
          </div>
          <div className="col-6">
            <div>
              <div className="form-group mb-0">
                <p className="form-label fw-bold mt-3"> Country</p>
              </div>
              <input
                className="form-control"
                placeholder="Country"
                type="text"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      country: "Country Is Required !",
                    });
                  } else {
                    return setError({
                      ...error,
                      country: "",
                    });
                  }
                }}
                onKeyPress={handleKeyPress}
              />
            </div>
            {error.country && (
              <div class="pl-1 text-left">
                <Typography
                  variant="caption"
                  color="error"
                  style={{ fontFamily: "Circular-Loom" }}
                >
                  {error.country}
                </Typography>
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-6 my-2">
            <div>
              <div className="form-group mb-0">
                <p className="form-label fw-bold mt-3"> Host Image</p>
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
                  alt="hostImage"
                  draggable="false"
                  className="p-3 "
                  width={100}
                />
              )}
              {error.image && (
                <div class="pl-1 text-left">
                  <Typography
                    variant="caption"
                    color="error"
                    style={{ fontFamily: "Circular-Loom" }}
                  >
                    {error.image}
                  </Typography>
                </div>
              )}
            </div>
          </div>
          <div className="col-6">
            <p className="form-label fw-bold mt-3 "> Gender</p>
            <FormControl className="mb-0">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender?.toLowerCase()}
                onChange={(e) => {
                  setGender(e.target.value);
                  if (!e.target.value)
                    return setError({
                      ...error,
                      gender: "Gender Is Required !",
                    });
                  else {
                    return setError({
                      ...error,
                      gender: "",
                    });
                  }
                }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            {error.gender && (
              <div class="pl-1 text-left">
                <Typography
                  variant="caption"
                  color="error"
                  style={{ fontFamily: "Circular-Loom" }}
                >
                  {error.gender}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions className="dialogue_background_color">
        <button
          type="button"
          className="btn  btn-success my-3"
          onClick={handleSubmit}
          style={{ fontSize: "15px" }}
        >
          Update
        </button>
        <button
          type="button"
          className="btn  btn-danger my-3"
          onClick={handleClose}
          style={{ fontSize: "15px" }}
        >
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(null, { hostRequestUpdate })(HostRequestEdit);
