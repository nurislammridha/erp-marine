import React from 'react';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import AddressAdd from '../address/components/AddressAdd';
import BankInfoAdd from '../bank-information/components/BankInfoAdd';
import BasicInfoAdd from '../basic-information/components/BasicInfoAdd';
import { partnerCreateSubmitAction, partnerInfoSubmitAction } from '../basic-information/_redux/actions/BasicInfoAction';
import OthersInfoAdd from '../others-information/components/OthersInfoAdd';
import { useSelector, useDispatch } from "react-redux";
import { bankInfoSubmitAction } from '../bank-information/_redux/actions/BankInfoAction';
import { partnerAddressSubmit } from '../address/_redux/actions/AddressAction';

const StepProgress = () => {

    const partnerInfoInput = useSelector((state) => state.partnerInfo.partnerInfoInput);
    const bankInfoInput = useSelector((state) => state.bankInfo.bankInfoInput);
    const dispatch = useDispatch();
    // const partinfo = () => {
    //     console.log('partinfo', partnerInfoInput)
    //     dispatch(partnerInfoSubmitAction(partnerInfoInput));
    // }

    console.log('partnerinfo', partnerInfoInput)
    // setup step validators, will be called before proceeding to the next step
    const step1Validator = () => {
        return partnerInfoSubmitAction();
    }
    const step2Validator = () => {
        // return a boolean
        // return partnerAddressSubmit();
        return true;
    }

    function step3Validator() {
        // return a boolean
        return bankInfoSubmitAction();
    }

    function onFormSubmit() {
        // handle the submit logic here
        // This function will be executed at the last step
        // when the submit button (next button in the previous steps) is pressed
        dispatch(partnerCreateSubmitAction());
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
                        content: <BasicInfoAdd />,
                        validator: step1Validator
                    },
                    {
                        label: 'Address',
                        name: 'Address',
                        content: <AddressAdd />,
                        validator: step2Validator
                    },
                    {
                        label: 'Bank Information',
                        name: 'Bank Information',
                        content: <BankInfoAdd />,
                        validator: step3Validator
                    },
                    {
                        label: 'Others Information',
                        name: 'Others Information',
                        content: <OthersInfoAdd />,
                        validator: step3Validator
                    }
                ]}
            />
        </div>
    );
}

export default StepProgress;
