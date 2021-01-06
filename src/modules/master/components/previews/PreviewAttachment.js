import React, { useState, useEffect } from 'react';
import { Image } from "react-bootstrap";
import { GetExtensionFromUrl } from '../../utils/StringHelper';

const PreviewAttachment = (props) => {
    const { url, title, height, width } = props;
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
            } else if (extension === 'docx' || extension === 'doc') {
                thumbnail = '/media/default/icons/word.png';
            } else {
                thumbnail = url;
            }
        }
        setCustomThumbnail(thumbnail);
    }, []);

    return (
        <>
            {
                customThumbnail !== null ?
                <a target="_blank" href={url} title={customTitle}>
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

export default PreviewAttachment;