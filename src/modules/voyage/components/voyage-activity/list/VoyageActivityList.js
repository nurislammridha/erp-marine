import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../../../css/responsive.css";
import { GetVoyageActivityList } from "../../../_redux/actions/VoyageActivityAction";

const VoyageActivityList = (props) => {
  const { ref } = props;
  const dispatch = useDispatch();

  const voyageActivityList = useSelector(
    (state) => state.voyageActivityInfo.voyageActivityList
  );

  useEffect(() => {
    dispatch(GetVoyageActivityList("", "", ""));
  }, []);

  return (
    <div className="react-bootstrap-table table-responsive p-5">
      <table className="table table table-vertical-center mt-2">
        <thead className="">
          <tr className="text-left">
            {/* <th scope="col">
              {" "}
              <Form.Check type="checkbox" />
            </th> */}
            <th scope="col">Date</th>
            <th scope="col">Voyage No</th>
            <th scope="col">Distance</th>
            <th scope="col" className="text-center">
              Position
            </th>
            <th scope="col">Speed</th>
            <th scope="col" className="text-center">
              Rob
            </th>
            <th scope="col" className="text-center">
              Consumption
            </th>
            <th scope="col">Action</th>
          </tr>
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>

            <th scope="col" className="text-center">
              LON <span className="ml-2">LAT</span>{" "}
            </th>
            <th scope="col"></th>
            <th scope="col" className="text-center">
              VLSFO <span className="ml-2">LMGO</span>{" "}
            </th>
            <th scope="col" className="text-center">
              VLSFO <span className="ml-2">LMGO</span>{" "}
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {voyageActivityList &&
            voyageActivityList.map((item, index) => (
              <tr className="text-left">
                {/* <th scope="row">
                  {" "}
                  <Form.Check type="checkbox" />
                </th> */}
                <td> {item.dteCreatedAt}</td>
                <td> #{item.intVoyageNo}</td>
                <td>
                  {item.decSeaDistance !== null
                    ? parseFloat(item.decSeaDistance).toFixed(2)
                    : "N/A"}
                </td>
                <td className="text-center">
                  {parseFloat(item.decLongitude).toFixed(2)}
                  <span className="ml-5">
                    {parseFloat(item.decLatitude).toFixed(2)}
                  </span>
                </td>

                <td>
                  {parseFloat(
                    item.decEngineSpeed === null ? 0 : item.decEngineSpeed
                  ).toFixed(2)}
                </td>
                <td className="text-center">
                  {item.decBunkerVlsfoRob !== null
                    ? parseFloat(item.decBunkerVlsfoRob).toFixed(2)
                    : "N/A"}
                  <span className="ml-5">
                    {item.decBunkerLsmgoRob !== null
                      ? parseFloat(item.decBunkerLsmgoRob).toFixed(2)
                      : "N/A"}
                  </span>
                </td>
                <td className="text-center">
                  {item.decBunkerVlsfoCon !== null
                    ? parseFloat(item.decBunkerVlsfoCon).toFixed(2)
                    : "N/A"}
                  <span className="ml-5">
                    {item.decBunkerLsmgoCon !== null
                      ? parseFloat(item.decBunkerLsmgoCon).toFixed(2)
                      : "N/A"}
                  </span>
                </td>

                <td>
                  {" "}
                  <Link to={`/voyage/voyage-activity/detail/${item.intID}`}>
                    <i className="far fa-eye mr-3"></i>
                  </Link>
                  {index === 0 ? (
                    <Link to={`/voyage/voyage-activity/edit/${item.intID}`}>
                      <i className="far fa-edit"></i>
                    </Link>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoyageActivityList;
