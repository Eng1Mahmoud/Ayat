import React from "react";
import {  useNavigate } from "react-router-dom";

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
                <div className="control item py-5 d-flex justify-content-center align-items-center rounded-2" onClick={()=> route("addMessage")}>
                  اضافة محتوي
                </div>
              </div>

              <div className="col-md-4 col-sm-12  ">
                <div className="control item py-5 d-flex justify-content-center align-items-center rounded-2"onClick={()=> route("users")}>
                  عرض المستخدمين
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>

  );
};
