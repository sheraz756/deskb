import React, { useEffect } from "react";
import {
  getUserProfile,
  blockUser,
  updateHostCoin,
} from "../store/user/user.action";
import { useHistory, useLocation } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { setToast } from "../utils/toast";
import EdiText from "react-editext";
import { permissionError } from "../utils/Alert";

const UserProflie = (props) => {
  const location = useLocation();
  let id = location.state.userId;

  const { userProfile } = useSelector((state) => state.user);
  const hasPermission = useSelector((state) => state.admin.admin.flag);
  useEffect(() => {
    props.getUserProfile(id); // eslint-disable-next-line
  }, []);

  const history = useHistory();
  const handlePreviousPage = () => {
    history.goBack();
  };
  const handleClick = (id) => {
    if (!hasPermission) return permissionError();
    props.blockUser(id);
  };

  const handleOpenImage = (url) => {
    window.open(url, "_blank");
  };

  const handleHistory = () => {
    history.push({
      pathname: "/admin/user/history",
      state: { userId: id },
    });
  };
  // update coin

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
        props.updateHostCoin(val, userProfile._id);
      }
    }
  };
  const isNumeric = (value) => {
    const val = value === "" ? 0 : value;
    const validNumber = /^\d+$/.test(val);
    return validNumber;
  };
  return (
    <>
      <div className="row justify-content-between">
        <h4 className="ml-3">{userProfile.name} Profile</h4>
        <div>
          <button
            className="btn btn-success mr-2"
            onClick={() => handleHistory(userProfile?._id)}
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

      <div className="card mt-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-6 col-lg-3 col-xxl-3 col-xl-3">
              <img
                src={userProfile.image}
                draggable="false"
                className="mx-auto image"
                style={{
                  width: "260px",
                  height: "260px",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "50%",
                }}
                alt=""
                onClick={() => handleOpenImage(userProfile.image)}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-9 col-xxl-9 col-xl-9">
              {" "}
              <div className="row">
                <table className="w-100">
                  <tr className="">
                    <td width="90px" className="py-3  text-profile">
                      Name
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{userProfile?.name}</td>
                  </tr>

                  <tr className=" ">
                    <td width="90px" className="py-3  text-profile">
                      Email
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{userProfile?.email}</td>
                  </tr>
                  <tr className=" ">
                    <td width="90px" className="py-3  text-profile">
                      bio
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{userProfile?.bio}</td>
                  </tr>
                  <tr className=" ">
                    <td width="90px" className="py-3  text-profile">
                      Gender
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{userProfile?.gender}</td>
                  </tr>
                  <tr className=" ">
                    <td width="90px" className="py-3  text-profile">
                      Dob
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{userProfile?.dob}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
          <div className="card">
            <div className="card-body px-5">
              <div className="row">
                <table className="w-100" style={{ fontSize: "15px" }}>
                  <tr className="border-bottom">
                    <td width="90px" className="py-3  text-profile">
                      Status
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">
                      {userProfile?.isOnline ? (
                        <span class="badge badge-success"> Online </span>
                      ) : (
                        <span class="badge badge-danger"> Offline </span>
                      )}
                    </td>
                  </tr>

                  <tr className="border-bottom ">
                    <td width="90px" className="py-3  text-profile">
                      coin
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">
                      <EdiText
                        type="text"
                        value={userProfile?.coin}
                        onSave={handleSave}
                      />
                    </td>
                  </tr>
                  {/* <tr className="border-bottom ">
                        <td width="90px" className="py-3 ">
                          Age
                        </td>
                        <td width="50px">:</td>
                        <td>{userProfile?.age}</td>
                      </tr> */}
                  <tr className="border-bottom ">
                    <td width="90px" className="py-3  text-profile">
                      Mobile No
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">
                      {userProfile?.moblieNo ? userProfile?.moblieNo : "-"}
                    </td>
                  </tr>
                  <tr className="border-bottom ">
                    <td width="90px" className="py-3  text-profile">
                      Country
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{userProfile?.country}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
          <div className="card">
            <div className="card-body px-5">
              <div className="row">
                <table className="w-100" style={{ fontSize: "15px" }}>
                  <tr className="border-bottom">
                    <td width="90px" className="py-3  text-profile">
                      Block
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">
                      <label class="switch s-icons s-outline  s-outline-primary mb-0">
                        <input
                          type="checkbox"
                          checked={userProfile?.isBlock}
                          onChange={() => handleClick(userProfile)}
                        />
                        <span class="slider round"></span>
                      </label>
                    </td>
                  </tr>

                  <tr className="border-bottom ">
                    <td width="120px" className="py-3  text-profile">
                      Platform Type
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">
                      {userProfile?.platformType === 0 ? "Android" : "IOS"}
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
                      {userProfile?.LoginType === 0 ? "email" : "Quick Login"}
                    </td>
                  </tr>
                  <tr className="border-bottom ">
                    <td width="90px" className="py-3  text-profile">
                      Last Login
                    </td>
                    <td width="50px" className="text-white">
                      :
                    </td>
                    <td className="text-white">{userProfile?.lastLogin}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getUserProfile, blockUser, updateHostCoin })(
  UserProflie
);
