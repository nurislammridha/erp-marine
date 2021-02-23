import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  certificateMasterEditAction,
  getCertificateMasterList,
  handleChangeCertificateMasterInput,
  setMasterCertificateEditValue,
} from "../../_redux/actions/CertificateListAction";
import { getCertificateCategory } from "../../../certificate-main/_redux/actions/CertificateMainAction";

const CertificateMasterEdit = (props) => {
  console.log('props.editData :>> ', props.editData);
  const isLoading = useSelector(
    (state) => state.CertificateListReducer.isLoading
  );
  const { register, handleSubmit, errors, setValue } = useForm();
  const [currentPage, setCurrentPage] = useState(15);
  const dispatch = useDispatch();

  const editStatus = useSelector(
    (state) => state.CertificateListReducer.editStatus
  );

  const CertificatesCategoryOptionData = useSelector(
    (state) => state.certificateMainInfo.certificatesCategoryOptionData
  );
  const certificateMainInfoChange = (name, value, e = null) => {
    dispatch(handleChangeCertificateMasterInput(name, value));
  };

  const CertificateMasterInput = useSelector(
    (state) => state.CertificateListReducer.certificateMasterInput
  );
  useEffect(() => {
    dispatch(getCertificateCategory())
  }, [])
  useEffect(() => {
    console.log('Hi :>> ');
    dispatch(setMasterCertificateEditValue(props.editData));
    // if (editStatus) {
    //   dispatch(getCertificateMasterList("", "", currentPage));
    // }
  }, [dispatch, editStatus]);

  const submitecertificateMaster = (data) => {
    dispatch(
      certificateMasterEditAction(
        CertificateMasterInput,
        props.editData.intCertificateID
      )
    );
  };
  const editCategory = [
    {
      value: props.editData.intCategoryID,
      label: props.editData.strCertificateCategoryName
    }
  ]
  return (
    <>
      <form
        className="form form-label-right"
        onSubmit={handleSubmit(submitecertificateMaster)}
        method="post"
      >
        <div className="form-group row mt-5">
          <div className="col-md-12">
            <label className="form-label">Certificate Name</label>
            <Form.Control
              className="formFont pl-1"
              className="formHeight"
              type="text"
              value={CertificateMasterInput.strCertificateName}
              name="strCertificateName"
              onChange={(e) =>
                certificateMainInfoChange("strCertificateName", e.target.value)
              }
            />
          </div>

          <div className="col-sm-12">
            <label className="form-label">Category Name</label>
            <RHFInput
              as={<Select options={CertificatesCategoryOptionData} />}
              rules={{ required: false }}
              name="intCategoryID"
              register={register}
              // value={CertificatesCategoryOptionData.strCertificateCategoryName}
              value={editCategory}
              setValue={setValue}
              onChange={(option) => {
                certificateMainInfoChange(
                  "strCertificateCategoryName",
                  option.label
                );
                certificateMainInfoChange("intCategoryID", option.value);
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10"></div>
        </div>
        {isLoading && (
          <button
            type="submit"
            class="btn btn-primary saveButton"
            disabled={true}
          >
            <span className="p-2">
              <i className="fa fa-check"></i> updating...
            </span>
            <span className="ml-3 spinner spinner-white "></span>
          </button>
        )}

        {!isLoading && (
          <button type="submit" class="btn btn-primary saveButton">
            <span>update</span>
          </button>
        )}
      </form>
    </>
  );
};

export default CertificateMasterEdit;
