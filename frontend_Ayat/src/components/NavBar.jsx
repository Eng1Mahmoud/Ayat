import React from "react";
import { Link } from "react-router-dom";
import { FaListAlt } from "react-icons/fa"
import logo from "../assets/logos.png"
export const NavBar = () => {
  return (
    <header>
      <div className="container py-2 ">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
           <img src={logo} alt="logo"></img>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
        <FaListAlt className="list" size={25}/>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                 الصفة الرئيسية 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="signUp">
                تسجيل اشتراك
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="contact us">
               تواصل معنا 
                </Link>
              </li>

            
            </ul>
          </div>
        </div>
      </nav>
      </div>
    </header>
  );
};
