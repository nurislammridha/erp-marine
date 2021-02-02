import React from "react";
import PurhasesOrderEntry from "../components/PurhasesOrderEntry";
import PurhasesOrderEntryHeader from "../components/PurhasesOrderEntryHeader";

const PurchasesOrderCreateContainer = () => {
  return (
    <div className="container">
      <PurhasesOrderEntryHeader />
      <PurhasesOrderEntry />
    </div>
  );
};

export default PurchasesOrderCreateContainer;
