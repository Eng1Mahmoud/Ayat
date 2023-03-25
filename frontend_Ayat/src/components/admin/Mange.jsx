import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const send = () => {
  // this function to send action to send message for user
  axios
    .post(
      "https://ayat-cfpy.onrender.com/run",
      { run: true },
      {
        "Content-Type": "application/json",
      }
    )
    .then((res) => {
      console.log(res.data.error);
      if (!res.data.error) {
        window.alert("success message");
      } else {
        window.alert("faild message");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const chanal = () => {
  // this function to send action to send message for user
  axios
    .post(
      "https://ayat-cfpy.onrender.com/chanal",
      { run: true },
      {
        "Content-Type": "application/json",
      }
    )
    .then((res) => {
      console.log(res.data.error);
      if (!res.data.error) {
        window.alert("success message");
      } else {
        window.alert("faild message");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const Mange = () => {
  const navigate = useNavigate();
  const route = (route) => {
    navigate(route);
  };
  return (
    <div className="mange">
      <div className="container">
        <div className="content">
          <div className="head pt-3 pb-3">
            <h2>ادارة الموقع</h2>
          </div>
          <div className="row my-5 g-5 pb-5">
            <div className="col-md-4 col-sm-12 ">
              <div
                className="suport item py-5 d-flex justify-content-center align-items-center rounded-2"
                onClick={() => route("replay")}
              >
                الرد علي الرسائل
              </div>
            </div>
            <div className="col-md-4 col-sm-12  ">
              <div
                className="control item py-5 d-flex justify-content-center align-items-center rounded-2"
                onClick={() => route("addMessage")}
              >
                اضافة محتوي
              </div>
            </div>

            <div className="col-md-4 col-sm-12  ">
              <div
                className="control item py-5 d-flex justify-content-center align-items-center rounded-2"
                onClick={() => route("users")}
              >
                عرض المستخدمين
              </div>
            </div>

            <div className="col-md-4 col-sm-12  ">
              <div
                className="control item py-5 d-flex justify-content-center align-items-center rounded-2"
                onClick={() => send()}
              >
                ارسال الرسالة اليومية
              </div>
            </div>

            <div className="col-md-4 col-sm-12  ">
              <div
                className="control item py-5 d-flex justify-content-center align-items-center rounded-2"
                onClick={() => chanal()}
              >
                ارسال الرسالة الي القناة
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
