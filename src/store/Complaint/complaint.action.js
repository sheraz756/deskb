//axios
import axios from "axios";

//toast
import { setToast } from "../../utils/toast";

import { GET_COMPLAINT, SOLVED_COMPLAINT } from "./complaint.type";

export const getComplaint = (type, userType) => (dispatch) => {

  axios
    .get(`complaint?type=${type}&userType=${userType}`)
    .then((res) => {
      console.log(res.data)
      if (res.data.status) {
        dispatch({ type: GET_COMPLAINT, payload: res.data.complaint });
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      setToast("error", error.message);
    });
};

export const solvedComplaint = (id) => (dispatch) => {
  axios
    .patch(`complaint/complaintId?complaintId=${id}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: SOLVED_COMPLAINT, payload: res.data.data });
        setToast("success", "Complain Solved Successfully");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      setToast("error", error.message);
    });
};
