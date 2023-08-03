import * as ActionType from "./CoinPlan.Type";
const initialState = {
  coinPlan: [],
  dialog: false,
  dialogData: null,
  purchasePlan: [],
  total:0
};
export const coinPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_COIN_PLAN:
      return {
        ...state,
        coinPlan: action.payload,
      };
    case ActionType.OPEN_COIN_PLAN_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case ActionType.CLOSE_COIN_PLAN_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    case ActionType.CREATE_COIN_PLAN:
      let data = [...state.coinPlan];
      data.unshift(action.payload);
      return {
        ...state,
        coinPlan: data,
      };
    case ActionType.EDIT_COIN_PLAN:
      return {
        ...state,
        coinPlan: state.coinPlan.map((data) =>
          data._id === action.payload.id ? action.payload.data : data
        ),
      };
    case ActionType.DELETE_COIN_PLAN:
      return {
        ...state,
        coinPlan: state.coinPlan.filter(
          (data) => data._id !== action.payload && data
        ),
      };
    case ActionType.ACTIVE_SWITCH:
      return {
        ...state,
        coinPlan: state.coinPlan.map((data) =>
          data._id === action.payload.id ? action.payload.data : data
        ),
      };
    case ActionType.GET_PURCHASE_PLAN: {
      return {
        ...state,
        purchasePlan: action.payload.history,
        total:action.payload.totalCoin
      };

    }
    default:
      return state;
  }
};
