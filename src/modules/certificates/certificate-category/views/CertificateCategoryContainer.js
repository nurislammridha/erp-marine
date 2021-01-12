import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Dropdown,Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Pdf from "react-to-pdf";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ReactToPrint from "react-to-print-advanced";
import { useDispatch, useSelector } from "react-redux";
import SimpleModal from "../../../../modules/master/components/Modal/SimpleModal";
import CertificateCategoryAdd from "../components/create/CertificateCategoryAdd";
import CertificateCategoryList from "../components/list/CertificateCategoryList";
import CertificateCategoryFilter from "../components/list/CertificateCategoryFilter";

const CertificateCategoryContainer = () => {
  const history = useHistory();
  const ref = React.createRef();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const modalStatus = useSelector(
    (state) => state.CertificateCategoryReducer.status
  );

  useEffect(() => {
    if (modalStatus) {
      setShow(false);
    }
  }, [modalStatus]);

  return (
    <div className="card card-custom p-5">
      <Card>
        <Card.Body>
          <div className="container">
            <div className="row">
              <h1 className="tableheading">Certificate Categories</h1>
              <CertificateCategoryFilter />
              <Dropdown className="d-inline mr-2">
                <Dropdown.Toggle
                  className="btn btn-sm"
                  variant="light text-primary"
                  id="dropdown-basic"
                >
                  Export
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Pdf
                    targetRef={ref}
                    filename="Certificate-category.pdf"
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

                  <Dropdown.Item href="#/action-2">
                    <i class="far fa-file-excel mt-1"></i>
                    {
                      <ReactHTMLTableToExcel
                        className="excelBtn ml-1"
                        table="table-to-xls"
                        filename="Certificate-category"
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
                    content={() => ref.current}
                  />
                </Dropdown.Menu>
              </Dropdown>
              <Button
                className="btn btn-sm"
                variant="primary"
                onClick={handleShow}
              >
                Add New
              </Button>

              <SimpleModal
                show={show}
                handleClose={() => handleClose()}
                modalTitle={"Certificate Category Add"}
              >
                <CertificateCategoryAdd />
              </SimpleModal>
            </div>
            <div id="id" ref={ref}>
              <CertificateCategoryList />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CertificateCategoryContainer;
