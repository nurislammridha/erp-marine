import React from "react";
import PermissionWiseDisplay from "../../../../modules/master/components/permissions/PermissionWiseDisplay";
import EmployeeList from "../../components/hrs/employee/EmployeeList";

const EmployeeListContainer = () => {
    return (
        <PermissionWiseDisplay permission_name={'employee.view'}>
            <EmployeeList />
        </PermissionWiseDisplay>
    );
};

export default EmployeeListContainer;
