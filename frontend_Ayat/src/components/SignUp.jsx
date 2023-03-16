import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import image from "../assets/signUp.png";
const SignUp = () => {
  const [exist, setExist] = useState(false);
  const navigate = useNavigate();
  const validation = (values) => {
    const errors = {};
   

    if (!values.name) {
      errors.name = "من فضلك قم بادخال الاسم ";
    } else if (!/^[\u0621-\u064A\s]+$/.test(values.name)) {
      errors.name = "من فضلك ادخل الاسم باللغة العربية";
    }

    if (!values.phone) {
      errors.phone = "من فضلك قم بادخال رقم الهاتف";
    } else if (!/^\d{11}$/.test(values.phone)) {
      errors.phone = "  رقم الهاتف غير صحيح";
    }

    if (!values.email) {
      errors.email = "من فضلك قم بادخال الايميل ";
    }

    return errors;
  };

  const submit = (values, { setSubmitting, resetForm }) => {
    axios
      .post("https://ayat-cfpy.onrender.com/SignUp", values, {
        "contnt-type": "application/json",
      })
      .then((res) => {
        setExist(res.data.exist);
        if (res.data.exist === false) {
          navigate("/VerifyCode");
        }
      })
      .catch((err) => {});
    setTimeout(() => {
      setSubmitting(false);
      resetForm();
    }, 400);
  };
  const initialValues = { name: "", phone: "", email: "" };
  return (
    <section className="SignUp">
      <div className="container ">
        <div className="head pt-5  m-auto  pb-3 px-1">
          <h2>
            اشترك معنا في خدمة <strong> ايات القران</strong>
          </h2>
        </div>
        <div className="row flex-sm-row-reverse flex-row">
          <div className="image py-3  col-md-6 col-sm-12  text-center">
            <div>
              <img src={image} alt="signup" className="image-fluid" />
            </div>
          </div>
          <div className="content py-3 col-md-6 col-sm-12 pb-5">
            {exist ? (
              <div className="exist">
                <h4 className="py-3">عذر لقد تم الاشتراك بهذا الرقم من قبل</h4>
                <p className="py-2">
                  يمكنن المحاولة مرة اخري عن طريق استخدام رقم اخر من خلال الضغط
                  علي حاول مجددا
                </p>
                <button className="btn" onClick={() => setExist(false)}>
                  حاول مجددا
                </button>
              </div>
            ) : (
              <Formik
                initialValues={initialValues}
                validate={validation}
                onSubmit={submit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="group  my-4">
                      <div className="input-group input-group-lg">
                        <span
                          className="input-group-text "
                          id="inputGroup-sizing-lg"
                        >
                          الاسم
                        </span>
                        <Field
                          as="input"
                          name="name"
                          type="text"
                          placeholder=" ادخل اسمك"
                          className={`form-control ${
                            touched.name && errors.name ? "is-invalid" : ""
                          }`}
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="span"
                        className="error"
                      />
                    </div>
                    <div className="group  my-4">
                      <div className="input-group input-group-lg ">
                        <span
                          className="input-group-text "
                          id="inputGroup-sizing-lg"
                        >
                          الهاتف
                        </span>
                        <Field
                          as="input"
                          name="phone"
                          type="text"
                          placeholder=" ادخل رقم الهاتف"
                          className={`form-control ${
                            touched.phone && errors.phone ? "is-invalid" : ""
                          }`}
                        />
                      </div>

                      <ErrorMessage
                        name="phone"
                        component="span"
                        className="error"
                      />
                    </div>
                    <div className="group  my-4">
                      <div className="input-group input-group-lg">
                        <span
                          className="input-group-text "
                          id="inputGroup-sizing-lg"
                        >
                          الايميل
                        </span>
                        <Field
                          as="input"
                          name="email"
                          type="text"
                          className={`form-control ${
                            touched.email && errors.email ? "is-invalid" : ""
                          }`}
                          placeholder=" ادخل الايميل"
                        />
                      </div>

                      <ErrorMessage
                        name="email"
                        component="span"
                        className="error"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn pb-3"
                      disabled={isSubmitting}
                    >
                      اشترك الان
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

export default SignUp;
