import React from "react";
import { Form, Button, Image, Col, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import VoyageFilter from "../components/voyage/list/VoyageFilter";
import VoyageList from "../components/voyage/list/VoyageList";

const VoyageListContainer = () => {
  const history = useHistory();

  // First check if exist an id,
  // if id, then hit api and get data for this id
  // if not exist, then hit api ad get last voyage id

  return (
    <div className="card card-custom gutter-b">
      <div className="row pt-5 pl-4 pb-3">
        <div className="col-xl-9 col-lg-9 col-md-9 col-6">
          <h3>Voyage List</h3>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-6 VoyageListBtn">
          <Button className="mr-2 text-bold" variant="light text-primary ">
            Export
          </Button>
          <Button
            className="pl-3 pr-3 text-bold"
            variant="primary"
            onClick={() => {
              history.push("/voyage/add");
            }}
          >
            Add New
          </Button>
        </div>
        <div className="clearfix"></div>
      </div>

      <VoyageFilter />
      <div className="container">
        <VoyageList />
      </div>
    </div>
  );
};

export default VoyageListContainer;
