import React from 'react';
import { Button, Form, Dropdown, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pdf from "react-to-pdf";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ReactToPrint from "react-to-print-advanced";
import { handleChangeAdminListFilterInput } from '../../_redux/actions/AdminInfoListAction';

const AdminInformationFilter = ({ exportList }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    // const ref = React.createRef();

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeAdminListFilterInput(name, value));
    }


    return (
        <>
            <div className="row mt-5">
                <div className="col-md-4 pl-0">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Control
                            className="formHeight"
                            type="text"
                            name="search"
                            placeholder="Search"
                            onChange={(e) => handleChangeTextInput("search", e.target.value)}
                        />
                    </Form.Group>
                </div>

                <div className="col-md-8 export">
                    <div className="float-right mr-10">
                        <Dropdown className="d-inline">
                            <Dropdown.Toggle
                                className="btn btn-sm"
                                variant="light text-primary"
                                id="dropdown-basic"
                            >
                                Export
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Pdf
                                    targetRef={exportList}
                                    filename="AdminInfoList.pdf"
                                    x={0.5}
                                    y={0.5}
                                    scale={0.93}
                                >
                                    {({ toPdf }) => (
                                        <Dropdown.Item onClick={toPdf}>
                                            <i class="far fa-file-pdf"></i>
                                            <span className="ml-3">Pdf</span>
                                        </Dropdown.Item>
                                    )}
                                </Pdf>

                                <Dropdown.Item>
                                    <i class="far fa-file-excel mt-1"></i>
                                    {
                                        <ReactHTMLTableToExcel
                                            className="excelBtn ml-1"
                                            table="admin-excel"
                                            filename="AdminInormationList"
                                            sheet="tablexls"
                                            buttonText="Excel"
                                        />
                                    }
                                </Dropdown.Item>

                                <ReactToPrint
                                    trigger={() => (
                                        <Dropdown.Item href="#/action-1" onClick={window.print}>
                                            <i class="fas fa-print"></i>
                                            <span className="ml-2">Print</span>
                                        </Dropdown.Item>
                                    )}
                                    content={() => exportList.current}
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            className="btn btn-sm ml-5"
                            variant="primary"
                            onClick={() => history.push("/admin-information/create")}
                        >
                            Add New
                        </Button>
                    </div>
                </div>
            </div>


        </>
    );
}

export default AdminInformationFilter;
