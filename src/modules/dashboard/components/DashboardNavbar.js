import React from 'react';
import  { Form, Navbar,Nav,FormControl, Button } from "react-bootstrap";
const DashboardNavbar = () => {
    return ( 
       <>
       <div className="header-fixed subheader-fixed subheader aside-enabled subheader-fixed subheader  mb-5">
     <div class="container-fluid ">
       <div className="row">
    

      
  

    <div class="d-flex align-items-center flex-wrap mr-1 dashboard-navbar-left">
    <div class="d-flex align-items-baseline mr-5"><h5 class="text-muted font-weight-bold my-2 mr-5 ml-5">Welcome to iMarine, <span className="text-dark font-weight-bold">Mr.Kabir</span></h5></div>
    {/* <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2  dashboard-nav">
        <li class="breadcrumb-item">
            <a href="/metronic/react/demo1/dashboard"><i class="flaticon2-shelter text-muted icon-1x"></i></a>
        </li>
        <li class="breadcrumb-item"><a class="text-muted" href="/metronic/react/demo1/dashboard">Dashboard</a></li>
    </ul> */}
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