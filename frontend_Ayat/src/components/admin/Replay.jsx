import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import image  from "../../assets/suport.png"
import Cookies from "js-cookie";
const validate = (values) => {
  const errors = {};

  if (!values.replay) {
    errors.replay = "Message is required";
  }
  return errors;
};

const AddMessage = () => {
  const initialValues = {
    replay: "",
    to:""
  };

  const handleSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:4000/replay", values,
      {
        headers: {
          "Content-Type": "application/json",
          "authorization":`Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
      
    resetForm();
  };

  return (
    <section className="replay">
      <div className="container ">
        <div className="head pt-1 m-auto  pb-3 px-1">
          <h2>الرد علي الرسائل والشكاوي </h2>
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
                    <label htmlFor="replay" className="py-2">
                      الرد
                    </label>
                    <Field
                      name="replay"
                      className={`form-control ${
                        errors.replay && touched.replay && "is-invalid"
                      }`}
              
                      component="textarea"
                    />
                    {errors.replay && touched.replay && (
                      <div className="invalid-feedback">{errors.replay}</div>
                    )}
                  </div>
                  <div className="form-group py-2">
                    <label htmlFor="to" className="py-2">
                      الهاتف
                    </label>
                    <Field
                      className={`form-control ${
                        errors.to && touched.to && "is-invalid"
                      }`}
                      name="to"
                      type="text"
                    />
                    {errors.to && touched.to && (
                      <div className="invalid-feedback">{errors.to}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
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

