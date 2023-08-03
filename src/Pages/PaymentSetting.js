import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {
  getSetting,
  updateSetting,
  handleSwitch,
} from "../store/setting/setting.action";
//Multi Select Dropdown
import Multiselect from "multiselect-react-dropdown";
import { permissionError } from "../utils/Alert";
const PaymentSetting = (props) => {
  const { setting } = useSelector((state) => state.setting);
  const hasPermission = useSelector((state) => state.admin.admin.flag);

  const [googlePlayEmail, setGooglePlayEmail] = useState("");
  const [googlePlayKey, setGooglePlayKey] = useState("");
  const [razorPaySwitch, setRazorPaySwitch] = useState(false);
  const [googlePlaySwitch, setGooglePlaySwitch] = useState(false);
  const [stripePublishableKey, setStripePublishableKey] = useState("");
  const [stripeSecretKey, setStripeSecretKey] = useState("");
  const [stripeSwitch, setStripeSwitch] = useState(false);
  const [razorPayId, setRazorPayId] = useState("");
  const [razorSecretKey, setRazorSecretKey] = useState("");
  const [paymentGateway, setPaymentGateway] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [errors, setError] = useState({
    googlePlayEmail: "",
    googlePlayKey: "",
    paymentGateway: "",
    stripePublishableKey: "",
  });

  useEffect(() => {
    props.getSetting(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const paymentGateway = setting?.paymentGateway?.map((data) => {
      return {
        name:
          (data == "Paytm" && "Paytm") ||
          (data == "PayPal" && "PayPal") ||
          (data == "Banking" && "Banking"),
      };
    });
    setGooglePlayEmail(setting?.googlePlayEmail);
    setGooglePlayKey(setting?.googlePlayKey);
    setGooglePlaySwitch(setting?.googlePlaySwitch);
    setRazorPaySwitch(setting?.razorPaySwitch);
    setStripeSwitch(setting?.stripeSwitch);
    setStripePublishableKey(setting?.stripePublishableKey);
    setStripeSecretKey(setting?.stripeSecretKey);
    setRazorPayId(setting?.razorPayId);
    setRazorSecretKey(setting?.razorSecretKey);
    setPaymentGateway(setting?.paymentGateway);
    setSelectedValue(paymentGateway);
  }, [setting]);

  const handleSubmit = () => {
    if (
      !googlePlayEmail ||
      !googlePlayKey ||
      !stripePublishableKey ||
      !paymentGateway ||
      !stripeSecretKey
    ) {
      let error = {};

      if (!stripePublishableKey)
        error.stripePublishableKey = "Stripe Certificate Is Required";
      if (!stripeSecretKey) error.stripeSecretKey = "Stripe Secret Is Required";
      if (!paymentGateway) error.paymentGateway = "Payment Gateway Is Required";

      if (!googlePlayEmail)
        error.googlePlayEmail = "Google Play Email Required";
      if (!googlePlayKey) error.googlePlayKey = "Google Play Key Required";
    } else {
      let settingData = {
        googlePlayEmail,
        googlePlayKey,
        razorSecretKey,
        razorPayId,
        stripePublishableKey,
        stripeSecretKey,
        paymentGateway,
      };
      if (!hasPermission) return permissionError();
      props.updateSetting(settingData);
    }
  };
  const handleSwitch_ = (type) => {
    if (!hasPermission) return permissionError();
    props.handleSwitch(type);
  };

  //onselect function of selecting multiple values
  function onSelect(selectedList, selectedItem) {
    paymentGateway.push(selectedItem.name);
  }

  //onRemove function for remove multiple values
  function onRemove(selectedList, removedItem) {
    setPaymentGateway(selectedList.map((data) => data.name));
  }

  const paymentGateWayOption = [
    { name: "Paytm", id: "Paytm" },
    { name: "PayPal", id: "PayPal" },
    { name: "Banking", id: "Banking" },
  ];

  return (
    <>
      <div className="row my-3">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <h4>Payment Setting</h4>
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 col-12 ">
          <div class="breadcrumb-four float-right">
            <ul class="breadcrumb">
              <li>
                <Link to="/admin/dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-home"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </Link>
              </li>
              <li class="active">
                <a href={() => false}> Payment Setting</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-12">
          <h5 className="my-3">Google Setting</h5>
          <div class="card">
            <div class="card-body">
              {/* google pay switch */}

              <div class="row">
                <div className="col-6">
                  <h5 class="card-title d-flex justify-content-between">
                    Google Play
                  </h5>
                </div>
                <div className="col-6">
                  <label class="switch s-icons s-outline s-outline-primary float-right  mb-4 mr-2">
                    <input
                      type="checkbox"
                      checked={googlePlaySwitch}
                      onChange={() => handleSwitch_("googlePlay")}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <form>
                <div class="mb-3 row">
                  <div className="col-12">
                    <label for="googlePlayEmail" class="form-label">
                      Google Play Email
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="googlePlayEmail"
                      value={googlePlayEmail}
                      onChange={(e) => {
                        setGooglePlayEmail(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            googlePlayEmail: "Google Play Email is Required !",
                          });
                        } else {
                          return setError({
                            ...errors,
                            googlePlayEmail: "",
                          });
                        }
                      }}
                    />{" "}
                    {errors.googlePlayEmail && (
                      <div className="ml-2 mt-1">
                        {errors.googlePlayEmail && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.googlePlayEmail}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div class="mb-3 row">
                  <div className="col-12">
                    <label for="key" class="form-label">
                      Key
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="key"
                      value={googlePlayKey}
                      onChange={(e) => {
                        setGooglePlayKey(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            googlePlayKey: "GooglePlay Key is Required !",
                          });
                        } else {
                          return setError({
                            ...errors,
                            googlePlayKey: "",
                          });
                        }
                      }}
                    />
                    {errors.googlePlayKey && (
                      <div className="ml-2 mt-1">
                        {errors.googlePlayKey && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.googlePlayKey}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn text-white btn-secondary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <h5 className="my-3">Stripe Setting</h5>
          <div class="card">
            <div class="card-body">
              <div className="row">
                <div className="col-6">
                  <h5 class="card-title d-flex justify-content-between">
                    Stripe
                  </h5>
                </div>
                <div className="col-6">
                  <label class="switch s-icons s-outline s-outline-primary float-right  mb-4 mr-2">
                    <input
                      type="checkbox"
                      checked={stripeSwitch}
                      onChange={() => handleSwitch_("stripe")}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <form>
                <div class="mb-3">
                  <label for="publishableKey" class="form-label">
                    Publishable Key
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="publishableKey"
                    value={stripePublishableKey}
                    onChange={(e) => {
                      setStripePublishableKey(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          stripePublishableKey:
                            "Stripe PublishableKey is Required !",
                        });
                      } else {
                        return setError({
                          ...errors,
                          stripePublishableKey: "",
                        });
                      }
                    }}
                  />{" "}
                  {errors.stripePublishableKey && (
                    <div className="ml-2 mt-1">
                      {errors.stripePublishableKey && (
                        <div className="pl-1 text__left">
                          <span className="text-danger">
                            {errors.stripePublishableKey}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div class="mb-3">
                  <label for="secretKey" class="form-label">
                    Secret Key
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="secretKey"
                    value={stripeSecretKey}
                    onChange={(e) => {
                      setStripeSecretKey(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          stripeSecretKey: "stripe SecretKey is Required !",
                        });
                      } else {
                        return setError({
                          ...errors,
                          stripeSecretKey: "",
                        });
                      }
                    }}
                  />
                  {errors.stripeSecretKey && (
                    <div className="ml-2 mt-1">
                      {errors.stripeSecretKey && (
                        <div className="pl-1 text__left">
                          <span className="text-danger">
                            {errors.stripeSecretKey}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </form>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-secondary text-white"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div class="col-md-6 col-12">
          <h5 className="my-3">Razor Pay Setting</h5>
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div className="col-6">
                  <h5 class="card-title d-flex justify-content-between">
                    Razor Play
                  </h5>
                </div>
                <div className="col-6">
                  <label class="switch s-icons s-outline s-outline-primary float-right  mb-4 mr-2">
                    <input
                      type="checkbox"
                      checked={razorPaySwitch}
                      onChange={() => handleSwitch_("razorPay")}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>

              <form>
                <div class="mb-3 row">
                  <div className="col-12">
                    <label for="googlePlayEmail" class="form-label">
                      Razor Secret Key
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="razorSecretKey"
                      value={razorSecretKey}
                      onChange={
                        (e) => setRazorSecretKey(e.target.value)
                        // if (!e.target.value) {
                        //   return setError({
                        //     ...errors,
                        //     razorSecretKey: "Razor Secrete Key  is Required !",
                        //   });
                        // } else {
                        //   return setError({
                        //     ...errors,
                        //     razorSecretKey: "",
                        //   });
                        // }
                      }
                    />
                    {errors.razorSecretKey && (
                      <div className="ml-2 mt-1">
                        {/* {errors.razorSecretKey && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.razorSecretKey}
                            </span>
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
                <div class="mb-3 row">
                  <div className="col-12">
                    <label for="key" class="form-label">
                      Key razor Pay Id
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="key"
                      value={razorPayId}
                      onChange={(e) => {
                        setRazorPayId(e.target.value);
                        // if (!e.target.value) {
                        //   return setError({
                        //     ...errors,
                        //     razorPayId: "Razor Pay Id is Required !",
                        //   });
                        // } else {
                        //   return setError({
                        //     ...errors,
                        //     razorPayId: "",
                        //   });
                        // }
                      }}
                    />
                    {/* {errors.razorPayId && (
                      <div className="ml-2 mt-1">
                        {errors.razorPayId && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.razorPayId}
                            </span>
                          </div>
                        )}
                      </div>
                    )} */}
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn text-white btn-secondary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-12">
          <h5 className="my-3">Razor Pay Setting</h5>
          <div class="card">
            <div class="card-body pt-1 pb-1">
              <div>
                <div className="form-group mb-2">
                  <p className="form-label fw-bold mt-1">Payment Get Way</p>
                </div>

                <Multiselect
                  options={paymentGateWayOption}
                  selectedValues={selectedValue} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  className="form-control pointer"
                />
                {errors.paymentGateway && (
                  <div className="pl-1 text-left">
                    <Typography
                      variant="caption"
                      color="error"
                      style={{ fontFamily: "Circular-Loom" }}
                    >
                      {errors?.paymentGateway}
                    </Typography>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  class="btn text-white btn-secondary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getSetting, updateSetting, handleSwitch })(
  PaymentSetting
);
