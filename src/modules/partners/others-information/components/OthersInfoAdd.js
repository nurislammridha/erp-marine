import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import { getPortName, handleChangePartnerOtherInfoInput, getProviderName } from '../_redux/actions/OthersInfoAction';

const OthersInfoAdd = withRouter(({ history }) => {

    const selectOptions = [
        {
            label: ' Port of Chittagong',
            value: "1",
            intActionBy: "3",
            intProductOrServiceID: "4"
        },
        {
            label: ' Port of Payra',
            value: "2",
            intActionBy: "34",
            intProductOrServiceID: "4"
        },
        {
            label: ' Port of Mongla',
            value: "3",
            intActionBy: "5",
            intProductOrServiceID: "4"
        },
        {
            label: ' Port of Matarbari',
            value: "4",
            intActionBy: "3",
            intProductOrServiceID: "4"

        }
    ]
    const ref = React.createRef();
    const { register, handleSubmit, errors, setValue } = useForm();
    const dispatch = useDispatch();
    const partnerOtherInfoInput = useSelector((state) => state.partnerOthersInfo.partnerOtherInfoInput);
    const PortOptionData = useSelector(
        (state) => state.partnerOthersInfo.portOptionData
    );
    const providerOptionData = useSelector(
        (state) => state.partnerOthersInfo.providerOptionData
    );
    console.log('partnerOtherInfoInput', partnerOtherInfoInput);

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangePartnerOtherInfoInput(name, value));
    };

    useEffect(() => {
        dispatch(getPortName());
        dispatch(getProviderName());
    }, []);




    return (
        <div className="container">
            <div className="mt-10">

                <form
                    className="form form-label-right"
                    method="post"
                >
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-label mt-2 formFont">Port Served</label>
                                {/* <Multiselect
                                    options={selectOptions}
                                    displayValue="label"
                                    showCheckbox={true}
                                    onSelect={(selectedList, selectedItem) => {
                                        handleChangeTextInput(
                                            "strPortName",
                                            selectedItem.label
                                        );
                                        handleChangeTextInput("intPortID", selectedItem.value);
                                        console.log('selectedList', selectedList)
                                    }}
                                    onRemove={(selectedList, selectedItem) => {

                                    }}


                                /> */}
                                <Multiselect
                                    options={PortOptionData}
                                    displayValue="strPortName"
                                    showCheckbox={true}
                                    onSelect={(selectedList, selectedItem) => {
                                        handleChangeTextInput(
                                            "multiplePort",
                                            selectedList
                                        );

                                    }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label mt-2 formFont">Product or Service Supplied</label>
                                <Multiselect
                                    options={providerOptionData}
                                    displayValue="strProductOrServiceName"
                                    showCheckbox={true}
                                    onSelect={(selectedList, selectedItem) => {
                                        handleChangeTextInput(
                                            "multipleProduct",
                                            selectedList
                                        );

                                    }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label mt-2 formFont">Service List</label>
                                <Multiselect
                                    options={selectOptions}
                                    displayValue="label"
                                    showCheckbox={true}
                                    onSelect={(selectedList, selectedItem) => {
                                        handleChangeTextInput(
                                            "multipleServiceList",
                                            selectedList
                                        );

                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div >
    );
});

export default OthersInfoAdd;
