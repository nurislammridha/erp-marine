import React from "react";
import EmployeeEdit from "../../components/hr/employee/personal/EmployeeEdit";
import EmployeeTab from "../../components/hr/employee/EmployeeTab";


const EmployeeEditContainer = (props) => {
    return (
        <>
            <EmployeeEdit props={props} />
        </>
    );
};

export default EmployeeEditContainer;
