import React from 'react';
import StepProgressBar from 'react-step-progress';
import AddressEdit from '../address/components/AddressEdit';
import BankInfoEdit from '../bank-information/components/BankInfoEdit';
import BasicInfoEdit from '../basic-information/components/BasicInfoEdit';
import OthersInfoEdit from '../others-information/components/OthersInfoEdit';

const StepProgressEdit = () => {
    // const history = useHistory();
    // const partnerInfoInput = useSelector((state) => state.partnerInfo.partnerInfoInput);
    // const partnerStatus = useSelector((state) => state.partnerInfo.status);
    // const bankInfoInput = useSelector((state) => state.bankInfo.bankInfoInput);
    // const dispatch = useDispatch();
    // const addStatus = useSelector((state) => state.partnerInfo.addStatus);
    // console.log('addStatus', addStatus);



    // setup step validators, will be called before proceeding to the next step
    const step1Validator = () => {
        // return partnerInfoSubmitAction();
        return true;
    }

    const step2Validator = () => {

        // return partnerAddressSubmit();
        return true;
    }

    function step3Validator() {

        // return bankInfoSubmitAction();
        return true;
    }

    function onFormSubmit() {
        // handle the submit logic here
        // This function will be executed at the last step
        // when the submit button (next button in the previous steps) is pressed
        // dispatch(partnerCreateSubmitAction());
    }
    // if (addStatus) {
    //     history.push('/suppliers/list')
    //     dispatch(emptyStatus());
    // }



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
