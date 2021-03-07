import React from "react";
import { Button, Dropdown, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SuppliersFilter from "../components/SuppliersFilter";
import SuppliersList from "../components/SuppliersList";
import Pdf from "react-to-pdf";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ReactToPrint from "react-to-print-advanced";

const SuppliersListContainer = () => {
  const history = useHistory();
  const ref = React.createRef();

  return (
    <Card>
      <Card.Body>
        <div className="container">
          <div className="col-lg-3">
            <h4>Suppliers List</h4>
          </div>
          <div className="row mt-5">

            <SuppliersFilter />

            <div className="col-md-4 export">
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
                      targetRef={ref}
                      filename="SupplierList.pdf"
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
                          table="supplier-excel"
                          filename="SupplierList"
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
                  onClick={() => history.push("/partners/info")}
                >
                  Add New
              </Button>
              </div>
            </div>
          </div>
          <div ref={ref} className="mt-5">
            <SuppliersList />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SuppliersListContainer;
