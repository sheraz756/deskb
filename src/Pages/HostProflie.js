import React from "react";
import { useEffect } from "react";
import EdiText from "react-editext";
import { connect, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getHostProfile,
  disableHost,
  updateHostCoin,
} from "../store/host/host.action";
import { setToast } from "../utils/toast";
import $ from "jquery";

//css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//react-slick
import Slider from "react-slick";
import { permissionError } from "../utils/Alert";

const HostProflie = (props) => {
  const { hostProfile } = useSelector((state) => state.host);
  const hasPermission = useSelector((state) => state.admin.admin.flag);
  const location = useLocation();

  const userId = localStorage.getItem("hostId");
  useEffect(() => {
    props.getHostProfile(
      location?.state?.hostId ? location?.state?.hostId : userId
    ); // eslint-disable-next-line
  }, []);
  const history = useHistory();
  const handlePreviousPage = () => {
    history.goBack();
  };

  const handleClick = (id) => {
    if (!hasPermission) return permissionError();
    props.disableHost(id);
  };

  const handleOpenImage = (url) => {
    window.open(url, "_blank");
  };

  const handleHistory = (id) => {
    history.push({
      pathname: "/admin/host/history",
      state: { hostId: location.state.hostId },
    });
  };

  // update host coin
  const handleSave = (val) => {
    console.log("val", val);
    if (val < 0) {
      setToast("error", "Invalid Coin");
    } else {
      const coinValid = isNumeric(val);
      if (!coinValid) {
        setToast("error", "Invalid Coin");
      } else {
        if (!hasPermission) return permissionError();
        props.updateHostCoin(val, hostProfile._id);
      }
    }
  };

  const isNumeric = (value) => {
    const val = value === "" ? 0 : value;
    const validNumber = /^\d+$/.test(val);
    return validNumber;
  };

  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", "https://work10.digicean.com/storage/male.png");
    });
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };
  return (
    <>
      <div className="row justify-content-between">
        <h4 className="ml-3">{hostProfile.name} Profile</h4>
        <div>
          <button
            className="btn btn-success mr-2"
            onClick={() => handleHistory(hostProfile?._id)}
          >
            <i className="fa fa-history"></i>
          </button>
          <button
            className="btn btn-primary "
            style={{ marginRight: "15px" }}
            onClick={handlePreviousPage}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </div>
      </div>

      <div className="card mt-4" style={{ borderRadius: "0px" }}>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-3 col-xxl-3 col-xl-3">
              <img
                src={hostProfile.image}
                draggable="false"
                className="mx-auto image"
                style={{
                  width: "260px",
                  height: "260px",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "50%",
                }}
                alt="hostProfile"
                onClick={() => handleOpenImage(hostProfile.image)}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-9 col-xxl-9 col-xl-9">
              <div className="row">
                <table className="w-100" style={{ fontSize: "15px" }}>
                  <tr>
                    <td width="90px" className="py-3 text-profile">
                      Name
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{hostProfile?.name}</td>
                  </tr>

                  <tr>
                    <td width="90px" className="py-3 text-profile">
                      Email
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{hostProfile?.email}</td>
                  </tr>
                  <tr className=" ">
                    <td width="90px" className="py-3 text-profile">
                      bio
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{hostProfile?.bio}</td>
                  </tr>
                  <tr>
                    <td width="90px" className="py-3 text-profile">
                      Gender
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{hostProfile?.gender}</td>
                  </tr>
                  <tr>
                    <td width="90px" className="py-3 text-profile">
                      Dob
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{hostProfile?.dob}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
          <div className="card" style={{ borderRadius: "0px" }}>
            <div className="card-body px-5">
              <div className="row">
                <table className="w-100" style={{ fontSize: "15px" }}>
                  <tr className="border-bottom">
                    <td width="90px" className="py-3 text-profile">
                      Status
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">
                      {hostProfile?.isOnline ? (
                        <span class="badge badge-success"> Online </span>
                      ) : (
                        <span class="badge badge-danger"> Offline </span>
                      )}
                    </td>
                  </tr>

                  <tr className="border-bottom ">
                    <td width="90px" className="py-3 text-profile">
                      coin
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">
                      <EdiText
                        type="text"
                        value={hostProfile?.coin}
                        onSave={handleSave}
                      />
                    </td>
                  </tr>

                  <tr className="border-bottom ">
                    <td width="90px" className="py-3 text-profile">
                      Mobile No
                    </td>
                    <td width="50px">:</td>
                    <td>
                      {hostProfile?.moblieno ? hostProfile?.moblieno : "-"}
                    </td>
                  </tr>
                  <tr className="border-bottom ">
                    <td width="90px" className="py-3 text-profile">
                      Country
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{hostProfile?.country}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
          <div className="card" style={{ borderRadius: "0px" }}>
            <div className="card-body px-5">
              <div className="row">
                <table className="w-100" style={{ fontSize: "15px" }}>
                  <tr className="border-bottom">
                    <td width="90px" className="py-3 text-profile">
                      Block
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">
                      <label class="switch s-icons s-outline  s-outline-primary mt-2 mr-2">
                        <input
                          type="checkbox"
                          checked={hostProfile?.isBlock}
                          onChange={() => handleClick(hostProfile)}
                        />
                        <span class="slider round"></span>
                      </label>
                    </td>
                  </tr>

                  <tr className="border-bottom ">
                    <td width="120px" className="py-3 text-profile">
                      Platform Type
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">
                      {hostProfile?.platformType === 0 ? "Android" : "IOS"}
                    </td>
                  </tr>
                  <tr className="border-bottom ">
                    <td width="90px" className="py-3 text-profile">
                      Login Type
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">
                      {hostProfile?.LoginType === 0 ? "email" : "Quick Login"}
                    </td>
                  </tr>
                  <tr className="border-bottom ">
                    <td width="90px" className="py-3 text-profile">
                      Last Login
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white"> {hostProfile?.lastLogin}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 p-0 my-4 ">
        {/* <div className="card">
          <div className="card-body">
            <div className="row"> */}
        {/* <Slider {...settings}>
          {hostProfile?.album?.map((image) => {
            return (
              <>
                <div className="card zoom" style={{ borderRadius: "0px" }}>
                  <div className="card-body">
                    <div className="col-3 my-3">
                      <img
                        src={image}
                        alt="hostProfile"
                        className="mx-auto"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "20px",
                          display: "block",
                          border: "1px solid #3b3f5c",
                          backgroundColor: "#1f1c30",
                          padding: "20px",
                        }}
                        onClick={() => handleOpenImage(image)}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </Slider> */}

        <div
          className="row mx-1"
          style={{ background: "#28273f", height: "500px", overflow: "auto" }}
        >
          {hostProfile?.album?.map((image) => {
            return (
              <>
                <div className="card " style={{ borderRadius: "0px" }}>
                  <div className="card-body">
                    <div className="col-3 my-3">
                      <div
                        style={{
                          borderRadius: "20px",
                          border: "1px solid #3b3f5c",
                          backgroundColor: "#1f1c30",
                          width: "210px",
                          height: "210px",
                        }}
                      >
                        <img
                          src={image}
                          alt="hostProfile"
                          className="m-auto zoom"
                          style={{
                            width: "208px",
                            height: "208px",
                            objectFit: "cover",
                            display: "block",
                            borderRadius: "20px",
                            overflow: "hidden",
                          }}
                          onClick={() => handleOpenImage(image)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {/* </div>
        </div>
      </div> */}
    </>
  );
};

export default connect(null, { getHostProfile, disableHost, updateHostCoin })(
  HostProflie
);
