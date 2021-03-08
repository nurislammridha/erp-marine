import React from "react";
// import EmployeeTab from "../../components/hr/employee/EmployeeTab";
import EmployeeEdit from "../../components/hrs/employee/personal/EmployeeEdit";


const EmployeeEditContainer = (props) => {
    return (
        <>
            <EmployeeEdit props={props} />
        </>
    );
};

export default EmployeeEditContainer;
