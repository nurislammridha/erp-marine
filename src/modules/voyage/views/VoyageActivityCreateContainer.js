import React, { useEffect, useState } from "react";
import Select from "react-select";
import VoyageActivityCreate from "../components/voyage-activity/create/VoyageActivityCreate";
import { useSelector, useDispatch } from "react-redux";
import { GetLastVoyageByVesselId } from "../_redux/actions/VoyageAction";
import { getVesselId } from "../../../app/modules/Auth/_redux/authCrud";
import { GetVesselList } from "../../../domains/Vessel/_redux/actions/VesselAction";
import VoyageShortHeader from "../components/voyage-activity/partials/VoyageShortHeader";

const VoyageActivityCreateContainer = (props) => {
  const dispatch = useDispatch();
  const [vesselId, setVesselId] = useState(null);
  const vesselListOptions = useSelector(
    (state) => state.vesselInfo.vesselListOptions
  );

  useEffect(() => {
    const vesselId = getVesselId();
    setVesselId(vesselId);

    if (vesselId !== null) {
      dispatch(GetLastVoyageByVesselId(vesselId));
    } else {
      dispatch(GetVesselList());
    }
  }, []);

  useEffect(() => {
    dispatch(GetVesselList());
  }, []);

  const voyageData = useSelector((state) => state.voyageInfo.lastVoyageData);

  // Get ID by calling last voyage of this vessel
  // Updated

  return (
    <div className="container">
      <div className="card card-custom gutter-b">
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label">Voyage Activity </h3>
          </div>
        </div>

        <div className="row ">
          <div className="col-xl-3 col-lg-3 col-md-4 col-7 ml-4 mt-5 mb-4">
            {(vesselId === null || vesselId === "") && (
              <Select
                options={vesselListOptions}
                onChange={(option) => {
                  dispatch(GetLastVoyageByVesselId(option.value));
                }}
              />
            )}
          </div>
        </div>

        {voyageData !== null && (
          <>
            <VoyageShortHeader voyageData={voyageData} />
            <VoyageActivityCreate id={voyageData.intID} />
          </>
        )}
        {voyageData === null && (
          <h4 className="container text-center pb-3">Loading Data...</h4>
        )}
      </div>
    </div>
  );
};

export default VoyageActivityCreateContainer;
