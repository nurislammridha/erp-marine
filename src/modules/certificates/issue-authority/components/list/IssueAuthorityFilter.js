import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getIssuingAuthorities } from "../../_redux/actions/CertificateIssueAuthorityAction";

const IssueAuthorityFilter = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState(1);
  const dispatch = useDispatch();
  const CertificateIssueAuthirityInput = useSelector(
    (state) =>
      state.certificateIssueAuthorityInfo.CertificateIssueAuthirityInput
  );
  const { register, setValue } = useForm();
  const action = [
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
  const changeSearch = (value) => {
    setSearch(value);
    dispatch(getIssuingAuthorities(value, type, 1));
  };

  useEffect(() => {
    dispatch(getIssuingAuthorities("", "", 1));
  }, []);

  return (
    <>
      <Form.Group as={Col} controlId="formGridState">
        <Form.Control
          className="formHeight"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => changeSearch(e.target.value)}
        />
      </Form.Group>
      <Form.Label className="formFont pl-1 mt-2">Status</Form.Label>
      <Form.Group as={Col} controlId="formGridState">
        <RHFInput
          as={<Select options={action} className="formSelect formHeight" />}
          rules={{ required: false }}
          className="formSelect pt-0"
          name="isActive"
          register={register}
          value={CertificateIssueAuthirityInput.isActive}
          onChange={(option) => {
            setType(option.value);
            dispatch(getIssuingAuthorities(search, option.value, 1));
          }}
          setValue={setValue}
        />
      </Form.Group>
    </>
  );
};

export default IssueAuthorityFilter;
