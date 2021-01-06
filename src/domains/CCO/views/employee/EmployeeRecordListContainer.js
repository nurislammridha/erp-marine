import React from "react";
import EmployeeRecordList from "../../components/hr/employee/record/EmployeeRecordList";


const EmployeeRecordListContainer = (props) => {
    return (
        <>
            <EmployeeRecordList props={props} />
        </>
    );
};

export default EmployeeRecordListContainer;
