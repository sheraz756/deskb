import axios from "axios";
import { setToast } from "../../utils/toast";
import * as ActionType from "./CoinPlan.Type";

// Get plan list
export const getCoinPlan = () => (dispatch) => {
  axios
    .get("/coinPlan")
    .then((res) => {
      console.log(res.data.coinPlan);
      dispatch({ type: ActionType.GET_COIN_PLAN, payload: res.data.coinPlan });
    })
    .catch((error) => console.log("error", error));
};

// create Coin PLan

export const createNewCoinPlan = (data) => (dispatch) => {
  axios
    .post(`coinPlan`, data)
    .then((res) => {
      console.log(res.data);
      if (res.data.status) {
        dispatch({
          type: ActionType.CREATE_COIN_PLAN,
          payload: res.data.coinPlan,
        });
        setToast("success", "CoinPlan Create successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error.message));
};

// Update Coin PLan
export const updateCoinPlan = (data, id) => (dispatch) => {
  axios
    .patch(`coinPlan?planId=${id}`, data)
    .then((res) => {
      ;
      console.log(res.data);
      if (res.data.status) {
        dispatch({
          type: ActionType.EDIT_COIN_PLAN,
          payload: { data: res.data.coinPlan, id },
        });
        setToast("success", "CoinPlan update successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error.message));
};

// Update Coin PLan
export const deleteCoinPlan = (id) => (dispatch) => {
  axios
    .delete(`coinPlan?planId=${id}`)
    .then((res) => {
      console.log(res.data);
      if (res.data.status) {
        dispatch({
          type: ActionType.DELETE_COIN_PLAN,
          payload: id,
        });
        setToast("success", "CoinPlan Delete successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error.message));
};

// isActive Coin PLan
export const isActiveCoinPlan = (id) => (dispatch) => {
  axios
    .put(`coinPlan?planId=${id}`)
    .then((res) => {
      console.log(res.data);
      if (res.data.status) {
        dispatch({
          type: ActionType.ACTIVE_SWITCH,
          payload: { data: res.data.coinPlan, id },
        });
        setToast(
          "success",
          `${
            res.data.coinPlan.isActive === true
              ? "CoinPlan  Active SuccessFully"
              : "CoinPlan Disable SuccessFully"
          }`
        );
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error.message));
};

export const getPurchasePlan = () => (dispatch) => {
  axios
    .get(`history/purchaseCoinHistory`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ActionType.GET_PURCHASE_PLAN,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};
