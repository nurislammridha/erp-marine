import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DeleteItem, emptyItemSubmit, emptyMultipleItemList, getItemList } from "../_redux/actions/ItemAction";
import ItemFilter from "./ItemFilter";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import PaginationLaravel from "../../../master/pagination/PaginationLaravel";
import LoadingSpinner from "../../../master/spinner/LoadingSpinner";
import { getVesselBookingList } from "../../../voyage/booking/_redux/actions/VesselBookInfoAction";

const ItemList = () => {
  const history = useHistory();
  const itemList = useSelector(state => state.itemList.itemList)
  const itemListPaginated = useSelector(state => state.itemList.itemListPaginated)
  const isLoading = useSelector(state => state.itemList.isLoading)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  // console.log('iteList :>> ', itemList);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(emptyItemSubmit());
    dispatch(emptyMultipleItemList());
    // dispatch(getItemList());
  }, [])
  // items list with pagination
  useEffect(() => {
    dispatch(getItemList(currentPage));
    // dispatch(getVesselBookingList(currentPage));
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getItemList(data.page));
  };

  const categorySelecte = (category) => {
    dispatch(
      getVesselBookingList(currentPage, searchText, 1, category)
    );
  };

  const searchItems = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText.length === 0) {
      dispatch(getItemList(currentPage));
    } else {
      dispatch(getItemList(currentPage, searchText));
    }
  };
  //===================
 // delete issuing authority list 
 const confirmDelete = (id) => {
  dispatch(DeleteItem(id));
}
const handleDeleteItem = (id) => {
  confirmAlert({
    title: "Confirm To Delete",
    message: `Are you sure to delete..?`,
    buttons: [
      {
        label: "Yes",
        onClick: () => confirmDelete(id),
      },
      {
        label: "No"
      }
    ]
  });
};

  return (
    <div className="container">
      {/* <div className=" row p-4">
        <div className="col-xl-2 col-lg-2">
          <h3>Item List</h3>
        </div>
        <ItemFilter searchItems={searchItems} searchText={searchText} />
        <div className="col-xl-2 col-lg-2">
          <button
            className="btn btn-primary btn-sm float-right text-center custome-addnew-btn item-list-btn"
            onClick={() => history.push("/items/add")}
          >
            Add <i className="fas fa-plus pl-2 item-list-icon pt-1"></i>
          </button>
        </div>
        <div className="clear-fix"></div>
      </div> */}
              <ItemFilter searchItems={searchItems} searchText={searchText} categorySelecte={categorySelecte} />

      <div className="row">
        {/* <table className="table mt-5 voyageTable table-responsive"> */}
        <div className="react-bootstrap-table table-responsive pl-5">
          {isLoading && <LoadingSpinner text="Loading Items List..." />}
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
                    <a href
                      onClick={(id) => handleDeleteItem(item.intItemID)}
                    >
                      <i className="fas fa-trash-alt editIcon item-list-icon ml-4"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isLoading && itemList.length === 0 && (
            <div className="alert alert-warning mt-5">
              Sorry ! Items List Not Found.
            </div>
          )}
          <PaginationLaravel
            changePage={changePage}
            data={itemListPaginated}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemList;
