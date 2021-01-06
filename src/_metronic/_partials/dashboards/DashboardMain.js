import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeId, getVesselId } from "../../../app/modules/Auth/_redux/authCrud";
import { checkModulePermission } from "../../../app/modules/Auth/_redux/menu-permission/ModulePermission";
import { GetEmployeeList } from "../../../domains/CCO/_redux/actions/EmployeeAction";
import { GetVesselList } from "../../../domains/Vessel/_redux/actions/VesselAction";
import PermissionWiseDisplay from "../../../modules/master/components/permissions/PermissionWiseDisplay";
import { toAbsoluteUrl } from "../../_helpers";

export function DashboardMain() {
    const dispatch = useDispatch();
    const [intEmployeeId, setIntEmployeeId] = useState(null);
    const [intVesselId, setIntVesselId] = useState(null);
    let employeeInfoList = useSelector((state) => state.employeeInfo.employeeInfoList);
    let vesselList = useSelector((state) => state.vesselInfo.vesselList);

    useEffect(() => {
        dispatch(GetEmployeeList());
        dispatch(GetVesselList());
    }, [dispatch]);

    useEffect(() => {
        setIntEmployeeId(getEmployeeId())
    }, [setIntEmployeeId]);

    useEffect(() => {
        setIntVesselId(getVesselId());
    }, []);

    return (
        <div className="container mt-4">
            <div className="row mt-5">

                <PermissionWiseDisplay permission_name={'all_vessel'} display={false}>
                    <div className="col-lg-3 col-xxl-4">
                        <div className="dashboard-card">
                            <a onClick={() => {
                                window.location.href = "vessels/list";
                            }}>
                                <div className="px-6 py-8 rounded-xl mb-7 shipping-card">
                                    <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                                        <img src={toAbsoluteUrl(
                                            "/media/dashboard/ship.png"
                                        )} />
                                    </span>
                                    <h2>{vesselList != 'undefined' && vesselList != null ? vesselList.length : 0}  </h2>
                                    <p>Total Vessel </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </PermissionWiseDisplay>

                <PermissionWiseDisplay permission_name={'crew_list'} display={false}>
                    <div className="col-lg-3 col-xxl-4">
                        <div className="dashboard-card" >
                            <a onClick={() => {
                                window.location.href = "/employee/employee-list";
                            }}>
                                <div className="px-6 py-8 rounded-xl mb-7 shipping-card second-color">
                                    <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                                        <img src={toAbsoluteUrl(
                                            "/media/dashboard/user.png"
                                        )} />
                                    </span>
                                    <h2> {employeeInfoList != 'undefined' && employeeInfoList != null ? employeeInfoList.length : 0} </h2>
                                    <p>Total Employee </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </PermissionWiseDisplay>

                {
                   typeof intVesselId !== undefined && intVesselId !== null && intVesselId !== "" &&
                    <PermissionWiseDisplay permission_name={'profile_update'} display={false}>
                        <div className="col-lg-3 col-xxl-4">
                            <div className="dashboard-card" >
                                <a onClick={() => {
                                    window.location.href = `employee/employee-edit/${intEmployeeId}`;
                                }}>
                                    <div className="px-6 py-8 rounded-xl mb-7 shipping-card second-color">
                                        <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                                            <i className="fa fa-edit fa-2x text-white"></i>
                                        </span>
                                        <h2>{' Profile '}</h2>
                                        <p>Edit Profile </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </PermissionWiseDisplay>
                }


                {/* <div className="col-lg-3 col-xxl-4">
                    <div className="dashboard-card">
                        <div className="px-6 py-8 rounded-xl mb-7 shipping-card">
                            <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                                <img src={toAbsoluteUrl(
                                    "/media/dashboard/Equalizer.png"
                                )} />
                            </span>
                            <h2>  $52,000</h2>
                            <p> Monthly Salary Paid  <span className="spacer"> July 2020</span>  </p>
                        </div>
                    </div>
                </div>


                <div className="col-lg-3 col-xxl-4">
                    <div className="dashboard-card">
                        <div className="px-6 py-8 rounded-xl mb-7 shipping-card second-color">
                            <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                                <img src={toAbsoluteUrl(
                                    "/media/dashboard/Group-chat.png"
                                )} />
                            </span>
                            <h2>23,508</h2>
                            <p>Parameter 2</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

