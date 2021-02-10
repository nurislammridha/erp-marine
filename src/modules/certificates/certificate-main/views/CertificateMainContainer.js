import React from "react";
import CertificateMainList from "../components/list/CertificateMainList";

const CertificateMainContainer = () => {
  return (
    <>
      <div className="container">
        <div className="pt-5">
          <CertificateMainList />
        </div>
      </div>
      <br />
    </>
  );
};

export default CertificateMainContainer;
