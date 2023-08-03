import axios from "axios";
import { setToast } from "../../utils/toast";
import * as ActionType from "./Sticker.type";
// get banner
export const getSticker = () => (dispatch) => {
  axios
    .get(`sticker`)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: ActionType.GET_STICKER, payload: res.data.sticker });
    })
    .catch((error) => console.log(error.message));
};

// creat banner

export const createSticker = (data) => (dispatch) => {

  axios
    .post(`sticker`, data)
    .then((res) => {

      if (res.data.status) {
        dispatch({
          type: ActionType.CREATE_STICKER,
          payload: res.data.sticker,
        });
        setToast("success", "Sticker created successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log(error.message));
};

// edit banner

export const editSticker = (formData, id) => (dispatch) => {

  axios
    .patch(`sticker/${id}`, formData)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: ActionType.UPDATE_STICKER,
          payload: { data: res.data.sticker, id },
        });
        setToast("success", "Sticker update successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log(error.message));
};

// delete banner

export const deleteSticker = (data) => (dispatch) => {
  axios
    .delete(`sticker/${data}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: ActionType.DELETE_STICKER,
          payload: data,
        });
        setToast("success", "Sticker Delete successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log(error.message));
};
