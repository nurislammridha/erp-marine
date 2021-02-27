import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import { getPortName, handleChangePartnerOtherInfoInput, getProviderName } from '../_redux/actions/OthersInfoAction';

const OthersInfoEdit = withRouter(({ history }) => {



    const dispatch = useDispatch();
    const partnerOtherInfoInput = useSelector((state) => state.partnerOthersInfo.partnerOtherInfoInput);
    const PortOptionData = useSelector(
        (state) => state.partnerOthersInfo.portOptionData
    );
    const providerOptionData = useSelector(
        (state) => state.partnerOthersInfo.providerOptionData
    );


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
                                    selectedValues={partnerOtherInfoInput.multiplePort}
                                    onSelect={(selectedList, selectedItem) => {
                                        handleChangeTextInput(
                                            "multiplePort",
                                            selectedList
                                        );
                                    }}
                                    onRemove={(selectedList, removedItem) => {
                                        handleChangeTextInput(
                                            "multiplePort",
                                            selectedList
                                        );
                                        handleChangeTextInput(
                                            "deleted_item",
                                            removedItem
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
                                    selectedValues={partnerOtherInfoInput.multipleProduct}
                                    onSelect={(selectedList, selectedItem) => {
                                        handleChangeTextInput(
                                            "multipleProduct",
                                            selectedList
                                        );
                                    }}
                                    onRemove={(selectedList, removedItem) => {
                                        handleChangeTextInput(
                                            "multipleProduct",
                                            selectedList
                                        );

                                        handleChangeTextInput(
                                            "deleted_item_pro",
                                            removedItem
                                        );
                                    }}
                                />
                            </div>
                            {/* <div className="col-md-4">
                                <label className="form-label mt-2 formFont">Service List</label>
                                <Multiselect
                                    options={providerOptionData}
                                    displayValue="label"
                                    showCheckbox={true}
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

export default OthersInfoEdit;
