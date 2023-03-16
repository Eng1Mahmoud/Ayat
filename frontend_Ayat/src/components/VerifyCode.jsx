import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  code: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.code) {
    errors.code = "من فضلك ادخل كود التحقق  ";
  }

  return errors;
};

const VerifyCode = () => {
  const navigate = useNavigate();
  const [verification, setVerification] = useState(false);
  const [name, setName] = useState("");
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post("http://localhost:4000/verification", values, {
        "contnt-type": "application/json",
      })
      .then((response) => {
    
        setVerification(response.data.verification);
        setName(response.data.user.name);
      });
    setTimeout(() => {
      setSubmitting(false);
      resetForm();
    }, 400);
    
  };

  return (
    <div className="verifycode  py-md-5 py-sm-1">
      <div className="container pb-5  mb-md-5 mb-sm-1">
        {!verification ? (
          <>
            {" "}
            <div className="head py-4 m-auto mb-4 px-1">
              <h2>
                من فضلك قم بادخال رمز التحقق الذي قمنا بارساله اليك عبر حسابك
                علي واتساب هذه الخطوة فقط للتاكد من ان رقم الهاتف الذي ادخلته
                موجود بالفعل في واتساب
              </h2>
            </div>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <div className="form d-flex justify-content-center text-center">
                  <Form className="w-50">
                    <div>
                      <Field
                        component="input"
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="من فضلك ادخل رقم التحقق هنا "
                        aria-label=".form-control-lg example"
                        name="code"
                        id="code"
                      />
                      <ErrorMessage
                        name="code"
                        className="error text-start mt-2"
                        component="div"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn py-1 mt-5"
                      disabled={isSubmitting}
                    >
                      {" "}
                      ارسل الكود الان{" "}
                    </button>
                  </Form>
                </div>
              )}
            </Formik>
          </>
        ) : (
          <div className="success py-5 mb-5  ">
            <h1 className="py-4 mb-md-5 mb-sm-1">
              {name} مرحبا بك في خدمة ايات لقد تم الاشتراك بنجاح{" "}
            </h1>
            <button className="btn mb-5" onClick={() => navigate("/")}>
              {" "}
              الرجوع للصفحة الرئيسية
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyCode;
