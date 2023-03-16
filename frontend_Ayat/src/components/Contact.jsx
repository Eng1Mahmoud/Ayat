import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import image from "../assets/contact.png";
const Contact = () => {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    phone: "",
    message: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "الاسم مطلوب";
    }
   else if (!/^[\u0621-\u064A\s]+$/.test(values.name)) {
      errors.name = 'من فضلك ادخل الاسم باللغة العربية';
    }

    if (!values.phone) {
      errors.phone = "رقم الهاتف مطلوب";
    } else if (!/^\d{11}$/.test(values.phone)) {
      errors.phone = "  رقم الهاتف غير صحيح";
    }

    if (!values.message) {
      errors.message = "من فضلك ادخل رسالتك";
    }

    return errors;
  };
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post("http://localhost:4000/contact", values, {
        "contnt-type": "application/json",
      })
      .then((res) => {

        if (res.data.added === true) {
          setAdded(true);
        }
      })
      .catch((err) => {});
    setTimeout(() => {

      setSubmitting(false)
      resetForm();
    }, 400);
  };

  return (
    <section className="Contact">
      <div className="container ">
        <div className="head pt-5 m-auto  pb-3 px-1">
          <h2> تواصل معنا </h2>
          <p>
          لا تتردد في عرض شكوتك او اقتراحك نحن دائما بالخدمة
          </p>
        </div>
        <div className="row flex-sm-row-reverse flex-row">
          <div className="image py-3  col-md-6 col-sm-12 text-center">
            <div>
              <img src={image} alt="Contact" className="image-fluid" />
            </div>
          </div>
          <div className="content py-3 col-md-6 col-sm-12 pb-5">
            {added ? (
              <div className="added py-3">
                <h4 className="py-3"> لقد تم ارسال رسالتك بنجاح وسوف يتم الرد عليك في اسرع وقت ممكن </h4>
                <button className="btn" onClick={() => navigate("/")}>
                  العودة للصفحة الرئيسية
                </button>
              </div>
            ) : (
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={onSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="name " className="py-2 lable">
                        الاسم
                      </label>
                      <Field
                        name="name"
                        type="text"
                        className={`form-control ${
                          touched.name && errors.name
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone " className="py-2 lable">
                        {" "}
                        الهاتف
                      </label>
                      <Field
                        name="phone"
                        type="text"
                        className={`form-control ${
                          touched.phone && errors.phone ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message " className="py-2 lable">
                        رسالتك
                      </label>
                      <Field
                        name="message"
                        as="textarea"
                        className={`form-control ${
                          touched.message && errors.message ? "is-invalid" : ""
                        }`}
                        rows="3"
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn my-3 "
                      disabled={isSubmitting}
                    >
                      ارسل رسالتك
                    </button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
