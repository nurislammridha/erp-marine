import React, { useState,useEffect } from "react";
import {  Card, Button } from "react-bootstrap";
import { InputBase, Paper, IconButton } from "@material-ui/core";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import UserModal from "./UserModal";
import { getPermissionUserList } from "../_redux/actions/RolePermissionManagementAction";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const UserList = () => {
  const [show, setShow] = useState(false);
  const { register, setValue } = useForm();

  const dispatch = useDispatch();

  const userList = useSelector(state => state.roleReducer.userList);
  console.log('userList', userList);

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
  dispatch( getPermissionUserList());

  }, [])


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
                  // inputProps={{ "aria-label": "Search Google Maps" }}
                  // onChange={(e) => searchEmployee(e)}
                  // value={employeeInfo.employeeName}
                />
                  <IconButton aria-label="Search" className="searchPlaceholder purchaseSearch">
                  <i className="flaticon-search "></i>
                </IconButton>
              </Paper>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6">
            <RHFInput
                  as={<Select options={CourseName} />}
                  rules={{ required: false }}
                  name="courseData"
                  register={register}
                  value={CourseName.label}
                  setValue={setValue}
                />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6">
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

            <div className="">
              <i className="fas fa-filter tableFilter  mr-2"></i>
              <i className="far fa-filter"></i>
              <Button className="btn-sm" variant="primary">
                Add New
              </Button>
            </div>
          </div>
       </div>
       { userList.length > 0 && (
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
                        <Link >
                          <i className="far fa-eye text-success editIcon item-list-icon"></i>
                        </Link>
                        <Link className="ml-2">
                          <i className="fa fa-edit text-success editIcon item-list-icon"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
       </Card.Body>
       </Card>
      {/* <UserModal show={show} setShow={setShow} /> */}
      
    </>
  );
};

export default UserList;
