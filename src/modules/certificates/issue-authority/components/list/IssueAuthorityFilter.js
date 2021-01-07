import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useForm } from "react-hook-form";
import Select from "react-select";

const IssueAuthorityFilter = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const action = [
    {
      label: "Active",
      value: 1,
    },
    {
      label: "In Active",
      value: 2,
    },
  ];

  return (
    <form className="form form-label-right" method="post">
      <div className="form-group row ml-2">
        <div className="col-lg-3 col-md-6 col-10">
          <Form.Control type="text" placeholder="Search" value={""} />
        </div>

        <div className="col-lg-3 col-md-6 col-10">
          <Form.Group
            className="noonReportInput"
            as={Row}
            controlId="formPlaintextPassword"
          >
            <Form.Label className="mt-2">Status</Form.Label>
            <Col sm="9">
              <RHFInput
                as={<Select options={action} />}
                rules={{ required: false }}
                name="intVesselID"
                register={register}
                value={action.label}
                setValue={""}
              />
            </Col>
          </Form.Group>
        </div>
      </div>
    </form>
  );
};

export default IssueAuthorityFilter;
