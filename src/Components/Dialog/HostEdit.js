import React, { useState, useEffect } from "react";
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
import { handleEditHost } from "../../store/host/host.action";
// react dropzone
import ReactDropzone from "react-dropzone";
import { connect, useDispatch, useSelector } from "react-redux";
import { CLOSE_HOST_DIALOG } from "../../store/host/host.type";
import { permissionError } from "../../utils/Alert";

const HostEdit = (props) => {
  const { dialog: open, dialogueData } = useSelector((state) => state.host);
  const hasPermission = useSelector((state) => state.admin.admin.flag);

  const [name, setName] = useState("");

  const [bio, setBio] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [coin, setCoin] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [album, setAlbum] = useState([]);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState([]);
  const [profileImagePath, setProfileImagePath] = useState("");
  const [mongoId, setMongoId] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  useEffect(
    () => () => {
      setError({
        name: "",
        email: "",
        age: "",
        coin: "",
        gender: "",
        country: "",
        album: "",
        profileImage: "",
      });
      setName("");
      setEmail("");
      setAge("");
      setCoin("");
      setGender("");
      setCountry("");
      setAlbum("");
      setProfileImage("");
    },
    [open]
  );

  // show dialog image
  const handleImage = (e) => {
    setProfileImage(e.target.files[0]);
    setProfileImagePath(URL.createObjectURL(e.target.files[0]));
  };

  //   press enter submit data

  const dispatch = useDispatch();

  // handle close dialog
  const handleClose = () => {
    dispatch({ type: CLOSE_HOST_DIALOG });
  };

  const onPreviewDrop = (files) => {
    setError({ ...error, album: "" });
    files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );

    setAlbum(album.concat(files));
  };

  const removeImage = (file) => {
    const newFiles = [...album];
    album.splice(newFiles.indexOf(file), 1);
    if (file.preview) {
      const images = album.filter((ele) => {
        return ele.preview !== file.preview;
      });
      setAlbum(images);
    } else {
      const newFiles = [...album];
      album.splice(newFiles.indexOf(file), 1);
      setAlbum(newFiles);
    }
  };

  useEffect(() => {
    window.onbeforeunload = handleClose();
  }, []);
  // handle submit data
  useEffect(() => {
    if (dialogueData) {
      setMongoId(dialogueData?._id);
      setName(dialogueData?.name);
      setEmail(dialogueData?.email);
      setBio(dialogueData?.bio);
      setGender(dialogueData?.gender);
      setCountry(dialogueData?.country);
      setAge(dialogueData?.age);
      setCoin(dialogueData?.coin);
      setProfileImagePath(dialogueData?.image);
      setAlbum(dialogueData?.album);
      setMobileNo(dialogueData?.mobileNumber);
    }
  }, [dialogueData]);

  const handleSubmit = () => {
    if (
      !name ||
      !email ||
      !gender ||
      !country ||
      !bio ||
      coin < 0 ||
      (age !== 0 && age < 18)
    ) {
      let error = {};
      if (!name) error.name = "Name Is Required";
      if (!email) error.email = "Email Is Required";
      if (age !== 0) {
        if (age < 18) error.age = "Age not under 18 allowed !";
      }
      if (coin < 0) error.coin = "Coin Is Required";
      if (!country) error.country = "Country Is Required";
      if (!gender) error.gender = "Gender Is Required";
      if (!profileImagePath) error.profileImage = "Image Is Required";
      if (album.length === 0) error.album = "Image Is Required";

      return setError({ ...error });
    } else {
      if (mobileNo) {
        const mobileNoValid = isNumeric(mobileNo);
        if (!mobileNoValid) {
          return setError({
            ...error,
            mobileNo: "Mobile Number must be ten digit!",
          });
        }
      }

      const formData = new FormData();
      formData.append("hostId", mongoId);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("age", age);
      formData.append("country", country);
      formData.append("coin", coin);
      formData.append("gender", gender);
      formData.append("image", profileImage);
      formData.append("mobileNumber", mobileNo);
      for (let i = 0; i < album.length; i++) {
        formData.append("album", album[i]);
      }
      if (!hasPermission) return permissionError();
      props.handleEditHost(mongoId, formData);
      handleClose();
    }
  };

  // mobile number validation
  const isNumeric = (value) => {
    const val = value === "" ? 0 : value;
    const validNumber = /^\d{10}$/.test(val);
    return validNumber;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
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
          <span className="modal-title font-weight-bold h4"> Host </span>
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
                <div>
                  <div className="form-group mb-0">
                    <p className="form-label fw-bold mt-3"> Mobile No</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    placeholder="mobile No "
                    value={mobileNo}
                    className="form-control pe-1"
                    autocomplete="off"
                    onChange={(e) => {
                      setMobileNo(
                        (e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 10))
                      );
                    }}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                {error.mobileNo && (
                  <div class="pl-1 text-left">
                    <Typography
                      variant="caption"
                      color="error"
                      style={{ fontFamily: "Circular-Loom" }}
                    >
                      {error.mobileNo}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div>
                <div className="form-group mb-0">
                  <p className="form-label fw-bold mt-3"> Country</p>
                </div>
                <input
                  type="text"
                  className="form-control"
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
            <div className="col-6">
              <div>
                <div className="form-group mb-0">
                  <p className="form-label fw-bold mt-3"> Coin</p>
                </div>
                <input
                  type="number"
                  className="form-control"
                  value={coin}
                  onChange={(e) => {
                    setCoin(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        coin: "Coin Is Required !",
                      });
                    } else {
                      return setError({
                        ...error,
                        coin: "",
                      });
                    }
                  }}
                  onKeyPress={handleKeyPress}
                />
              </div>
              {error.coin && (
                <div class="pl-1 text-left">
                  <Typography
                    variant="caption"
                    color="error"
                    style={{ fontFamily: "Circular-Loom" }}
                  >
                    {error.coin}
                  </Typography>
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-6 my-2">
              <div>
                <div className="form-group mb-0">
                  <p className="form-label fw-bold mt-3">Host Profile Image</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control "
                  autocomplete="off"
                  onChange={(e) => handleImage(e)}
                  onKeyPress={handleKeyPress}
                />
                {profileImagePath && (
                  <img
                    src={profileImagePath}
                    alt="hostImage"
                    draggable="false"
                    className="p-3 "
                    width={100}
                  />
                )}
                {error.profileImage && (
                  <div class="pl-1 text-left">
                    <Typography
                      variant="caption"
                      color="error"
                      style={{ fontFamily: "Circular-Loom" }}
                    >
                      {error.profileImage}
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
                  value={gender?.toLocaleLowerCase()}
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
          <div className="row">
            <div>
              <div className="form-group mb-0">
                <p className="form-label fw-bold mt-3"> Host Image</p>
              </div>

              <div className="hostAlbum d-flex">
                <ReactDropzone
                  onDrop={(acceptedFiles) => onPreviewDrop(acceptedFiles)}
                  accept="image/*"
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className="mx-2">
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
                <div
                  className="hostImagePre d-flex ms-5"
                  style={{ flexWrap: "wrap" }}
                >
                  {album?.length > 0 &&
                    album?.map((file, index) => {
                      return file?.type?.split("image")[0] === "" ? (
                        <>
                          <img
                            height="60px"
                            width="60px"
                            alt="app"
                            src={file.preview}
                            style={{
                              boxShadow: "0 5px 15px 0 rgb(105 103 103 / 00%)",
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
                      ) : (
                        <>
                          <img
                            height="60px"
                            width="60px"
                            alt="app"
                            src={file}
                            style={{
                              boxShadow: "0 5px 15px 0 rgb(105 103 103 / 00%)",
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
                      );
                    })}
                </div>
              </div>
              {error.album && (
                <div class="pl-1 text-left">
                  <Typography
                    variant="caption"
                    color="error"
                    style={{ fontFamily: "Circular-Loom" }}
                  >
                    {error.album}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions className="dialogue_background_color">
          <button
            type="button"
            className="btn btn-info my-3"
            onClick={handleSubmit}
            // style={{ fontSize: "15px" }}
          >
            Update
          </button>
          <button
            type="button"
            className="btn btn-danger my-3 mx-3"
            onClick={handleClose}
            // style={{ fontSize: "15px" }}
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default connect(null, { handleEditHost })(HostEdit);
