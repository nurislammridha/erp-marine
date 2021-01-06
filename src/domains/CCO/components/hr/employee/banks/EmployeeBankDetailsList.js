import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EmployeeTab from '../EmployeeTab';
import { GetEmployeeDetails } from '../../../../_redux/actions/EmployeeAction';
import EmployeeBanKDetailsAdd from './EmployeeBankDetailsAdd';
import EmployeeBanKDetailsEdit from './EmployeeBankDeatilsEdit';
import PreviewAttachment from "../../../../../../modules/master/components/previews/PreviewAttachment";

const EmployeeBankDetailsList = withRouter(({ props }) => {
    const dispatch = useDispatch();
    const [isAddMode, setIsAddMode] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [records, setRecords] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const employeeEducationDetails = useSelector((state) => state.employeeInfo.employeeInfoDetails);
    useEffect(() => {
        dispatch(GetEmployeeDetails(props.match.params.intEmployeeId));
    }, []);
    const selectRecordItem = (item) => {
        setIsAddMode(false);
        setSelectedId(item.intID);
        setRecords(item);
        setIsEditMode(!isEditMode);
    }
    console.log('employeeEducationDetails', employeeEducationDetails)

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
                        <EmployeeBanKDetailsAdd props={props} />
                    }
                    {isEditMode && (
                        <EmployeeBanKDetailsEdit props={records} />
                    )}
                    <div className="table-responsive table-list">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Account Holder Name</th>
                                    <th>Account Number</th>
                                    <th>Bank Address</th>
                                    <th>Bank Name</th>
                                    <th>Rounting Number</th>
                                    <th>Swift Code</th>
                                    <th>Paid Currency</th>
                                    <th>Default Account</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {typeof employeeEducationDetails != 'undefined' && employeeEducationDetails.bankdetails.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.strAccountHolderName}</td>
                                        <td>{item.strAccountNumber}</td>
                                        <td>{item.strBankAddress}</td>
                                        <td>{item.strBankName}</td>
                                        <td>{item.strRoutingNumber}</td>
                                        <td>{item.strSwiftCode}</td>
                                        <td>{item.strPaidCurrencyName}</td>
                                        <td>{item.ysnDefaultAccount == '1' ? 'Yes' : 'No'}</td>
                                        <td> <PreviewAttachment url={`${process.env.REACT_APP_API_PUBLIC_URL}assets/images/asllEmployeeBankDetails/${item.image}`} /></td>
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

export default EmployeeBankDetailsList;
