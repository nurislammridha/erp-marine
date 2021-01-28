import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import { getPortName, handleChangePartnerOtherInfoInput, getProviderName } from '../_redux/actions/OthersInfoAction';

const OthersInfoAdd = withRouter(({ history }) => {

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
                                    onRemove={(selectedList, selectedItem) => {
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
                                    onRemove={(selectedList, selectedItem) => {
                                        handleChangeTextInput(
                                            "multipleProduct",
                                            selectedList
                                        );
                                    }}
                                />
                            </div>
                            {/* <div className="col-md-4">
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
                                    onSelect={(selectedList, selectedItem) => {
                                        handleChangeTextInput(
                                            "multipleServiceList",
                                            selectedList
                                        );

                                    }}
                                />
                            </div> */}
                        </div>
                    </div>
                </form>

            </div>
        </div >
    );
});

export default OthersInfoAdd;
