import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { allCheckboxSelected, roleCheckboxSelect, checkPermissionGroupAction, getPermissionGroups, AddRolePermissionInput, storeRoleAction, emptyRoleStatusMessage, getRoleDetailsData } from "../_redux/actions/RolePermissionManagementAction";
import './style.css';

const RolePermissionEdit = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const inputData = useSelector((state) => state.roleReducer.inputData);
  const isLoading = useSelector((state) => state.roleReducer.isLoading);
  const isRoleCreated = useSelector((state) => state.roleReducer.isRoleCreated);
  const roleCreateMessage = useSelector((state) => state.roleReducer.roleCreateMessage);
  const { register, handleSubmit, errors, setValue } = useForm();

  useEffect(() => {
    dispatch(emptyRoleStatusMessage());
    dispatch(getPermissionGroups());
  }, [])

  useEffect(() => {
    dispatch(getRoleDetailsData(id));
  }, [])

  const roleCheck = (
    e,
    parentRole,
    item,
    indexChild,
    indexparentRole
  ) => {
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

  const onSubmit = () => {
    dispatch(storeRoleAction(roleInput));
  }

  useEffect(() => {
    if(isRoleCreated){
      dispatch(emptyRoleStatusMessage());
      history.push('/role-permission/list');
    }
  }, [isRoleCreated, roleCreateMessage]);

  return (
    <>
      <div className="container role-create-page">
        <div className="row">
          <div className="col-12">
            <div className="card card-custom gutter-b p-5">
              <form
                className="form form-label-right voyageEngineerForm"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
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
                      disabled={true}
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
                                label={item.printName}
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

                <button type="submit" className="btn btn-primary booking-btn" disabled={isLoading}>
                  {!isLoading ? 'Save' : 'Saving...'}
                </button>
                <Link to="/role-permission/list">
                <button className="btn cancelButton ml-2">
                  Cancel
                </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolePermissionEdit;
