import { TablePagination } from "@material-ui/core";
import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { connect, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getUserHistory } from "../../store/user/user.action";
import TablePaginationActions from "../../utils/Pagination";
import ServerPagination from "../../Pages/ServerPagination";
import moment from "moment";

const UserHistory = (props) => {
  const { userHistory, totalData, totalCoin } = useSelector(
    (state) => state.user
  );

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("call");

  const location = useLocation();
  let id = location.state.userId;

  useEffect(() => {
    props.getUserHistory(id, startDate, endDate, activePage, rowsPerPage, type);
  }, [id, startDate, endDate, activePage, rowsPerPage, type]);

  useEffect(() => {
    setData(userHistory);
  }, [userHistory]);

  const history = useHistory();
  // user profile
  const handleInfo = () => {
    history.push({
      pathname: "/admin/user/userProfile",
      state: { id },
    });
  };
  // pagination
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleRowsPerPage = (value) => {
    setRowsPerPage(value);
    setActivePage(1);
  };
  //Apply button function for analytic
  const handleApply = (event, picker) => {
    const start = dayjs(picker.startDate).format("YYYY-MM-DD");

    const end = dayjs(picker.endDate).format("YYYY-MM-DD");

    setStartDate(start);
    setEndDate(end);

    props.getUserHistory(id, start, end, activePage, rowsPerPage, type);
  };

  //Cancel button function for analytic
  const handleCancel = (event, picker) => {
    picker?.element.val("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <div className="row py-2">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <h4>History </h4>
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

              <li class="active">
                <Link to="/admin/user">User </Link>
              </li>

              <li class="active">
                <a href={() => false}> History </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row layout-top-spacing">
        <div id="tableDropdown" class="col-lg-12 col-12 layout-spacing">
          <div class="statbox widget  ">
            <div class="widget-content widget-content-area">
              <div class="row border-bottom">
                <div class="col-xl-4 col-md-4 float-right col-sm-12 col-12 filtered-list-search text-end"></div>
              </div>
              <div className="row mt-3">
                <div class="col-xl-8 col-md-8 col-sm-12 col-12 filtered-list-search">
                  <div>
                    <DateRangePicker
                      initialSettings={{
                        autoUpdateInput: false,
                        locale: {
                          cancelLabel: "Clear",
                        },
                        maxDate: new Date(),

                        buttonClasses: ["btn btn-dark"],
                      }}
                      onApply={handleApply}
                      onCancel={handleCancel}
                    >
                      <input
                        type="text"
                        class="daterange form-control float-left  mr-4 "
                        placeholder="Select Date"
                        style={{
                          width: 120,
                          fontWeight: 300,
                          cursor: "pointer",
                          backgroundColor: "#1f1c30",
                        }}
                      />
                    </DateRangePicker>
                  </div>
                  {startDate === "" || endDate === "" ? (
                    <div className="ml-3 mt-2"></div>
                  ) : (
                    <div
                      className="dateShow pl-3 mt-3 text-white"
                      style={{ fontSize: "15px", fontWeight: "500" }}
                    >
                      <span className="mr-2">{startDate}</span>
                      <span className="mr-2"> To </span>
                      <span>{endDate}</span>
                    </div>
                  )}
                </div>
                <div class="col-xl-4 col-md-4 float-right col-sm-12 col-12 filtered-list-search ">
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn bg-info-gradient text-white "
                      onClick={() => setType("call")}
                    >
                      Call
                    </button>
                    <button
                      className="btn bg-success-gradient text-white mx-4"
                      onClick={() => setType("coinPlan")}
                    >
                      Purchase
                    </button>
                    <button
                      className="btn bg-warning-gradient text-white border-0"
                      onClick={() => setType("gift")}
                    >
                      Gift
                    </button>
                    <button
                      className="btn bg-primary-gradient text-white mx-4 border-0"
                      onClick={() => setType("admin")}
                    >
                      Admin
                    </button>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <div className="card-body p-0">
                  {type === "call" && (
                    <>
                      <div className="row mx-2 ">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 pb-4">
                          <div className="text-primary">
                            <h4 className="fw-bold">Call History</h4>
                          </div>
                        </div>

                        <div
                          className="col-xs-12 col-sm-12 col-md-6 col-lg-4 pb-4 d-flex justify-content-end align-items-center text-white fs-5"
                          style={{ fontWeight: "bold", fontSize: "20px" }}
                        >
                          Total Coin : {totalCoin ? totalCoin : "0"}
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table text-center  mb-4 table-striped">
                          <thead className="border-top">
                            <tr className="text-center pt-1">
                              <th className="fw-bold fs-6">No</th>
                              <th className="fw-bold fs-6">Details</th>
                              <th className="fw-bold fs-6">Type </th>
                              <th className="fw-bold fs-6">Duration</th>
                              <th className="fw-bold fs-6">Coin </th>
                              <th className="fw-bold fs-6">Date</th>
                              <th className="fw-bold fs-6">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.length > 0 ? (
                              data?.map((data, index) => {
                                const date = data?.date?.split(",");
                                const newDate = date || [];
                                var str = data?.hostName;
                                if (str?.length > 15)
                                  str = str.substring(0, 15) + "...";
                                return (
                                  <>
                                    <tr className="text-center">
                                      <td className="fs-6">{index + 1}</td>
                                      <td className="fs-6" onclick={handleInfo}>
                                        <span>
                                          {data?.callType === "MissedCall" && (
                                            <>
                                              <i class="fa fa-phone m-1 text-danger"></i>

                                              <span
                                                className="text-danger fs-6 fw-bold"
                                                onClick={() =>
                                                  localStorage.setItem(
                                                    "hostId",
                                                    data?.hostId
                                                  )
                                                }
                                              >
                                                @{str}
                                              </span>
                                              <span className="mx-2 text-danger">
                                          [{data?.callType}]
                                        </span>
                                            </>
                                          )}
                                          {data?.callType === "Outgoing" && (
                                            <>
                                              <i class="fa fa-phone m-1 text-info"></i>

                                              <span
                                                className="text-info fs-6 fw-bold"
                                                onClick={() =>
                                                  localStorage.setItem(
                                                    "hostId",
                                                    data?.hostId
                                                  )
                                                }
                                              >
                                                @{str}
                                              </span>
                                              <span className="mx-2 text-info">
                                          [{data?.callType}]
                                        </span>
                                            </>
                                          )}
                                          {data?.callType === "Incoming" && (
                                            <>
                                              <i class="fa fa-phone m-1 text-success"></i>

                                              <span
                                                className="text-success fs-6 fw-bold"
                                                onClick={() =>
                                                  localStorage.setItem(
                                                    "hostId",
                                                    data?.hostId
                                                  )
                                                }
                                              >
                                                @{str}
                                              </span>
                                              <span className="mx-2 text-success">
                                          [{data?.callType}]
                                        </span>
                                            </>
                                          )}
                                        </span>

                                      </td>
                                      {data.callType === "Outgoing" && (
                                        <td className="text-info fs-6 fw-bold">
                                          {data.callType}
                                        </td>
                                      )}
                                      {data.callType === "Incoming" && (
                                        <td className="text-success fs-6 fw-bold">
                                          {data.callType}
                                        </td>
                                      )}
                                      {data.callType === "MissedCall" && (
                                        <td className="text-danger fs-6 fw-bold">
                                          {data.callType}
                                        </td>
                                      )}
                                      <td className="fs-6 text-warning">
                                        {data.callConnect
                                          ? moment
                                              .utc(
                                                moment(
                                                  new Date(data.callEndTime)
                                                ).diff(
                                                  moment(
                                                    new Date(data.callStartTime)
                                                  )
                                                )
                                              )
                                              .format("HH:mm:ss")
                                          : "00:00:00"}
                                      </td>

                                      {data.coin > 0 ? (
                                        <td className="text-danger fw-bold  fs-6">
                                          -{data.coin}
                                        </td>
                                      ) : (
                                        <td
                                          className="text-white fs-6"
                                          style={{ fontWeight: "bold" }}
                                        >
                                          {data.coin}
                                        </td>
                                      )}
                                      <td className="fs-6">{newDate[0]}</td>
                                      <td className="fs-6">{newDate[1]}</td>
                                    </tr>
                                  </>
                                );
                              })
                            ) : (
                              <tr>
                                <td
                                  colSpan="8"
                                  className="text-center border-bottom pb-2"
                                >
                                  No Data Found !
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                  {type === "gift" && (
                    <>
                      <div className="row mx-2 ">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 pb-4">
                          <div className="text-primary">
                            <h4 className="fw-bold">Gift History</h4>
                          </div>
                        </div>

                        <div
                          className="col-xs-12 col-sm-12 col-md-6 col-lg-4 pb-4 d-flex justify-content-end align-items-center text-white fs-5"
                          style={{ fontWeight: "bold", fontSize: "20px" }}
                        >
                          Total Coin : {totalCoin ? totalCoin : "0"}
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table text-center  mb-4 table-striped">
                          <thead className="border-top">
                            <tr className="text-center pt-1">
                              <th className="fw-bold fs-6">No</th>
                              <th className="fw-bold fs-6">Details</th>
                              <th className="fw-bold fs-6">Coin </th>
                              <th className="fw-bold fs-6">Date</th>
                              <th className="fw-bold fs-6">time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.length > 0 ? (
                              data?.map((data, index) => {
                                console.log("gift", data);

                                const date = data?.date?.split(",");
                                const newDate = date || [];

                                var str = data?.hostName;
                                if (str?.length > 15)
                                  str = str.substring(0, 15) + "...";
                                return (
                                  <>
                                    <tr className="text-center">
                                      <td className="fs-6">{index + 1}</td>
                                      <td className="fs-6">
                                        <span>Gift send to </span>
                                        {/* <Link to="/admin/host/hostProfile"> */}
                                        <span
                                          className="text-info fw-bold"
                                          onClick={() =>
                                            localStorage.setItem(
                                              "hostId",
                                              data?.hostId
                                            )
                                          }
                                        >
                                          @{str}
                                        </span>
                                        {/* </Link> */}
                                      </td>
                                      {data.coin > 0 ? (
                                        <td className="text-danger fw-bold fs-6">
                                          -{data.coin}
                                        </td>
                                      ) : (
                                        <td
                                          className="fw-bold fs-6"
                                          style={{ color: "#3b3f5c" }}
                                        >
                                          {data.coin}
                                        </td>
                                      )}
                                      <td className="fs-6">{newDate[0]}</td>
                                      <td className="fs-6">{newDate[1]}</td>
                                    </tr>
                                  </>
                                );
                              })
                            ) : (
                              <tr>
                                <td
                                  colSpan="6"
                                  className="text-center border-bottom pb-2"
                                >
                                  No Data Found !
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {type === "coinPlan" && (
                    <>
                      <div className="row mx-2 ">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 pb-4">
                          <div className="text-primary">
                            <h4 className="fw-bold">CoinPlan History</h4>
                          </div>
                        </div>

                        <div
                          className="cocol-xs-12 col-sm-12 col-md-6 col-lg-4 pb-4 d-flex justify-content-end align-items-center text-white  fs-5"
                          style={{ fontWeight: "bold", fontSize: "20px" }}
                        >
                          Total Coin : {totalCoin ? totalCoin : "0"}
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table text-center  mb-4 table-striped">
                          <thead className="border-top">
                            <tr className="text-center pt-1">
                              <th className="fw-bold fs-6">No</th>
                              <th className="fw-bold fs-6">User Name</th>
                              <th className="fw-bold fs-6">INR</th>
                              <th className="fw-bold fs-6">
                                payment Gate way{" "}
                              </th>
                              <th className="fw-bold fs-6">Purchase Date</th>
                            </tr>
                          </thead>

                          <tbody>
                            {data?.length > 0 ? (
                              data?.map((coinPlan, index) => {
                                var str = coinPlan?.name;
                                if (str?.length > 15)
                                  str = str.substring(0, 15) + "...";
                                return (
                                  <>
                                    <tr className="text-center border-bottom pb-2">
                                      <td className="fs-6">{index + 1}</td>
                                      <td className="fs-6"> {str}</td>
                                      <td className="fs-6">
                                        {coinPlan.dollar}
                                      </td>
                                      <td className="fs-6">
                                        {coinPlan?.paymentGateway}
                                      </td>
                                      <td className="fs-6">
                                        {dayjs(coinPlan?.createdAt).format(
                                          "DD MMM YYYY"
                                        )}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })
                            ) : (
                              <tr className="border-bottom pb-2">
                                <td colSpan="8" className="text-center">
                                  No dataFound !
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {type === "admin" && (
                    <>
                      <div className="row mx-2 ">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 pb-4">
                          <div className="text-primary">
                            <h4 className="fw-bold">Admin Coin History</h4>
                          </div>
                        </div>

                        <div
                          className="col-xs-12 col-sm-12 col-md-6 col-lg-4 pb-4 d-flex justify-content-end align-items-center text-white"
                          style={{ fontWeight: "bold", fontSize: "20px" }}
                        >
                          Total Coin : {totalCoin ? totalCoin : "0"}
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table text-center  mb-4 table-striped">
                          <thead className="border-top">
                            <tr className="text-center pt-1">
                              <th className="fw-bold fs-6">No</th>

                              <th className="fw-bold fs-6">Coin</th>

                              <th className="fw-bold fs-6"> Date</th>
                              <th className="fw-bold fs-6">Time</th>
                            </tr>
                          </thead>

                          <tbody>
                            {data?.length > 0 ? (
                              data?.map((admin, index) => {
                                const date = admin?.date.split(",");
                                const newDate = date || [];

                                return (
                                  <>
                                    <tr className="text-center border-bottom pb-2">
                                      <td className="fs-6">{index + 1}</td>

                                      {admin?.isIncome === true ? (
                                        <td className="fs-6 text-success">
                                          +{admin.coin}
                                        </td>
                                      ) : (
                                        <td className="fs-6 text-danger">
                                          -{admin.coin}
                                        </td>
                                      )}
                                      <td className="fs-6">{newDate[0]}</td>

                                      <td className="fs-6">{newDate[1]}</td>
                                    </tr>
                                  </>
                                );
                              })
                            ) : (
                              <tr className="border-bottom pb-2">
                                <td colSpan="8" className="text-center">
                                  No dataFound !
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
                <ServerPagination
                  activePage={activePage}
                  rowsPerPage={rowsPerPage}
                  userTotal={totalData}
                  handleRowsPerPage={handleRowsPerPage}
                  handlePageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getUserHistory })(UserHistory);
