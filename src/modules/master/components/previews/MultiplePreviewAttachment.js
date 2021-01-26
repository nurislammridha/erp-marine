import React, { useState, useEffect } from 'react';
import { Image } from "react-bootstrap";
import { GetExtensionFromUrl } from '../../utils/StringHelper';

const MultipplePreviewAttachment = (props) => {
    const { url, title, height, width, base64, attachment } = props;
    const [customThumbnail, setCustomThumbnail] = useState(url);
    const customTitle = (typeof title === 'undefined' || title === "") ? 'See Attachment' : title;
    const customHeight = (typeof height === 'undefined' || height === "") ? 50 : height;
    const customWidth = (typeof width === 'undefined' || width === "") ? 50 : width;


    useEffect(() => {
        // Extract the extension from the url
        const extension = GetExtensionFromUrl(url);
        const fileName = GetExtensionFromUrl(url, '/');
        let thumbnail = null;
        if (fileName !== null && fileName !== "null") {
            if (extension === 'pdf') {
                thumbnail = '/media/default/icons/pdf.png';
            } else if (extension === 'docx' || extension === 'doc' || extension === 'msword') {
                thumbnail = '/media/default/icons/word.png';
            } else if (url === attachment) {
                thumbnail = attachment
            }
             else {
                // thumbnail = url;
                thumbnail = '/media/default/icons/image.png';
            }
        }
        setCustomThumbnail(thumbnail);
    }, [url]);

    return (
        <>
            {
                customThumbnail !== null ?
                    <a target="_blank" rel="noopener noreferrer" href={(typeof base64 === 'unedfined' && base64 === null) ? url : base64} title={customTitle}>
                        <Image
                            src={customThumbnail}
                            style={{
                                height: customHeight,
                                width: customWidth
                            }}
                        />
                    </a> :
                    <p className="text-warning">N/A</p>
            }
        </>
    );
}

export default MultipplePreviewAttachment;