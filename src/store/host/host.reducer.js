import * as ActionType from "./host.type";

const initialState = {
  host: [],
  dialog: false,
  dialogueData: null,
  hostProfile: {},
  hostHistory: [],
  totalCoin: 0,
  total: 0,
};

export const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_HOST:
      return {
        ...state,
        host: action.payload,
      };

    // open dialog
    case ActionType.OPEN_HOST_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogueData: action.payload || null,
      };

    // close dialog
    case ActionType.CLOSE_HOST_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogueData: null,
      };

    case ActionType.EDIT_HOST:
      console.log(action.payload);
      return {
        ...state,
        host: state.host.map((data) =>
          data._id === action.payload.data._id ? action.payload.data : data
        ),
      };
    case ActionType.GET_HOST_PROFILE:
      return {
        ...state,
        hostProfile: action.payload,
      };
    case ActionType.HOST_DISABLE:
      return {
        ...state,
        host: state.host.map((data) =>
          data._id === action.payload.id ? action.payload.data : data
        ),
        hostProfile: action.payload.data,
      };
    case ActionType.GET_HOST_HISTORY:
      return {
        ...state,
        hostHistory: action.payload.history,
        totalCoin: action.payload.totalCoin,
        total: action.payload.total,
      };
    case ActionType.UPDATE_HOST_COIN:
      return {
        ...state,
        host: action.payload.host,
      };
    default:
      return state;
  }
};
