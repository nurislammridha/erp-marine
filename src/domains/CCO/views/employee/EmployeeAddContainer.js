import React from "react";
import PermissionWiseDisplay from "../../../../modules/master/components/permissions/PermissionWiseDisplay";
import EmployeeAdd from "../../components/hr/employee/personal/EmployeeAdd";


const EmployeeAddContainer = () => {
    return (
        <PermissionWiseDisplay permission_name={'crew_create'} display={true}>
            <EmployeeAdd />
        </PermissionWiseDisplay>
    );
};

export default EmployeeAddContainer;
