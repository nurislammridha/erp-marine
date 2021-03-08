import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import {
  GetEmployeeRankList,
  StoreEmployeePromotion,
  GetEmployeePromotionList,
  EmptyEmployeePromotionAddMessage,
  DeleteEmployeePromotion,
  EmptyEmployeePromotionDeleteMessage,
} from "../../../../_redux/actions/EmployeePromotionAction";
import { toast } from "react-toastify";
import { getEmployeData } from "../../../../../../app/modules/Auth/_redux/authCrud";
import { generateStringDateFromDate } from "../../../../utils/DateHelper";
import { GetEmployeeList } from "../../../../_redux/actions/EmployeeAction";

const PromotionalModal = (props) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const { handleClose, isShow, employee } = props;
  const dispatch = useDispatch();
  const [effectiveDate, setEffectiveDate] = useState("");
  const [loading, setLoading] = useState("");
  const [promotedDesignation, setPromotedDesignation] = useState("");
  const [monPromotedSalary, setMonPromotedSalary] = useState("");
  toast.configure();
  const employeePromotionList = useSelector(
    (state) => state.promotion.employeePromotionList
  );
  const rankList = useSelector((state) => state.promotion.rankList);
  const addMessage = useSelector((state) => state.promotion.addMessage);
  const addStatus = useSelector((state) => state.promotion.addStatus);
  const deleteMessage = useSelector((state) => state.promotion.deleteMessage);
  const deleteStatus = useSelector((state) => state.promotion.deleteStatus);

  useEffect(() => {
    dispatch(GetEmployeeRankList());
    // if (typeof employee.intID != "undefined") {
    dispatch(GetEmployeePromotionList(employee.intID));
    // }

    if (typeof addMessage === null || typeof addMessage === "undefined") {
      disableLoading();
      toast.error("Something Went Wrong", {
        autoClose: 2000,
        className: "dangerColor",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      disableLoading();
      if (addStatus && addMessage.length > 0) {
        toast.success(addMessage, {
          autoClose: 2000,
          className: "primaryColor",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(EmptyEmployeePromotionAddMessage());
        dispatch(GetEmployeePromotionList(employee.intID));
        dispatch(GetEmployeeList());
      }

      if (!addStatus && addMessage.length > 0) {
        disableLoading();
        toast.error(addMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(EmptyEmployeePromotionAddMessage());
      }
    }

    if (typeof deleteMessage === null || typeof deleteMessage === "undefined") {
      disableLoading();
      toast.error("Something Went Wrong", {
        autoClose: 2000,
        className: "dangerColor",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      disableLoading();
      if (deleteStatus && deleteMessage.length > 0) {
        toast.success(deleteMessage, {
          autoClose: 2000,
          className: "primaryColor",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(EmptyEmployeePromotionDeleteMessage());
        // dispatch(GetEmployeePromotionList(employee.intID));
      }

      if (!deleteStatus && deleteMessage.length > 0) {
        disableLoading();
        toast.error(deleteMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(EmptyEmployeePromotionDeleteMessage());
      }
    }
  }, [addMessage, addStatus, deleteMessage, deleteStatus, dispatch, props]);

  const deleteData = (intID) => {
    // dispatch(DeleteEmployeeSigning(intID));
    // dispatch(GetEmployeeSigningList());
  };
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const handleSubmitPromotion = async () => {
    enableLoading();
    const postData = {
      intEmployeeID: employee.intID,
      monPromotedSalary: monPromotedSalary,
      intPromotedDesignationID:
        typeof promotedDesignation.value != "undefined"
          ? promotedDesignation.value
          : 0,
      dteEffectiveFromDate: effectiveDate,
      intPromotedDesignationName:
      typeof promotedDesignation.label != "undefined"
        ? promotedDesignation.label
        : null,
    dteEffectiveFromDate: effectiveDate,
      intInsertBy: await getEmployeData().intEmployeeId,
    };
    // console.log("postData", postData);
    dispatch(StoreEmployeePromotion(postData));
  };

  const promotionDelete = async (intID) => {
    // let deleteData = await DeleteVessel(intID);
    dispatch(DeleteEmployeePromotion(intID));
  };

  return (
    <>
      {employee && (
        <Modal show={isShow} onHide={handleClose} size={"lg"}>
          <Modal.Header closeButton style={{ display: "block" }}>
            <Modal.Title>
              <div className="text-center">
                <div className="float-left">
                  Promotional Information -<mark>{employee.strName}</mark>
                </div>
                <p
                  className="float-right text-right pointer"
                  onClick={handleClose}
                >
                  <i className="fa fa-times text-danger"></i>
                </p>
                <div className="clearfix"></div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card card-body p-2">
              <p>
                Current Salary:{" "}
                <span className="badge badge-info">
                  {employee.strAmount} USD
                </span>
                &nbsp; &nbsp; Starting Rank:{" "}
                <span className="badge badge-warning">{employee.strRank}</span>
              </p>
            </div>

            <form
              className="form mb-5 card card-body mt-2"
              onSubmit={() => handleSubmit(handleSubmitPromotion)}
              method="post"
            >
              <h3 className="mb-3">New Promotion</h3>
              <div className="row">
                <div className="col-lg-3">
                  <label>Effective Date</label>
                  <br />
                  <Form.Control
                    type="date"
                    label="Promotion Effective Date"
                    name="effectiveDate"
                    value={effectiveDate}
                    id="effectiveDate"
                    onChange={(e) => setEffectiveDate(e.target.value)}
                  />
                  <div className="inputError margin-minus-10">
                    {errors.effectiveDate &&
                      errors.effectiveDate.type === "required" &&
                      "Effective Date Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-3">
                  <label>Salary</label>
                  <br />
                  <Form.Control
                    type="number"
                    label="Promoted Salary"
                    name="monPromotedSalary"
                    value={monPromotedSalary}
                    id="monPromotedSalary"
                    min={0}
                    onChange={(e) => setMonPromotedSalary(e.target.value)}
                  />
                  <div className="inputError margin-minus-10">
                    {errors.monPromotedSalary &&
                      errors.monPromotedSalary.type === "required" &&
                      "Salary Can't be blank"}

                    {errors.monPromotedSalary &&
                      errors.monPromotedSalary.min &&
                      "Minimum Salary could not be 0"}
                  </div>
                </div>

                <div className="col-lg-3">
                  <label>Promoted Rank</label>
                  <br />
                  {/* <Form.Control
                    type="number"
                    label="Promoted Rank"
                    name="promotedDesignation"
                    value={promotedDesignation}
                    id="promotedDesignation"
                    onChange={(e) => setPromotedDesignation(e.target.value)}
                  /> */}
                  <RHFInput
                    as={<Select options={rankList} />}
                    rules={{ required: false }}
                    name="promotedDesignation"
                    register={register}
                    value=""
                    onChange={(e) =>
                      setPromotedDesignation(e, "promotedDesignation")
                    }
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.promotedDesignation &&
                      errors.promotedDesignation.type === "required" &&
                      "Rank Can't be blank"}
                  </div>
                </div>
                <div className="col-lg-3">
                  <label></label>
                  <br />
                  {loading && (
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      disabled={true}
                    >
                      <span>Submitting</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!loading && (
                    <button
                      type="button"
                      onClick={() => handleSubmitPromotion()}
                      class="btn btn-primary btn-lg"
                    >
                      <span>Submit Now</span>
                    </button>
                  )}
                </div>
              </div>
            </form>

            <h3 className="mt-5">Promotional History</h3>

            {employeePromotionList && employeePromotionList.length > 0 && (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Previous Salary</th>
                    <th>Promoted Salary</th>
                    <th>Promoted Rank</th>
                    <th>Effective Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {employeePromotionList &&
                    employeePromotionList.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {parseFloat(item.monPreviousSalary).toFixed(2)}{" "}
                          {item.strCurrency}
                        </td>
                        <td>
                          {parseFloat(item.monPromotedSalary).toFixed(2)}{" "}
                          {item.strCurrency}
                        </td>
                        <td>{item.strPromotedDesignation}</td>
                        <td>{generateStringDateFromDate(item.dteEffectiveFromDate)}</td>
                        <td>
                          <a
                            className="btn btn-icon btn-light btn-hover-danger btn-sm"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this item?"
                                )
                              )
                                promotionDelete(item.intID);
                            }}
                          >
                            <i className="fa fa-trash"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default PromotionalModal;
