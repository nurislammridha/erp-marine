import React from 'react';
import ReactPDF from '@intelllex/react-pdf';
import './css/PreviewURL.css'
import { Button } from 'react-bootstrap';
import { GetExtensionFromUrl } from '../../utils/StringHelper';
const AttachmentPreviewModel = ({ previewAttachment }) => {
    const extension = GetExtensionFromUrl(previewAttachment.name);
    const fileName = GetExtensionFromUrl(previewAttachment.name, '/');
    console.log('previewAttachment :>> ', previewAttachment);
    return (
        <div className="custome-preview">
            {
                fileName !== null && fileName !== "null" && (
                    extension === "pdf" ? (
                        <ReactPDF
                            style={{ height: "1000px", width: "800px" }}
                            className="custome-pdf-reader"
                            url={previewAttachment.base64}
                            showProgressBar
                            showToolbox
                        />
                    ) : (
                            <img className="img-fluid" src={previewAttachment.base64} alt="preview attachment" />

                        )
                )
            }

            <Button variant="success">Download</Button>
        </div>
    )
};

export default AttachmentPreviewModel;