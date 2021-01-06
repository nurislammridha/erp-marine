import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EmployeeTab from "../EmployeeTab";
import { toast } from "react-toastify";
import { GetEmployeeDetails } from "../../../../_redux/actions/EmployeeAction";
import EmployeeDocumentEdit from "./EmployeeDocumentEdit";
import EmployeeDocumentAdd from "./EmployeeDocumentAdd";
import PreviewAttachment from "../../../../../../modules/master/components/previews/PreviewAttachment";

const EmployeeDocumentList = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const [isAddMode, setIsAddMode] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [records, setRecords] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  toast.configure();
  const employeeEducationDetails = useSelector(
    (state) => state.employeeInfo.employeeInfoDetails
  );
  console.log("employeeEducationDetails", employeeEducationDetails);
  useEffect(() => {
    dispatch(GetEmployeeDetails(props.match.params.intEmployeeId));
  }, []);

  const selectRecordItem = (item) => {
    setIsAddMode(false);
    setSelectedId(item.intID);
    setRecords(item);
    setIsEditMode(!isEditMode);
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div>
            <EmployeeTab props={props} />
          </div>
          <div>
            <button
              onClick={() => setIsAddMode(!isAddMode)}
              className="btn btn-primary float-right mr-6 mt-2"
            >
              {!isAddMode ? (
                <i className="fa fa-plus">ADD</i>
              ) : (
                <i className="fa fa-minus"></i>
              )}
            </button>
          </div>

          {isAddMode && (
            <EmployeeDocumentAdd
              props={props}
              setIsEditMode={setIsEditMode}
              setIsAddMode={setIsAddMode}
            />
          )}

          {isEditMode && (
            <EmployeeDocumentEdit
              props={records}
              setIsEditMode={setIsEditMode}
              setIsAddMode={setIsAddMode}
            />
          )}

          <div className="table-responsive table-list">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Type</th>
                  <th>Issued By</th>
                  <th>Number</th>
                  <th>Issue Date</th>
                  <th>Expiry Date</th>

                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {typeof employeeEducationDetails != "undefined" &&
                  employeeEducationDetails.documents.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.strType}</td>
                      <td>{item.strIssueBy}</td>
                      <td>{item.strNumber}</td>
                      <td>{item.strIssueDate}</td>
                      <td>{item.strExpiryDate}</td>
                      {/* <td>{item.strCDCNo}</td>
                                        <td>{item.strSID}</td> */}
                      <td>
                        <PreviewAttachment
                          url={`${process.env.REACT_APP_API_PUBLIC_URL}assets/images/asllEmployeeDocument/${item.image}`}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => selectRecordItem(item)}
                          className="btn btn-primary"
                        >
                          {!isEditMode
                            ? "Edit"
                            : selectedId === item.intID
                            ? "Editing..."
                            : "Edit"}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
});

export default EmployeeDocumentList;
