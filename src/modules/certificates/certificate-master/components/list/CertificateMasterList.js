import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Dropdown } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
// import CertificateTypeList from "../../../../certificates/certificate-types/components/list/CertificateTypeList";
import Pdf from "react-to-pdf";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactToPrint from "react-to-print-advanced";
import CertificateTypeMasterFilter from "./CertificateTypeMasterFilter";
import CertificateMasterFilterList from "./CertificateMasterFilterList";
import { getCertificateMasterList } from "../../_redux/actions/CertificateListAction";

const CertificateMasterList = () => {
  const certificateMasterData = useSelector((state) => state.CertificateListReducer.certificateMasterList);
  console.log('certificateMasterData', certificateMasterData);
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = React.createRef();

  useEffect(() => {
        dispatch(getCertificateMasterList());
    }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card card-custom gutter-b">
      <div className="row pt-5 pl-4 pb-3">
        <div className="col-xl-9 col-lg-9 col-md-9 col-6">
          <h3>Certificate List</h3>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-6 VoyageListBtn">
          <Dropdown className="d-inline mr-2">
            <Dropdown.Toggle
              className="text-bold"
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
            className="pl-3 pr-3 text-bold"
            variant="primary"
            // onClick={handleShow}
          >
            Add News
          </Button>
          <Modal size="md" show={show} 
          // onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create Certificate Master</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>{<CertificateCategoryAdd />}</Modal.Body> */}
            <Modal.Footer>
              <Button variant="secondary" 
              // onClick={handleClose}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="clearfix"></div>
      </div>

      <CertificateTypeMasterFilter/>
      <div className="container" id="id" ref={ref}>
        <CertificateMasterFilterList/>
      </div>
    </div>
  );
};

export default CertificateMasterList;