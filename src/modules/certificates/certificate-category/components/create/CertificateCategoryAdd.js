import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import {
  certificatecategorySubmitAction,
  getCertificateCategoryListData,
  handleCertificateCategoryInput,
} from "../../_redux/actions/CertificateCategoryAction";

const CertificateCategoryAdd = () => {
  const history = useHistory();
  const { register, handleSubmit, watch, errors, setValue } = useForm();
  const dispatch = useDispatch();

  const getCategoryInpuData = useSelector(
    (state) => state.CertificateCategoryReducer.certificateCategoryInput
  );
  const status = useSelector(
    (state) => state.CertificateCategoryReducer.status
  );
  const isLoading = useSelector(
    (state) => state.CertificateCategoryReducer.isLoading
  );

  console.log("getCategoryInpuData :>> ", getCategoryInpuData);
  const categoryInputChange = (name, value) => {
    dispatch(handleCertificateCategoryInput(name, value));
  };

  const submiteCategory = (data) => {
    dispatch(certificatecategorySubmitAction(getCategoryInpuData));
  };
  useEffect(() => {
    if (status) {
      dispatch(getCertificateCategoryListData());
    }
  }, [status]);

  const statusOptions = [
    {
      label: "Active",
      value: 0,
    },
    {
      label: "Inactive",
      value: 1,
    },
  ];

  const loading = false;
  return (
    <>
      <form
        className="form form-label-right voyageEngineerForm"
        onSubmit={handleSubmit(submiteCategory)}
        method="post"
      >
        <div className="form-group mt-0">
          <label className="form-label formFont">Category Name</label>
          <Form.Control
            type="text"
            className="formHeight"
            ref={register}
            value={getCategoryInpuData.strCertificateCategoriName}
            placeholder="Type Category Name"
            name="strCertificateCategoriName"
            onChange={(e) =>
              categoryInputChange("strCertificateCategoriName", e.target.value)
            }
          />
        </div>
        <div className="form-group mt-0 ">
          <label className="form-label formFont">
            Parent Category <span className="text-info"> (Optional)</span>
          </label>
          <RHFInput
            as={<Select options={statusOptions} />}
            rules={{ required: false }}
            name="intCargoTypeID"
            className="formSelect pt-0"
            register={register}
            value={getCategoryInpuData.intCargoTypeID}
            onChange={(option) => {
              categoryInputChange("intCargoTypeName", option.label);
              categoryInputChange("intCargoTypeID", option.value);
            }}
            setValue={setValue}
          />
        </div>

        <div className="form-group row">
          <div className="col-sm-10"></div>
        </div>
        {isLoading && (
          <button
            type="submit"
            class="btn btn-primary saveButton mt-3"
            disabled={true}
          >
            <span className="p-1">Submitting...</span>
            <span className="ml-3 spinner spinner-white "></span>
          </button>
        )}
        {!isLoading && (
          <button type="submit" className="btn btn-primary saveButton mt-3">
            <span>Submit</span>
          </button>
        )}
      </form>
    </>
  );
};

export default CertificateCategoryAdd;
