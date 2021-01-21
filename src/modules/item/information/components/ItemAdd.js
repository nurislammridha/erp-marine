import React from "react";
import { Form, Card, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
const ItemAdd = () => {
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
          <h3 className="mb-0 pb-0">Item Add</h3>
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
              />
            </Form.Group>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 ">
            <Form.Group>
              <Form.Label className="formFont pl-1">Item Name</Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Type"
              />
            </Form.Group>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6">
            <label className="formFont">UOM</label>
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
            <label className="formFont">Item Type</label>
            <RHFInput
              as={<Select options={CourseName} />}
              rules={{ required: false }}
              name="courseData"
              register={register}
              value={CourseName.label}
              setValue={setValue}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xl-3 col-lg-3 col-md-6">
            <label className="formFont">Item Category</label>
            <RHFInput
              as={<Select options={CourseName} />}
              rules={{ required: false }}
              name="courseData"
              register={register}
              value={CourseName.label}
              setValue={setValue}
            />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 ">
            <Form.Group>
              <Form.Label className="formFont pl-1">
                Item SubCategory
              </Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Store"
              />
            </Form.Group>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 ">
            <Form.Group>
              <Form.Label className="formFont pl-1">Port No</Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Type"
              />
            </Form.Group>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 ">
            <Form.Group>
              <Form.Label className="formFont pl-1">Model</Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Type"
              />
            </Form.Group>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xl-3 col-lg-3 col-md-6 ">
            <Form.Group>
              <Form.Label className="formFont pl-1">Brand</Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Store"
              />
            </Form.Group>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 ">
            <Form.Group>
              <Form.Label className="formFont pl-1">Catalouge</Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Type"
              />
            </Form.Group>
          </div>
        </div>
        <div className="">
          <Button
            className=" cancelButton text-black border font-weight-bold font mb-5 item-add-btn float-left "
            variant=""
          >
            Cancel
          </Button>
          <button className="btn btn-primary btn-sm float-right text-center custome-addnew-btn item-list-btn">
            Add <i className="fas fa-plus pl-2 item-list-icon pt-1"></i>
          </button>
          <div className="clear-fix"></div>
        </div>
      </div>
      <div className="card card-custom gutter-b pl-5 pr-5">
        <div className="row mt-5 pb-1">
          <div className="react-bootstrap-table table-responsive border-0 pl-5">
            <table className="table table table-head-custom table-vertical-center  item-add-table  ">
              <thead>
                <tr>
                  <th scope="col">SL</th>

                  <th scope="col">Department</th>
                  <th scope="col">ITEM NAME</th>
                  <th scope="col">UOM</th>
                  <th scope="col">ITEM TYPE</th>
                  <th scope="col">ITEM CATEGORY</th>
                  <th scope="col">PART NO</th>
                  <th scope="col">MODEL</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>engine</td>
                  <td>Container Cargo</td>
                  <td>Durres(Durazzo)</td>
                  <td>Akij Noor</td>
                  <td>Chottogram</td>
                  <td>Chottogram</td>
                  <td>Chottogram</td>

                  <td>
                    {" "}
                    <i className="far fa-edit editIcon item-list-icon"></i>
                    <i className="fas fa-trash-alt editIcon item-list-icon ml-4"></i>
                  </td>
                </tr>
                <tr>
                  <td>02</td>
                  <td>engine</td>
                  <td>Container Cargo</td>
                  <td>Durres(Durazzo)</td>
                  <td>Akij Noor</td>
                  <td>Chottogram</td>
                  <td>Chottogram</td>
                  <td>Chottogram</td>

                  <td className="">
                    {" "}
                    <i className="far fa-edit editIcon item-list-icon"></i>
                    <i className="fas fa-trash-alt editIcon item-list-icon ml-4"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-lg-10"></div>
          <div className="col-lg-2 mt-3">
            <button className="btn btn-primary btn-sm float-right text-center custome-addnew-btn item-add-save mb-5">
              save
            </button>
          </div>
          <div className="clear-fix"></div>
        </div>
      </div>
    </>
  );
};

export default ItemAdd;
