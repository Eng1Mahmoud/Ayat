import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="content px-5 text-center py-4">
          تم تطوير هذا الموقع بواسطة{" "}
          <strong>
            {" "}
            <a
              className="name"
              href="https://www.linkedin.com/in/mahmoudmohamed1"
            >
              محمود محمد
            </a>
          </strong>
        </div>
      </div>
    </footer>
  );
};
