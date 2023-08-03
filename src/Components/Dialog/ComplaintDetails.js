import React from "react";

//redux
import { useDispatch, useSelector } from "react-redux";

//MUI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

//types
import { CLOSE_COMPLAINT_DIALOG } from "../../store/Complaint/complaint.type";

const ComplaintDetails = (props) => {
  const dispatch = useDispatch();

  const { dialog: open, dialogData } = useSelector((state) => state.complaint);

  const closePopup = () => {
    dispatch({ type: CLOSE_COMPLAINT_DIALOG });
  };

  const handleOpenUrl = (data) => {
    window.open(data, "_blank");

  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="dialogue_background_color"
        >
          <span
            className="modal-title font-weight-bold h4"
           
          >
            Complain Details
          </span>
        </DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          <Tooltip title="Close">
            <Cancel style={{ color: "#009688" }} onClick={closePopup} />
          </Tooltip>
        </IconButton>
        <DialogContent>
          <div className="modal-body pt-1 px-1 pb-3">
            <form className="text-white">
              <table>
                {dialogData?.image && (
                  <tr>
                    <td className="py-2 mb-2 feedback__title">
                      Complain Image
                    </td>
                    <td className="py-2 mb-2 feedback__title">
                      &nbsp;:&nbsp;&nbsp;
                    </td>
                    <td className="py-2 mb-2 feedback__details">
                      <img
                        height="100px"
                        width="100px"
                        alt="app"
                        src={dialogData?.image}
                        style={{
                          boxShadow: "0 5px 15px 0 rgb(105 103 103 / 0%)",
                          border: "2px solid #fff",
                          borderRadius: 10,
                          float: "left",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleOpenUrl( dialogData?.image)
                        }
                      />
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="py-2 mb-2 feedback__title">User Name</td>
                  <td className="py-2 mb-2 feedback__title">
                    &nbsp;:&nbsp;&nbsp;&nbsp;
                  </td>
                  <td className="py-2 mb-2 feedback__details">
                    {dialogData?.userId?.name.charAt(0).toUpperCase() +
                      dialogData?.userId?.name.slice(1)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 mb-2 feedback__title">User's Country</td>
                  <td className="py-2 mb-2 feedback__title">
                    &nbsp;:&nbsp;&nbsp;&nbsp;
                  </td>
                  <td className="py-2 mb-2 feedback__details">
                    {dialogData?.userId?.country}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 mb-2 feedback__title">Contact </td>
                  <td className="py-2 mb-2 feedback__title">
                    &nbsp;:&nbsp;&nbsp;&nbsp;
                  </td>
                  <td className="py-2 mb-2 feedback__details">
                    {dialogData?.contact}
                  </td>
                </tr>

                <tr>
                  <td className="py-2 mb-2 feedback__title">
                    Complain Message
                  </td>
                  <td className="py-2 mb-2 feedback__title">
                    &nbsp;:&nbsp;&nbsp;&nbsp;
                  </td>
                  <td className="py-2 mb-2 feedback__details">
                    {dialogData?.message}
                  </td>
                </tr>

                <tr>
                  <td className="py-2 mb-2 feedback__title">Complain Status</td>
                  <td className="py-2 mb-2 feedback__title">
                    &nbsp;:&nbsp;&nbsp;&nbsp;
                  </td>
                  <td className="py-2 mb-2 feedback__details">
                    {dialogData?.isSolved ? (
                      <div className="badge bg-success mt-2 p-1">Solved</div>
                    ) : (
                      <div className="badge bg-warning mt-2 p-1">Pending</div>
                    )}
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ComplaintDetails;
