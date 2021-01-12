import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Dropdown, Card } from "react-bootstrap";
import Pdf from "react-to-pdf";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactToPrint from "react-to-print-advanced";
import { getCertificateMasterList } from "../_redux/actions/CertificateListAction";
import CertificateMasterList from "../components/list/CertificateMasterList";
import CertificateMasterAdd from "../components/create/CertificateMasterAdd";
import CertificateMasterFilter from "../components/list/CertificateMasterFilter";
import SimpleModal from "../../../../modules/master/components/Modal/SimpleModal";


const CertificateMasterContainer = () => {

  const certificateMasterData = useSelector((state) => state.CertificateListReducer.certificateMasterList);
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = React.createRef();
  const modalAddStatus = useSelector((state) => state.CertificateListReducer.addStatus);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
        dispatch(getCertificateMasterList());
    }, []);

    useEffect(() => {
      if (modalAddStatus) {
        setShow(false);
      }
    }, [modalAddStatus]);

  return (
      <div className="card card-custom p-5">
        <Card>
          <Card.Body>
            <div className="container">
              <div className="row">
                <h1 className="tableheading">Certificate Master List</h1>
                <CertificateMasterFilter/>
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
                      filename="Certificate Type.pdf"
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
                          filename="Certificate Type"
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
                  modalTitle={"Add Cirtificate Master"}
                >
                  <CertificateMasterAdd />
                </SimpleModal>
              </div>
              <div id="id" ref={ref}>
              <CertificateMasterList/>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
  
  );
};

export default CertificateMasterContainer;
