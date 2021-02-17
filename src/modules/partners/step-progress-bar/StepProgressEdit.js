import React from 'react';
import StepProgressBar from 'react-step-progress';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddressEdit from '../address/components/AddressEdit';
import BankInfoEdit from '../bank-information/components/BankInfoEdit';
import BasicInfoEdit from '../basic-information/components/BasicInfoEdit';
import OthersInfoEdit from '../others-information/components/OthersInfoEdit';
import { UpdatePartnerInfo, partnerInfoSubmitAction, emptyStatus } from '../basic-information/_redux/actions/BasicInfoAction';
import { bankInfoSubmitAction } from '../bank-information/_redux/actions/BankInfoAction';
import { partnerAddressSubmit } from '../address/_redux/actions/AddressAction';

const StepProgressEdit = () => {
    const history = useHistory();
    const editStatus = useSelector((state) => state.partnerInfo.editStatus);
    const { id } = useParams();
    const dispatch = useDispatch();

    // setup step validators, will be called before proceeding to the next step
    const step1Validator = () => {
        return partnerInfoSubmitAction();
        // return true;
    }

    const step2Validator = () => {

        return partnerAddressSubmit();
        // return true;
    }

    function step3Validator() {

        return bankInfoSubmitAction();
        // return true;
    }

    function onFormSubmit() {

        dispatch(UpdatePartnerInfo(id));
    }
    if (editStatus) {
        history.push('/suppliers/list')
        dispatch(emptyStatus());
    }

    return (
        <div>
            <StepProgressBar
                startingStep={0}
                onSubmit={onFormSubmit}
                steps={[
                    {
                        label: 'Basic Information',
                        name: 'Basic Information',
                        content: <BasicInfoEdit />,
                        validator: step1Validator
                    },
                    {
                        label: 'Address',
                        name: 'Address',
                        content: <AddressEdit />,
                        validator: step2Validator
                    },
                    {
                        label: 'Bank Information',
                        name: 'Bank Information',
                        content: <BankInfoEdit />,
                        validator: step3Validator
                    },
                    {
                        label: 'Others Information',
                        name: 'Others Information',
                        content: <OthersInfoEdit />,
                        // validator: step3Validator
                    }
                ]}
            />
        </div>
    );
}

export default StepProgressEdit;
