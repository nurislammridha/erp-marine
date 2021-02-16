import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetVoyageList } from "../../../_redux/actions/VoyageAction";

const VoyageList = () => {
  const dispatch = useDispatch();
  const voyageList = useSelector((state) => state.voyageInfo.voyageList);

  useEffect(() => {
    dispatch(GetVoyageList());
  }, []);

  return (
    <div className="react-bootstrap-table table-responsive">
      <table className="table mt-2 tbl-standard">
        <thead>
          <tr>
            {/* <th scope="col">
            {" "}
            <Form.Check type="checkbox" />
          </th> */}
            <th scope="col">Voyage No</th>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Port Name</th>
            <th scope="col">Vessel Name</th>
            <th scope="col">Commencement</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {voyageList &&
            voyageList.map((item, index) => (
              <tr>
                {/* <th scope="row">
            {" "}
            <Form.Check type="checkbox" />
          </th> */}
                <td> #{item.intVoyageNo}</td>
                <td> {item.dteVoyageDate}</td>
                <td>{item.strCargoTypeName}</td>
                <td>{item.strFromPortName}</td>
                <td>{item.strVesselName}</td>
                <td>{item.strPlaceOfVoyageCommencement}</td>
                <td>
                  {" "}
                  <Link to={`/voyage/list/${item.intID}`}>
                    <i className="far fa-eye mr-3"></i>
                  </Link>
                  {/* <Link
                    to={`/voyage/voyage-activity/create/${item.intID}`}
                    title="Create Activity For this Voyage"
                  >
                    <i className="fas fa-plus-circle mr-3"></i>
                  </Link> */}
                  {/* <i className="far fa-edit"></i> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoyageList;
