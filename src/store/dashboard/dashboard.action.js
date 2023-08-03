import axios from "axios";
import * as ActionType from "./dashboard.type";

export const getDashboard = () => (dispatch) => {
  axios
    .get(`dashboard/admin`)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: ActionType.GET_DASHBOARD, payload: res.data.dashboard });
    })
    .catch((error) => console.error(error));
};

export const getChart = (type, startDate, endDate) => (dispatch) => {
  axios
    .get(
      `dashboard/analyitc?type=${type}&startDate=${startDate}&endDate=${endDate}`
    )
    .then((res) => {
      dispatch({ type: ActionType.CHART_ANALYTIC, payload: res.data.analytic });
    })
    .catch((error) => console.log(error));
};

export const getChartData = (type, startDate, endDate) => (dispatch) => {
  axios
    .get(
      `dashboard/analyitc?type=${type}&startDate=${startDate}&endDate=${endDate}`
    )
    .then((res) => {
      dispatch({
        type: ActionType.USER_HOST_ANALYTIC,
        payload: { user: res.data.user, host: res.data.host },
      });
    })
    .catch((error) => console.log(error));
};
