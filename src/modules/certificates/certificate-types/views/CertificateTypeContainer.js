import React, { useState, useEffect } from "react";
import { Button, Dropdown, Card } from "react-bootstrap";
import CertificateTypeFilter from "../components/list/CertificateTypeFilter";
import CertificateTypeList from "../components/list/CertificateTypeList";
import Pdf from "react-to-pdf";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ReactToPrint from "react-to-print-advanced";
import CertificateTypeAdd from "../components/create/CertificateTypeAdd";
import { useDispatch, useSelector } from "react-redux";
import { getCertificateTypeList } from "../_redux/actions/CertificateTypeAction";
import SimpleModal from "../../../../modules/master/components/Modal/SimpleModal";

const CertificateTypeContainer = () => {
  const ref = React.createRef();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const modalStatus = useSelector((state) => state.certificateTypeInfo.status);

  useEffect(() => {
    if (modalStatus) {
      setShow(false);
      dispatch(getCertificateTypeList());
    }
  }, [modalStatus]);

  return (
    <Card>
      <Card.Body>
        <div className="container">
          <h1 className="tableheading">Certificate Type List</h1> <hr />
          <div className="row">
            <CertificateTypeFilter />
            <div className="col-lg-3 export text-right">
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

                  <Dropdown.Item>
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
                className="btn btn-sm ml-5"
                variant="primary"
                onClick={handleShow}
              >
                Add New
              </Button>
            </div>
            <SimpleModal
              show={show}
              handleClose={() => handleClose()}
              modalTitle={"Certificate Type Add"}
            >
              <CertificateTypeAdd />
            </SimpleModal>
          </div>
          <div id="id">
            <CertificateTypeList printRef={ref} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CertificateTypeContainer;
