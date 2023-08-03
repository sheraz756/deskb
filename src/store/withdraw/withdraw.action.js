import axios from "axios";
import { setToast } from "../../utils/toast";
import * as ActionType from "./withdraw.type";
// get withdraw
export const getWithdraw = () => (dispatch) => {
  axios
    .get(`withdraw`)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: ActionType.GET_WITHDRAW, payload: res.data.withdraw });
    })
    .catch((error) => console.log(error.message));
};

// create withdraw

export const createWithdraw = (formData) => (dispatch) => {
  axios
    .post(`withdraw`, formData)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: ActionType.CREATE_WITHDRAW,
          payload: res.data.withdraw,
        });
        setToast("success", "withdraw created successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log(error.message));
};

// edit withdraw

export const updateWithdraw = (id, formData) => (dispatch) => {
  console.log("id", id);
  axios
    .patch(`withdraw?withdrawId=${id}`, formData)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: ActionType.UPDATE_WITHDRAW,
          payload: { data: res.data.withdraw, id },
        });
        setToast("success", "withdraw update successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log(error.message));
};

// delete withdraw

export const deleteWithdraw = (data) => (dispatch) => {
  axios
    .delete(`withdraw?withdrawId=${data}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: ActionType.DELETE_WITHDRAW,
          payload: data,
        });
        setToast("success", "withdraw update successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log(error.message));
};
