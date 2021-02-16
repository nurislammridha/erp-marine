import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { InputBase, Paper, IconButton } from "@material-ui/core";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import UserModal from "./UserModal";
import { getPermissionUserList } from "../_redux/actions/RolePermissionManagementAction";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import SimpleModal from "../../../master/components/Modal/SimpleModal";
import NewUser from "./NewUser";
import LoadingSpinner from "../../../master/spinner/LoadingSpinner";
import PaginationLaravel from "../../../master/pagination/PaginationLaravel";
import UserEdit from "./UserEdit";



const UserList = () => {
  const [show, setShow] = useState(false);
  const [userModalShow, setUserModalShow] = useState(false);
  const [userID, setUserID] = useState(null);
  const { register, setValue } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const userList = useSelector(state => state.roleReducer.userList);
  const isLoading = useSelector(state => state.roleReducer.isLoading);
  const userPaginationList = useSelector(state => state.roleReducer.userPaginationList);

  const courseData = [
    {
      id: 1,
      name: "cse",
    },
    {
      id: 1,
      name: "EEE",
    },
    {
      id: 1,
      name: "MBA",
    },
  ];

  let CourseName = [];
  if (courseData) {
    courseData.forEach((item) => {
      let items = {
        value: item.id,
        label: item.name,
      };
      CourseName.push(items);
    });
  }

  useEffect(() => {
    dispatch(getPermissionUserList(currentPage));
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getPermissionUserList(data.page));
  };

  const searchItems = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText.length === 0) {
      dispatch(getPermissionUserList(currentPage));
    } else {
      dispatch(getPermissionUserList(currentPage, searchText));
    }
  };
  const showUserModal = () => {
    setUserModalShow(true)
  }
  const showUserModel = (item) => {
    setUserModalShow(true);
    setUserID(item.id);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <div className="container ">
            <div className="row mb-5 table-form ">
              <h1 className="tableheading mt-0">User List</h1>
              <div className="col-xl-3 col-lg-3 col-md-6 mb-2 mt-2">

                <Paper className="searchInput">
                  <InputBase
                    placeholder="Search "
                    className="custome-purchase-search"
                    value={searchText}
                    onChange={searchItems}
                  />
                  <IconButton aria-label="Search" className="searchPlaceholder purchaseSearch">
                    <i className="flaticon-search "></i>
                  </IconButton>
                </Paper>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 ">
                <RHFInput
                  as={<Select options={CourseName} />}
                  rules={{ required: false }}
                  name="courseData"
                  register={register}
                  value={CourseName.label}
                  setValue={setValue}
                />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 user-list-dropdown">
                <RHFInput
                  as={<Select options={CourseName} />}
                  rules={{ required: false }}
                  name="courseData"
                  register={register}
                  value={CourseName.label}
                  setValue={setValue}
                />
              </div>
              {/* <div className="col-xl-3 col-lg-3 col-md-6">use RHFInput</div> */}

              <div className="user-list-addbutton">
                <i className="fas fa-filter tableFilter  mr-2"></i>
                <i className="far fa-filter"></i>
                <Button className="btn-sm" variant="primary" onClick={() => showUserModal()}>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userList && userList.map((item, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{item.first_name}</td>
                      <td>{item.surname}</td>
                      <td>{item.last_name}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phone_no}</td>
                      <td className="">
                        <div>
                          <Link onClick={() => showUserModal(item)}>
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
              // </div>
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
        show={userModalShow}
        handleClose={() => setUserModalShow(false)}
        handleShow={() => setUserModalShow(true)}
        modalTitle={"User Create"}
      >
        <NewUser handleClose={() => setUserModalShow(false)} />
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
