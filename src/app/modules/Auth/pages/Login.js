import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
import { Form } from "react-bootstrap";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  // props.history.push('/dashboard');

  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .max(50, "Maximum 50 symbols")
      .required("Please Give Username or Email Address"),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Please Give Password"),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const setLoggedSuccess = () => {
    setIsLogged(true);
  };

  const setLoggedError = () => {
    setIsLogged(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      enableLoading();

      // Submit
      const response = await login(values.email, values.password);
      disableLoading();

      if (response.status) {
        setStatus("Successfully Logged in !");
        window.location.href = "/dashboard";
        setLoggedSuccess();
      } else {
        setStatus("Invalid Username and Password !");
        setLoggedError();
      }

      // setTimeout(() => {
      //   login(values.email, values.password)
      //     .then(({ data: { accessToken } }) => {
      //       disableLoading();
      //       props.login(accessToken);
      //     })
      //     .catch(() => {
      //       disableLoading();
      //       setSubmitting(false);
      //       setStatus(
      //         "Invalid Username and Password !"
      //       );
      //     });
      // }, 1000);
    },
  });

  return (
    <div className="login-form login-signin " id="kt_login_signin_form ">
      {/* begin::Head */}
      <img className="loginpageLogo " src="/media/logos/logo.svg" alt="logo" />
      <div className="mt-10 ">
        <h1 className="font-size-h1 heading text-center">Sign In</h1>
        {/* <h1 className="site_name_login">
          iMarine
        </h1> */}
      </div>
      {/* end::Head */}

      {/*begin::Form*/}

      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework loginForm"
      >
        {formik.status && !isLogged ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          ""
        )}

        {formik.status && isLogged ? (
          <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          ""
        )}

        <div className="form-group fv-plugins-icon-container">
          <label className="login-label">Email </label>
          <div className=""></div>
          <input
            placeholder="Enter Email"
            type="text"
            className={`form-control  emailinput h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group justify-content-between align-items-center mt-5">
          <p className="float-right text-right text-primary">
            <Link
              to=""
              className=" my-3 mr-2 forgotPasswordText"
              id="kt_login_forgot"
            >
              Forgot Password?
            </Link>
          </p>
        </div>

        <div className="form-group fv-plugins-icon-container">
          <label className="login-label">Password</label>
          <input
            placeholder="Enter Password"
            type="password"
            className={`form-control emailinput  h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>

        {/* <div className="form-group justify-content-between align-items-center float-left">
          <Form.Group controlId="formBasicChecbox">
            <Form.Check
              className="forgotPasswordText  "
              type="checkbox"
              label="Remember Me"
            />
          </Form.Group>
        </div> */}

        <div className="clearfix"></div>
        <div className="mt-5 text-center">
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary loginButton overlay__caption`}
          >
            <span className="loginText">Sign in</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
        {/* <p className="mt-5 ">
          <Link className="signupText " to="">
            Don't have account? <b>SIGNUP</b>
          </Link>
        </p> */}
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
