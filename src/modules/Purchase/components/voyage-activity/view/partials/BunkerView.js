import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetVoyageActivityDetail } from "../../../../_redux/actions/VoyageActivityAction";

const BunkerVLSFO = (props) => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const { id } = props;

    const voyageActivityDetail = useSelector(
        (state) => state.voyageActivityInfo.voyageActivityDetail
    );
    // console.log("voyageActivityDetail :>> ", voyageActivityDetail);

    useEffect(() => {
        dispatch(GetVoyageActivityDetail(id));
    }, []);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className="container">

            <div className="tab-content ml-2">

                {voyageActivityDetail !== null && voyageActivityDetail.bunker !== null && (
                    <>
                        <div>
                            <p className="text-uppercase text-bold mt-3">Time at sea</p>
                        </div>
                        <div className="border-top mt-3"></div>
                        <div className="form-group row mt-3">
                            <div className="col-lg-4">
                                <p>CON</p>
                                <h6>{voyageActivityDetail.bunker.decBunkerVlsfoCon}</h6>
                            </div>
                            <div className="col-lg-4">
                                <p>RCVD/ADJ</p>
                                <h6>{voyageActivityDetail.bunker.decBunkerVlsfoAdj}</h6>
                            </div>
                            <div className="col-lg-4">
                                <p>ROB</p>
                                <h6>{voyageActivityDetail.bunker.decBunkerVlsfoRob}</h6>
                            </div>
                        </div>
                        <div>
                            <p className="text-uppercase text-bold mt-5">BUNKER LSMGO</p>
                        </div>
                        <div className="border-top"></div>
                        <div className="form-group row mt-3">
                            <div className="col-lg-4">
                                <p>CON</p>
                                <h6>{voyageActivityDetail.bunker.decBunkerLsmgoCon}</h6>
                            </div>
                            <div className="col-lg-4">
                                <p>RCVD/ADJ</p>
                                <h6>{voyageActivityDetail.bunker.decBunkerLsmgoAdj}</h6>
                            </div>
                            <div className="col-lg-4">
                                <p>ROB</p>
                                <h6>{voyageActivityDetail.bunker.decBunkerLsmgoRob}</h6>
                            </div>
                        </div>
                        <div>
                            <p className="text-uppercase text-bold mt-5">LUB OIL MECC</p>
                        </div>
                        <div className="border-top"></div>
                        <div className="form-group row mt-3">
                            <div className="col-lg-4">
                                <p>CON</p>
                                <h6>{voyageActivityDetail.bunker.decLubMeccCon}</h6>
                            </div>
                            <div className="col-lg-4">
                                <p>RCVD/ADJ</p>
                                <h6>{voyageActivityDetail.bunker.decLubMeccAdj}</h6>
                            </div>
                            <div className="col-lg-4">
                                <p>ROB</p>
                                <h6>{voyageActivityDetail.bunker.decLubMeccRob}</h6>
                            </div>
                        </div>
                        <div>
                            <p className="text-uppercase text-bold mt-5">LUB OIL AECC</p>
                        </div>
                        <div className="border-top"></div>
                        <div className="form-group row mt-3">
                            <div className="col-lg-4">
                                <p>CON</p>
                                <h6>{voyageActivityDetail.bunker.decLubAeccCon}</h6>
                            </div>
                            <div className="col-lg-4">
                                <p>RCVD/ADJ</p>
                                <h6>{voyageActivityDetail.bunker.decLubAeccAdj}</h6>
                            </div>
                            <div className="col-lg-4">
                                <p>ROB</p>
                                <h6>{voyageActivityDetail.bunker.decLubAeccRob}</h6>
                            </div>
                        </div>
                    </>
                )}
                {voyageActivityDetail !== null && voyageActivityDetail.bunker === null && (
                    <div className="p-3">
                        N/A
                    </div>
                )}
            </div>
        </div>
    );
};

export default BunkerVLSFO;
