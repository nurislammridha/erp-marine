import React, { useState } from "react";

import UserModal from "./UserModal";
const UserList = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card card-custom gutter-b p-5">
              <h1>User List</h1>
              <div className="react-bootstrap-table table-responsive">
                <table className="table table table-head-custom table-vertical-center user-list-table ">
                  <thead>
                    <tr>
                      <th scope="col">SI</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Roles</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#01</td>
                      <td>Super Admin</td>
                      <td>superadmin@example.com</td>
                      <td className=" text-white">
                        <span className="badge badge-primary">superadmin</span>
                      </td>
                      <td>
                        <i className="fa fa-edit text-success pointer ml-2"></i>
                        <i className="fa fa-trash text-danger pointer ml-2"></i>
                        <i
                          className="fa fa-check text-info pointer ml-2"
                          onClick={setShow}
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserModal show={show} setShow={setShow} />
    </>
  );
};

export default UserList;
