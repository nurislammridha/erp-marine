import React, { useEffect } from "react";
import { Form } from "react-bootstrap";

const NewUser = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card card-custom gutter-b p-5">
              <h1>Create New User </h1>
              <div className="react-bootstrap-table table-responsive">
                <table className="table table table-head-custom table-vertical-center user-list-table ">
                  <thead>
                    <tr>
                      <th scope="col">SI</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col"></th>
                      <th scope="col">Roles</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#01</td>
                      <td>Super Admin</td>
                      <td>superadmin@example.com</td>
                      <td></td>
                      <td className=" text-white">
                        <span className="badge badge-primary">superadmin</span>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        Action{" "}
                        <button className="btn btn-success ml-2 btn-sm">
                          Edit
                        </button>
                        <button className="btn btn-danger  btn-sm ml-2">
                          Delete
                        </button>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>#01</td>
                      <td>Super Admin</td>
                      <td>superadmin@example.com</td>
                      <td></td>
                      <td className=" text-white">
                        <span className="badge badge-primary">superadmin</span>
                      </td>
                    </tr>
                    <tr>
                      <td>#01</td>
                      <td>Super Admin</td>
                      <td>superadmin@example.com</td>
                      <td></td>
                      <td className=" text-white">
                        <span className="badge badge-primary">superadmin</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUser;
