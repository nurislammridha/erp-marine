import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getCrReportList } from "../../../../_redux/actions/EmployeeCrReport";
import { Form, Image, Button } from "react-bootstrap";

const EmployeeCrReportList = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const [isAddMode, setIsAddMode] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editActiveEducation, setEditActiveEducation] = useState(undefined);
  const [records, setRecords] = useState({});

  toast.configure();

  const crReportListData = useSelector(
    (state) => state.employeeCrReducer.crReportList
  );
  const crReportListStatus = useSelector(
    (state) => state.employeeCrReducer.crReportListStatus
  );

  useEffect(() => {
    dispatch(getCrReportList());
  }, []);

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="table-responsive mt-3 table-list">
            {!crReportListStatus && (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Employee Name</th>
                    <th>Rank</th>
                    <th>Vessel</th>
                    <th>Further Promotion</th>
                    <th>Promotion Recommend</th>
                    <th>View</th>
                  </tr>
                </thead>

                <tbody>
                  {crReportListData &&
                    crReportListData.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.strName}</td>
                        <td>{item.strRankName}</td>
                        <td>{item.strVesselName}</td>
                        <td>{item.ysnFurtherRecomanded}</td>
                        <td>{item.ysnPromotionRecomanded}</td>
                        <td>
                          <Button
                            onClick={() =>
                              history.push("/employee/cr-report-view/", {
                                crReport: item,
                              })
                            }
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {<p>Loading</p>}
          </div>
        </div>
      </div>
    </>
  );
});

export default EmployeeCrReportList;
