import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { GetApprovePendingList } from "../redux/actions/DemandAction";

// const TopSheet = withRouter(({ history, props }) => {
//   const dispatch = useDispatch();
//   const pendingTopSheetList = useSelector((state) => state.demand.pendingTopSheet);

//   console.log('pendingTopSheetList',pendingTopSheetList);

const TopSheet = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const [employeeInfo, setEmployeeInfo] = React.useState({
    topSheet: [],
  });

  const topSheet = useSelector((state) => state.demand.pendingTopSheet);
  const deleteMessage = useSelector((state) => state.demand.deleteMessage);
  const deleteStatus = useSelector((state) => state.demand.deleteStatus);

  console.log("topSheet", topSheet);

  useEffect(() => {
    dispatch(GetApprovePendingList());
  }, []);

  return (
    <>
      <table class="table text-center">
        <thead>
          <tr>
            <th scope="col">SL</th>
            <th scope="col">ID</th>
            <th scope="col">Laycan Form Date</th>
            <th scope="col">Laycan To Date</th>
            <th scope="col">Country</th>
            <th scope="col">Qnt</th>
            <th scope="col">Remarks</th>
            <th scope="col">Own Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {topSheet &&
            topSheet.map((item, index) => (
              <tr>
                <th scope="row">{++index}</th>
                <th scope="row">{item.intID}</th>
                <td>{item.dteLayCanFromDate}</td>
                <td>{item.dteLayCanToDate}</td>
                <td>{item.strCountry}</td>
                <td>{item.decGrandQuantity}</td>
                <td>{item.strComments}</td>
                <td>
                  <Button
                    className="text-bold"
                    variant="primary btn-sm"
                    onClick={() => {
                      history.push(
                        "/supply-chain/procurement/cargo-pending-details/" +
                          item.intID,
                        { pendingList: item }
                      );
                    }}
                  >
                    Details
                  </Button>
                </td>

                <td>
                  <i className="far fa-edit"></i>{" "}
                  <i className="far fa-trash-alt ml-2"></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
});

export default TopSheet;
