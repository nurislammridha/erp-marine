import React, { useState } from "react";
import VoyageActivityCreateOfficer from "./VoyageActivityCreateOfficer";
import VoyageActivityCreateEngineer from "./VoyageActivityCreateEngineer";
import "../../../css/style.css";
import "../../../css/responsive.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import { GetVoyageListDetail } from "../../../_redux/actions/VoyageAction";
// import { getEmployeData, getVesselId } from '../../../../../app/modules/Auth/_redux/authCrud';

const VoyageActivityCreate = (props) => {
  const { id } = props;
  const [isOfficer, setIsOfficer] = useState(false);
  const [isEngineer, setIsEngineer] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    initializeData();
  }, []);


  const initializeData = async () => {
    // dispatch(GetVoyageListDetail(id));
    // const employeeData = await getEmployeData()
    // const vesselId = await getVesselId();
  }

  return (
    <>
      <div className="card-body">
        {isOfficer &&
          <div className="mb-4 card card-body">
            <VoyageActivityCreateOfficer id={id} />
          </div>
        }
        {isEngineer && <div className="mb-4 card card-body">
          <VoyageActivityCreateEngineer id={id} />
        </div>
        }
      </div>
    </>
  );
};

export default VoyageActivityCreate;
