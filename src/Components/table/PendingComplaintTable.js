import React, { useState, useEffect } from "react";

//routing
import { Link } from "react-router-dom";

// Pagination
import { TablePagination } from "@material-ui/core";
import TablePaginationActions from "../../utils/Pagination";

//redux
import { connect, useDispatch, useSelector } from "react-redux";

//action
import {
  getComplaint,
  solvedComplaint,
} from "../../store/Complaint/complaint.action";

//type
import { OPEN_COMPLAINT_DIALOG } from "../../store/Complaint/complaint.type";

//sweet alert

//component
import ComplaintDetails from "../../Components/Dialog/ComplaintDetails";
import dayjs from "dayjs";
import { permissionError } from "../../utils/Alert";

const PendingComplaintTable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [type, setType] = useState("user");

  useEffect(() => {
    props.getComplaint("pending", type); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    props.getComplaint("pending", type); // eslint-disable-next-line
  }, [type]);

  const complaint = useSelector((state) => state.complaint.complaint);
  const hasPermission = useSelector((state) => state.admin.admin.flag);

  useEffect(() => {
    setData(complaint);
  }, [complaint]);

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //search
  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase()
      ? e.target.value.trim().toUpperCase()
      : e.target.value.trim();
    if (value) {
      const data = complaint.filter((data) => {
        return (
          data?.userId?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.contact?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(complaint);
    }
  };

  const handleSolvedComplain = (id) => {
    if (!hasPermission) return permissionError();
    props.solvedComplaint(id);
  };

  const handleViewComplainDetail = (data) => {
    dispatch({ type: OPEN_COMPLAINT_DIALOG, payload: data });
  };

  return (
    <>
      <div className="row py-2">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <h4>Complain Pending </h4>
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
                <a href={() => false}> Complain Pending </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row layout-top-spacing">
        <div id="tableDropdown" class="col-lg-12 col-12 layout-spacing">
          <div class="statbox widget  ">
            <div class="widget-content widget-content-area">
              <div class="row border-bottom ">
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
                        placeholder="Search Complain..."
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
              <div class="row pt-3 ">
                <div class="col-xl-8 col-md-8 col-sm-12 col-12 d-flex align-items-center">
                  <h4 className="text-capitalize">{type} Complain </h4>
                </div>
                <div
                  id="datePicker"
                  className="collapse mt-5 pt-5 position-absolute"
                  aria-expanded="false"
                ></div>
                <div class="col-xl-4 col-md-4 float-right col-sm-12 col-12 filtered-list-search">
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-danger"
                      onClick={() => setType("user")}
                    >
                      User Complain
                    </button>
                    <button
                      className="btn btn-success ml-4"
                      onClick={() => setType("host")}
                    >
                      Host Complain
                    </button>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table text-center  mb-4 table-striped">
                  <thead>
                    <tr className="text-center">
                      <th className="fw-bold">ID</th>
                      <th className="fw-bold">Name</th>
                      <th className="fw-bold">Complain Image</th>
                      <th className="fw-bold">Contact</th>
                      <th className="fw-bold">CreatedAt</th>
                      <th className="fw-bold">Solved</th>
                      <th className="fw-bold">Details</th>
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

                              <td>{data?.userId?.name} </td>

                              <td>
                                <img
                                  src={data?.image}
                                  alt="hostRequest"
                                  draggable="false"
                                  className="mx-auto table_image"
                                />
                              </td>

                              <td> {data?.contact}</td>
                              <td>
                                {dayjs(data?.createdAt).format("DD MMM YYYY")}
                              </td>

                              <td>
                                <button
                                  className="badge outline-badge-success"
                                  type="button"
                                  onClick={() => handleSolvedComplain(data._id)}
                                >
                                  Solved{" "}
                                </button>
                                <span className="slider round" />
                              </td>

                              <td>
                                <button
                                  class="btn btn-info"
                                  onClick={() => handleViewComplainDetail(data)}
                                >
                                  <i class="fa fa-info"></i>
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
                    <td colSpan="15" className="p-0">
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
                    </td>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <ComplaintDetails />
      </div>
    </>
  );
};

export default connect(null, { getComplaint, solvedComplaint })(
  PendingComplaintTable
);
