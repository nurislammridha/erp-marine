import React from "react";
import VoyageActivityDetail from "../components/voyage-activity/view/VoyageActivityDetail";

const VoyageActivityDetailContainer = (props) => {
  return (
    <div className="container">
      <VoyageActivityDetail id={props.match.params.id} />
    </div>
  );
};

export default VoyageActivityDetailContainer;
