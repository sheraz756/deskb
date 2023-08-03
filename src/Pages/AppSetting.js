import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getSetting,
  updateSetting,
  handleSwitch,
} from "../store/setting/setting.action";
import { permissionError } from "../utils/Alert";

const AppSetting = (props) => {
  const { setting } = useSelector((state) => state.setting);

  const hasPermission = useSelector((state) => state.admin.admin.flag);

  const [agoraKey, setAgoraKey] = useState("");
  const [agoraCertificate, setAgoraCertificate] = useState("");
  const [privacyPolicyLink, setPrivacyPolicyLink] = useState("");
  const [privacyPolicyText, setPrivacyPolicyText] = useState("");
  const [termAndCondition, setTermAndCondition] = useState("");
  const [isAppActive, setAppIsAppActive] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [redirectMessage, setRedirectMessage] = useState("");
  const [redirectAppUrl, setRedirectAppUrl] = useState("");
  const [chargeForRandomCall, setChargeForRandomCall] = useState("");
  const [coinPerDollar, setCoinPerDollar] = useState("");
  const [coinCharge, setCoinCharge] = useState("");

  const [errors, setError] = useState({
    agoraKey: "",
    agoraCertificate: "",
    privacyPolicyLink: "",
    privacyPolicyText: "",
    chargeForRandomCall: "",
    termAndCondition: "",
    coinCharge: "",
    isAppActive: "",
    welcomeMessage: "",
    redirectMessage: "",
    redirectAppUrl: "",
  });

  useEffect(() => {
    props.getSetting(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCoinCharge(setting?.coinCharge);
    setAgoraKey(setting?.agoraKey);
    setAgoraCertificate(setting?.agoraCertificate);
    setPrivacyPolicyLink(setting?.privacyPolicyLink);
    setPrivacyPolicyText(setting?.privacyPolicyText);
    setTermAndCondition(setting?.termAndCondition);

    setRedirectAppUrl(setting?.redirectAppUrl);
    setRedirectMessage(setting?.redirectMessage);
    setChargeForRandomCall(setting?.chargeForRandomCall);
    setAppIsAppActive(setting?.isAppActive);
    setWelcomeMessage(setting?.welcomeMessage);
    setCoinPerDollar(setting?.coinPerDollar);
  }, [setting]);

  const handleSubmit = () => {
    if (
      !coinCharge ||
      !agoraKey ||
      !agoraCertificate ||
      !privacyPolicyLink ||
      !privacyPolicyText ||
      !termAndCondition ||
      !welcomeMessage ||
      !redirectMessage ||
      !redirectAppUrl ||
      !coinPerDollar
      // !chargeForRandomCall
    ) {
      let error = {};
      if (!coinCharge) error.coinCharge = "Coin Charge IS Required";
      if (!agoraKey) error.agoraKey = "Agora Key Is Required";
      if (!agoraCertificate)
        error.agoraCertificate = "Agora Certificate Is Required";
      // if(!chargeForRandomCall) error.chargeForRandomCall ="Charge For RandomCall Is R"
      if (!welcomeMessage) error.welcomeMessage = "Welcome Message Required";
      if (!redirectAppUrl) error.redirectAppUrl = "Redirect App URL Required";
      if (!redirectMessage) error.redirectMessage = "Redirect Message Required";
      if (!privacyPolicyLink)
        error.privacyPolicyLink = "Privacy Policy Link Required";
      if (!termAndCondition)
        error.termAndCondition = "Term and Condition Required";
      if (!privacyPolicyText)
        error.privacyPolicyText = "Privacy Policy Text Required";
      if (!coinPerDollar) error.coinPerDollar = "Coin is Required";
    } else {
      let settingData = {
        agoraKey,
        agoraCertificate,
        privacyPolicyLink,
        privacyPolicyText,
        termAndCondition,
        isAppActive,
        welcomeMessage,
        redirectMessage,
        redirectAppUrl,
        chargeForRandomCall,
        coinPerDollar,
        coinCharge,
      };

      if (!hasPermission) return permissionError();

      props.updateSetting(settingData);
    }
  };

  const handleSwitch_ = (type) => {
    if (!hasPermission) return permissionError();
    props.handleSwitch(type);
  };

  return (
    <>
      <div className="row my-3">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <h4>App Setting</h4>
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
                <a href={() => false}>App Setting</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div class="col-md-6 col-12">
          <h5 className="my-3">Welcome Setting</h5>
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div className="col-12">
                  <h6 class="card-title  ">Welcome Setting</h6>
                </div>
              </div>

              <form>
                <div class=" mb-3  mt-4 row">
                  <div class="col-md-6">
                    <label for="loginBonus" class="form-label">
                      Redirect Message
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="loginBonus"
                      value={redirectMessage}
                      onChange={(e) => {
                        setRedirectMessage(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            redirectMessage: "Redirect Message is Required !",
                          });
                        } else {
                          return setError({
                            ...errors,
                            redirectMessage: "",
                          });
                        }
                      }}
                    />
                    {errors.redirectMessage && (
                      <div className="ml-2 mt-1">
                        {errors.redirectMessage && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.redirectMessage}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div class="col-md-6">
                    <label for="Redirect App Agora Key" class="form-label">
                      Redirect App Url
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="redirect AppUrl"
                      value={redirectAppUrl}
                      onChange={(e) => {
                        setRedirectAppUrl(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            redirectAppUrl: "Redirect AppUrl is Required !",
                          });
                        } else {
                          return setError({
                            ...errors,
                            redirectAppUrl: "",
                          });
                        }
                      }}
                    />
                    {errors.redirectAppUrl && (
                      <div className="ml-2 mt-1">
                        {errors.redirectAppUrl && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.redirectAppUrl}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div class="mb-3 mt-3 row">
                  <div class="col-md-12">
                    <label for="referralBonus" class="form-label">
                      Welcome Message
                    </label>
                    <textarea
                      row="3"
                      type="text"
                      class="form-control"
                      id="referralBonus"
                      value={welcomeMessage}
                      onChange={(e) => {
                        setWelcomeMessage(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            welcomeMessage: "Welcome Message is Required !",
                          });
                        } else {
                          return setError({
                            ...errors,
                            welcomeMessage: "",
                          });
                        }
                      }}
                    />
                    {errors.welcomeMessage && (
                      <div className="ml-2 mt-1">
                        {errors.welcomeMessage && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.welcomeMessage}
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
                    class="btn text-white  btn-secondary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-12 ">
          <h5 className="my-3">App Setting</h5>
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div className="col-6">
                  <h6 class="card-title d-flex justify-content-between mb-3">
                    Is App Active
                  </h6>
                </div>
                <div className="col-6">
                  <label class="switch s-icons s-outline s-outline-primary float-right  mb-4 mr-2">
                    <input
                      type="checkbox"
                      checked={isAppActive}
                      onChange={() => handleSwitch_("app")}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <form>
                <div class=" mb-3 row">
                  <div className="col-md-6 ">
                    <label for="policyLink" class="form-label">
                      Privacy Policy Link
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="policyLink"
                      value={privacyPolicyLink}
                      onChange={(e) => {
                        setPrivacyPolicyLink(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            privacyPolicyLink:
                              "privacy Policy Link is Required !",
                          });
                        } else {
                          return setError({
                            ...errors,
                            privacyPolicyLink: "",
                          });
                        }
                      }}
                    />{" "}
                    {errors.privacyPolicyLink && (
                      <div className="ml-2 mt-1">
                        {errors.privacyPolicyLink && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.privacyPolicyLink}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label for="policyText" class="form-label">
                      Term And Condition Link
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="policyText"
                      value={termAndCondition}
                      onChange={(e) => {
                        setTermAndCondition(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            termAndCondition:
                              "Term And Condition is Required !",
                          });
                        } else {
                          return setError({
                            ...errors,
                            termAndCondition: "",
                          });
                        }
                      }}
                    />
                    {errors.termAndCondition && (
                      <div className="ml-2 mt-1">
                        {errors.termAndCondition && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.termAndCondition}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div class=" mb-3 row">
                  <div className="col-md-12">
                    <label for="policyText" class="form-label">
                      Privacy Policy Text
                    </label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="policyText"
                      value={privacyPolicyText}
                      onChange={(e) => {
                        setPrivacyPolicyText(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            privacyPolicyText:
                              "privacy PolicyText is Required !",
                          });
                        } else {
                          return setError({
                            ...errors,
                            privacyPolicyText: "",
                          });
                        }
                      }}
                    />
                    {errors.privacyPolicyText && (
                      <div className="ml-2 mt-1">
                        {errors.privacyPolicyText && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.privacyPolicyText}
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
                    class="btn text-white  btn-secondary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div class="col-md-6 col-12">
          <h5 className="my-3">Agora Setting</h5>
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div className="col-12">
                  <h6 class="card-title  ">Agora Setting</h6>
                </div>
              </div>

              <form>
                <div class="mb-3 mt-3 row">
                  <div class="col-md-12">
                    <label for="referralBonus" class="form-label">
                      Agora Key
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="referralBonus"
                      value={agoraKey}
                      onChange={(e) => {
                        setAgoraKey(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            agoraKey: "Agora Key is Required !",
                          });
                        } else {
                          return setError({
                            ...errors,
                            agoraKey: "",
                          });
                        }
                      }}
                    />
                    {errors.agoraKey && (
                      <div className="ml-2 mt-1">
                        {errors.agoraKey && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.agoraKey}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div class=" mb-3 row">
                  <div class="col-md-12">
                    <label for="loginBonus" class="form-label">
                      Agora Certificate
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="loginBonus"
                      value={agoraCertificate}
                      onChange={(e) => {
                        setAgoraCertificate(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            agoraCertificate: "Agora Certificate is Required !",
                          });
                        } else {
                          return setError({
                            ...errors,
                            agoraCertificate: "",
                          });
                        }
                      }}
                    />
                    {errors.agoraCertificate && (
                      <div className="ml-2 mt-1">
                        {errors.agoraCertificate && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.agoraCertificate}
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
                    class="btn text-white  btn-secondary"
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
          <h5 className="my-3">Charge </h5>
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div className="col-12">
                  <h6 class="card-title  ">Charge </h6>
                </div>
              </div>
              <div class="row justify-content-between">
                <div className="col-5">
                  <form>
                    <div class="mb-3 mt-3 row">
                      <div class="col-md-12">
                        <label for="referralBonus" class="form-label">
                          Charge For RandomCall
                        </label>
                        <input
                          type="number"
                          min="0"
                          class="form-control"
                          id="chargeForRandomCall"
                          value={chargeForRandomCall}
                          onChange={(e) => {
                            setChargeForRandomCall(e.target.value);
                            // if (!e.target.value) {
                            //   return setError({
                            //     ...errors,
                            //     chargeForRandomCall: "Charge For RandomCall !",
                            //   });
                            // } else {
                            //   return setError({
                            //     ...errors,
                            //     chargeForRandomCall: "",
                            //   });
                            // }
                          }}
                        />
                        {/* {errors.chargeForRandomCall && (
                      <div className="ml-2 mt-1">
                        {errors.chargeForRandomCall && (
                          <div className="pl-1 text__left">
                            <span className="text-danger">
                              {errors.chargeForRandomCall}
                            </span>
                          </div>
                        )} 
                      </div>
                    )} */}
                      </div>
                    </div>
                  </form>
                </div>

                <div className="col-6">
                  <form>
                    <div class="mb-3 mt-3 row">
                      <div class="col-md-12">
                        <label for="referralBonus" class="form-label">
                          Coin Charge (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          class="form-control"
                          id="chargeForRandomCall"
                          value={coinCharge}
                          onChange={(e) => {
                            setCoinCharge(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...errors,
                                coinCharge: "Charge For Coin !",
                              });
                            } else {
                              return setError({
                                ...errors,
                                coinCharge: "",
                              });
                            }
                          }}
                        />
                        {errors.coinCharge && (
                          <div className="ml-2 mt-1">
                            {errors.coinCharge && (
                              <div className="pl-1 text__left">
                                <span className="text-danger">
                                  {errors.coinCharge}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <form>
                <div className="mb-3 row">
                  <div className="col-5">
                    <label htmlFor="Coin" className="form-label">
                      Coin Per Dollar ($)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Coin"
                      disabled
                      defaultValue="1 Dollar"
                    />
                  </div>
                  <div className="col-1 mt-5 text-center">=</div>
                  <div className="col-6">
                    <label htmlFor="Coin" className="form-label">
                      How Many Coin
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="Coin"
                      value={coinPerDollar}
                      onChange={(e) => setCoinPerDollar(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  class="btn text-white  btn-secondary"
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
  AppSetting
);
