import React, { useEffect, useState } from 'react';

const DashboardNavbar = () => {

    const [user, setUser] = useState(null)
    useEffect(() => {
        const userData = localStorage.getItem("userData");
        const user = JSON.parse(userData);
        setUser(user);
    }, []);

    return (
        <>
            <div className="header-fixed subheader-fixed subheader aside-enabled subheader-fixed subheader  mb-5">
                <div class="container-fluid ">
                    <div className="row">
                        <div class="d-flex align-items-center flex-wrap mr-1 dashboard-navbar-left">
                            <div class="d-flex align-items-baseline mr-5"><h5 class="text-muted font-weight-bold my-2 mr-5 ml-5">Welcome to iMarine, <span className="text-dark font-weight-bold"> {' '} {user !== null ? user.first_name : ''}</span></h5></div>

                        </div>
                        <div class="d-flex  float-right dashboard-navbar-right">
                            <a href="#" class="btn btn-light btn-sm font-weight-bold" id="kt_dashboard_daterangepicker" data-toggle="tooltip" title="Select dashboard daterange" data-placement="left">
                                <span class="text-primary font-weight-bold " id="kt_dashboard_daterangepicker_title">Today</span>
                            </a>
                            <a href="#" class="btn  btn-sm font-weight-bold ml-5" id="kt_dashboard_daterangepicker" data-toggle="tooltip" title="Select dashboard daterange" data-placement="left">
                                <span class="text-muted font-weight-bold " id="kt_dashboard_daterangepicker_title">This Week</span>
                            </a>
                            <a href="#" class="btn  btn-sm font-weight-bold  ml-5" id="kt_dashboard_daterangepicker" data-toggle="tooltip" title="Select dashboard daterange" data-placement="left">
                                <span class="text-muted font-weight-bold" id="kt_dashboard_daterangepicker_title">This Month</span>
                            </a>
                            <a href="#" class="btn  btn-sm font-weight-bold  ml-5" id="kt_dashboard_daterangepicker" data-toggle="tooltip" title="Select dashboard daterange" data-placement="left">
                                <span class="text-muted font-weight-bold" id="kt_dashboard_daterangepicker_title">This Financial Year</span>
                            </a>

                        </div>
                        <div className="clear-fix"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardNavbar;