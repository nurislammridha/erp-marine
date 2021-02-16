import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getCertificateMasterList } from "../../_redux/actions/CertificateListAction";

const CertificateMasterFilter = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const CertificateMasterInput = useSelector(
    (state) => state.CertificateListReducer.certificateMasterInput
  );
  const { register, setValue } = useForm();
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
  const changeSearch = (value) => {
    setSearch(value);
    dispatch(getCertificateMasterList(value, type, currentPage));
  };
  useEffect(() => {
    dispatch(getCertificateMasterList("", "", currentPage));
  }, []);
  return (
    <>
    <div className="col-lg-4">
      <Form.Group as={Col} controlId="formGridState">
        <Form.Control
          className="formHeight"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => changeSearch(e.target.value)}
        />
      </Form.Group>
      </div>
      <div className="col-lg-4">
      <Form.Group as={Col} controlId="formGridState">
        <RHFInput
          className="formSelect pt-0"
          as={<Select options={statusOptions} />}
          rules={{ required: false }}
          name="isActive"
          register={register}
          value={CertificateMasterInput.isActive}
          onChange={(option) => {
            setType(option.value);
            dispatch(
              getCertificateMasterList(search, option.value, currentPage)
            );
          }}
          setValue={setValue}
        />
      </Form.Group>
      </div>
    </>
  );
};

export default CertificateMasterFilter;
