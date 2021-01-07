import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const IssueAuthorityList = (props) => {
  return (
    <div className="react-bootstrap-table table-responsive">
      <table className="table mt-2 tbl-standard" id="table-to-xls">
        <thead>
          <tr>
            <th scope="col">Authority Name</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mr. MA. Example</td>
            <td>Active</td>
            <td>
              {" "}
              <Link to={`/voyage/list/${""}`}>
                <i className="far fa-eye mr-3"></i>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Mr. MA. Example</td>
            <td>Active</td>
            <td>
              {" "}
              <Link to={`/voyage/list/${""}`}>
                <i className="far fa-eye mr-3"></i>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Mr. MA. Example</td>
            <td>In Active</td>
            <td>
              {" "}
              <Link to={`/voyage/list/${""}`}>
                <i className="far fa-eye mr-3"></i>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Mr. MA. Example</td>
            <td>Active</td>
            <td>
              {" "}
              <Link to={`/voyage/list/${""}`}>
                <i className="far fa-eye mr-3"></i>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Mr. MA. Example</td>
            <td>Active</td>
            <td>
              {" "}
              <Link to={`/voyage/list/${""}`}>
                <i className="far fa-eye mr-3"></i>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Mr. MA. Example</td>
            <td>In Active</td>
            <td>
              {" "}
              <Link to={`/voyage/list/${""}`}>
                <i className="far fa-eye mr-3"></i>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IssueAuthorityList;
