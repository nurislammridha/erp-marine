import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getItemList } from "../_redux/actions/ItemAction";
import ItemFilter from "./ItemFilter";

const ItemList = () => {
  const history = useHistory();
  const itemList = useSelector(state => state.itemList.getItemList)
  // console.log('iteList :>> ', itemList);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getItemList())
  }, [])
  return (
    <div className="container">
      <div className=" row p-4">
        <div className="col-xl-2 col-lg-2">
          <h3>Item List</h3>
        </div>
        <ItemFilter />
        <div className="col-xl-2 col-lg-2">
          <button
            className="btn btn-primary btn-sm float-right text-center custome-addnew-btn item-list-btn"
            onClick={() => history.push("/items/add")}
          >
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
              {itemList && itemList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.strDepartmentName}</td>
                  <td>{item.StrItemTypeName}</td>
                  <td>{item.strUoM}</td>
                  <td>{item.StrItemTypeName}</td>
                  <td>{item.strItemCategoryName}</td>
                  <td>{item.strPartNo}</td>
                  <td>{item.strModelNo}</td>
                  <td>
                    {" "}
                    <a href>
                      <i className="far fa-edit editIcon item-list-icon"></i>
                    </a>
                    <i className="fas fa-trash-alt editIcon item-list-icon ml-4"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
