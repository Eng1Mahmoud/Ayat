import React from "react";
import { Link } from "react-router-dom";
export const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="content px-5 w-75">
          <h1>ايات القران</h1>
          <p className="py-2">
          اشترك ليصلك كل يوم اية وتفسيرها من القران  الكريم او الحديث النبوي عبر الواتساب  لا تتردد كثير اضغط علي زر الاشتراك
          </p>
          <div className="button">
          <Link to="/signUp" className="btn mx-3 px-4">اشترك الان</Link>
          <Link  to="/contact us" className="btn mx-3 px-4">تواصل معنا</Link>
           
          </div>
        </div>
      </div>
    </section>
  );
};
