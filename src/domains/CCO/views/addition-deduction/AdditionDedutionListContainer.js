import React from "react";
import AdditionDeductionList from "../../components/addition-deduction/AdditionDeductionList";
import PermissionWiseDisplay from "../../../../modules/master/components/permissions/PermissionWiseDisplay";

const AdditionDedutionListContainer = () => {
    return (
        <PermissionWiseDisplay permission_name={'crew_expense'}>
            <AdditionDeductionList />
        </PermissionWiseDisplay>
    );
};

export default AdditionDedutionListContainer;
