import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { GetApproveCompleteList } from "../redux/actions/DemandAction";
import CargoBookingAprvTopsheetContainer from "../views/CargoBookingAprvTopsheetContainer";



const CargoBookingAprvTopsheet = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const [employeeInfo, setEmployeeInfo] = React.useState({
    aprvTopSheet: [],
  });


  const deleteMessage = useSelector((state) => state.demand.deleteMessage);
  const deleteStatus = useSelector((state) => state.demand.deleteStatus);
  const approveTopSheetList = useSelector((state) => state.demand.approveTopSheet);

  console.log("topSheet", approveTopSheetList);

  useEffect(() => {
    dispatch(GetApproveCompleteList());
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
          {approveTopSheetList &&
            approveTopSheetList.map((item, index) => (
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
                        "/supply-chain/procurement/booking-update-details/" +
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

export default CargoBookingAprvTopsheet;
