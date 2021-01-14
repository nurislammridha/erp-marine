import React from 'react';
import LaytimeInfo1Add from '../components/create/LaytimeInfo1Add';
import LaytimeInfo2Add from '../components/create/LaytimeInfo2Add';
import LaytimeMultipleAdd from '../components/create/LaytimeMultipleAdd';

const LaytimeInfoContainer = () => {
    return (
        <div>
            <LaytimeInfo1Add />
            <LaytimeInfo2Add />
            {/* <LaytimeMultipleAdd /> */}
        </div>
    );
}

export default LaytimeInfoContainer;
