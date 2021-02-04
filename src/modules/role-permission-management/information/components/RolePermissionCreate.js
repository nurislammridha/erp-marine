import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { dispacth } from 'react-redux'
import { useSelector, useDispatch } from "react-redux";
import { allCheckboxSelected, roleCheckboxSelect, checkPermissionGroupAction, getPermissionGroups, AddRolePermissionInput } from "../_redux/actions/RolePermissionManagementAction";
import './style.css';

const RolePermissionCreate = () => {

  const dispatch = useDispatch();
  const inputData = useSelector((state) => state.roleReducer.inputData);

  useEffect(() => {
    dispatch(getPermissionGroups());
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
  const roleInput = useSelector(
    (state) => state.roleReducer.inputData
  );

  return (
    <>
      <div className="container role-create-page">
        <div className="row">
          <div className="col-12">
            <div className="card card-custom gutter-b p-5">
              <form
                className="form form-label-right voyageEngineerForm"
                method="post"
              >
                <div className="form-group row mt-2">
                  <div className="col-2">
                    <Form.Label className="formFont">
                      <h5>Role Name</h5>
                    </Form.Label>
                  </div>
                  <div className="col-10">
                    <Form.Control
                      className="formHeight"
                      type="text"
                      placeholder="Enter Role Name"
                      name="role"
                      value={roleInput.role}
                      onChange={(e) => dispatch(AddRolePermissionInput('role', e.target.value))}
                    />
                  </div>
                </div>

                <div className="form-group row mt-3">
                  <div className="col-2">
                    <h5>Permission</h5>
                  </div>
                  <div className="col-9 ml-5">
                    <Form.Group controlId="all">
                      <Form.Check type="checkbox" label="All" for="all" onClick={(e) => allChecked(e)} />
                    </Form.Group>
                  </div>
                </div>
                {inputData.groupList && inputData.groupList.map((parentRole, indexparentRole) => (
                  <div className="form-group row mt-5 pl-1">
                    <div className="col-2">
                      <Form.Group controlId={`group-${indexparentRole}`}>
                        <Form.Check
                          type="checkbox"
                          label={parentRole.name}
                          htmlFor={`group-${indexparentRole}`}
                          checked={parentRole.isChecked}
                          onClick={(e) => checkPermissionGroup(e, indexparentRole, parentRole.isChecked ? false : true)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-10">
                      <div className="row pl-5">
                        {parentRole && parentRole.permissions.map((item, indexChild) => (
                          <div className="col-3">
                            <Form.Group controlId="Create">
                              <Form.Check
                                type="checkbox"
                                label={item.name}
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
                        ))}

                      </div>
                    </div>
                  </div>
                ))}
                <button className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolePermissionCreate;
