import React from "react";
import { useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";
import Sidebar from "../Components/navbar/Sidebar";
import UserTable from "../Components/table/UserTable";
import Dashboard from "./Dashboard";

//css
// import "../assets/js/bootstrap/css/bootstrap.min.css";
// import "../assets/css/plugins.css";
// import "../assets/css/structure.css";
import "../assets/css/tables/table-basic.css";
import "../assets/css/elements/search.css";
import "../assets/css/forms/switches.css";
import "../assets/css/elements/breadcrumb.css";
import "../assets/css/tables/table-basic.css";

//js
import "../assets/js/bootstrap/js/bootstrap.min.js";
import "../assets/js/bootstrap/js/popper.min.js";
import "../assets/js/app";

//component
import HostTable from "../Components/table/HostTable";
import HostRequest from "../Components/table/HostRequest";
import GiftCategory from "./GiftCategory";
import Gift from "./Gift";
import CoinPlanTable from "../Components/table/CoinPlanTable";
import Banner from "../Components/table/Banner";

import AddGift from "../Components/Dialog/Gift/AddGift";
import PendingComplaintTable from "../Components/table/PendingComplaintTable";
import SolvedComplaintTable from "../Components/table/SolvedComplaintTable";
import UserProflie from "./UserProflie";
import HostProflie from "./HostProflie";
import Proflie from "./Proflie";
import HostHistoryTable from "../Components/table/HostHistoryTable";
import UserHistory from "../Components/table/UserHistory";
import PaymentSetting from "./PaymentSetting";
import AppSetting from "./AppSetting";
import Error404 from "./Error404";
import Sticker from "../Components/table/Sticker";
import PendingRedeemTable from "../Components/table/PendingRedeemTable";
import DeclinedRedeem from "../Components/table/DeclinedRedeem";
import AcceptedRedeem from "../Components/table/AcceptedRedeem";
import PurchasePlanTable from "../Components/table/PurchasePlanTable";
import Withdraw from "../Components/table/Withdraw";

const Admin = () => {
  const history = useHistory();
  const location = useRouteMatch();

  useEffect(() => {
    if (history.path === "/admin") {
      history.push("/admin/dashboard");
    } // eslint-disable-next-line
  }, []);
  return (
    <>
      <Navbar />

      {/* <SubNavbar /> */}

      <div
        class="main-container"
        id="container"
        style={{ backgroundColor: "#1f1c30" }}
      >
        <div class="overlay"></div>
        <div className="search-overlay"></div>
        <Sidebar />
        <div id="content" class="main-content">
          <div class="layout-px-spacing mt-4">
            <Switch>
              <Route
                path={`${location.path}/dashboard`}
                component={Dashboard}
              />
              <Route path={`${location.path}/profile`} component={Proflie} />

              <Route
                path={`${location.path}/user`}
                exact
                component={UserTable}
              />
              <Route
                path={`${location.path}/user/history`}
                exact
                component={UserHistory}
              />
              <Route
                path={`${location.path}/user/userProfile`}
                component={UserProflie}
              />
              <Route
                path={`${location.path}/host/hostProfile`}
                component={HostProflie}
              />
              <Route
                path={`${location.path}/host`}
                exact
                component={HostTable}
              />
              <Route
                path={`${location.path}/sticker`}
                exact
                component={Sticker}
              />
              <Route
                path={`${location.path}/host/history`}
                exact
                component={HostHistoryTable}
              />
              <Route
                path={`${location.path}/hostRequest`}
                exact
                component={HostRequest}
              />
              <Route
                path={`${location.path}/giftCategory`}
                exact
                component={GiftCategory}
              />
              <Route path={`${location.path}/gift`} exact component={Gift} />
              <Route
                exact
                path={`${location.path}/giftCategory/dialog`}
                component={AddGift}
              />

              <Route
                exact
                path={`${location.path}/gift/dialog`}
                component={AddGift}
              />

              <Route
                path={`${location.path}/coinPlan`}
                exact
                component={CoinPlanTable}
              />

              <Route
                path={`${location.path}/withdraw`}
                exact
                component={Withdraw}
              />
              <Route
                path={`${location.path}/purchasePlan`}
                exact
                component={PurchasePlanTable}
              />
              <Route
                path={`${location.path}/banner`}
                exact
                component={Banner}
              />
              {/* <Route
                path={`${location.path}/setting`}
                exact
                component={Setting}
              /> */}
              <Route
                exact
                path={`${location.path}/giftCategory/gift`}
                component={Gift}
              />
              <Route
                path={`${location.path}/pendingRedeem`}
                exact
                component={PendingRedeemTable}
              />
              <Route
                path={`${location.path}/acceptedRedeem`}
                exact
                component={AcceptedRedeem}
              />
              <Route
                path={`${location.path}/declinedRedeem`}
                exact
                component={DeclinedRedeem}
              />
              <Route
                path={`${location.path}/pendingComplaint`}
                exact
                component={PendingComplaintTable}
              />

              <Route
                path={`${location.path}/solvedComplaint`}
                exact
                component={SolvedComplaintTable}
              />
              <Route
                path={`${location.path}/appSetting`}
                exact
                component={AppSetting}
              />
              <Route
                path={`${location.path}/paymentSetting`}
                exact
                component={PaymentSetting}
              />
              <Route path={`${location.path}/*`} exact component={Error404} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
