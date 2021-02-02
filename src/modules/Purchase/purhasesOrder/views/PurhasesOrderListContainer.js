import React from "react";
import PurhasesOrderFilter from "../components/PurhasesOrderFilter";
import PurhasesOrderList from "../components/PurhasesOrderList";

const PurhasesOrderListContainer = () => {
  return (
    <>
      <div className="container">
        <PurhasesOrderFilter />
        <PurhasesOrderList />
      </div>
    </>
  );
};

export default PurhasesOrderListContainer;
