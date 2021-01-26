import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { Table } from 'react-bootstrap';
import { GetEmployeeDetails } from "../../../_redux/actions/EmployeeAction";
import "./css/custom.css";
import logo from "../../../images/logo-dark.png";
import cv from "../../../images/avatar.jpg";
import { isTemplateElement } from "@babel/types";

const EmployeeDetails = withRouter(({ history, props }) => {
    const dispatch = useDispatch();
    const componentRef = useRef();

    useEffect(() => {
        dispatch(GetEmployeeDetails(props.match.params.intEmployeeId));
    }, [dispatch]);

    const employeeInfoDetails = useSelector((state) => state.employeeInfo.employeeInfoDetails);
    console.log('employeeInfoDetails', employeeInfoDetails);

    return (
        <>
            <div className="container no-print">
                <div className="card card-custom gutter-b">
                    <div className="card-header">
                        <div className="card-title">
                            <h3 class="card-label">Employee Details</h3>
                        </div>
                    </div>
                </div>
            </div>

            {
                typeof employeeInfoDetails != 'undefined' &&
                <div className="container ">
                    <div className="card card-custom gutter-b pt-4">
                        <div className="no-print">
                            <button className="btn btn-primary float-right mr-4 mb-4" onClick={window.print}><i className="fa fa-print"></i></button>
                        </div>
                        
                        <div className="card-header border">

                            <div className="border-around">
                                <div className="title">
                                    <h3 className="card-label a-lebel text-center pt-5">AKIJ SHIPPING LINE LTD.</h3>
                                </div>
                                <div className="title-img">

                                    <div className="myLogo pt-2">
                                        <Image src={logo} roundedCircle className="akij-logo" />
                                    </div>

                                </div>
                                <div className="cv-img-div">
                                    <div className="myLogo pt-2">

                                        {/* <Image src={cv} size={50} className="akij-logo" /> */}
                                        <Image src={`http://iapps.akij.net/asll/public/assets/images/asllEmployee/` + employeeInfoDetails.image} className="cv-img" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-header">
                            <div className="card-title text-center">
                                <h3 className="card-label text-center">CARICULLAM VITEA</h3>
                            </div>
                        </div>

                        <Table striped bordered hover>

                            <table className="table table-bordered">
                                <thead className="light-grey">
                                    <th className="text-center" colSpan="2">PERSONAL PARTICULARS</th>
                                    <th className="text-center" colSpan="2">For Official Use</th>
                                </thead>



                                <tr >
                                    <td class="font-weight-bold"> NAME (as In Passport)</td>
                                    <td>{employeeInfoDetails.strName}</td>
                                    <td>Rank</td>
                                    <td>{employeeInfoDetails.strRank}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Rank Applied</td>
                                    <td>{employeeInfoDetails.strRank}</td>
                                    <td>Ship</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Date Of Availability</td>
                                    <td> <span className="available"> AVAILABLE </span></td>
                                    <td>Salary</td>
                                    <td>{employeeInfoDetails.strAmount}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Tel (Home)/ (Mobile)</td>
                                    <td>{employeeInfoDetails.strHomeTelephone}</td>
                                    <td></td>
                                    <td></td>

                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Email (Personal)</td>
                                    <td>{employeeInfoDetails.strEmail}</td>
                                    <td colSpan="2"></td>


                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Height / Weight</td>
                                    <td>{employeeInfoDetails.strHeight}/{employeeInfoDetails.strWeight}Kg</td>

                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Remark</td>
                                    <td>A CUT MARK ON LEFT KNEE</td>

                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Nationality</td>
                                    <td>{employeeInfoDetails.strNationality}</td>

                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Date & Place of Birth</td>
                                    <td colSpan="3">{employeeInfoDetails.strBirthdate} & MYMENSINGH</td>

                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Present Address</td>
                                    <td colSpan="2" class="font-weight-bold">VILLAGE: BOULAM, POST:BADSHAGANJ <br /> UPZILLA:DHORMOPASHA,DIST: SUNAMGANJ</td>
                                    <td colSpan="2" rowSpan="2" className="text-center">AUTHORIZING SIGNATURE</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Permanent Address</td>
                                    <td colSpan="2" class="font-weight-bold">VILLAGE: BOULAM, POST:BADSHAGANJ <br /> UPZILLA:DHORMOPASHA,DIST: SUNAMGANJ</td>
                                </tr>
                            </table>


                        </Table>


                        <Table striped bordered hover>
                            <table className="table">

                                <tr>
                                    <th colSpan="1" className="light-grey font-weight-bold">EDUCATION</th>
                                </tr>
                                <tr>
                                    <th className="font-weight-bold">CERTIFICATION</th>
                                    <th className="font-weight-bold">INSTITUTION</th>
                                    <th className="font-weight-bold">YEAR</th>
                                    <th className="font-weight-bold">RESULT</th>
                                </tr>
                                {employeeInfoDetails.educations.length > 0 && employeeInfoDetails.educations.map((item, index) => (
                                    <tr>
                                        <td>{item.strCertification}</td>
                                        <td>{item.strInstitution}</td>

                                        <td>{item.strYear}</td>
                                        <td>{item.strResult}</td>

                                    </tr>
                                ))}
                            </table>
                        </Table>



                        <Table striped bordered hover>
                            <table className="table light-yellow">
                                <thead>

                                    <tr>
                                        <th colSpan="11">SEA SERVICE RECORD FROM IMMEDIATE LAST SHIP  </th>
                                    </tr>

                                    <tr>
                                        <th>
                                            Rank
                                        </th>
                                        <th>
                                            Ship <br /> Manager

                                        </th>
                                        <th rowspan="1" colspan="5" >
                                            VASSEL PARTICULARS
                                        </th>
                                        <th rowspan="1" colspan="1">
                                            From
                                        </th>
                                        <th rowspan="1" colspan="1">
                                            To
                                        </th>
                                        <th rowspan="1" colspan="1" >
                                            Duration
                                        </th>
                                        <th>
                                            Reason for Leaving
                                     </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Flag</th>
                                        <th>Type</th>
                                        <th>DWT</th>
                                        <th>ENGINE <br /> NAME/KW</th>
                                        <th>DD.MM.YY</th>
                                        <th>DD.MM.YY</th>
                                        <th>MM.DD</th>

                                    </tr>
                                </thead>
                                {employeeInfoDetails.records.length > 0 && employeeInfoDetails.records.map((item, index) => (

                                    <tr>
                                        <td>4TH <br /> OFFICER</td>
                                        <td>{item.strShipManager}</td>

                                        <td>{item.strVesselName}</td>
                                        <td>{item.strFlag}</td>
                                        <td>{item.strVesselType}</td>
                                        <td>{item.strDWT}</td>
                                        <td>{item.strEngineName}</td>
                                        <td>{item.strFromDate}</td>
                                        <td>{item.strToDate}</td>
                                        <td>{item.strDuration}</td>
                                        <td>{item.strReason}</td>

                                    </tr>
                                ))}
                            </table>
                        </Table>




                        <Table striped bordered hover>

                            <table className="table">

                                <thead className="light-grey">
                                    <tr>
                                        <th colSpan="7">Document Checklist</th>
                                    </tr>
                                    <tr>
                                        <th>PERSONAL DOCUMENTS</th>
                                        <th>Issued By</th>
                                        <th>Number</th>
                                        <th>Issue date</th>
                                        <th>Expiry Date</th>
                                        <th>Agent <br />  Check</th>
                                        <th>Employer <br />  Check</th>
                                    </tr>
                                </thead>

                                {employeeInfoDetails.documents.length > 0 && employeeInfoDetails.documents.map((item, index) => (
                                    <tr>
                                        <td>{item.strType}</td>
                                        <td>{item.strIssueBy}</td>
                                        <td>{item.strNumber}</td>
                                        <td>{item.strIssueDate}</td>
                                        <td>{item.strExpiryDate}</td>
                                        <td></td>
                                        <td></td>

                                    </tr>
                                ))}
                            </table>


                        </Table>

                        <Table striped bordered hover>
                            <table className="table">
                                <thead className="light-grey">
                                    <th>CERTIFICATES/COURSES</th>
                                    <th>Issued By</th>
                                    <th>Number</th>
                                    <th>Issue date</th>
                                    <th>Expiry Date</th>
                                    <th>Agent <br />  Check</th>
                                    <th>Employer <br />  Check</th>
                                </thead>
                                {employeeInfoDetails.certificates.length > 0 && employeeInfoDetails.certificates.map((item, index) => (
                                    <tr>
                                        <td>{item.strCourseName}</td>
                                        <td>{item.strIssueBy}</td>
                                        <td>{item.strNumber}</td>
                                        <td>{item.strIssueDate}</td>
                                        <td> {item.strExpiryDate}</td>
                                        <td></td>
                                        <td></td>

                                    </tr>
                                ))}

                            </table>

                        </Table>

                        <Table striped bordered hover>
                            <table className="table">
                                <thead className="light-grey">
                                    <th colSpan="1">GENERAL INFORMATION</th>
                                </thead>
                                <tr>
                                    <td>Cargo Carried:</td>
                                    <td>{employeeInfoDetails.strCargoCarried}</td>
                                </tr>
                                <tr>
                                    <td>Trading Area</td>
                                    <td>{employeeInfoDetails.strTradingArea}</td>
                                </tr>
                                <tr>
                                    <td>Nationality of Officers & Crew sailed  <br />

                                        with:</td>
                                    <td> Bangladeshi and Mixed Crew</td>
                                </tr>


                            </table>
                        </Table>


                        <Table striped bordered hover>
                            <table className="table">
                                <thead className="light-grey">
                                    <th colSpan="2">NEXT OF KIN (EMERGENCY SITUATIONS)</th>
                                </thead>
                                <tr>
                                    <td>Name (as in Passport)</td>
                                    <td>{employeeInfoDetails.strEmgrPersonName}</td>
                                </tr>
                                <tr>
                                    <td>Relation</td>
                                    <td>{employeeInfoDetails.strEmgrPersonRelation}</td>
                                </tr>
                                <tr>
                                    <td>Tel (Home)</td>
                                    <td>{employeeInfoDetails.strEmgrPersonalTel}</td>
                                </tr>
                                <tr>
                                    <td>Tel (Mobile)</td>
                                    <td>{employeeInfoDetails.strHomeTelephone}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{employeeInfoDetails.strEmail}</td>
                                </tr>
                                <tr>
                                    <td>Home Address</td>
                                    <td>{employeeInfoDetails.strEmgrPersonAddress}</td>
                                </tr>
                                <tr>
                                    <td>Nearest Airport</td>
                                    <td>{employeeInfoDetails.strNearestAirport}</td>
                                </tr>

                            </table>
                        </Table>

                        <Table striped bordered hover>

                            <table className="table">


                                <thead className="light-grey">
                                    <tr >
                                        <th colSpan="1">
                                            BANK ACCOUNT DETAILS (required for Home Allotments)
                              </th>
                                    </tr>
                                </thead>
                                <tr>
                                    <th>Account Name</th>
                                    <th>Account Number</th>
                                    <th>Bank Name</th>
                                    <th>Bank Address</th>
                                    <th>Swift Code</th>
                                </tr>
                                {employeeInfoDetails.bankdetails.length > 0 && employeeInfoDetails.bankdetails.map((item, index) => (
                                    <tr>
                                        <td>Account Number</td>
                                        <td>156.151.95203</td>
                                        <td>156.151.95203</td>
                                        <td>156.151.95203</td>
                                        <td>156.151.95203</td>

                                    </tr>
                                ))}
                            </table>
                        </Table>



                        <Table striped bordered hover>

                            <table className="table">


                                <thead className="light-grey">
                                    <tr >
                                        <th colSpan="1">
                                            SAFETY GEAR AND UNIFORM SIZE
                                        </th>
                                    </tr>
                                </thead>
                                <tr>
                                    <th>Boiler Suit</th>
                                    <th>Safety Shoes</th>
                                    <th>Uniform Shirt</th>
                                    <th>Uniform  <br /> Trouser</th>
                                    <th>Winter Jacket</th>
                                </tr>
                                <tr>
                                    <td>{employeeInfoDetails.strBoilersuit}</td>
                                    <td>{employeeInfoDetails.strSafetyShoes}</td>
                                    <td>{employeeInfoDetails.strUniformShirt}</td>
                                    <td>{employeeInfoDetails.strUniformTrouser}</td>
                                    <td>{employeeInfoDetails.strWinterJacket}</td>

                                </tr>
                            </table>
                        </Table>




                        <Table striped bordered hover>
                            <table className="table">

                                <thead className="light-grey">
                                    <tr >
                                        <th colSpan="1">
                                            IMMIGRATION INFORMATION
                              </th>
                                    </tr>
                                </thead>

                                <tr>
                                    <td>Have you ever been denied a foreign visa?</td>
                                    <td>NO</td>
                                </tr>
                                <tr>
                                    <td>If yes, state which country and reason (if known)</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Have you been the subject of a court of enquiry or involved in

                            a maritime accident?</td>
                                    <td>NO</td>
                                </tr>


                            </table>
                        </Table>


                        <Table striped bordered hover>

                            <table className="table">
                                <thead>
                                    <th>Company Name</th>
                                    <th>Person Name</th>
                                    <th>Telephone No</th>
                                    <th>Email No</th>
                                    <th>Address</th>
                                    <th>Country</th>

                                </thead>

                                {employeeInfoDetails.references.length > 0 && employeeInfoDetails.references.map((item, index) => (
                                    <tr>
                                        <td>{item.strCompanyName}</td>
                                        <td>{item.strPersonName}</td>
                                        <td>{item.strTelephone}</td>
                                        <td>{item.strEmail}</td>
                                        <td>{item.strAddress}</td>
                                        <td>{item.strCountry}</td>

                                    </tr>
                                ))}
                                <tr className="light-grey">
                                    <td colSpan="3">
                                        Declaration by the candidate: <br />

                                        I hereby confirm that all the documents listed above are genuine and in case I am not able to produce the Original listed <br />

                                        documents I will be liable for the expenses and consequences.</td>
                                </tr>
                            </table>
                        </Table>

                        <Table striped bordered hover>
                            <thead className="text-center">
                                <th>NAME</th>
                                <th>RANK</th>
                                <th>Signature & Date</th>
                            </thead>
                            <tr>
                                <td>{employeeInfoDetails.strName}</td>
                                <td>{employeeInfoDetails.strRank}</td>
                                <td></td>
                            </tr>
                        </Table>




                    </div>
                </div>
            }

        </>
    )
}
);


export default EmployeeDetails;
