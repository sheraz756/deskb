import * as ActionType from "./Sticker.type";
const initialState = {
  sticker: [],
  dialog: false,
  dialogData: null,
};
export const stickerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_STICKER:
      return {
        ...state,
        sticker: action.payload,
      };
    case ActionType.OPEN_STICKER:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case ActionType.CLOSE_STICKER:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    case ActionType.CREATE_STICKER:
      console.log("action.payload" ,action.payload)
      let data = [...action.payload,...state.sticker];
      // data.unshift(action.payload);handleClose
      return {
        ...state,
        sticker: data,
      };
    case ActionType.UPDATE_STICKER:
      return {
        ...state,
        sticker: state.sticker.map((data) =>
          data._id === action.payload.id ? action.payload.data : data
        ),
      };
    case ActionType.DELETE_STICKER:
      return {
        ...state,
        sticker: state.sticker.filter(
          (data) => data._id !== action.payload && data
        ),
      };
    default:
      return state;
  }
};
