import React from 'react';
import StepProgress from '../step-progress-bar/StepProgress';

const partnerInfoContainer = () => {
    return (
        <div className="container">
            <div className="card card-custom gutter-b card-top-border">
                <StepProgress />
            </div>
        </div>
    );
}

export default partnerInfoContainer;
