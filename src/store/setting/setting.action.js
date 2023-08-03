import axios from "axios";
import { setToast } from "../../utils/toast";
import * as ActionType from "./setting.type";

// get setting

export const getSetting = () => (disaptch) => {
  axios
    .get(`live`)
    .then((res) =>
      disaptch({ type: ActionType.GET_SETTING, payload: res.data.setting })
    )
    .catch((error) => {
      console.log(error);
    });
};

// update setting

export const updateSetting = (settingData) => (dispatch) => {
  axios
    .patch(`setting `, settingData)
    .then((res) => {
      console.log(res.data);
      if (res.data.status) {
        dispatch({ type: ActionType.GET_SETTING, payload: res.data.setting });
        setToast("success", "Updated Successfully!");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log(error));
};

// handelSwicth

export const handleSwitch = (type) => (dispatch) => {
  axios
    .put(`setting?type=${type}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: ActionType.UPDATE_SETTING,
          payload: res.data.setting,
        });
        setToast("success", "Updated Successfully!");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => setToast("error", error.message));
};
