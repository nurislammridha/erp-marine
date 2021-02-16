import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getSupplierList, getSupplierType, handleChangeSupplierFilterInput } from "../_redux/actions/SuppliersListAction";

const SuppliersFilter = () => {

  const dispatch = useDispatch();
  const { register, setValue } = useForm();

  const supplierOptionData = useSelector((state) => state.supplierList.supplierTypeData)

  useEffect(() => {
    dispatch(getSupplierList());
    dispatch(getSupplierType())
  }, []);


  const handleChangeTextInput = (name, value) => {
    dispatch(handleChangeSupplierFilterInput(name, value));
  }

  return (
    <>
      <div className="col-md-4">
        <Form.Group as={Col} controlId="formGridState">
          <Form.Control
            className="formHeight"
            type="text"
            name="search"
            placeholder="Search"
            // value={search}
            onChange={(e) => handleChangeTextInput("search", e.target.value)}
          />
        </Form.Group>
      </div>
      <div className="col-md-4">
        <Form.Group as={Col} controlId="formGridState">
          <RHFInput
            className="formSelect pt-0"
            as={<Select options={supplierOptionData} />}
            rules={{ required: false }}
            name="strSupplierTypeName"
            placeholder="Search by Supplier Type"
            register={register}
            onChange={(e) => {
              handleChangeTextInput('strSupplierTypeName', e.label);
              handleChangeTextInput('intSupplierTypeID', e.value);
            }}
            setValue={setValue}
          />
        </Form.Group>
      </div>
    </>
  );
};

export default SuppliersFilter;
