import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetEmployeeList } from "../../../domains/CCO/_redux/actions/EmployeeAction";
import { getCertificateMainListAction } from "../../certificates/certificate-main/_redux/actions/CertificateMainAction";
const DashBoardCard = () => {
  const dispatch = useDispatch();
  //get total employee
  const employeeInfoList = useSelector(
    (state) => state.employeeInfo.employeeInfoList
  );
  //get total certificates
  const certificateList = useSelector(
    (state) => state.certificateMainInfo.certificates
  );
  //========================
  const certificatesPaginatedData = useSelector(
    (state) => state.certificateMainInfo.certificatesPaginatedData
  );

  useEffect(() => {
    dispatch(GetEmployeeList());
    dispatch(getCertificateMainListAction());
  }, []);
  return (
    <>
      <div className="container dashboard__pb dashboard-cardsection">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-6">
            <div className="paid__widget">
              <div className="widget__left">
                <img src="/media/svg/icons/Code/cil_money.svg" alt="iMarine" />
              </div>
              <div className="widget__right">
                <h4>৳ 40,18,858.00</h4>
                <p>Total Expense</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6">
            <div className="paid__widget one">
              <div className="widget__left">
                <img src="/media/svg/icons/Code/user.svg" alt="iMarine" />
              </div>
              <div className="widget__right">
                <h4>{employeeInfoList && employeeInfoList.length}</h4>
                <p>Total Employee</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6">
            <div className="paid__widget two">
              <div className="widget__left">
                <img src="/media/svg/icons/Code/Vector.svg" alt="iMarine" />
              </div>
              <div className="widget__right">
                <h4>{certificateList && certificateList.length} </h4>
                <p>Total Certificates</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6">
            <div className="paid__widget three">
              <div className="widget__left three">
                <img src="/media/svg/icons/Code/Group.svg" alt="iMarine" />
              </div>
              <div className="widget__right">
                <h4>---</h4>
                <p>New Contacts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardCard;
