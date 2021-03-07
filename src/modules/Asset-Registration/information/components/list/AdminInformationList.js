import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import LoadingSpinner from '../../../../master/spinner/LoadingSpinner';
import { getAdminInfoList, handleChangeAdminListFilterInput } from '../../_redux/actions/AdminInfoListAction';

const AdminInformationList = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.adminInfoList.isLoading)
    const adminList = useSelector((state) => state.adminInfoList.adminListData)

    useEffect(() => {
        dispatch(getAdminInfoList());
    }, [])


    const confirmDelete = (id) => {
        // dispatch(supplierListDelete(id));
    }

    const deleteList = (id) => {
        confirmAlert({
            title: "Confirm To Delete",
            message: `Are you sure to delete..?`,
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
        <>

            {isLoading && (
                <div className="mt-5">
                    <LoadingSpinner text="Loading admin List" />
                </div>
            )}
            {!isLoading && adminList.length === 0 && (
                <div className="alert alert-warning mt-5">
                    Sorry ! No Admin Found.
                </div>
            )}
            {!isLoading && adminList.length > 0 && (


                <div className="react-bootstrap-table table-responsive pr-7 mt-3">
                    <table className="table mt-2 tbl-standard" id="admin-excel">
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Supplier Name</th>
                                <th scope="col">PO Number</th>
                                <th scope="col">Asset Location</th>
                                <th scope="col">Name of Manufacturer</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminList && (
                                adminList.map((item, index) => (
                                    <tr type={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.strSupplierName}</td>
                                        <td>{item.strPONumber}</td>
                                        <td>{item.strAssetLocation}</td>
                                        <td>{item.strNameOfManufacture}</td>


                                        <td>
                                            {" "}
                                            <Link >
                                                <i className="far fa-eye editIcon item-list-icon"></i>
                                            </Link> &nbsp;&nbsp;
                                            <Link to={`/admin-information/edit/${item.intAdminInfoId}`}>
                                                <i className="far fa-edit editIcon item-list-icon"></i>
                                            </Link>

                                            <a href>
                                                <i className="fas fa-trash-alt editIcon item-list-icon ml-4"
                                                    onClick={(id) => deleteList(item.intAdminInfoId)}
                                                >
                                                </i>
                                            </a>
                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>

            )}
        </>
    );
}

export default AdminInformationList;
