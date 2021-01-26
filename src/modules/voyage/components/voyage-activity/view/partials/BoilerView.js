import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetVoyageActivityDetail } from "../../../../_redux/actions/VoyageActivityAction";
import moment from "moment";

const Boiler = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const voyageActivityDetail = useSelector(
    (state) => state.voyageActivityInfo.voyageActivityDetail
  );
  console.log("voyageActivityDetail", voyageActivityDetail);
  useEffect(() => {
    dispatch(GetVoyageActivityDetail(id));
  }, []);

  return (
    <div className="react-bootstrap-table table-responsive">
      <p className="text-uppercase text-bold mt-3">BOILER</p>
      <table className="table mt-2 tbl-standard">
        <thead>
          <tr>
            <th scope="col">Working Pressure (BAR)</th>
            <th scope="col">Date</th>
            <th scope="col">PH Value</th>
            <th scope="col">Chloride</th>
            <th scope="col">Alkalinity</th>
          </tr>
        </thead>
        <tbody>
          {voyageActivityDetail.boiler &&
            voyageActivityDetail.boiler.map((item, index) => (
              <tr>
                <td>{item.decWorkingPressure}</td>
                <td>{moment(item.dteCreatedAt).format("YYYY-MM-DD")}</td>
                <td>{item.decPhValue}</td>
                <td>{item.decChloride}</td>
                <td>{item.decAlkalinity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Boiler;
