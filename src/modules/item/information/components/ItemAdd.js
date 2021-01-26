import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { deleteMultipleItemInput, itemAddInput, multipleItemAddInput, submitMultipleItem, getItemCategory, getUOM, getItemType } from "../_redux/actions/ItemAction";
import { useHistory } from "react-router-dom";
const ItemAdd = () => {
  const { register, setValue } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const itemDataInput = useSelector(state => state.itemList.itemDataInput);
  const multipleItemList = useSelector(state => state.itemList.multipleItemAdd);
  const itemSUbmit = useSelector(state => state.itemList.itemSUbmit);
  useEffect(() => {
    console.log('itemSUbmit add:>> ', itemSUbmit.status);
    if (itemSUbmit.status) {
      history.push('/items/list');
    }
  }, [itemSUbmit])

  const UOMOptionData = useSelector(
    (state) => state.itemList.UOMOptionData
  );
  const itemTypeOptionData = useSelector(
    (state) => state.itemList.itemTypeOptionData
  );
  const itemCategoryOptionData = useSelector(
    (state) => state.itemList.itemCategoryOptionData
  );
  const changeText = (name, value) => {
    dispatch(itemAddInput(name, value))
  }
  const multipleItemAdd = () => {

    dispatch(multipleItemAddInput(itemDataInput))
  }

  useEffect(() => {
    if (multipleItemList.length > 0) {
      setValue("intDepartmentID", "");
      setValue("intUoMID", "");
      setValue("intItemTypeID", "");
      setValue("intItemCategoryID", "");
    }
  }, [multipleItemList, setValue])

  useEffect(() => {
    dispatch(getUOM());
    dispatch(getItemType());
    dispatch(getItemCategory());
    dispatch(getItemCategory())
  }, [])

  const department = [
    {
      id: 1,
      label: "Store",
    },
    {
      id: 2,
      label: "Engine",
    }
  ];
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
              <RHFInput
                as={<Select options={department} />}
                rules={{ required: true }}
                name="intDepartmentID"
                register={register}
                value={itemDataInput.strDepartmentName}
                setValue={setValue}
                onChange={(option) => {
                  changeText("intDepartmentID", option.id);
                  changeText("strDepartmentName", option.label);
                }}
              />
            </Form.Group>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 ">
            <Form.Group>
              <Form.Label className="formFont pl-1">Item Name</Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Enter Item Name"
                name="strItemName"
                value={itemDataInput.strItemName}
                onChange={(e) => changeText("strItemName", e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6">
            <label className="formFont">UOM</label>
            <RHFInput
              as={<Select options={UOMOptionData} />}
              rules={{ required: false }}
              name="intUoMID"
              register={register}
              value={itemDataInput.strUoM}
              setValue={setValue}
              onChange={(option) => {
                changeText("intUoMID", option.value);
                changeText("strUoM", option.label);
              }}
            />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6">
            <label className="formFont">Item Type</label>
            <RHFInput
              as={<Select options={itemTypeOptionData} />}
              rules={{ required: false }}
              name="intItemTypeID"
              register={register}
              value={itemDataInput.StrItemTypeName}
              setValue={setValue}
              onChange={(option) => {
                changeText("intItemTypeID", option.value);
                changeText("StrItemTypeName", option.label);
              }}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xl-3 col-lg-3 col-md-6">
            <label className="formFont">Item Category</label>
            <RHFInput
              as={<Select options={itemCategoryOptionData} />}
              rules={{ required: false }}
              name="intItemCategoryID"
              register={register}
              value={itemDataInput.strItemCategoryName}
              setValue={setValue}
              onChange={(option) => {
                changeText("intItemCategoryID", option.value);
                changeText("strItemCategoryName", option.label);
              }}
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
                placeholder="Enter Item SubCategory"
                name="strSubCategoryName"
                value={itemDataInput.strSubCategoryName}
                onChange={(e) => changeText("strSubCategoryName", e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 ">
            <Form.Group>
              <Form.Label className="formFont pl-1">Part No</Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Enter Part No"
                name="strPartNo"
                value={itemDataInput.strPartNo}
                onChange={(e) => changeText("strPartNo", e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 ">
            <Form.Group>
              <Form.Label className="formFont pl-1">Model</Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Enter Model No"
                name="strModelNo"
                value={itemDataInput.strModelNo}
                onChange={(e) => changeText("strModelNo", e.target.value)}
              />
            </Form.Group>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xl-3 col-lg-3 col-md-6 ">
            <Form.Group>
              <Form.Label className="formFont pl-1">Catalogue No</Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Enter Catalouge No"
                name="intCatalogueID"
                value={itemDataInput.intCatalogueID}
                onChange={(e) => changeText("intCatalogueID", e.target.value)}
              />
            </Form.Group>
          </div>
          {(itemDataInput.strDepartmentName === "Store") && (
            <>
              <div className="col-xl-3 col-lg-3 col-md-6 ">
                <Form.Group>
                  <Form.Label className="formFont pl-1">Brand</Form.Label>
                  <Form.Control
                    className="formHeight"
                    type="text"
                    placeholder="Enter Brand"
                    name="strBrand"
                    value={itemDataInput.strBrand}
                    onChange={(e) => changeText("strBrand", e.target.value)}
                  />
                </Form.Group>
              </div>

            </>
          )}
          {(itemDataInput.strDepartmentName === "Engine") && (
            <>
              <div className="col-xl-3 col-lg-3 col-md-6 ">
                <Form.Group>
                  <Form.Label className="formFont pl-1">Engine No</Form.Label>
                  <Form.Control
                    className="formHeight"
                    type="text"
                    placeholder="Enter Engine No"
                    name="strEngineName"
                    value={itemDataInput.strEngineName}
                    onChange={(e) => changeText("strEngineName", e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 ">
                <Form.Group>
                  <Form.Label className="formFont pl-1">Drawing No</Form.Label>
                  <Form.Control
                    className="formHeight"
                    type="text"
                    placeholder="Enter Drawing"
                    name="strDrwingNumber"
                    value={itemDataInput.strDrwingNumber}
                    onChange={(e) => changeText("strDrwingNumber", e.target.value)}
                  />
                </Form.Group>
              </div>
            </>
          )}

        </div>
        <div className="">
          <Button
            className=" cancelButton text-black border font-weight-bold font mb-5 item-add-btn float-left "
            variant=""
            onClick={() => history.push('/items/list')}
          >
            Cancel
          </Button>
          <button
            className="btn btn-primary btn-sm float-right text-center custome-addnew-btn item-list-btn"
            onClick={() => multipleItemAdd()}
          >
            Add <i className="fas fa-plus pl-2 item-list-icon pt-1"></i>
          </button>
          <div className="clear-fix"></div>
        </div>
      </div>
      {multipleItemList.length > 0 && (
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
                  {multipleItemList.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.strDepartmentName}</td>
                      <td>{item.strItemName}</td>
                      <td>{item.strUoM}</td>
                      <td>{item.StrItemTypeName}</td>
                      <td>{item.strItemCategoryName}</td>
                      <td>{item.strPartNo}</td>
                      <td>{item.strModelNo}</td>

                      <td>
                        {" "}
                        <i className="far fa-edit editIcon item-list-icon"></i>
                        <a

                          onClick={(index) => {
                            alert("Are sure, you want to delete?")
                            dispatch(deleteMultipleItemInput(index))
                          }}
                        >
                          <i className="fas fa-trash-alt editIcon item-list-icon ml-4"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-lg-10"></div>
            <div className="col-lg-2 mt-3">
              <button
                className="btn btn-primary btn-sm float-right text-center custome-addnew-btn item-add-save mb-5"
                onClick={() => dispatch(submitMultipleItem(multipleItemList))}
              >
                save
             </button>
            </div>
            <div className="clear-fix"></div>
          </div>
        </div>
      )}

    </>
  );
};

export default ItemAdd;
