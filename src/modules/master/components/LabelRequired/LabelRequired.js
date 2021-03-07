import React from 'react';
import './LabelRequired.css'
const LabelRequired = () => {
    return (
        <span className={`required text-danger`}>*</span>
    );
}

export default LabelRequired;