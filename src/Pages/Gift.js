import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import EditGift from "../Components/Dialog/Gift/EditGift";
import { getGift } from "../store/Gift/gift.action";
import { OPEN_GIFT_DIALOG } from "../store/Gift/gift.type";
import { permissionError, warning } from "../utils/Alert";
import { baseURL } from "../utils/Config";
import AllGift from "./AllGift";

//action
import { deleteGift } from "../store/Gift/gift.action";

const Gift = (props) => {
  const { gift } = useSelector((state) => state.gift);
  const hasPermission = useSelector((state) => state.admin.admin.flag);

  console.log("gift", gift);

  const [data, setData] = useState([]);

  const category = JSON.parse(localStorage.getItem("category"));

  const giftClick = localStorage.getItem("giftClick");

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    giftClick == null ? props.getGift(category?._id) : props.getGift("ALL"); // eslint-disable-next-line
  }, [giftClick]);

  useEffect(() => {
    setData(gift);
  }, [gift]);

  const handleEdit = (data) => {
    dispatch({ type: OPEN_GIFT_DIALOG, payload: data });
  };
  const handleDelete = (id) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          if (!hasPermission) return permissionError();
          props.deleteGift(id);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="row py-2">
        <div class="col-xl-6 col-md-6  col-sm-12 col-12">
          <h4> {giftClick === null && category?.name} Gift </h4>
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 col-12 ">
          <div class="breadcrumb-four float-right">
            <ul class="breadcrumb">
              <li>
                <Link to="/admin/dashboard">
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
                    class="feather feather-home"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </Link>
              </li>

              <li class="active">Gift</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row layout-top-spacing">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 float-left">
          <button
            class="btn text-white  text-center btn-danger"
            onClick={() => {
              giftClick == null
                ? history.push("/admin/giftCategory/dialog")
                : history.push("/admin/gift/dialog");
            }}
          >
            New
          </button>
        </div>
      </div>
      <div class={`layout-top-spacing ${giftClick === null && "row"}`}>
        {data?.length > 0 ? (
          data.map((data) => {
            return (
              <>
                {giftClick === null ? (
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3 my-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="row align-items-center py-4">
                          <div className="col-6">
                            <img
                              src={baseURL + data?.image}
                              alt="Gift"
                              draggable="false"
                              className="mx-auto shadow"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                display: "block",
                                borderRadius: "50px",
                              }}
                            />
                          </div>
                          <div className="col-6 text-left">
                            <div class="contact-card-info text-white m-2  text-center">
                              <span>{data.name}</span>
                            </div>
                            <div class="d-flex contact-card-info justify-content-center mt-2 pt-2">
                              <h5 className="dialog__input__title  gift_Text">
                                Coin :
                              </h5>
                              <h5 className="dialog__input__title gift_Text mx-1">
                                {data.coin}
                              </h5>
                            </div>
                            {data.platFormType === 1 ? (
                              <div class="d-flex contact-card-info my-2  px-2 justify-content-center">
                                <h5 className="dialog__input__title gift_Text_PlatformType">
                                  IOS
                                </h5>
                              </div>
                            ) : (
                              <div class="d-flex contact-card-info my-2  px-2 justify-content-center">
                                <h5 className="dialog__input__title gift_Text_PlatformType">
                                  Android
                                </h5>
                              </div>
                            )}
                            <div className="row">
                              <div
                                className="col-6 text-right"
                                style={{ paddingLeft: "1px" }}
                              >
                                <div class="contact-card-buttons text-right">
                                  <button
                                    type="button"
                                    class="btn btn-info badge badge-lg  p-2 px-3 m-1 d-inline-block"
                                    onClick={() => handleEdit(data)}
                                  >
                                    <i class="fas fa-edit text-white"></i>
                                  </button>
                                </div>
                              </div>
                              <div
                                className="col-6"
                                style={{ paddingLeft: "15px" }}
                              >
                                <div class="contact-card-buttons text-left ">
                                  <button
                                    type="button"
                                    class="btn btn-danger badge badge-lg  p-2 px-3 m-1 d-inline-block"
                                    onClick={() => handleDelete(data._id)}
                                  >
                                    <i class="fas fa-trash text-white"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row mx-4 order-md-1 order-last">
                      <h3 className="mt-2 my-4">{data?.name} Gifts</h3>
                    </div>
                    <div className="row mx-4 order-md-1 order-last">
                      <AllGift data={data} />
                    </div>
                  </>
                )}
              </>
            );
          })
        ) : (
          <tr>
            <td colSpan="8" align="center">
              Nothing to show!!
            </td>
          </tr>
        )}
      </div>
      <EditGift />
    </>
  );
};

export default connect(null, { getGift, deleteGift })(Gift);
