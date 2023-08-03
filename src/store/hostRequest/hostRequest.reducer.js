import * as ActionType from "./hostRequest.type";

const initialState = {
  hostRequest: [],
  dialog: false,
  dialogData: null,
};

export const hostRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_HOST_REQUEST:
      return {
        ...state,
        hostRequest: action.payload,
      };

    // open dialog
    case ActionType.OPEN_HOST_REQUEST_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };

    // close dialog
    case ActionType.CLOSE_HOST_REQUEST_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    case ActionType.EDIT_HOST_REQUEST:
      return {
        ...state,
        hostRequest: state.hostRequest.map((data) =>
          data._id === action.payload.id ? action.payload.editHost : data
        ),
      };

    case ActionType.ACCEPT_HOST_REQUEST:
      return {
        ...state,
        hostRequest: state.hostRequest.filter(
          (hostAccept) => hostAccept._id !== action.payload && hostAccept
        ),
      };
    default:
      return state;
  }
};
