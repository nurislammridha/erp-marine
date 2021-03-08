import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EmployeeTab from '../EmployeeTab';
import { Form, Image } from "react-bootstrap";
import { toast } from 'react-toastify';
import { GetEmployeeDetails } from '../../../../_redux/actions/EmployeeAction';
import EmployeeCertificateAdd from './EmployeeCertificateAdd';
import EmployeeCertificateEdit from './EmployeeCertificateEdit';
import PreviewAttachment from '../../../../../../modules/master/components/previews/PreviewAttachment';


const EmployeeCertificateList = withRouter(({ history, props }) => {
    const dispatch = useDispatch();
    const [isAddMode, setIsAddMode] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [editActiveEducation, setEditActiveEducation] = useState(undefined);
    const [records, setRecords] = useState({});

    toast.configure();
    const employeeEducationDetails = useSelector((state) => state.employeeInfo.employeeInfoDetails);
    console.log('employeeEducationDetails', employeeEducationDetails);
    useEffect(() => {
        dispatch(GetEmployeeDetails(props.match.params.intEmployeeId));
    }, []);

    return (
        <>
            <div className="container">
                <div className="card card-custom gutter-b">
                    <div>
                        <EmployeeTab props={props} />
                    </div>
                    <div>
                        <button onClick={() => setIsAddMode(!isAddMode)} className="btn btn-primary float-right mr-6 mt-2">
                            {!isAddMode ? <i className="fa fa-plus">ADD</i> : <i className="fa fa-minus"></i>}
                        </button>
                    </div>

                    {
                        isAddMode &&
                        <EmployeeCertificateAdd props={props} />
                    }

                    {isEditMode && (
                        <EmployeeCertificateEdit props={records}
                            setIsEditMode={setIsEditMode}
                            setIsAddMode={setIsAddMode}
                        />

                    )}

                    <div className="table-responsive mt-3 table-list">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Course Name</th>
                                    <th>Issued By</th>
                                    <th>Number</th>
                                    <th>Issue Date</th>
                                    <th>Expiry Date</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {typeof employeeEducationDetails != 'undefined' && employeeEducationDetails.certificates.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.strCourseName}</td>
                                        <td>{item.strIssueBy}</td>
                                        <td>{item.strNumber}</td>
                                        <td>{item.strIssueDate}</td>
                                        <td>{item.strExpiryDate}</td>
                                        <td>
                                            <PreviewAttachment
                                                url={`${process.env.REACT_APP_API_PUBLIC_URL}assets/images/asllEmployeeCertificate/${item.image}`}
                                                title={"Certificate Attachment"}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => {
                                                setIsAddMode(false);
                                                setRecords(item);
                                                setIsEditMode(!isEditMode);
                                                setSelectedId(item.intID);
                                            }}
                                                className="btn btn-primary">
                                                {/* {!isEditMode ? 'Edit' : 'Editing...'} */}
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
    )
});

export default EmployeeCertificateList;
