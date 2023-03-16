import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/AllUser", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
    
         setUsers(res.data); 
    
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="users pb-5">
      <div className="container ">
        <div className="head pt-5 m-auto  pb-3 px-1">
          <h2>جميع المستخدمين</h2>
        </div>

        <div className="content pb-5 mb-2">
          <div className="table-responsive">
            <table className="table table-success table-striped table-bordered ">
              <thead>
                <tr>
                  <th scope="col">الترتيب</th>
                  <th scope="col">الاسم</th>
                  <th scope="col">الايميل</th>
                  <th scope="col">رقم التليفون</th>
                </tr>
              </thead>
              {users.length ? (
                <tbody>
                  {users.map((user, index) => {
                    return (
                      <tr key={`${user.name}${index}`}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <th colSpan={4} className="text-center py-3">
                      {" "}
                      لا يوجد مستخدمين لعرضهم{" "}
                    </th>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
