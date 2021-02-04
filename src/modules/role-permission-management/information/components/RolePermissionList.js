import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { dispacth } from 'react-redux'
import { useSelector, useDispatch } from "react-redux";
import { allCheckboxSelected, getRoleList, roleCheckboxSelect, checkPermissionGroupAction } from "../_redux/actions/RolePermissionManagementAction";

const RolePermissionList = () => {


  const dispatch = useDispatch();
  const roleList = useSelector((state) => state.roleReducer.roleList);

  console.log('roleList', roleList);

  useEffect(() => {
    dispatch(getRoleList());
  }, [])

  const roleCheck = (
    e,
    parentRole,
    item,
    indexChild,
    indexparentRole
  ) => {
    console.log('e.target.checked', e.target.checked);
    let checkboxStatus = e.target.checked
    dispatch(roleCheckboxSelect(checkboxStatus, parentRole, item, indexChild, indexparentRole));
  }

  const checkPermissionGroup = (e, index, checkboxStatus) => {
    dispatch(checkPermissionGroupAction(index, checkboxStatus));
  }

  const allChecked = (e) => {
    let checkStausCheck = e.target.checked;
    dispatch(allCheckboxSelected(checkStausCheck));
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card card-custom gutter-b p-5">
              <form
                className="form form-label-right voyageEngineerForm"
                method="post"
              >
                <div className="form-group row mt-2">
                  <div className="col-7 ">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Role Name
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                        name="strSupplierAddress"
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="form-group row mt-3">
                  <div className="col-3 ">
                    <p>Permission</p>
                  </div>
                  <div className="col-9">
                    <Form.Group controlId="all">
                      <Form.Check type="checkbox" label="All" for="all" onClick={(e) => allChecked(e)} />
                    </Form.Group>
                  </div>
                </div>
                {roleList && roleList.map((parentRole, indexparentRole) => (
                  <div className="form-group row mt-5 pl-5">
                    <div className="col-3 ">
                      <Form.Group controlId="supplier">
                        <Form.Check
                          type="checkbox"
                          label={parentRole.name}
                          for="supplier"
                          checked={parentRole.isChecked}
                          onClick={(e) => checkPermissionGroup(e, indexparentRole, parentRole.isChecked ? false: true)}
                        />

                      </Form.Group>
                    </div>
                    {parentRole && parentRole.permissions.map((item, indexChild) => (
                      <div className="col-9 ">
                        <div className="row ">
                          <Form.Group controlId="Create">
                            <Form.Check
                              type="checkbox"
                              label={item.name}
                              for="Create"
                              className="mr-3"
                              checked={item.isChecked}
                              onClick={(e) =>
                                roleCheck(
                                  e,
                                  parentRole,
                                  item,
                                  indexChild,
                                  indexparentRole

                                )
                              }
                            />
                          </Form.Group>
                        </div>
                      </div>
                    ))}

                  </div>
                ))}


                <button className="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolePermissionList;
