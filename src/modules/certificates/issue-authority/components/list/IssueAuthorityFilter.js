import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getIssuingAuthorities } from "../../_redux/actions/CertificateIssueAuthorityAction";

const IssueAuthorityFilter = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(15);
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
  const changeSearch = (value) => {
    setSearch(value);
    dispatch(getIssuingAuthorities(value, type, currentPage));
  };

  useEffect(() => {
    dispatch(getIssuingAuthorities("", "", currentPage));
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
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
        <div className="col-lg-6">
          <Form.Group as={Col} controlId="formGridState">
            <RHFInput
              as={
                <Select options={action} className="formSelect formHeight" />
              }
              rules={{ required: false }}
              className="formSelect pt-0"
              placeholder="Filter by status"
              name="isActive"
              register={register}
              value={CertificateIssueAuthirityInput.isActive}
              onChange={(option) => {
                setType(option.value);
                dispatch(
                  getIssuingAuthorities(search, option.value, currentPage)
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

export default IssueAuthorityFilter;
