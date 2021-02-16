import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DeleteItem, emptyItemSubmit, emptyMultipleItemList, getItemList } from "../_redux/actions/ItemAction";
import ItemFilter from "./ItemFilter";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import PaginationLaravel from "../../../master/pagination/PaginationLaravel";
import LoadingSpinner from "../../../master/spinner/LoadingSpinner";
import { getVesselBookingList } from "../../../voyage/booking/_redux/actions/VesselBookInfoAction";
import SimpleModal from "../../../master/components/Modal/SimpleModal";
import ItemDetails from "./ItemDetails";

const ItemList = () => {
  const history = useHistory();
  const itemList = useSelector(state => state.itemList.itemList)
  const itemListPaginated = useSelector(state => state.itemList.itemListPaginated)
  const isLoading = useSelector(state => state.itemList.isLoading)
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(emptyItemSubmit());
    dispatch(emptyMultipleItemList());
  }, [])
  // items list with pagination
  useEffect(() => {
    dispatch(getItemList(currentPage));
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getItemList(data.page));
  };
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

  const [itemDetailShow, setItemDetailShow] = useState(false)
  const [itemID, setItemID] = useState(null)
  const itemDetail = (item) => {
    setItemID(item.intItemID);
    setItemDetailShow(true)
  }
  return (
    <>
      <div className="card card-custom gutter-b pl-5 pr-5 mb-5 card-top-border">
        {/* <div className="container"> */}
        <ItemFilter
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <div className="row">
          {/* <table className="table mt-5 voyageTable table-responsive"> */}
          <div className="react-bootstrap-table table-responsive border-0 pl-5">
            {/* {isLoading && <LoadingSpinner text="Loading Items List..." />} */}
            <table className="table table-head-custom table-vertical-center  item-add-table">
              <thead>
                <tr>
                  <th scope="col">SL</th>

                  {/* <th scope="col">Department</th> */}
                  <th scope="col">ITEM NAME</th>
                  <th scope="col">UOM</th>
                  <th scope="col">ITEM TYPE</th>
                  {/* <th scope="col">ITEM CATEGORY</th> */}
                  <th scope="col">PART NO</th>
                  {/* <th scope="col">MODEL</th> */}
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {itemList && itemList.map((item, index) => (
                  <tr>
                    <td>{itemListPaginated.from + index}</td>
                    {/* <td>{item.strDepartmentName}</td> */}
                    <td>{item.strItemName}</td>
                    <td>{item.strUoM}</td>
                    <td>{item.StrItemTypeName}</td>
                    {/* <td>{item.strItemCategoryName}</td> */}
                    <td>{item.strPartNo}</td>
                    {/* <td>{item.strModelNo}</td> */}
                    <td>
                      {" "}
                      <Link onClick={() => itemDetail(item)}>
                        <i className="far fa-eye editIcon item-list-icon"></i>
                      </Link>
                      <Link to={`/items/edit/${item.intItemID}`}>
                        <i className="far fa-edit editIcon item-list-icon ml-4"></i>
                      </Link>
                      <a href onClick={(id) => handleDeleteItem(item.intItemID)} >
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
        <SimpleModal
          size="lg"
          show={itemDetailShow}
          handleClose={() => setItemDetailShow(false)}
          handleShow={() => setItemDetailShow(true)}
          modalTitle={"Item Details"}
        >
          <ItemDetails handleClose={() => setItemDetailShow(false)} itemID={itemID} />
        </SimpleModal>
        {/* </div> */}
      </div>
    </>
  );
};

export default ItemList;
