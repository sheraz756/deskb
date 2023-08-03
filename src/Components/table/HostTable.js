import { TablePagination } from "@material-ui/core";
import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getHost, disableHost } from "../../store/host/host.action";
import { OPEN_HOST_DIALOG } from "../../store/host/host.type";
import $ from "jquery";

import TablePaginationActions from "../../utils/Pagination";
import HostEdit from "../Dialog/HostEdit";
import { permissionError } from "../../utils/Alert";

const HostTable = (props) => {
  const { host } = useSelector((state) => state.host);
  const hasPermission = useSelector((state) => state.admin.admin.flag);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    props.getHost();
  }, []);

  useEffect(() => {
    setData(host);
  }, [host]);

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const dispatch = useDispatch();

  // handle host edit
  const handleEdit = (id) => {
    localStorage.setItem("hostId", id);
    dispatch({ type: OPEN_HOST_DIALOG, payload: id });
  };

  const history = useHistory();

  const handleInfo = (hostId) => {
    // history page Host Profile Open

    history.push({ pathname: "/admin/host/hostProfile", state: { hostId } });
  };
  const handleClick = (id) => {
    if (!hasPermission) return permissionError();
    props.disableHost(id);
  };
  const handleHistory = (id) => {
    localStorage.setItem("hostId", id);
    history.push({ pathname: "/admin/host/history", state: { hostId: id } });
  };

  const handleSearch = (e) => {
    const value = e.target.value?.toUpperCase();
    if (value) {
      const data = host.filter((data) => {
        return (
          data?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.email?.toUpperCase()?.indexOf(value) > -1 ||
          data?.gender?.toUpperCase()?.indexOf(value) > -1 ||
          data?.bio?.toUpperCase()?.indexOf(value) > -1 ||
          data?.coin?.toString()?.indexOf(value) > -1 ||
          data?.country?.toUpperCase()?.indexOf(value) > -1 ||
          data?.age?.toString()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      setData(host);
    }
  };

  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", "https://work10.digicean.com/storage/male.png");
    });
  });
  return (
    <>
      <div className="row py-2">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <h4>Host </h4>
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
                <a href={() => false}> Host </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row layout-top-spacing">
        <div id="tableDropdown" class="col-lg-12 col-12 layout-spacing">
          <div class="statbox widget  ">
            <div class="widget-content widget-content-area">
              <div class="row ">
                <div class="col-xl-8 col-md-8 col-sm-12 col-12"></div>
                <div
                  id="datePicker"
                  className="collapse mt-5 pt-5 position-absolute"
                  aria-expanded="false"
                ></div>
                <div class="col-xl-4 col-md-4 float-right col-sm-12 col-12 filtered-list-search ">
                  <form class="form-inline my-2 my-lg-0 justify-content-center">
                    <div class="w-100">
                      <input
                        type="text"
                        class="w-100 form-control product-search br-30"
                        id="input-search"
                        placeholder="Search Host..."
                        onChange={(e) => handleSearch(e)}
                      />
                      <button
                        class="btn bg-danger-gradient  text-white"
                        type="button"
                      >
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
                          class="feather feather-search"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table text-center  mb-4 table-striped">
                  <thead>
                    <tr className="text-center">
                      <th className="fw-bold">ID</th>
                      <th className="fw-bold">Image</th>
                      <th className="fw-bold">Name</th>
                      <th className="fw-bold">Email</th>
                      <th className="fw-bold">Country</th>
                      <th className="fw-bold">Age</th>
                      <th className="fw-bold">Coin</th>
                      <th className="fw-bold">Disable Host</th>
                      <th className="fw-bold">Edit</th>
                      <th className="fw-bold">Info</th>
                      <th className="fw-bold">History</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 ? (
                      (rowsPerPage > 0
                        ? data?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : data
                      ).map((data, i) => {
                        return (
                          <>
                            <tr className="text-center">
                              <td> {i + 1}</td>
                              <td>
                                <img
                                  src={data?.image}
                                  alt="host"
                                  draggable="false"
                                  className="mx-auto table_image"
                                  onClick={() => handleInfo(data?._id)}
                                />
                              </td>
                              <td> {data?.name}</td>
                              <td> {data?.email}</td>
                              <td>{data?.country}</td>
                              <td>{data?.age}</td>
                              <td>{data?.coin}</td>
                              <td style={{ paddingBottom: "0px" }}>
                                <label class="switch s-icons s-outline s-outline-secondary mr-2 mb-0 ">
                                  <input
                                    type="checkbox"
                                    checked={data?.isBlock}
                                    onChange={() => handleClick(data)}
                                  />
                                  <span class="slider round"></span>
                                </label>
                              </td>
                              <td>
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => handleEdit(data)}
                                >
                                  <i className="fas fa-edit" />
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-info"
                                  onClick={() => handleInfo(data?._id)}
                                >
                                  <i className="fa fa-info"></i>
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleHistory(data?._id)}
                                >
                                  <i className="fa fa-history "></i>
                                </button>
                              </td>
                            </tr>
                          </>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="13" className="text-center">
                          No Data Found !
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    50,
                    100,
                    { label: "All", value: data?.length },
                  ]}
                  component="div"
                  count={data?.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </div>
            </div>
          </div>
        </div>

        <HostEdit />
      </div>
    </>
  );
};

export default connect(null, { getHost, disableHost })(HostTable);
