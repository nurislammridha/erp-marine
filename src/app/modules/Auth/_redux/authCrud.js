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
  let loginResponse = {
    status: false,
    message: "",
    isLoading: true,
    access_token: "",
    userData: null,
    shipUser: null,
    moduleLists: [],
    data: null
  };
  // return loginResponse;
  let shipUser = null;
  const url = `http://iapps.akij.net/asll/public/api/v1/auth/superuser-login`;
  try {
    await axios
      .post(url, {
        username: username,
        password: password
      })
      .then(async (res) => {
        const { status, data, message } = res.data;
        let { user } = data;
        loginResponse.access_token = data.access_token;
        loginResponse.data = data;

        loginResponse.status = true;
        if (status) {
          loginResponse.message = message;
          loginResponse.userData = user;
          localStorage.setItem('access_token', loginResponse.access_token);
        }
      })
      .catch(async (error) => {
        loginResponse.message = "Invalid Username and password";
        loginResponse.status = false;
      });

      // Do More..
    if (loginResponse.status) {
      let loginUserData = null;
      await axios
        .get(`http://iapps.akij.net/asll/public/api/v1/hr/getUserDataByUserEmail?strOfficeEmail=${username}@akij.net`)
        .then(async function (response) {
          let responsData = response.data.data;
          loginUserData = responsData;
        });

      if (loginResponse.userData.intUserTypeID == 17) {
        await axios.get(`http://iapps.akij.net/asll/public/api/v1/asllhr/getEmployeeDetails/${loginResponse.userData.intEnroll}`)
          .then(res => {
            loginResponse.userData.shipUser = res.data.data;
            loginResponse.userData.intVesselId = res.data.data.intVesselID;
          });
      }

      // if successfull then call module list api and get modules list array and update that to userData.moduleLists
      const moduleURL = `http://iapps.akij.net/asll/public/api/v1/roles/getModulePermissionByUser?intUserTypeID=${loginResponse.userData.intUserTypeID}&intUserID=${loginResponse.userData.intEnroll}`;
      await axios
        .get(`${moduleURL}`)
        .then((res) => {
          loginResponse.userData.moduleLists = res.data.data;
        })
        .catch((error) => {
          loginResponse.isLoading = false;
        });
    }

    localStorage.setItem("userData", JSON.stringify(loginResponse.userData));
    loginResponse.isLoading = false;
    return loginResponse;
  } catch (error) {
    console.log('error', error);
    
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
