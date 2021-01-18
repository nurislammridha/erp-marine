import React from 'react';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import AddressAdd from '../address/components/AddressAdd';
import BankInfoAdd from '../bank-information/components/BankInfoAdd';
import BasicInfoAdd from '../basic-information/components/BasicInfoAdd';
import OthersInfoAdd from '../others-information/components/OthersInfoAdd';

const StepProgress = () => {

    const step1Content = <h1>Basic Information</h1>;
    const step2Content = <h1>Step 2 Content</h1>;
    const step3Content = <h1>Step 3 Content</h1>;
    const step4Content = <h1>Step 3 Content</h1>;


    // setup step validators, will be called before proceeding to the next step
    function step1Validator() {

        return true;
    }
    function step2Validator() {
        // return a boolean
        return true;
    }

    function step3Validator() {
        // return a boolean
        return true;
    }

    // function onFormSubmit() {
    //     // handle the submit logic here
    //     // This function will be executed at the last step
    //     // when the submit button (next button in the previous steps) is pressed
    // }

    return (
        <div>
            <StepProgressBar
                startingStep={0}
                // onSubmit={onFormSubmit}
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
