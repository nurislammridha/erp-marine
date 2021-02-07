import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMainCertificateDeteailByID } from "../../../_redux/actions/CertificateMainAction";
import moment from "moment";
import MultipplePreviewAttachment from "../../../../../master/components/previews/MultiplePreviewAttachment";
import SimpleModal from "../../../../../master/components/Modal/SimpleModal";
import AttachmentPreviewModel from "../../../../../master/components/previews/AttachmentPreviewModel";
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import saveAs from 'save-as';

const CertificateDetails = ({ handleClose, CertificateID }) => {
    const CRDetails = useSelector((state) => state.certificateMainInfo.certificateDetails);
    const [attachmentPreviewModel, setAttachmentPreviewModel] = useState(false);
    const [previewAttachment, setPreviewAttachment] = useState(null);

    console.log('CRDetails :>> ', CRDetails);
    const PreviewAttachment = (item) => {
        setAttachmentPreviewModel(true);
        setPreviewAttachment(item)
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMainCertificateDeteailByID(CertificateID))
    }, [])



    const handleDownloadAttachment = () => {
        if (CRDetails !== null && CRDetails.multipleAttachments !== null && CRDetails.multipleAttachments.length > 0) {
            let attachmentFiles = CRDetails.multipleAttachments;
            console.log('attachmentFiles :>> ', attachmentFiles);
            let newAttachment = [];
            if (attachmentFiles) {
                attachmentFiles.forEach((item) => {
                    newAttachment.push(item.filePreviewUrl);
                });
            }
            const zip = new JSZip();
            console.log('zip :>> ', zip);
            let count = 0;
            const zipFilename = "attachment.zip";
            newAttachment.forEach(function (url) {
                const filename = "filename";
                console.log('url check :>> ', url);
                // loading a file and add it in a zip file
                JSZipUtils.getBinaryContent(url, function (err, data) {
                    console.log('data :>> ', data);
                    // if (err) {
                    //     throw err; // or handle the error
                    // }
                    zip.file(filename, data, { binary: true });
                    count++;
                    if (count == newAttachment.length) {
                        zip.generateAsync({ type: 'blob' }).then(function (content) {
                            saveAs(content, zipFilename);
                        });
                    }
                });
            })
        }
    }


    return (
        <>
            {
                CRDetails && (
                    <div className="mt-3">
                        <div className="d-flex flex-row">
                            <div className="custome-border-left">
                                <h6 className="text-bold">Details Information</h6>
                            </div>
                            <div className="custome-border-design">
                            </div>
                        </div>
                        <Row className="m-1 bg-light p-4 mb-4">
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Ship Name</p>
                                <h5>{CRDetails.strShipName !== null && CRDetails.strShipName !== "" && CRDetails.strShipName !== 'undefined' ? CRDetails.strItemName : "----"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Category</p>
                                <h5>{CRDetails.parentCategory !== null && CRDetails.parentCategory !== "" ? CRDetails.parentCategory.label : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Sub Category</p>
                                <h5>{CRDetails.category !== null && CRDetails.category !== "" ? CRDetails.category.label : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Certificate</p>
                                <h5>{CRDetails.certificate !== null && CRDetails.certificate !== "" ? CRDetails.certificate.label : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Ship Folder No</p>
                                <h5>{CRDetails.strShipFolderNo !== null && CRDetails.strShipFolderNo !== "" ? CRDetails.strShipFolderNo : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Issue Authority</p>
                                <h5>{CRDetails.issuing_authority !== null && CRDetails.issuing_authority !== "" ? CRDetails.issuing_authority.label : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Issue Place</p>
                                <h5>{CRDetails.strIssuedPlace !== null && CRDetails.strIssuedPlace !== "" ? CRDetails.strIssuedPlace : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Certificate Issue Date</p>
                                <h5>{CRDetails.dteCertificateIssueDate !== null && CRDetails.dteCertificateIssueDate !== "" ? moment(CRDetails.dteCertificateIssueDate).format("DD-MM_YYYY") : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Extend Until Date</p>
                                <h5>{CRDetails.dteExtendedUntil !== null && CRDetails.dteExtendedUntil !== "" ? moment(CRDetails.dteExtendedUntil).format("DD-MM_YYYY") : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Endorsement Date</p>
                                <h5>{CRDetails.dteLastEndorsementDate !== null && CRDetails.dteLastEndorsementDate !== "" ? moment(CRDetails.dteLastEndorsementDate).format("DD-MM_YYYY") : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Ship Remarks</p>
                                <h5>{CRDetails.strShipRemarks !== null && CRDetails.strShipRemarks !== "" ? CRDetails.strShipRemarks : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Not on board</p>
                                <h5>{CRDetails.intNotOnBoard !== null && CRDetails.intNotOnBoard === "1" ? true : false}</h5>
                            </Col>
                        </Row>

                        <div className="d-flex flex-row">
                            <div className="">
                                <h6 className="text-bold">Documents</h6>
                            </div>
                            <div className="custome-border-design">
                            </div>
                        </div>
                        <Button variant="success" className="float-right m-2" onClick={() => handleDownloadAttachment()} download={true}>Download Documents</Button>
                        <Row>
                            <Col md={8} className="p-3 mt-1">
                                <div className="react-bootstrap-table table-responsive">
                                    <table className="table table table-head-custom table-vertical-center user-list-table">
                                        <thead>
                                            <tr>
                                                {/* <th>
                                                    <Form.Check
                                                        className=""
                                                        type="checkbox"
                                                        name="isRevLoadingPorts"
                                                    // onChange={(e) => handleChangeTextInput('isRevLoadingPorts', e.target.checked)}
                                                    />
                                                </th> */}
                                                <th>Image Name</th>
                                                <th>Image Size</th>
                                                <th>Image View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                CRDetails && CRDetails.multipleAttachments.length > 0 && CRDetails.multipleAttachments.map((item, index) => (
                                                    <tr>
                                                        {/* <td>
                                                            <Form.Check
                                                                className=""
                                                                type="checkbox"
                                                                name="isRevLoadingPorts"
                                                            // onChange={(e) => handleChangeTextInput('isRevLoadingPorts', e.target.checked)}
                                                            />
                                                        </td> */}
                                                        <td>{item.name !== null && item.name !== '' ? item.name : ''}</td>
                                                        <td>{item.size !== null && item.size !== '' ? item.size : ''}</td>
                                                        <td>
                                                            {/* <MultipplePreviewAttachment
                                                                url={item.filePreviewUrl ? item.filePreviewUrl : `/${item.name}`}
                                                                base64={item.base64}
                                                                title="Preview"
                                                                height={50}
                                                                width={50}
                                                            /> */}
                                                            <span className="btn border-none" onClick={() => PreviewAttachment(item)}>
                                                                <MultipplePreviewAttachment
                                                                    url={item.filePreviewUrl ? item.filePreviewUrl : `/${item.name}`}
                                                                    base64={item.base64}
                                                                    title="Preview"
                                                                    height={50}
                                                                    width={50}
                                                                />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                        <SimpleModal
                            size="lg"
                            previewAttachment={previewAttachment}
                            show={attachmentPreviewModel}
                            handleClose={() => setAttachmentPreviewModel(false)}
                            handleShow={() => setAttachmentPreviewModel(true)}
                            modalTitle={"Attachment Preview"}
                        >
                            <AttachmentPreviewModel handleClose={() => setAttachmentPreviewModel(false)} previewAttachment={previewAttachment} />
                        </SimpleModal>
                    </div>
                )
            }
            <Button variant="secondary" className="float-right" onClick={handleClose}>Close</Button>
        </>
    );
};

export default CertificateDetails;
