import React from "react";
import { Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { handleCertificateCategoryInput } from "../../_redux/actions/CertificateCategoryAction";

const CertificateCategoryAdd = () => {
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();
  const getCategoryInpuData = useSelector(
    (state) => state.CertificateCategoryReducer.certificateCategoryInput
  );
  const categoryInputChange = (name, value) => {
    dispatch(handleCertificateCategoryInput(name, value));
  };
  const submiteCategory = (data) => { };

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

  //add boiler info in multiple list

  return (
    <>
      <form
        className="form form-label-right"
        onSubmit={handleSubmit(submiteCategory)}
        method="post"
      >
        <div className="form-group mt-0">
          <label className="form-label">Category Name</label>
          <Form.Control
            type="text"
            ref={register}
            value={getCategoryInpuData.strCertificateCategoriName}
            placeholder="Type Category Name"
            name="strCertificateCategoriName"
            onChange={(e) => categoryInputChange("strCertificateCategoriName", e.target.value)}
          />
        </div>

        <div className="form-group mt-0">
          <label className="form-label">Parent Category <span className="text-info"> (Optional)</span></label>
          <RHFInput
              as={<Select options={statusOptions} />}
              rules={{ required: false }}
              name="intCargoTypeID"
              register={register}
              value={''}
              onChange={() => console.log('e')}
              setValue={""}
          />
        </div>
        <div className="form-group row">
          <div className="col-sm-10"></div>
        </div>

        {loading && (
          <button type="submit" class="btn btn-primary btn-lg" disabled={true}>
            <span><i className="fa fa-check"></i>  Submitting...</span>
            <span className="ml-3 spinner spinner-white"></span>
          </button>
        )}

        {!loading && (
          <button type="submit" class="btn btn-primary saveButton">
            <span>Submit</span>
          </button>
        )}
      </form>
    </>
  );
};

export default CertificateCategoryAdd;
