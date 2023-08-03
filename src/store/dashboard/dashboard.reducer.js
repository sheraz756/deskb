import * as ActionType from "./dashboard.type";

const initialState = {
  dashboard: {},
  analytic: [],
  user: [],
  host: [],
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
      };
    case ActionType.CHART_ANALYTIC:
      return {
        ...state,
        analytic: action.payload,
      };
    case ActionType.USER_HOST_ANALYTIC:
      return {
        ...state,
        user: action.payload.user,
        host: action.payload.host,
      };
    default:
      return state;
  }
};
