import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import image from "../../assets/addmessage.png";
import Cookies from "js-cookie";
const validate = (values) => {
  const errors = {};

  if (!values.message) {
    errors.message = "الرسالة مطلوبة ";
  } else if (values.message.length > 1600) {
    errors.message =
      "لابد وان تكون الرسالة اقل من 1600 حرف حاول تقصير الرسالة ";
  }

  return errors;
};

const AddMessage = () => {
  const initialValues = {
    message: "",
    url: "",
    type:false
  };

  const handleSubmit = (values, { resetForm }) => {
 
    axios
      .post("http://localhost:4000/sendMessageToUser", values, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
    
      })
      .catch((err) => {
        console.error(err);
      });
    resetForm();
  };

  return (
    <section className="addMessage">
      <div className="container ">
        <div className="head pt-2 m-auto  pb-3 px-1">
          <h2> اضافة رسالة</h2>
        </div>
        <div className="row flex-sm-row-reverse flex-row">
          <div className="image py-3  col-md-6 col-sm-12 text-center">
            <div>
              <img src={image} alt="Contact" className="image-fluid" />
            </div>
          </div>
          <div className="content py-3 col-md-6 col-sm-12 pb-5">
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <div className="form-group py-2">
                    <label htmlFor="message" className="py-2">
                      الرسالة
                    </label>
                    <Field
                      name="message"
                      className={`form-control ${
                        errors.message && touched.message && "is-invalid"
                      }`}
                      row="4"
                      component="textarea"
                    />
                    {errors.message && touched.message && (
                      <div className="invalid-feedback">{errors.message}</div>
                    )}
                  </div>
                  <div className="form-group py-2">
                    <label htmlFor="url" className="py-2">
                      رابط الصورة
                    </label>
                    <Field
                      className={`form-control ${
                        errors.url && touched.url && "is-invalid"
                      }`}
                      name="url"
                      type="text"
                    />
                    {errors.url && touched.url && (
                      <div className="invalid-feedback">{errors.url}</div>
                    )}
                  </div>
                  <div className="form-group py-2">
                    <label htmlFor="type" className="py-2">
                    النوع فديو
                    </label>
                    <Field
                      className={`check ${
                        errors.type && touched.type && "is-invalid"
                      }`}
                      name="type"
                      type="checkbox"
                    />
                    {errors.type && touched.type && (
                      <div className="invalid-feedback">{errors.type}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    ارسال
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddMessage;
