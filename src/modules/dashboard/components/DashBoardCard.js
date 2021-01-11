import React from "react";
const DashBoardCard = () => {
  return (
    <>
      <div className="container dashboard__pb">
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
                <h4>400</h4>
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
                <h4>86 </h4>
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
                <h4>50 </h4>
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
