import React, { useState, useEffect } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { InputBase, Paper, IconButton } from "@material-ui/core";
import { getPermissionUserList } from "../_redux/actions/RolePermissionManagementAction";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SimpleModal from "../../../master/components/Modal/SimpleModal";
import NewUser from "./NewUser";
import LoadingSpinner from "../../../master/spinner/LoadingSpinner";
import PaginationLaravel from "../../../master/pagination/PaginationLaravel";
import UserEdit from "./UserEdit";
import UserDetails from "./UserDetails";

const UserList = () => {
  const [userModalShow, setUserModalShow] = useState(false);
  const [userID, setUserID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const userList = useSelector(state => state.roleReducer.userList);
  const isLoading = useSelector(state => state.roleReducer.isLoading);
  const userPaginationList = useSelector(state => state.roleReducer.userPaginationList);

  console.log('userList :>> ', userList);
  
  useEffect(() => {
    dispatch(getPermissionUserList("", currentPage));
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getPermissionUserList("", data.page));
  };

  const changeSearch = (value) => {
    setSearchText(value);
    dispatch(getPermissionUserList(value, currentPage));
  };
  const showUserModel = (item) => {
    setUserModalShow(true);
    setUserID(item.id);
  }

  const [userCreate, setUserCreate] = useState(false);
  const handleShowUserCreateModel = () => {
    setUserCreate(true)
  }
  const [userDetailsModel, setUserDetailsModel] = useState(false);
  const handleShowUserDetailsModel = (item) => {
    setUserDetailsModel(true)
    setUserID(item.id);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <div className="container ">
            <h1 className="tableheading mt-0">User List</h1> <hr />
            <div className="row mb-5 table-form ">
              <div className="col-xl-3 col-lg-3 col-md-6 mb-2 mt-2">
                <Paper className="searchInput">
                  <InputBase
                    placeholder="Search"
                    className="custome-purchase-search"
                    value={searchText}
                    onChange={(e) => changeSearch(e.target.value)}
                  />
                  <IconButton aria-label="Search" className="searchPlaceholder purchaseSearch">
                    <i className="flaticon-search "></i>
                  </IconButton>
                </Paper>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 ">

              </div>
              <div className="col-xl-3 col-lg-3 col-md-6">

              </div>
              <div className="text-right">
                <i className="fas fa-filter tableFilter  mr-2"></i>
                <i className="far fa-filter"></i>
                <Button className="btn-sm" variant="primary" onClick={() => handleShowUserCreateModel()}>
                  Add New
              </Button>
              </div>
            </div>
            {/* </div> */}
            {isLoading && <LoadingSpinner text="Loading user list...." />}
            {userList.length > 0 && (
              <div className="react-bootstrap-table table-responsive">
                <table className="table table table-head-custom table-vertical-center user-list-table ">
                  <thead>
                    <tr>
                      <th className="td-sl">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Sur Name</th>
                      <th scope="col">last_name</th>
                      <th scope="col">User name</th>
                      <th scope="col">email</th>
                      <th scope="col">phone_no</th>
                      <th scope="col">Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList && userList.map((item, index) => (
                      <tr key={index + 1}>
                        <td>{userPaginationList.from + index}</td>
                        <td>{item.first_name}</td>
                        <td>{item.surname}</td>
                        <td>{item.last_name}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.phone_no}</td>
                        <td>
                          {
                            item.role_name !== null && item.role_name !== "" ? <Badge className="mt-2" variant="success"> {item.role_name} </Badge> : <p className="pl-2">N/A</p>
                          }
                        </td>
                        <td className="">
                          <div>
                            <Link onClick={() => handleShowUserDetailsModel(item)}>
                              <i className="far fa-eye text-success editIcon item-list-icon"></i>
                            </Link>
                            <Link className="ml-2 user-list-icon" onClick={() => showUserModel(item)}>
                              <i className="fa fa-edit text-success editIcon item-list-icon"></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!isLoading && userList.length === 0 && (
              <div className="alert alert-warning mt-5">
                Sorry ! User List Not Found.
              </div>
            )}
            <PaginationLaravel
              changePage={changePage}
              data={userPaginationList}
            />
          </div>
        </Card.Body>
      </Card>
      <SimpleModal
        size="xl"
        show={userCreate}
        handleClose={() => setUserCreate(false)}
        handleShow={() => setUserCreate(true)}
        modalTitle={"Create New User"}
      >
        <NewUser handleClose={() => setUserCreate(false)} />
      </SimpleModal>
      <SimpleModal
        size="lg"
        show={userDetailsModel}
        id={userID}
        handleClose={() => setUserDetailsModel(false)}
        handleShow={() => setUserDetailsModel(true)}
        modalTitle={"User Details"}
      >
        <UserDetails handleClose={() => setUserDetailsModel(false)} id={userID} />
      </SimpleModal>
      <SimpleModal
        size="xl"
        show={userModalShow}
        id={userID}
        handleClose={() => setUserModalShow(false)}
        handleShow={() => setUserModalShow(true)}
        modalTitle={"Edit User"}
      >
        <UserEdit handleClose={() => setUserModalShow(false)} id={userID} />
      </SimpleModal>

    </>
  );
};

export default UserList;
