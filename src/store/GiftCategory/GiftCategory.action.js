import axios from "axios";
import { setToast } from "../../utils/toast";
import * as ActionType from "./Giftcategory.type";

// gwt giftCategory
export const getGiftCategory = () => (dispatch) => {
  axios
    .get("giftCategory")
    .then((res) => {
      dispatch({
        type: ActionType.GET_GIFT_CATEGORY,
        payload: res.data.category,
      });
    })
    .catch((error) => setToast("error", error.message));
};

// create giftCategory

export const createGiftCategory = (formData) => (dispatch) => {
  axios
    .post("giftCategory", formData)
    .then((res) => {
      if (res.data.status) {
        setToast("success", "Category Create Successfuly!");
        dispatch({
          type: ActionType.CREATE_GIFT_CATEGORY,
          payload: res.data.category,
        });
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => setToast("error", error.message));
};

// update giftCategory

export const updateGiftCategory = (id, formData) => (dispatch) => {
  axios
    .patch(`giftCategory/?categoryId=${id}`, formData)
    .then((res) => {
      if (res.data.status) {
        setToast("success", "Category update Successfully!");
        dispatch({
          type: ActionType.EDIT_GIF_CATEGORY,
          payload: { data: res.data.category, id },
        });
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => setToast("error", error.message));
};

// delete giftCategory

export const deleteGiftCategory = (id) => (dispatch) => {
  ;
  axios
    .delete(`giftCategory/?categoryId=${id}`)

    .then((res) => {
      ;
      if (res.data.status) {
        setToast("success", "Category delete Successfully!");
        dispatch({
          type: ActionType.DELETE_GIF_CATEGORY,
          payload: id,
        });
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => setToast("error", error.message));
};
