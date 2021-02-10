import React, { useEffect, useState } from "react";
import { Form, Col } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getItemCategory,
  getItemList,
  getItemSubCategory,
} from "../_redux/actions/ItemAction";

const ItemFilter = ({ currentPage, setCurrentPage }) => {
  const { register, setValue } = useForm();
  const dispatch = useDispatch();
  const itemCategoryOptionData = useSelector(
    (state) => state.itemList.itemCategoryOptionData
  );
  const itemSubCategoryOptionData = useSelector(
    (state) => state.itemList.itemSubCategoryOptionData
  );
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getItemCategory());
    dispatch(getItemSubCategory());
    dispatch(getItemList(currentPage));
  }, []);
  useEffect(() => {
    dispatch(getItemList(currentPage));
  }, [dispatch, currentPage]);

  const categorySelecte = (itemCategory) => {
    dispatch(getItemList(currentPage, searchText, itemCategory, null, null));
  };
  const subCategorySelecte = (itemSubCategory) => {
    dispatch(getItemList(currentPage, searchText, null, itemSubCategory, null));
  };
  const itemDepartment = (department) => {
    dispatch(getItemList(currentPage, searchText, null, null, department));
  };

  const searchItems = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText.length === 0) {
      dispatch(getItemList(currentPage));
    } else {
      dispatch(getItemList(currentPage, searchText));
    }
  };
  const department = [
    {
      value: 1,
      label: "Store",
    },
    {
      value: 2,
      label: "Engine",
    },
  ];
  return (
    <>
      <div className="row m-4">
        <div className="col-lg-1">
          <h1 className="tableheading">Item List</h1>
        </div>
        <div className="col-lg-2 ">
          <Form.Group as={Col} controlId="formGridState">
            <input
              type="search"
              value={searchText}
              className="form-control product-search-input formHeight"
              placeholder="Search by item name"
              onChange={searchItems}
            />
          </Form.Group>
        </div>
        <div className="col-lg-2">
          <Form.Group as={Col} controlId="formGridState">
            <RHFInput
              as={<Select options={itemCategoryOptionData} />}
              rules={{ required: false }}
              placeholder="Item Category"
              name="intItemCategoryID"
              register={register}
              setValue={setValue}
              onChange={(option) => {
                categorySelecte(option.value);
                setValue("intItemSubCategoryID", "");
                dispatch(getItemSubCategory(option.value));
                // dispatch(getItemSubCategory(option.value));
              }}
            />
          </Form.Group>
        </div>
        <div className="col-lg-2">
          <Form.Group as={Col} controlId="formGridState">
            <RHFInput
              as={<Select options={itemSubCategoryOptionData} />}
              rules={{ required: true }}
              placeholder="Item SubCategory"
              name="intItemSubCategoryID"
              register={register}
              setValue={setValue}
              onChange={(option) => {
                subCategorySelecte(option.value);
              }}
              setValue={setValue}
            />
          </Form.Group>
        </div>
        <div className="col-lg-2">
          <Form.Group as={Col} controlId="formGridState">
            <RHFInput
              as={<Select options={department} />}
              rules={{ required: false }}
              placeholder="Department"
              name="intDepartment"
              register={register}
              onChange={(option) => itemDepartment(option.value)}
              setValue={setValue}
            />
          </Form.Group>
        </div>
        <div className="certificate-filter">
          <i className="fas fa-filter tableFilter mt-1 mr-2"></i>
          <i className="far fa-filter"></i>
          <Link
            to="/items/add"
            className="btn btn-primary text-center text-white btn-sm custome-addnew-btn certificate-add-btn"
          >
            Add New
          </Link>
        </div>
      </div>
    </>
  );
};

export default ItemFilter;
