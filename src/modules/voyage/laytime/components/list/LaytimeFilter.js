import React from 'react'
import { Form, Button, Col } from "react-bootstrap";
import DatePicker from '../datePicker/DatePicker';
import { Link } from 'react-router-dom';

const LaytimeFIlter = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <h1 className="tableheading ml-0 pl-0">Laytime List</h1>
                </div>
                <div className="col-md-2">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Control
                            className="formHeight"
                            type="text"
                            placeholder="Search"
                            value={""}
                        //   onChange={(e) => changeSearch(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <DatePicker />
                </div>
                <div className="col-md-2 mr-0 text-right">
                    <i className="fas fa-filter tableFilter mt-3 mr-2"></i>
                    <i className="far fa-filter"></i>
                    <Link to="/voyage/laytime/laytimeinfo">
                        <Button className="btn btn-sm" variant="primary">
                            Calculate
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LaytimeFIlter;