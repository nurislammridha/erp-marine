import React from "react";
import EmployeeAdd from "../../../../modules/employees/components/hr/employee/personal/EmployeeAdd";
import PermissionWiseDisplay from "../../../../modules/master/components/permissions/PermissionWiseDisplay";

const EmployeeAddContainer = () => {
    return (
        <PermissionWiseDisplay permission_name={'employee.create'} display={true}>
            <EmployeeAdd />
        </PermissionWiseDisplay>
    );
};

export default EmployeeAddContainer;
