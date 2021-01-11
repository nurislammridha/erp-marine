import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Dropdown } from "react-bootstrap";
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
    <div className="card card-custom gutter-b">
      <div className="row pt-5 pl-4 pb-3">
        <div className="col-xl-9 col-lg-9 col-md-9 col-6">
          <h3>Issuing Authority List</h3>
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
                filename="code-example.pdf"
                x={0.5}
                y={0.5}
                scale={1.2}
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
                    filename="tablexls"
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
            onClick={handleShow}
          >
            Add New
          </Button>

          <SimpleModal
            show={show}
            handleClose={() => handleClose()}
            modalTitle={"Create Issue Authority"}
          >
                          
            <IssueAuthorityAdd />
                        
          </SimpleModal>
        </div>
        <div className="clearfix"></div>
      </div>

      <IssueAuthorityFilter />
      <div className="container" id="id" ref={ref}>
        <IssueAuthorityList />
      </div>
    </div>
  );
};

export default IssueAutorityListContainer;
