import React from "react";
import { useState, useEffect } from "react";
import { TablePagination } from "@material-ui/core";
import TablePaginationActions from "../../utils/Pagination";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getCoinPlan,
  deleteCoinPlan,
  isActiveCoinPlan,
} from "../../store/CoinPlan/CoinPlan.action";
import { OPEN_COIN_PLAN_DIALOG } from "../../store/CoinPlan/CoinPlan.Type";
import CoinPlanDialog from "../Dialog/CoinPlanDialog";
import { permissionError, warning } from "../../utils/Alert";
import dayjs from "dayjs";

const CoinPlanTable = (props) => {
  const { coinPlan } = useSelector((state) => state.coinPlan);
  const hasPermission = useSelector((state) => state.admin.admin.flag);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    props.getCoinPlan();
  }, []);

  useEffect(() => {
    setData(coinPlan);
  }, [coinPlan]);

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dispatch = useDispatch();
  // handle Plan isActive

  const handleClick = (data) => {
    if (!hasPermission) return permissionError();
    props.isActiveCoinPlan(data);
  };

  // handle Edit plan

  const handleEdit = (data) => {
    dispatch({ type: OPEN_COIN_PLAN_DIALOG, payload: data });
  };

  // handle Delete planL
  const handleDelete = (id) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          if (!hasPermission) return permissionError();
          props.deleteCoinPlan(id);
        }
      })
      .catch((err) => console.log(err));
  };

  // handle Create Dialog Open

  const handleOpen = () => {
    dispatch({ type: OPEN_COIN_PLAN_DIALOG });
  };

  // handle search CoinPlan

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = coinPlan.filter((data) => {
        return (
          data?.extraCoin?.toString()?.indexOf(value) > -1 ||
          data?.coin?.toString()?.indexOf(value) > -1 ||
          data?.planLevel?.toString()?.indexOf(value) > -1 ||
          data?.dollar?.toString()?.indexOf(value) > -1 ||
          ("ANDROID".toLowerCase().includes(value.toLowerCase()) &&
            data?.platformType?.toString()?.indexOf("0") > -1) ||
          ("IOS".toLowerCase().includes(value.toLowerCase()) &&
            data?.platformType?.toString()?.indexOf("1") > -1)
        );
      });
      setData(data);
    } else {
      setData(coinPlan);
    }
  };

  return (
    <>
      <div className="row py-2">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <h4>CoinPlan </h4>
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
                <a href={() => false}> CoinPlan </a>
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
                <div class="col-xl-8 col-md-8 col-sm-12 col-12 mb-4">
                  <button
                    class="btn text-white btn-danger  text-center"
                    onClick={handleOpen}
                  >
                    <i class="fa fa-plus pr-1" aria-hidden="true"></i> Add
                  </button>
                </div>
                <div class="col-xl-4 col-md-4 float-right col-sm-12 col-12 filtered-list-search ">
                  <form class="form-inline my-2 my-lg-0 justify-content-center">
                    <div class="w-100">
                      <input
                        type="text"
                        class="w-100 form-control product-search br-30"
                        id="input-search"
                        placeholder="Search Coin Plan..."
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
                      <th className="fw-bold">No </th>
                      <th className="fw-bold">Coin</th>
                      <th className="fw-bold">Dollar</th>
                      <th className="fw-bold">Extra Coin</th>
                      {/* <th className="fw-bold">planLevel</th> */}
                      <th className="fw-bold">platForm Type</th>
                      <th className="fw-bold">Tag</th>
                      <th className="fw-bold">Created Date</th>
                      <th className="fw-bold">is Active</th>
                      <th className="fw-bold">Edit</th>
                      <th className="fw-bold">Delete</th>
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
                              <td> {data?.coin}</td>
                              <td> {data?.dollar}</td>
                              <td>{data?.extraCoin ? data?.extraCoin : "0"}</td>
                              {/* <td>{data?.planLevel}</td> */}
                              <td>
                                {data?.platFormType === 0 ? "Android" : "IOS"}
                              </td>
                              <td>{data?.tag ? data?.tag : "-"}</td>
                              <td>
                                {" "}
                                {dayjs(data?.createdAt).format("DD MMM YYYY")}
                              </td>
                              <td>
                                <label class="switch s-icons s-outline  s-outline-primary mb-0">
                                  <input
                                    type="checkbox"
                                    checked={data?.isActive}
                                    onChange={() => handleClick(data?._id)}
                                  />
                                  <span class="slider round"></span>
                                </label>
                              </td>
                              <td>
                                <button
                                  className="btn btn-info"
                                  onClick={() => handleEdit(data)}
                                >
                                  <i className="fas fa-edit" />
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(data._id)}
                                >
                                  <i className="fas fa-trash-alt" />
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
                    { label: "All", value: data.length },
                  ]}
                  component="div"
                  count={data.length}
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
        <CoinPlanDialog />
      </div>
    </>
  );
};

export default connect(null, { getCoinPlan, deleteCoinPlan, isActiveCoinPlan })(
  CoinPlanTable
);
