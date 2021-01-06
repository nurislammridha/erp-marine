import axios from "axios";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export async function login(email, password) {
  const data = {
    username: email,
    password: password,
  };
  const app_version = "1.0.0";
  let username = data.username;
  if (username.indexOf("@") !== -1) {
    username = username.substring(0, username.indexOf("@"));
  }
  let loginResponse = {
    status: false,
    message: "",
    isLoading: true,
    tokenData: "",
    data: {},
  };
  // return loginResponse;

  let userData = {};
  let strUserType = "";
  const url = `http://api1.akij.net:8053/api/ADAuthorization/ADAuthorization`;
  try {
    await axios
      .get(url, {
        params: {
          username: username,
          password: data.password,
        },
      })
      .then(async (res) => {
        let data = res.data;
        loginResponse.status = true; //data.status;
        loginResponse.message = "✔ Logged in Successfully !!"; //data.message;
        loginResponse.tokenData = "123456"; // data.access_token;
        loginResponse.data = "Test"; //data.user;

        await axios
          .get(
            // `http://api1.akij.net:8055/api/EmployeeProfile/GetEmployeeJobStationsByQuery?query=strOfficeEmail="${username}@akij.net"`,
            `${process.env.REACT_APP_API_URL}hr/getUserDataByUserEmail?strOfficeEmail=${username}@akij.net`
          )
          .then(async function(response) {
            let responsData = response.data.data[0];
            const {
              intEmployeeId,
              strEmployeeCode,
              strEmployeeName,
              intUnitId,
              intJobStationId,
              intJobTypeId,
              strOfficeEmail,
              strContactNo1,
              strPermanentAddress,
              strPresentAddress,
              strAlias,
              strCountry,
              strCity,
              dteBirth,
            } = responsData;

            userData = {
              intEmployeeId: intEmployeeId,
              strEmployeeCode: strEmployeeCode,
              strEmployeeName: strEmployeeName,
              intUnitId: intUnitId,
              intJobStationId: intJobStationId,
              intJobTypeId: intJobTypeId,
              strOfficeEmail: strOfficeEmail,
              strContactNo1: strContactNo1,
              strPermanentAddress: strPermanentAddress,
              strPresentAddress: strPresentAddress,
              strAlias: strAlias,
              strCountry: strCountry,
              strCity: strCity,
              dteBirth: dteBirth,
              tokenData: "tokenData",
              api_token: "tokenData",
              loginData: data.employee,
              intUserTypeID: 1,
              strUserType: "ERP User",
              ysnOwnUser: 1,
              moduleLists: [],
              intVesselId: null,
              intCargoId: null,
            };
            strUserType = "ERP User";
            loginResponse.data = userData;
            if (loginResponse.status == true) {
              // if successfull then call module list api and get modules list array and update that to userData.moduleLists
              let responseList = {
                data: {},
              };
              const moduleURL = `http://iapps.akij.net/asll/public/api/v1/roles/getModulePermissionByUser?intUserTypeID=${userData.intUserTypeID}&intUserID=${userData.intEmployeeId}`;
              await axios
                .get(`${moduleURL}`)
                .then((res) => {
                  responseList = res.data.data;
                })
                .catch((error) => {
                  responseList.isLoading = false;
                });
              userData.moduleLists = responseList;
              loginResponse.data = userData;
            }
          });
      })
      .catch(async (error) => {
        // error
        /** Check now with external data sets ->> driver, customer, supplier, master etc. */
        await axios
          .post(
            "http://iapps.akij.net/asll/public/api/v1/auth/external-login",
            {
              username: email,
              password: data.password,
            }
          )
          .then(async (res) => {
            console.log("LoginRes", res);
            const loginUserData = res.data.data.user;
            let intUserID = 0;
            strUserType = loginUserData.strUserType;

            if (loginUserData.intUserTypeID == 1) {
              // ERP User
              intUserID = loginUserData.intEnrol;
            } else if (loginUserData.intUserTypeID == 2) {
              // Supplier
              intUserID = loginUserData.intSupplierID;
            } else if (loginUserData.intUserTypeID == 3) {
              // Driver
              intUserID = loginUserData.intEnrol;
              strUserType = loginUserData.strDesignation;
            } else if (loginUserData.intUserTypeID == 4) {
              // Master
              intUserID = loginUserData.intEnrol;
            } else if (loginUserData.intUserTypeID == 5) {
              // Customer
              intUserID = loginUserData.intCustomerID;
            } else if (loginUserData.intUserTypeID == 6) {
              // Guard
              intUserID = loginUserData.intEnrol;
            } else if (loginUserData.intUserTypeID == 7) {
              // Government
              intUserID = loginUserData.intGovt;
            } else if (loginUserData.intUserTypeID == 8) {
              // Driver External
              intUserID = loginUserData.intDriverExternal;
            } else if (loginUserData.intUserTypeID == 9) {
              // General User
              intUserID = loginUserData.intEnrol;
              strUserType = loginUserData.strDesignation;
            } else if (loginUserData.intUserTypeID == 10) {
              // General User
              intUserID = loginUserData.intEnrol;
              strUserType = loginUserData.strDesignation;
            } else if (loginUserData.intUserTypeID == 16) {
              intUserID = loginUserData.intSupplierID;
            } else {
              intUserID = loginUserData.intEnrol;
              strUserType = loginUserData.strDesignation;
            }

            loginResponse.isLoading = false;
            loginResponse.status = true; //data.status;
            loginResponse.message = "✔ Logged in Successfully !!"; //data.message;
            loginResponse.tokenData = "123456"; // data.access_token;
            loginResponse.data = "Test"; //data.user;

            userData = {
              intEmployeeId: intUserID,
              strEmployeeCode: loginUserData.strEmployeeCode,
              strEmployeeName: loginUserData.strName,
              intUnitId: loginUserData.intUnitId,
              intJobStationId: loginUserData.intJobStationId,
              intJobTypeId: null,
              strOfficeEmail: loginUserData.strOfficeEmail,
              strContactNo1: loginUserData.strPhone,
              strJobStationName: null,
              strPermanentAddress: null,
              strPresentAddress: null,
              strAlias: loginUserData.strUserName,
              strCountry: "Bangladesh",
              strCity: null,
              dteBirth: null,
              strDescription: null,
              strJobType: null,
              strDistrict: null,
              strManager: loginUserData.intSuperviserId,
              strDesignation: loginUserData.strDesignation,
              strDepatrment: loginUserData.strDepatrment,
              tokenData: "tokenData",
              api_token: loginUserData.api_token,
              loginData: data.employee,
              intUserTypeID: loginUserData.intUserTypeID,
              strUserType: loginUserData.strUserType,
              ysnOwnUser: loginUserData.ysnOwnUser,
              territoryId: loginUserData.customerTerritoryID,
              salesofficeId: loginUserData.customerSalesOfficeId,
              intVesselId: loginUserData.intVesselId,
              intCargoId: loginUserData.intCargoId,
              moduleLists: [],
            };

            strUserType = loginUserData.strUserType;

            if (loginResponse.status == true) {
              // if successfull then call module list api and get modules list array and update that to userData.moduleLists
              let responseList = {
                data: {},
              };
              const moduleURL = `http://iapps.akij.net/asll/public/api/v1/roles/getModulePermissionByUser?intUserTypeID=${userData.intUserTypeID}&intUserID=${userData.intEmployeeId}`;

              await axios
                .get(`${moduleURL}`)
                .then((res) => {
                  responseList = res.data.data;
                })
                .catch((error) => {
                  responseList.isLoading = false;
                });
              userData.moduleLists = responseList;
              loginResponse.data = userData;
            }
          })
          .catch((err) => {
            console.log("Error with custom login external", error);
            loginResponse.isLoading = false;
            loginResponse.status = false;
            loginResponse.data = "Invalid Username and Password";
            loginResponse.tokenData = null;
            loginResponse.message = "❌ Invalid Username and Password";
          });
      });

    // If successfully logged
    // Store Data to login_attempts and store also app version
    // await axios.post(`http://crm.akij.net/api/store-login-data`, {
    //   token:
    //     'hjui9023872jhds283237hjj099230ncjqmckdlorudbsgdsd17217268208049820372367682293823091208793874364231101290832',
    //   type: 'app',
    //   name: 'crew',
    //   version: app_version,
    //   user_name:
    //     loginResponse.data.strEmployeeName +
    //     ' (' +
    //     loginResponse.data.intEmployeeId +
    //     ')',
    //   user_email: loginResponse.data.strOfficeEmail,
    //   user_phone_number: loginResponse.data.strContactNo1,
    //   user_type: strUserType,
    // });

    // Store Or Update app device token data
    loginResponse.isLoading = false;
    loginResponse.data = userData;
    localStorage.setItem("userData", JSON.stringify(userData));
    if (loginResponse.status == true) {
      loginResponse.data = userData;
    }

    return loginResponse;
  } catch (error) {
    loginResponse.isLoading = false;
    loginResponse.message =
      "❌ Network Not Available !\nConnect to Wifi or Internet Connection";
    return loginResponse;
  }
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}

export function getEmployeData() {
  // Authorization head should be fulfilled in interceptor.
  let userData = localStorage.getItem("userData");
  let employeeData = JSON.parse(userData);
  return employeeData;
}

export function getVesselId() {
  let data = getEmployeData();
  let intVesselId = null;
  if (typeof data !== "undefined" && data != null) {
    intVesselId = data.intVesselId;
  }
  if (typeof intVesselId !== "undefined" && intVesselId != null)
    return intVesselId;
  return "";
}

export function getCargoId() {
  let data = getEmployeData();
  let intCargoId = null;
  if (typeof data !== "undefined" && data != null) {
    intCargoId = data.intCargoId;
  }
  if (typeof intCargoId !== "undefined" && intCargoId != null)
    return intCargoId;
  return "";
}

export function getEmployeeId() {
  let data = getEmployeData();
  if (typeof data !== "undefined" && data != null) return data.intEmployeeId;
}
