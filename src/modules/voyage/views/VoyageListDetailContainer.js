import React from "react";
import VoyageListDetail from "../components/voyage/view/VoyageListDetail";

const VoyageListDetailContainer = (props) => {

    return (
        <div className="container">
            <VoyageListDetail id={props.match.params.id} />
        </div>
    );
};

export default VoyageListDetailContainer;
