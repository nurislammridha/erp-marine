import React from 'react';
import ReactPDF from '@intelllex/react-pdf';
import './css/PreviewURL.css'
import { Button } from 'react-bootstrap';
import { GetExtensionFromUrl } from '../../utils/StringHelper';
const AttachmentPreviewModel = ({ previewAttachment, handleClose }) => {
    
    const extension = GetExtensionFromUrl(previewAttachment.filePreviewUrl ? previewAttachment.filePreviewUrl : previewAttachment.name);
    const fileName = GetExtensionFromUrl(previewAttachment.filePreviewUrl ? previewAttachment.filePreviewUrl : previewAttachment.name, '/');

    console.log('previewAttachment :>> ', previewAttachment);
    return (
        <div className="custome-preview">
            {
                (fileName !== null && fileName !== "null") && (
                    extension === "pdf" ? (
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <ReactPDF
                                    style={{ height: "1000px", width: "800px" }}
                                    className="custome-pdf-reader"
                                    url={previewAttachment.base64}
                                    showProgressBar
                                    showToolbox
                                />
                            </div>
                        </div>
                    ) : ((extension === "png" || extension === "jpg" || extension === "jpeg" || extension === "gif") ? (
                        <div className="text-center">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <img className="img-fluid img-thumbnail" src={previewAttachment.base64} alt="preview attachment" />
                                </div>
                            </div>
                        </div>
                    ) :
                        <h1>Please donwload this documents file!</h1>
                        )
                )
            }
            <Button variant="success" className="float-right text-light mt-1" href={previewAttachment.base64} rel="noopener noreferrer" download={`${previewAttachment.name}.${extension}`}>Download</Button>
        </div>
    )
};

export default AttachmentPreviewModel;