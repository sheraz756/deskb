import axios from "axios";
import { setToast } from "../../utils/toast";
import * as ActionType from "./hostRequest.type";

// get host request
export const getHostRequest = () => (dispatch) => {
  axios
    .get("request/newRequest")
    .then((res) => {
      dispatch({
        type: ActionType.GET_HOST_REQUEST,

        payload: res.data.requestAll,
      });
    })
    .catch((error) => console.log("error", error));
};

// edit request
export const hostRequestUpdate = (fromData, id) => (dispatch) => {
  axios
    .patch(`request/${id}`, fromData)
    .then((res) => {
      if (res.data.status) {
        setToast("success", "Update Successfully!");
        dispatch({
          type: ActionType.EDIT_HOST_REQUEST,
          payload: { editHost: res.data.request, id },
        });
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => setToast("error", error));
};

// host Request accept
export const hostRequestAccept = (id) => (dispatch) => {
  ;
  axios
    .put(`request/${id}`)
    .then((res) => {
      ;
      console.log(res.data);
      if (res.data.status) {
        dispatch({ type: ActionType.ACCEPT_HOST_REQUEST, payload: id });
        setToast("success", "Host Request Accept!");
      }
    })
    .catch((error) => console.log("error", error));
};
