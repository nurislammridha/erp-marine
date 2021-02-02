import React from "react";
import PurhasesOrderEntry from "../components/PurhasesOrderEntry";
import PurhasesOrderFilter from "../components/PurhasesOrderFilter";

const PurchasesOrderCreateContainer = () => {
  return (
    <div className="container">
      <PurhasesOrderFilter />
      <PurhasesOrderEntry />
    </div>
  );
};

export default PurchasesOrderCreateContainer;
