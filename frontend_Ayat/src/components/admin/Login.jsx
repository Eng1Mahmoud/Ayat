import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import loginImage from "../../assets/login.png";
const SignIn = () => {
  const [verified, setVerified] = useState();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "الايميل مطلوب";
    }
    if (!values.password) {
      errors.password = " كلمة المرور مطلوب";
    }

    return errors;
  };
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post("http://localhost:4000/login", values, {
        "contnt-type": "application/json",
      })
      .then((res) => {
        if (res.data.verified === true) {
          Cookies.set("token", res.data.token);
          navigate("dashboard");
        } else {
          setMessage(res.data.error);
          setVerified(res.data.verified);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {

      setSubmitting(false);
      resetForm();
    }, 400);
  };

  return (
    <section className="SignIn">
      <div className="container ">
        <div className="head pt-5 m-auto  pb-3 px-1">
          <h2> تسجيل الدخول </h2>
        </div>

        <div className="row flex-sm-row-reverse flex-row">
          <div className="image py-3  col-md-6 col-sm-12  text-center">
            <div>
              <img src={loginImage} alt="signup" className="image-fluid" />
            </div>
          </div>
          <div className="content py-3 col-md-6 col-sm-12 pb-5">
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={onSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="form-group py-1">
                    <label htmlFor="email " className="py-4 lable">
                      الايميل
                    </label>
                    <Field
                      name="email"
                      type="text"
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group py-1">
                    <label htmlFor="password " className="py-4 lable">
                      {" "}
                      كلمة المرور
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn my-3 "
                    disabled={isSubmitting}
                  >
                    تسجيل الدخول
                  </button>
                </Form>
              )}
            </Formik>
            {!verified ? <div className="errorMesage">{message}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
