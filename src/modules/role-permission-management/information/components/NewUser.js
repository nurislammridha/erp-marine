import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getRoleListByPagination } from "../_redux/actions/RolePermissionManagementAction";
import {
  createNewUser,
  handleChangeUserAction,
} from "../_redux/actions/UserAction";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { getShipList } from "../../../master/DropDownData/Ship/_redux/ShipAction/ShipAction";
import { getBusinessData } from "../../../master/DropDownData/Business/_redux/BusinessAction/BusinessAction";

const NewUser = ({ handleClose }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const userInput = useSelector((state) => state.userRole.inputData);
  const isLoading = useSelector((state) => state.userRole.isLoading);
  const roleListOption = useSelector((state) => state.roleReducer.roleListOption);
  const shipList = useSelector((state) => state.ShipReducer.shipList);
  const BusinessList = useSelector((state) => state.BusinessTypeReducer.BusinessList);
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(createNewUser(userInput, handleClose));
  };

  const handleChange = (name, value, e = null) => {
    dispatch(handleChangeUserAction(name, value, e));
  };

  useEffect(() => {
    dispatch(getRoleListByPagination());
    dispatch(getShipList());
    dispatch(getBusinessData());
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card card-custom gutter-b p-5">
              <form
                className="form form-label-right voyageEngineerForm"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
              >
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-md-6 ">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        First Name
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        name="first_name"
                        placeholder="Enter Name"
                        onChange={(e) =>
                          handleChange("first_name", e.target.value)
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 ">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Sur Name
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        name="surname"
                        placeholder="Enter Name"
                        onChange={(e) =>
                          handleChange("surname", e.target.value)
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 ">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Last Name
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        name="last_name"
                        placeholder="Enter Name"
                        onChange={(e) =>
                          handleChange("last_name", e.target.value)
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        username
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        name="username"
                        placeholder="Enter Name"
                        onChange={(e) =>
                          handleChange("username", e.target.value)
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">Email</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        name="email"
                        placeholder="Enter Name"
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Phone No
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        name="phone_no"
                        placeholder="Enter Name"
                        onChange={(e) =>
                          handleChange("phone_no", e.target.value)
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Password
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="password"
                        name="Cpassword"
                        placeholder="Password"
                        onChange={(e) =>
                          handleChange("Cpassword", e.target.value)
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <Form.Label className="formFont pl-1">
                      Role
                      </Form.Label>
                    <RHFInput
                      as={<Select options={roleListOption} />}
                      rules={{ required: false }}
                      name="role_id"
                      register={register}
                      onChange={(option) => {
                        handleChange('name', option.label);
                        handleChange('role_id', option.value)
                      }}
                      setValue={setValue}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <Form.Label className="formFont pl-1">
                      Ship
                      </Form.Label>
                    <RHFInput
                      as={<Select options={shipList} />}
                      rules={{ required: false }}
                      name="business_id"
                      register={register}
                      onChange={(option) => {
                        handleChange('business_name', option.label);
                        handleChange('business_id', option.value)
                      }}
                      setValue={setValue}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <Form.Label className="formFont pl-1">
                      Business
                      </Form.Label>
                    <RHFInput
                      as={<Select options={BusinessList} />}
                      rules={{ required: false }}
                      name="shipId"
                      register={register}
                      onChange={(option) => {
                        handleChange('strShipName', option.label);
                        handleChange('shipId', option.value)
                      }}
                      setValue={setValue}
                    />
                  </div>
                </div>
                {isLoading && (
                  <Button
                    className="mr-4 saveButton text-white float-right" disabled={true}>
                    <span>Submitting</span>
                    <span className="ml-3 spinner spinner-white"></span>
                  </Button>
                )}

                {!isLoading && (
                  <Button
                    className="mr-4 saveButton text-white float-right" variant="" onClick={() => onSubmit()}>
                    Submit
                  </Button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUser;
