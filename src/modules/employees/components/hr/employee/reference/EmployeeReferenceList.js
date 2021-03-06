import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EmployeeTab from '../EmployeeTab';
import { toast } from 'react-toastify';
import { GetEmployeeDetails } from '../../../../_redux/actions/EmployeeAction';
import EmployeeReferenceAdd from './EmployeeReferenceAdd';
import EmployeeReferenceEdit from './EmployeeReferenceEdit';
import PreviewAttachment from '../../../../../../modules/master/components/previews/PreviewAttachment';

const EmployeeReferenceList = withRouter(({ history, props }) => {
    const dispatch = useDispatch();
    const [isAddMode, setIsAddMode] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [education, setEducation] = useState({});
    const [selectedId, setSelectedId] = useState(null);

    toast.configure();
    const employeeInfoDetails = useSelector((state) => state.employeeInfo.employeeInfoDetails);
    console.log('employeeInfoDetails', employeeInfoDetails);

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
                        <button onClick={() => setIsAddMode(!isAddMode)} className="btn btn-primary float-right mr-6 mt-2">
                            {!isAddMode ? <i className="fa fa-plus">ADD</i> : <i className="fa fa-minus"></i>}
                        </button>
                    </div>

                    {
                        isAddMode &&
                        <EmployeeReferenceAdd props={props} />
                    }

                    {isEditMode && (
                        <EmployeeReferenceEdit props={education} />
                    )}

                    <div className="table-responsive mt-3 table-list">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Company Name</th>
                                    <th>Country</th>
                                    <th>Email</th>
                                    <th>Person Name</th>
                                    <th>Telephone</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {typeof employeeInfoDetails != 'undefined' && employeeInfoDetails.references.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.strCompanyName}</td>
                                        <td>{item.strCountry}</td>
                                        <td>{item.strEmail}</td>
                                        <td>{item.strPersonName}</td>
                                        <td>{item.strTelephone}</td>
                                        <td> <PreviewAttachment url={`${process.env.REACT_APP_API_PUBLIC_URL}assets/images/asllEmployeeReference/${item.image}`} /></td>
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
    )
});

export default EmployeeReferenceList;
