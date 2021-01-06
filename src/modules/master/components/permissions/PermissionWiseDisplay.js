import React from 'react'
import { checkModulePermission } from '../../../../app/modules/Auth/_redux/menu-permission/ModulePermission';
import ErrorViewComponent from '../Error/ErrorViewComponent';

const PermissionWiseDisplay = (props) => {
    const { permission_name, children, display } = props;
    const permissionErrorDisplay = typeof display === 'undefined' || display === null ? true : display;

    return (
        <>
            {
                checkModulePermission(permission_name) ?
                    children : <ErrorViewComponent
                        code={401}
                        display={permissionErrorDisplay}
                    />
            }
        </>
    );
}

export default PermissionWiseDisplay;