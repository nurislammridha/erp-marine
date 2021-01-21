import React from "react";

const ItemList = () => {
  return (
    <div className="container">
      <div className=" row p-4">
        <div className="col-xl-9 col-lg-9">
          <h3>Item List</h3>
        </div>
        <div className="col-xl-3 col-lg-3">
          <button className="btn btn-primary btn-sm float-right text-center custome-addnew-btn item-list-btn">
            Add <i className="fas fa-plus pl-2 item-list-icon pt-1"></i>
          </button>
        </div>
        <div className="clear-fix"></div>
      </div>
      <div className="row">
        {/* <table className="table mt-5 voyageTable table-responsive"> */}
        <div className="react-bootstrap-table table-responsive pl-5">
          <table className="table table table-head-custom table-vertical-center  voyageTable itemtable ">
            <thead>
              <tr>
                <th scope="col">SL</th>

                <th scope="col">Department</th>
                <th scope="col">ITEM NAME</th>
                <th scope="col">UOM</th>
                <th scope="col">ITEM TYPE</th>
                <th scope="col">ITEM CATEGORY</th>
                <th scope="col">PART NO</th>
                <th scope="col">MODEL</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>engine</td>
                <td>Container Cargo</td>
                <td>Durres(Durazzo)</td>
                <td>Akij Noor</td>
                <td>Chottogram</td>
                <td>Chottogram</td>
                <td>Chottogram</td>

                <td>
                  {" "}
                  <i className="far fa-edit editIcon item-list-icon"></i>
                  <i className="fas fa-trash-alt editIcon item-list-icon ml-4"></i>
                </td>
              </tr>
              <tr>
                <td>02</td>
                <td>engine</td>
                <td>Container Cargo</td>
                <td>Durres(Durazzo)</td>
                <td>Akij Noor</td>
                <td>Chottogram</td>
                <td>Chottogram</td>
                <td>Chottogram</td>

                <td className="">
                  {" "}
                  <i className="far fa-edit editIcon item-list-icon"></i>
                  <i className="fas fa-trash-alt editIcon item-list-icon ml-4"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
