import React from "react";
import { Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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
  const submiteCategory = (data) => {};

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

  //add boiler info in multiple list

  return (
    <>
      <form
        className="form form-label-right"
        onSubmit={handleSubmit(submiteCategory)}
        method="post"
      >
        <div className="form-group mt-5">
          <label className="form-label">Certificate Name</label>
          <Form.Control
            type="text"
            ref={register}
            value={getCategoryInpuData.strCertificateCategoriName}
            placeholder="Certificate Category"
            name="strCertificateCategoriName"
            onChange={(e) => categoryInputChange("strCertificateCategoriName", e.target.value)}
          />
        </div>
        <div className="form-group row">
          <div className="col-sm-10"></div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg">
          <span>Submit</span>
        </button>

        {/* {loading && (
                    <button type="submit" class="btn btn-primary btn-lg" disabled={true}>
                        <span>Submitting...</span>
                        <span className="ml-3 spinner spinner-white"></span>
                    </button>
                )}

                {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
                        <span>Submit</span>
                    </button>
                )} */}
      </form>
    </>
  );
};

export default CertificateCategoryAdd;
