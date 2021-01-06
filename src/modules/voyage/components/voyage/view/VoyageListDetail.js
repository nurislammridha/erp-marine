import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetVoyageListDetail } from "../../../_redux/actions/VoyageAction";

const VoyageListDetail = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const { id } = props;

  const voyageListDetail = useSelector(
    (state) => state.voyageInfo.voyageListDetail
  );
  console.log("voyageListDetail :>> ", voyageListDetail);

  useEffect(() => {
    dispatch(GetVoyageListDetail(id));
  }, []);

  return (
    <>
      <div className="card card-custom p-5">
        <div className="">
          <div className="">
            <h3 class="">Details</h3>
          </div>
        </div>
        {voyageListDetail !== null && (
          <>
            <div className="row mt-4 ">
              <div className="col-xl-4 col-lg-4 col-6">
                <p>Vessel Name</p>
                <h6>{voyageListDetail.strVesselName}</h6>
              </div>
              <div className="col-xl-4 col-lg-4 col-6">
                <p>Vessel ID</p>
                <h6>{voyageListDetail.intVesselID}</h6>
              </div>
              <div className="col-xl-4 col-lg-4 col-6">
                <p>Cargo Type</p>
                <h6>{voyageListDetail.strCargoTypeName}</h6>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-xl-4 col-lg-4 col-6">
                <p>From Port</p>
                <h6>{voyageListDetail.strFromPortName}</h6>
              </div>
              <div className="col-xl-4 col-lg-4 col-6">
                <p>To Port</p>
                <h6>{voyageListDetail.strToPortName}</h6>
              </div>

              <div className="col-xl-4 col-lg-4 col-6">
                <p>Bunker Quantity</p>
                <h6>{voyageListDetail.decBunkerQty}</h6>
              </div>
            </div>
          </>
        )}
        {voyageListDetail === null ? "Loading Detail Data..." : null}
      </div>
    </>
  );
};

export default VoyageListDetail;
