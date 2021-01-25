import React, { useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  getUOM,
  getItemType,
  getItemCategory,
  handleChangeInput,
} from "../_redux/actions/ItemAction";

const LoadableCalculator = () => {
  const { register, setValue } = useForm();
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

  return (
    <>
      <div className="card card-custom gutter-b pl-5 pr-5 mb-5">
        <div className="mt-5">
          <h3 className="mb-0 pb-0">Loadable Calculator</h3>
        </div>
        <hr></hr>
        <div className="form-group row">
          <div className="col-xl-3 col-lg-3 col-md-6 ">
            <Form.Group>
              <Form.Label className="formFont pl-1">Department</Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Store"
                name="strSupplierAddress"
              />
            </Form.Group>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6">
            <label className="formFont">UOM</label>
            <RHFInput
              as={<Select options={UOMOptionData} />}
              rules={{ required: false }}
              name="intUoMId"
              register={register}
              value={itemAddInput.intUoMId}
              setValue={setValue}
              onChange={(option) => {
                handleChangeTextInput("intUoMId", option.value);
                handleChangeTextInput("strUoM", option.label);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadableCalculator;
