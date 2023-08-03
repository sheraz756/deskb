import axios from "axios";
import { setToast } from "../../utils/toast";
import * as ActionType from "./host.type";

export const getHost = () => (dispatch) => {
  axios
    .get("host")
    .then((res) => {
      console.log(res.data.host);
      dispatch({ type: ActionType.GET_HOST, payload: res.data.host });
    })
    .catch((error) => console.log("error", error));
};

// handle Edit host

export const handleEditHost = (id, formData) => (dispatch) => {
  axios
    .patch(`host/updateHost?hostId=${id}`, formData)

    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: ActionType.EDIT_HOST,
          payload: { data: res.data.host_, id },
        });
        setToast("success", "hostUpdate Successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log("error", error));
};

// get profile
export const getHostProfile = (id) => (dispatch) => {
  
  axios
    .get(`host/hostProfile?hostId=${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ActionType.GET_HOST_PROFILE,
        payload: res.data.hostExist,
      });
    })
    .catch((error) => {
      console.log(error);
      setToast("error", error.message);
    });
};

// host disable

export const disableHost = (host) => (dispatch) => {
  axios
    .patch(`host/isBlock?hostId=${host._id}`)
    .then((res) => {
      console.log(res.data.host);
      dispatch({
        type: ActionType.HOST_DISABLE,
        payload: { data: res.data.host, id: host._id },
      });
      setToast(
        "success",
        `${host.name} Is ${
          host.isBlock !== true ? "disable" : "UnDisable"
        } Successfully!`
      );
    })
    .catch((error) => {
      console.log(error);
      setToast("error", error.message);
    });
};

// get history

export const getHostHistory =
(hostId, type, page, size, startDate, endDate) => (dispatch) => {

  axios
      .get(
        `history/historyForUser?hostId=${hostId}&type=${type}&start=${page}&limit=${size}&startDate=${startDate}&endDate=${endDate}`
      )
      .then((res) => {

        console.log(res.data);
        dispatch({
          type: ActionType.GET_HOST_HISTORY,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

export const updateHostCoin = (val, ids) => (dispatch) => {
  axios
    .post(`user/addLessCoin`, { hostId: ids, coin: val })
    .then((res) => {
      console.log(res.data);
      if (res.data.status) {
        dispatch({
          type: ActionType.UPDATE_HOST_COIN,
          payload: { editHostCoin: res.data.hostExist },
        });
        setToast("success", "Host  Updated Successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => setToast("error", error));
};
