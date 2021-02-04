import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { InputBase, Paper, IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import PaginationLaravel from "../../../master/pagination/PaginationLaravel";
import { getRoleListByPagination } from "../_redux/actions/RolePermissionManagementAction";
import LoadingSpinner from '../../../master/spinner/LoadingSpinner'
const RolePermissionList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const isLoading = useSelector(state => state.roleReducer.isLoading);
  const rolesListPaginated = useSelector(state => state.roleReducer.rolesListPaginated);
  const rolesList = useSelector(state => state.roleReducer.rolesListAll);

  useEffect(() => {
    dispatch(getRoleListByPagination());
  }, []);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getRoleListByPagination(data.page));
  };

  return (
    <>
      <Card>
        <Card.Body>
          <div className="container ">
            <div className="row mb-5 table-form ">
              <h1 className="tableheading mt-0">Roles List</h1>
              <div className="col-xl-7 col-lg-7 col-md-7 mb-2 mt-2"></div>
              <div className="col-xl-3 col-lg-3 col-md-6 mb-2 mt-2">
                <Paper className="searchInput">
                  <InputBase
                    placeholder="Search "
                    className="custome-purchase-search"
                  />
                  <IconButton aria-label="Search" className="searchPlaceholder purchaseSearch">
                    <i className="flaticon-search "></i>
                  </IconButton>
                </Paper>
              </div>

              <div className="">
                <i className="fas fa-filter tableFilter  mr-2"></i>
                <i className="far fa-filter"></i>
                <Link to="/role-permission/create">
                  <Button className="btn-sm" variant="primary">
                    Add New
                </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            {/* <table className="table mt-5 voyageTable table-responsive"> */}
            <div className="react-bootstrap-table table-responsive pl-5">
              {isLoading && <LoadingSpinner text="Loading Roles List..." />}
              <table className="table table table-head-custom table-vertical-center  voyageTable itemtable ">
                <thead>
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Role</th>
                    <th scope="col">Total Permissions</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rolesList && rolesList.map((item, index) => (
                    <tr>
                      <td>{rolesListPaginated.from + index}</td>
                      <td>{item.name}</td>
                      <td>{item.permissions ? item.permissions.length() : ''}</td>
                      <td>
                        <span className="badge badge-info">
                          Active
                        </span>
                      </td>
                      <td>
                        {" "}
                        <Link to={`/items/edit/${item.intItemID}`}>
                          <i className="far fa-edit editIcon item-list-icon ml-4"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!isLoading && rolesList.length === 0 && (
                <div className="alert alert-warning mt-5">
                  Sorry ! No Role Found
                </div>
              )}
              <PaginationLaravel
                changePage={changePage}
                data={rolesListPaginated}
              />
            </div>
          </div>

        </Card.Body>
      </Card>
    </>
  );
};

export default RolePermissionList;
