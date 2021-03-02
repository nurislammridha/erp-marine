import React from 'react';
import { Card } from "react-bootstrap";
import AdminInformationFilter from '../components/list/AdminInformationFilter';
import AdminInformationList from '../components/list/AdminInformationList';

const AdminListContainer = () => {
    const ref = React.createRef();
    return (
        <Card>
            <Card.Body>
                <h4>Admin Information List</h4>

                <AdminInformationFilter exportList={ref} />
                <div ref={ref}>
                    <AdminInformationList />
                </div>

            </Card.Body>

        </Card>
    );
}

export default AdminListContainer;
