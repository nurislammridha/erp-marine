import React from "react";
import BasicForm from "./forms/BasicForm";
import BasicTable from "./table/BasicTable";
const DesignComponent = (props) => {
  return (
    <>
      <div className="card card-custom p-5">
        <h3>Basic Form Sample</h3>
        <BasicForm />
        <h3 className="mt-5">Basic Table</h3>
        <BasicTable />
      </div>
    </>
  );
};

export default DesignComponent;
