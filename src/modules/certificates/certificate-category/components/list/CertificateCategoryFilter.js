import React, { useState, useEffect } from "react";
import { Form, Button, Image, Col, Row, Table } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getCertificateCategoryListData } from "../../_redux/actions/CertificateCategoryAction";

const CertificateCategoryFilter = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState(1);
  const dispatch = useDispatch();
  const certificateCategoryInput = useSelector((state) => state.CertificateCategoryReducer.certificateCategoryInput);
  const { register, setValue } = useForm();
  const [currentPage, setCurrentPage] = useState(1);

  const statusOptions = [
    {
      label: "Active",
      value: "1",
    },
    {
      label: "Inactive",
      value: "0",
    },
  ];

  const handleChangeTextInput = (name, value) => {
    // dispatch(GetVoyageList(value, type));
  };
  // const changeSearch = (value) => {
  //   setSearch(value);
  //   dispatch(getCertificateCategoryListData(value, type, 1));
  // };
  // useEffect(() => {
  //   dispatch(getCertificateCategoryListData("", "", 1));
  // }, []);
  const changeSearch = (value) => {
    setSearch(value);
    dispatch(getCertificateCategoryListData(value, type, currentPage));
  };

  useEffect(() => {
    dispatch(getCertificateCategoryListData("", "", currentPage));
  }, []);
  return (
    <>
      <div className="col-lg-4">
        <Form.Group as={Col} controlId="formGridState">
          <Form.Control
            type="text"
            className="formHeight"
            placeholder="Search by category"
            value={search}
            onChange={(e) => changeSearch(e.target.value)}
          />
        </Form.Group>
      </div>
      <div className="col-lg-4">
        <div className="row">
          <Form.Group as={Col} controlId="formGridState">
            <RHFInput
              as={<Select options={statusOptions} />}
              rules={{ required: false }}
              name="isActive"
              placeholder="Filter by status"
              className="formSelect pt-0"
              register={register}
              value={certificateCategoryInput.isActive}
              onChange={(option) => {
                setType(option.value);
                dispatch(
                  getCertificateCategoryListData(search, option.value, 1)
                );
              }}
              setValue={setValue}
            />
          </Form.Group>
        </div>
      </div>
    </>
  );
};

export default CertificateCategoryFilter;
