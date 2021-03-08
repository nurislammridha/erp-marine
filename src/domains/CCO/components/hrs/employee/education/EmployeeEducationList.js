import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EmployeeTab from "../EmployeeTab";
import { Form, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import EmployeeEducationAdd from "./EmployeeEducationAdd";
import EmployeeEducationEdit from "./EmployeeEducationEdit";
import { GetEmployeeDetails } from "../../../../_redux/actions/EmployeeAction";
import PreviewAttachment from "../../../../../../modules/master/components/previews/PreviewAttachment";

const EmployeeEducationList = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const [isAddMode, setIsAddMode] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editActiveEducation, setEditActiveEducation] = useState(undefined);
  const [education, setEducation] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  toast.configure();
  const employeeEducationDetails = useSelector(
    (state) => state.employeeInfo.employeeInfoDetails
  );

  useEffect(() => {
    dispatch(GetEmployeeDetails(props.match.params.intEmployeeId));
  }, []);
  const selectRecordItem = (item) => {
    setIsAddMode(false);
    setSelectedId(item.intID);
    setEducation(item);
    setIsEditMode(!isEditMode);
}
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

          {isAddMode && <EmployeeEducationAdd props={props} />}

          {isEditMode && <EmployeeEducationEdit props={education} />}

          <div className="table-responsive table-list">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Degree Name</th>
                  <th>Institution</th>
                  <th>Result</th>
                  <th>Year</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {typeof employeeEducationDetails != "undefined" &&
                  employeeEducationDetails.educations.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.strCertification}</td>
                      <td>{item.strInstitution}</td>
                      <td>{item.strResult}</td>
                      <td>{item.strYear}</td>
                      <td> <PreviewAttachment url={`${process.env.REACT_APP_API_PUBLIC_URL}assets/images/asllEmployeeEducation/${item.image}`} /></td>
                      {/* <td>
                        <button
                          onClick={() => {
                            setIsAddMode(false);
                            setEducation(item);
                            setIsEditMode(!isEditMode);
                          }}
                          className="btn btn-primary"
                        >
                          {!isEditMode ? "Edit" : "Editing..."}
                        </button>
                      </td> */}
                       <td>
                         <button onClick={() => selectRecordItem(item)} className="btn btn-primary">
                            {!isEditMode ? 'Edit' : selectedId === item.intID ? 'Editing...' : 'Edit'}
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

export default EmployeeEducationList;
