import { TablePagination } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//action
import {
  getHostRequest,
  hostRequestAccept,
} from "../../store/hostRequest/hostRequest.action";

//type
import { OPEN_HOST_REQUEST_DIALOG } from "../../store/hostRequest/hostRequest.type";

// pagination
import TablePaginationActions from "../../utils/Pagination";

// component
import HostRequestEdit from "../Dialog/HostRequestEdit";
import { permissionError } from "../../utils/Alert";

const HostRequest = (props) => {
  const { hostRequest } = useSelector((state) => state.hostRequest);
  const hasPermission = useSelector((state) => state.admin.admin.flag);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    props.getHostRequest();
  }, []);

  useEffect(() => {
    setData(hostRequest);
  }, [hostRequest]);

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // request Accept
  const handleClick = (id) => {
    if (!hasPermission) return permissionError();
    props.hostRequestAccept(id);
  };

  // handle Search
  const handleSearch = (e) => {
    const value = e.target.value?.toUpperCase();
    if (value) {
      const data = hostRequest.filter((data) => {
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
      setData(hostRequest);
    }
  };
  const dispatch = useDispatch();
  // edit request

  const handleEditRequest = (data) => {
    dispatch({ type: OPEN_HOST_REQUEST_DIALOG, payload: data });
  };
  return (
    <>
      <div className="row py-2">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <h4>HostRequest </h4>
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
                <a href={() => false}> HostRequest </a>
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
                      <th className="fw-bold">is Accept</th>
                      <th className="fw-bold">Age</th>
                      <th className="fw-bold">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      (rowsPerPage > 0
                        ? data.slice(
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
                                  alt="hostRequest"
                                  draggable="false"
                                  className="mx-auto table_image"
                                />
                              </td>
                              <td> {data?.name}</td>
                              <td> {data?.email}</td>

                              <td>{data?.country}</td>

                              <td>
                                <label className="switch s-icons s-outline  s-outline-primary mb-0">
                                  <input
                                    type="checkbox"
                                    checked={data?.isAccepted}
                                    onClick={() => handleClick(data?._id)}
                                  />
                                  <span className="slider round" />
                                </label>
                              </td>

                              <td>{data?.age}</td>

                              <td>
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleEditRequest(data)}
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          </>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="12" className="text-center">
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

        <HostRequestEdit />
      </div>
    </>
  );
};

export default connect(null, { getHostRequest, hostRequestAccept })(
  HostRequest
);
