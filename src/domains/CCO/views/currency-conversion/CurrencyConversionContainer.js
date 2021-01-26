import React from "react";
import PermissionWiseDisplay from "../../../../modules/master/components/permissions/PermissionWiseDisplay";
import CurrencyConversionEntry from "../../components/currency-conversion/CurrencyConversionEntry";

const CurrencyConversionContainer = () => {
    return (
        <PermissionWiseDisplay permission_name={'currency_conversion'}>
            <CurrencyConversionEntry />
         </PermissionWiseDisplay>
    );
};

export default CurrencyConversionContainer;
