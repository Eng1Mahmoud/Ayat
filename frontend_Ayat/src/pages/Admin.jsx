import React from "react";
import { Outlet } from "react-router-dom";
export const Admin = () => {
  return (
    <div className="admin py-5">
      <div className="container">
        <Outlet/>
      </div>
    </div>
  );
};
