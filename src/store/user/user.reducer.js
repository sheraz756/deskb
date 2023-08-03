import * as ActionType from "./user.type";

const initialState = {
  user: [],
  userProfile: {},
  userHistory: [],
  totalData:0,
  totalCoin:0,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case ActionType.GET_USER_BLOCK:
      return {
        ...state,
        user: state.user.map((data) =>
          data._id === action.payload.id ? action.payload.data : data
        ),
        userProfile: action.payload.data,
      };
    case ActionType.GET_USER_HISTORY:
      console.log(action.payload);
      return {
        ...state,
        userHistory: action.payload.history,
        totalData:action.payload.total,
        totalCoin:action.payload.totalCoin
      };
      case ActionType.UPDATE_USER_COIN:
        return {
          ...state,
          user: action.payload.host,
        };
    default:
      return state;
  }
};
