 {
                typeof employeeInfoDetails != 'undefined' &&
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header">
                            <div className="card-title">
                                <h3 class="card-label">Employee Details</h3>
                            </div>
                        </div>

                        <div className="card-header">
                            <div className="card-title">
                                <Image src={`http://iapps.akij.net/asll/public/assets/images/asllEmployee/` + employeeInfoDetails.image} roundedCircle className="max-h-100px" />
                                <div className="col-sm-10">
                                    <h3 class="card-label username">{employeeInfoDetails.strName}</h3>
                                    <h3 class="card-label">{employeeInfoDetails.strRank}</h3>
                                </div>
                            </div>
                            <div className="card-toolbar">
                                <p>VIEW DOCUMENTS</p>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="col-md-12 row">
                                <div className="col-md-6 row">
                                    <div className="col-md-6">
                                        <p>Name(as in Passport)</p>
                                        <p>Rank Applied</p>
                                        <p>Date Of Avaiability</p>
                                        <p>Tel(Home)/Mobile</p>
                                        <p>Email(Personal)</p>
                                        <p>Height/Weight</p>
                                        {/* <p>Remark</p> */}
                                        <p>Nationality</p>
                                        <p>Date N Place of Birth</p>
                                        <p>Home Address</p>
                                        <p>Relative Name (as in passport)</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="info-details">{employeeInfoDetails.strName}</p>
                                        <p className="info-details">{employeeInfoDetails.strRank}</p>
                                        <p className="info-details">{employeeInfoDetails.strAvailabilityDate}</p>
                                        <p className="info-details">{employeeInfoDetails.strHomeTelephone}</p>
                                        <p className="info-details">{employeeInfoDetails.strEmail}</p>
                                        <p className="info-details">{employeeInfoDetails.strHeight}</p>
                                        {/* <p className="info-details">{strName}</p> */}
                                        <p className="info-details">{employeeInfoDetails.strNationality}</p>
                                        <p className="info-details">{employeeInfoDetails.strBirthdate}</p>
                                        {/* <p className="info-details">{employeeInfoDetails.strName}</p> */}
                                        {/* <p className="info-details">{strName}</p> */}
                                        {/* <p className="info-details">{strName}</p> */}
                                    </div>
                                </div>
                                <div className="col-md-6 row">
                                    <div className="col-md-6">
                                        <p className="experience">EXPERIENCE</p>
                                        <p style={{ fontWeight: 'bold' }}>Master(Captain)</p>
                                        <p className="experience-details">Akij Shipping</p>
                                        <p style={{ color: '#A4A4A4' }}>Oct 2018-Present</p>
                                        <p className="experience-details">Akij Shipping Line Ltd Full-Time</p>
                                        <p className="experience-details">Employment Duration </p>
                                        <p className="experience-details">Location Singaapore</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="experience"></p>
                                        <p style={{ fontWeight: 'bold' }}>Chief Officer</p>
                                        <p className="experience-details">Akij Shipping</p>
                                        <p style={{ color: '#A4A4A4' }}>Oct 2018-Present</p>
                                        <p className="experience-details">Akij Shipping Line Ltd Full-Time</p>
                                        <p className="experience-details">Employment Duration </p>
                                        <p className="experience-details">Location Singaapore</p>
                                    </div>

                                    <div className="col-md-12 mt-4">
                                    </div>
                                </div>

                                {/* {employeeInfoDetails.educations.length != 'undefined' && employeeInfoDetails.educations.map((item, index) => (
                                   

                                    <div className="col-md-5 mt-4 row"><p className="experience">EDUCATIONS</p>
                                        <div>
                                            <p style={{ fontWeight: 'bold' }}>{item.strInstitution}</p>
                                            <p className="experience-details">{item.strCertification}</p>
                                            <p style={{ color: '#A4A4A4' }}>{item.strResult}</p>
                                            <p style={{ color: '#A4A4A4' }}>{item.strYear}</p>
                                        </div>
                                    </div>
                                ))} */}

                                <div className="col-md-12 mt-4"><p className="experience">EDUCATIONS</p></div>

                                {employeeInfoDetails.educations.length > 0 && employeeInfoDetails.educations.map((item, index) => (
                                    <div className="ml-10">
                                        <p style={{ fontWeight: 'bold' }}>{item.strInstitution}</p>
                                        <p className="experience-details">{item.strCertification}</p>
                                        <p style={{ color: '#A4A4A4' }}>{item.strResult}</p>
                                        <p style={{ color: '#A4A4A4' }}>{item.strYear}</p>
                                    </div>
                                ))}




                                <div className="col-md-12 mt-4"><p className="experience">SEA SERVICE RECORD</p></div>

                                <table className="table table table-head-custom table-vertical-center">
                                    <thead>
                                        <tr>
                                            <td>SL</td>
                                            <td>DWT</td>
                                            <td>Duration</td>
                                            <td>EngineName/KW</td>
                                            <td>Ship Manager</td>
                                            <td>Vessel Name</td>
                                            <td>Flag</td>
                                            <td>Vessel Type</td>
                                            <td>From</td>
                                            <td>To</td>
                                            <td>Reason for Leaving</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeInfoDetails.records.length > 0 && employeeInfoDetails.records.map((item, index) => (
                                            <tr className="border" key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.strDWT}</td>
                                                <td>{item.strDuration}</td>
                                                <td>{item.strEngineName}</td>
                                                <td>{item.strShipManager}</td>
                                                <td>{item.strVesselName}</td>
                                                <td>{item.strFlag}</td>
                                                <td>{item.strVesselType}</td>
                                                <td>{item.strFromDate}</td>
                                                <td>{item.strToDate}</td>
                                                <td>{item.strReason}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="col-md-12 mt-4"><p className="experience">DOCUMENTATION</p></div>

                                <table className="table table table-head-custom table-vertical-center">
                                    <thead>
                                        <tr>
                                            <td>SL</td>
                                            <td>Type</td>
                                            <td>Issued By</td>
                                            <td>Number</td>
                                            <td>Issue Date</td>
                                            <td>Expiry Date</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeInfoDetails.documents.length > 0 && employeeInfoDetails.documents.map((item, index) => (
                                            <tr className="border" key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.strType}</td>
                                                <td>{item.strIssueBy}</td>
                                                <td>{item.strNumber}</td>
                                                <td>{item.strIssueDate}</td>
                                                <td>{item.strExpiryDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="col-md-12 mt-6"><p className="experience">CIRTIFICATION</p></div>

                                <table className="table table table-head-custom table-vertical-center">
                                    <thead>
                                        <tr>
                                            <td>SL</td>
                                            <td>Course Name</td>
                                            <td>Expiry Date</td>
                                            <td>Issued By</td>
                                            <td>Number</td>
                                            <td>Issue Date</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeInfoDetails.certificates.length > 0 && employeeInfoDetails.certificates.map((item, index) => (
                                            <tr className="border" key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.strCourseName}</td>
                                                <td>{item.strExpiryDate}</td>
                                                <td>{item.strIssueBy}</td>
                                                <td>{item.strNumber}</td>
                                                <td>{item.strIssueDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="col-md-12 mt-4"><p className="experience">BANK DETAILS</p></div>

                                <table className="table table table-head-custom table-vertical-center">
                                    <thead>
                                        <tr>
                                            <td>SL</td>
                                            <td>Account Holder Name</td>
                                            <td>Account Number</td>
                                            <td>Bank Name</td>
                                            <td>Bank Address</td>
                                            <td>Swift Code</td>
                                            <td>Icon</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeInfoDetails.bankdetails.length > 0 && employeeInfoDetails.bankdetails.map((item, index) => (
                                            <tr className="border" key={index}>
                                                <td style={{ fontWeight: 'bold' }}>{index + 1}</td>
                                                <td style={{ fontWeight: 'bold' }}>{item.strAccountHolderName}</td>
                                                <td style={{ fontWeight: 'bold' }}>{item.strAccountNumber}</td>
                                                <td style={{ fontWeight: 'bold' }}>{item.strBankName}</td>
                                                <td style={{ fontWeight: 'bold' }}>{item.strBankAddress}</td>
                                                <td style={{ fontWeight: 'bold' }}>{item.strSwiftCode}</td>
                                                <td style={{ fontWeight: 'bold' }}>Icon</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <p className="experience">SAFETY GEAR</p>
                                <table className="table table table-head-custom table-vertical-center">
                                    <thead>
                                        <tr>
                                            <td>Boiler</td>
                                            <td>Safety Shoes</td>
                                            <td>Uniform Shirt</td>
                                            <td>Uniform Trouser</td>
                                            <td>Winter Jacket</td>
                                        </tr>
                                    </thead>
                                    <tbody className="border">

                                        <tr>
                                            <td>{employeeInfoDetails.strSafetyShoes}</td>
                                            <td>{employeeInfoDetails.strTradingArea}</td>
                                            <td>{employeeInfoDetails.strUniformShirt}</td>
                                            <td>{employeeInfoDetails.strUniformTrouser}</td>
                                            <td>{employeeInfoDetails.strWinterJacket}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="col-md-12 mt-4"><p className="experience">IMMIGRATION INFORMATION</p></div>

                                {/* <div className="col-md-8">
                                    <p>Have you ever been denied a foreign visa?</p>
                                    <p>If yes, state which country and reason (if know)</p>
                                    <p>Have you been the subject of a court of enquiry or involved in a maritime accident?</p>
                                </div>

                                <div className="col-md-4">
                                    <p style={{ fontWeight: 'bold' }}>No</p>
                                    <p style={{ fontWeight: 'bold' }}>No</p>
                                    <p style={{ fontWeight: 'bold' }}>No</p>
                                </div> */}

                                {employeeInfoDetails.references.length > 0 && employeeInfoDetails.references.map((item, index) => (
                                    <div className="col-md-5 mt-4"><p className="experience">REFERENCES</p>
                                        <p>{item.strCompanyName}</p>
                                        <p>{item.strPersonName}</p>
                                        <p>{item.strTelephone}</p>
                                        <p>{item.strEmail}</p>
                                        <p>{item.strAddress}</p>
                                        <p>{item.strCountry}</p>
                                    </div>
                                ))}

                                <div className="col-md-12 mt-4"><p className="experience">EMERGENCY</p></div>
                                <div className="col-md-6">
                                    <p>Emergency Person Name</p>
                                    <p>Emergency Person Telephone</p>
                                    <p>Emergency Person Relation</p>
                                    <p>Emergency Person Address</p>
                                </div>
                                <div className="col-md-6">
                                    <p className="info-details">{employeeInfoDetails.strEmgrPersonName}</p>
                                    <p className="info-details">{employeeInfoDetails.strEmgrPersonalTel}</p>
                                    <p className="info-details">{employeeInfoDetails.strEmgrPersonRelation}</p>
                                    <p className="info-details">{employeeInfoDetails.strEmgrPersonAddress}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }

