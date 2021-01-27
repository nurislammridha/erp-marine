import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChangeCertificateMasterInput,
  certificateMasterSubmitAction,
  getCertificateMasterList,
} from "../../_redux/actions/CertificateListAction";
import { getCertificateCategory } from "../../../certificate-main/_redux/actions/CertificateMainAction";
import { getCertificateCategoryListData, getCertificateParentCategoryData } from "../../../certificate-category/_redux/actions/CertificateCategoryAction";

const CertificateMasterAdd = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isSubCategory } = props;
  const { register, handleSubmit, errors, setValue } = useForm();
  const [currentPage, setCurrentPage] = useState(15);
  const isLoading = useSelector(
    (state) => state.CertificateListReducer.isLoading
  );
  const addStatus = useSelector(
    (state) => state.CertificateListReducer.addStatus
  );
  const CertificateMasterInput = useSelector(
    (state) => state.CertificateListReducer.certificateMasterInput
  );
  const CertificatesCategoryOptionData = useSelector(
    (state) => state.certificateMainInfo.certificatesCategoryOptionData
  );
  //=============
  const status = useSelector(
    (state) => state.CertificateCategoryReducer.status
  );
  const certificateParentCategoryList = useSelector(
    (state) => state.CertificateCategoryReducer.certificateParentCategoryList
  );
  useEffect(() => {
    dispatch(getCertificateParentCategoryData());
    if (status) {
      dispatch(getCertificateCategoryListData());
    }
  }, [status]);

  //=========
console.log('CertificateMasterInput :>> ', CertificateMasterInput);
  const certificateMainInfoChange = (name, value) => {
    dispatch(handleChangeCertificateMasterInput(name, value));
  };

  useEffect(() => {
    if (addStatus) {
      dispatch(getCertificateMasterList("", "", currentPage));
    }
  }, [addStatus]);

  useEffect(() => {
    dispatch(getCertificateCategory());
  }, []);

  const onSubmit = (data) => {
    dispatch(certificateMasterSubmitAction(CertificateMasterInput));
    dispatch(getCertificateMasterList("", "", currentPage));
  };

  return (
    <>
      <form
        className="form form-label-right"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <div className="form-group row mt-5">
          <div className="col-md-12">
            <label className="form-label formFont">Certificate Name</label>
            <Form.Control
              className="formHeight"
              type="text"
              // value={CertificateMasterInput.strCertificateName}
              name="strCertificateName"
              onChange={(e) =>
                certificateMainInfoChange("strCertificateName", e.target.value)
              }
              ref={register({
                required: true,
                maxLength: 100,
              })}
            />
            <div className="inputError margin-minus-8">
              {errors.strCertificateName &&
                errors.strCertificateName.type === "required" &&
                "Certificate name can't be blank"}
            </div>
          </div>

          <div className="col-sm-12">
            <label className="form-label">Category Name</label>
            <RHFInput
              as={<Select options={certificateParentCategoryList}
                isDisabled={typeof isSubCategory === 'undefined' ? false : true}
              />}
              rules={{ required: false }}
              name="intCategoryID"
              className="formSelect pt-0"
              register={register}
              value={CertificateMasterInput.certificateCategoryParent}
              onChange={(option) => {
                certificateMainInfoChange("certificateCategoryParent", {
                  label: option.label,
                  value: option.value,
                });
                certificateMainInfoChange("strCertificateCategoryName", option.label);
                certificateMainInfoChange("intCategoryID", option.value);
              }}
              setValue={setValue}
            />
            <div className="inputError margin-minus-8">
              {errors.intCategoryID &&
                errors.intCategoryID.type === "required" &&
                "Certificate category can't be blank"}
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10"></div>
        </div>

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
            <span className="p-2"> Submitting...</span>
            <span className="ml-3 spinner spinner-white "></span>
          </Button>
        )}
      </form>
    </>
  );
};

export default CertificateMasterAdd;
