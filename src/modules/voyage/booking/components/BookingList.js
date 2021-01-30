import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { InputBase, Paper, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getVesselBookingList, vesselBookingDelete } from "../_redux/actions/VesselBookInfoAction";
import moment from "moment";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SimpleModal from "../../../master/components/Modal/SimpleModal";
import VesselBookingDetails from "../../../utility/VesselBookingDetails";
import LoadingSpinner from "../../../master/spinner/LoadingSpinner";
import PaginationLaravel from "../../../master/pagination/PaginationLaravel";
const BookingList = () => {

  const dispatch = useDispatch();
  const VesselBookingList = useSelector((state) => state.VesselBookingReducer.VesselBookingList);
  const vesselPaginateData = useSelector((state) => state.VesselBookingReducer.vesselPaginateData);
  const isLoading = useSelector((state) => state.VesselBookingReducer.isLoading);
  const [bookDetailShow, setBookDetailShow] = useState(false)
  const [bookDetailClose, setBookDetailClose] = useState(false)
  const [status, setStatus] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  // get vessel booking id
  const [vesselBookingID, setVesselBookingID] = useState(null);
  const getVesselBookingID = (item) => {
    setVesselBookingID(item.intShipBookingId);
    setStatus(item.strBookingStatus)
    setBookDetailShow(true)
  }

  useEffect(() => {
    dispatch(getVesselBookingList(currentPage));
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getVesselBookingList(data.page));
  };

  // const certificateSelect = (category) => {
  //   dispatch(
  //     getVesselBookingList(currentPage, searchText, 1, category)
  //   );
  // };

  const searchProduct = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText.length === 0) {
      dispatch(getVesselBookingList(currentPage));
    } else {
      dispatch(getVesselBookingList(currentPage, searchText));
    }
  };

  // delete issuing authority list 
  const confirmDelete = (id) => {
    dispatch(vesselBookingDelete(id));
  }
  const deleteVesselBookDetails = (id) => {
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
    <Card>
      <Card.Body>
        <div className="container ">
          <div className="row mb-5 table-form ">
            <h1 className="tableheading mt-0 ">Booking List</h1>

            <hr></hr>
            <div className="col-xl-4 col-lg-4 col-5 mb-2">
              <Paper className="searchInput">
                <IconButton aria-label="Search" className="searchPlaceholder">
                  <i className="flaticon-search "></i>
                </IconButton>
                <InputBase
                  placeholder="Search "
                  value={searchText}
                  onChange={searchProduct}
                // inputProps={{ "aria-label": "Search Google Maps" }}
                // onChange={(e) => searchEmployee(e)}
                // value={employeeInfo.employeeName}
                />
              </Paper>
            </div>
            {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-0"></div> */}

            <div>
              <Link to="/voyage/booking/bookingentry">
                <Button className="btn-sm" variant="primary">
                  Add New
              </Button>
              </Link>

            </div>
          </div>
          {isLoading && <LoadingSpinner text="Loading Vessel Booking List..." />}
          <div className="row">
            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center  voyageTable">
                <thead>
                  <tr>
                    <th scope="col">SL No</th>
                    <th scope="col">CHARTER NAME</th>
                    <th scope="col">SHIP NAME</th>
                    <th scope="col">VOYAGE TYPE</th>
                    <th scope="col">COMMENCE PORT</th>
                    <th scope="col">COMMENCE DATE</th>
                    <th scope="col">COMPLETION PORT</th>
                    <th scope="col">COMPLETION DATE</th>
                    <th scope="col">VESSEL DWT</th>
                    <th scope="col">ON HIRE DATE</th>
                    <th scope="col">FREIGHT DATE</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    VesselBookingList.length > 0 && VesselBookingList.map((item, index) => (
                      <tr>
                        <td onClick={(id) => getVesselBookingID(item)}>{index + 1}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strCargoName !== null && item.strCargoName !== '' ? item.strCargoName : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strShipName !== null && item.strShipName !== '' ? item.strShipName : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strVoyageNo !== null && item.strVoyageNo !== '' ? item.strVoyageNo : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strCommencePortName !== null && item.strCommencePortName !== '' ? item.strCommencePortName : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.dteCommenceDate !== null && item.dteCommenceDate !== '' ? moment(item.dteCommenceDate).format("DD-MM-YYYY") : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strCompletionPortName !== null && item.strCompletionPortName !== '' ? item.strCompletionPortName : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.dteCompletionDate !== null && item.dteCompletionDate !== '' ? moment(item.dteCompletionDate).format("DD-MM-YYYY") : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strCommencePortName !== null && item.strCommencePortName !== '' ? item.strCommencePortName : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strCommencePortName !== null && item.strCommencePortName !== '' ? item.strCommencePortName : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.numFreightOrHireRate !== null && item.numFreightOrHireRate !== '' ? item.numFreightOrHireRate : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>
                          <button className={item.strBookingStatus === "Rejected" ? "btn rejected-status booking-list-btn text-danger" : (item.strBookingStatus === "Pending" ? "btn pending-status booking-list-btn text-warning" : "btn approve-status booking-list-btn text-success")}>
                            {item.strBookingStatus !== null && item.strBookingStatus !== '' ? item.strBookingStatus : ''}
                          </button>
                        </td>
                        {/* intBookingStatusId */}
                        <td className="mt-3">
                          {" "}
                          <Link to={`/voyage/booking/bookingEdit/${item.intShipBookingId}`}><i className="far fa-edit editIcon item-list-icon cursor-pointer"></i></Link>
                          <i className="fas fa-trash-alt editIcon item-list-icon ml-2 cursor-pointer" onClick={() => deleteVesselBookDetails(item.intShipBookingId)}></i>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {!isLoading && VesselBookingList.length === 0 && (
                <div className="alert alert-warning mt-5">
                  Sorry ! Vessel Booking List Not Found.
                </div>
              )}
              <PaginationLaravel
                changePage={changePage}
                data={vesselPaginateData}
              />
            </div>
          </div>
        </div>
        {/*  */}
      </Card.Body>
      <SimpleModal
        size="xl"
        status={status}
        show={bookDetailShow}
        handleClose={() => setBookDetailShow(false)}
        handleShow={() => setBookDetailShow(true)}
        vesselBookingID={vesselBookingID}
        modalTitle={"Vessel Booking Details"}
      >
        <VesselBookingDetails handleClose={() => setBookDetailShow(false)} vesselBookingID={vesselBookingID} />
      </SimpleModal>
    </Card>
  );
};

export default BookingList;
