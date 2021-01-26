import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  certificatetypeSubmitAction,
  getCertificateTypeList,
  handleChangeCertificateTypeInput,
} from "../../_redux/actions/CertificateTypeAction";

const CertificateTypeAdd = () => {
  const { handleSubmit, register, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(15);
  const certificateTypeInput = useSelector(
    (state) => state.certificateTypeInfo.certificateTypeInput
  );
  const isLoading = useSelector((state) => state.certificateTypeInfo.isLoading);
  const addStatus = useSelector((state) => state.certificateTypeInfo.status);

  useEffect(() => {
    if (addStatus) {
      dispatch(getCertificateTypeList("", "", currentPage));
    }
  }, [addStatus]);

  const handleChangeTextInput = (name, value) => {
    setValue(name, value);
    dispatch(handleChangeCertificateTypeInput(name, value));
  };

  const onSubmit = () => {
    dispatch(certificatetypeSubmitAction(certificateTypeInput));
  };

  return (
    <form>
      <form
        className="form form-label-right"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <div className="form-group row">
          <div className="col-md-12">
            <Form.Group>
              <Form.Label className="pl-1">Certificate Type Name</Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Certificate Name"
                // value={certificateTypeInput.strCertificateTypeName}
                name="strCertificateTypeName"
                onChange={(e) =>
                  handleChangeTextInput(
                    "strCertificateTypeName",
                    e.target.value
                  )
                }
                ref={register({
                  required: true,
                  maxLength: 100,
                })}
                setValue={setValue}
              />
              <div className="inputError margin-minus-8">
                {errors.strCertificateTypeName &&
                  errors.strCertificateTypeName.type === "required" &&
                  "Certificate name can't be blank"}
              </div>
            </Form.Group>
          </div>
        </div>

        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Col sm="9">
            {!isLoading && (
              <Button variant="primary" type="submit" className="saveButton">
                Submit
              </Button>
            )}
            {isLoading && (
              <Button
                variant="primary"
                type="submit"
                className="saveButton"
                disabled={true}
              >
                <span className="p-2">Submitting...</span>
                <span className="ml-3 spinner spinner-white "></span>
              </Button>
            )}
          </Col>
        </Form.Group>
      </form>
    </form>
  );
};

export default CertificateTypeAdd;
