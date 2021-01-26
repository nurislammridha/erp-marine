import React from 'react';

const DemoExampleFileLink = (props) => {
    return ( 
        <div className="mt-5">
            {
                props.previewModal &&
                <label className="pointer btn btn-outline-info mt-2 mr-2" onClick={() => props.setShowCreateModal(true)}>
                    <i className="fa fa-eye"></i> Preview a demo excel file
                </label>
            }
            {
                props.downloadLink &&
                <a className="btn btn-outline-warning" target="_blank" href="/files/demo/Demo Requisition Indent Download Form.xlsx">
                    <i className="fa fa-download"></i> Download
                </a>
            }
        </div>
     );
}
 
export default DemoExampleFileLink;