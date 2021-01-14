
import React from 'react';
import { Card } from "react-bootstrap";
import LaytimeFIlter from '../components/list/LaytimeFilter';
import LaytimeList from '../components/list/LaytimeList';
import LaytimeTotal from '../components/list/LaytimeTotal';

const LaytimeContainer = () => {
    return (
        <>
            <Card>
                <Card.Body>
                    <LaytimeFIlter />
                    <LaytimeList />
                </Card.Body>
            </Card>
            <Card className="mt-3">
                <Card.Body>
                    <LaytimeTotal />
                </Card.Body>
            </Card>

        </>

    );
}

export default LaytimeContainer;
