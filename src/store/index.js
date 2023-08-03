import { combineReducers } from "redux";
import { adminReducer } from "./Admin/admin.reducer";
import { bannerReducer } from "./Banner/banner.reducer";
import { coinPlanReducer } from "./CoinPlan/CoinPlan.reducer";
import { GiftReducer } from "./Gift/gift.reducer";
import { GiftCategoryReducer } from "./GiftCategory/GiftCategory.reducer";
import { hostReducer } from "./host/host.reducer";
import { hostRequestReducer } from "./hostRequest/hostRequest.reducer";
import { loaderReducer } from "./Lodaer/loader.reducer";
import settingReducer from "./setting/setting.reducer";
import { UserReducer } from "./user/user.reducer";
import complaintReducer from "./Complaint/complaint.reducer";
import { dashboardReducer } from "./dashboard/dashboard.reducer";
import { stickerReducer } from "./Sticker/Sticker.reducer";
import redeemReducer from "./Redeem/redeem.reducer";
import { withdrawReducer } from "./withdraw/withdraw.reducer";

export default combineReducers({
  admin: adminReducer,
  dashboard: dashboardReducer,
  user: UserReducer,
  hostRequest: hostRequestReducer,
  host: hostReducer,
  giftCategory: GiftCategoryReducer,
  gift: GiftReducer,
  banner: bannerReducer,
  coinPlan: coinPlanReducer,
  complaint: complaintReducer,
  setting: settingReducer,
  withdraw: withdrawReducer,
  isLoading: loaderReducer,
  sticker: stickerReducer,
  redeem: redeemReducer,
});
