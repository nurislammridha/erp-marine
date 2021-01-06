import React from "react";
import PermissionWiseDisplay from "../../../../modules/master/components/permissions/PermissionWiseDisplay";
import EmployeeList from "../../components/hr/employee/EmployeeList";

const EmployeeListContainer = () => {
    return (
        <PermissionWiseDisplay permission_name={'crew_list'}>
            <EmployeeList />
        </PermissionWiseDisplay>
    );
};

export default EmployeeListContainer;
