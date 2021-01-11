import React from "react";
const DashBoardCard = () => {
  return (
    <>
      <div className="container dashboard__pb">
        <div className="row">
          <div className="col-lg-3">
            <div className="paid__widget">
              <div className="widget__left">
                {/* <span></span>
                 */}
                <img src="/media/svg/icons/Code/expense.svg" alt="iMarine" />
              </div>
              <div className="widget__right">
                <h4>2,00,000 </h4>
                <p>Total Expense</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="paid__widget one">
              <div className="widget__left">
                <span></span>
              </div>
              <div className="widget__right">
                <h4>2,00,000</h4>
                <p>Total Employee</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="paid__widget two">
              <div className="widget__left">
                <span></span>
              </div>
              <div className="widget__right">
                <h4>2,00,000 </h4>
                <p>Total Certificates</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="paid__widget three">
              <div className="widget__left">
                <span></span>
              </div>
              <div className="widget__right">
                <h4>2,00,000 </h4>
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
