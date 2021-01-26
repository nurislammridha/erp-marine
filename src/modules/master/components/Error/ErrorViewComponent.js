import React from 'react'
import { Link } from 'react-router-dom';

const ErrorViewComponent = (props) => {
    const errorCode = typeof props.code === 'undefined' ? 404 : props.code;
    let errorMessage = getErrorMessage(errorCode);
    const errorTitle = typeof props.title === 'undefined' ? 'ERROR' : props.title;
    const isErrorDisplay = typeof props.display === 'undefined' ? true : props.display;

    return (
        <>
            {
                isErrorDisplay &&
                <div
                    className="error error-4 d-flex flex-row-fluid bgi-size-cover bgi-position-center pb-20"
                    style={{ backgroundImage: 'url(/media/error/bg1.jpg)' }}
                >
                    <div className="d-flex flex-column flex-row-fluid align-items-center align-items-md-start justify-content-md-center text-center text-md-left px-10 px-md-30 py-10 py-md-0 line-height-xs pb-10">
                        <h1 className="error-title text-warning font-weight-boldest line-height-sm">
                            {errorCode}
                        </h1>
                        <p className="error-subtitle text-warning font-weight-boldest mb-10 mt-5">
                            {errorTitle}
                        </p>
                        <p className="display-4 text-danger font-weight-boldest mt-md-0 line-height-md pt-20">
                            {errorMessage}
                        </p>
                        <Link className='btn btn-info btn-lg' to="/dashboard">
                            <i className="fa fa-chevron-left"></i> Go Back
                    </Link>
                    </div>
                </div>
            }

        </>
    );
}

function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 401:
            return 'You are not authenticated to access this page'
            break;
        case 404:
            return 'Page Not Found'
            break;
        case 500:
            return 'Server Error'
            break;

        default:
            return 'Error'
            break;
    }
}

export default ErrorViewComponent;