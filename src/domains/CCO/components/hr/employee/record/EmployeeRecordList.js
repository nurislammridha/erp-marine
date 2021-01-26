import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EmployeeTab from '../EmployeeTab';
import { Form, Image } from "react-bootstrap";
import { toast } from 'react-toastify';
import { GetEmployeeDetails } from '../../../../_redux/actions/EmployeeAction';
import EmployeeRecordAdd from './EmployeeRecordAdd';
import EmployeeRecordEdit from './EmployeeRecordEdit';


const EmployeeRecordList = withRouter(({ history, props }) => {
    const dispatch = useDispatch();
    const [isAddMode, setIsAddMode] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editActiveEducation, setEditActiveEducation] = useState(undefined);
    const [records, setRecords] = useState({});

    toast.configure();
    const employeeEducationDetails = useSelector((state) => state.employeeInfo.employeeInfoDetails);
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
                        <EmployeeRecordAdd props={props} />
                    }

                    {isEditMode && (
                        <EmployeeRecordEdit props={records} />
                    )}

                    <div className="table-responsive mt-3 table-list">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Rank</th>
                                    <th>Ship Manger</th>
                                    <th>Vessel Name</th>
                                    <th>Flag</th>
                                    <th>Vessel Type</th>
                                    <th>DWT</th>
                                    <th>Engine Name</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Duration</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {typeof employeeEducationDetails != 'undefined' && employeeEducationDetails.records.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.strRank}</td>
                                        <td>{item.strShipManager}</td>
                                        <td>{item.strVesselName}</td>
                                        <td>{item.strFlag}</td>
                                        <td>{item.strVesselType}</td>
                                        <td>{item.strDWT}</td>
                                        <td>{item.strEngineName}</td>
                                        <td>{item.strFromDate}</td>
                                        <td>{item.strToDate}</td>
                                        <td>{item.strDuration}</td>
                                        <td>
                                            <button onClick={() => {
                                                setIsAddMode(false);
                                                setRecords(item);
                                                setIsEditMode(!isEditMode);

                                            }} className="btn btn-primary">
                                                {!isEditMode ? 'Edit' : 'Editing...'}
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

export default EmployeeRecordList;
