import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Dropdown, Card } from "react-bootstrap";
import IssueAuthorityFilter from "../components/list/IssueAuthorityFilter";
import IssueAuthorityList from "../components/list/IssueAuthorityList";
import Pdf from "react-to-pdf";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ReactToPrint from "react-to-print-advanced";
import IssueAuthorityAdd from "../components/create/IssueAuthorityAdd";
import SimpleModal from "../../../../modules/master/components/Modal/SimpleModal";

const IssueAutorityListContainer = (props) => {
  const [show, setShow] = useState(false);
  const ref = React.createRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const modalAddStatus = useSelector(
    (state) => state.certificateIssueAuthorityInfo.addStatus
  );

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
            <h1 className="tableheading">Issuing Authority List</h1>
            <hr />
            <div className="row justify-content-between">
             
                <IssueAuthorityFilter />
              
              <div className="col-lg-4 col-md-4">
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
                      filename="Issue_authority_list.pdf"
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
                          filename="Issue_authority_list"
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

              </div>
              <SimpleModal
                show={show}
                handleClose={() => handleClose()}
                modalTitle={"Add Issue Authority"}
              >
                <IssueAuthorityAdd />
              </SimpleModal>
            </div>
            <div id="id">
              <IssueAuthorityList printRef={ref} />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default IssueAutorityListContainer;
