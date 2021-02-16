import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import LoadingSpinner from '../../../master/spinner/LoadingSpinner'
import { emptyStatus } from '../../basic-information/_redux/actions/BasicInfoAction';
import { getSupplierList, supplierListDelete } from '../_redux/actions/SuppliersListAction'
import { confirmAlert } from "react-confirm-alert";
import SimpleModal from "../../../master/components/Modal/SimpleModal";
import SupplierDetails from './SupplierDetails';

const SuppliersList = () => {
    const dispatch = useDispatch();
    const supplierList = useSelector(state => state.supplierList.supplierList)
    const isLoading = useSelector(state => state.supplierList.isLoading)

    useEffect(() => {
        dispatch(getSupplierList());
    }, [])

    useEffect(() => {
        dispatch(emptyStatus());

    }, [])
    const confirmDelete = (id) => {
        dispatch(supplierListDelete(id));
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
    const [supplierDetailShow, setSupplierDetailShow] = useState(false)
    const [supplierID, setSupplierID] = useState(null)
    const itemDetail = (item) => {
        setSupplierID(item.intSupplierId);
        setSupplierDetailShow(true)
    }

    return (
        <>
            {isLoading && (
                <div className="mt-5">
                    <LoadingSpinner text="Loading Suplier List" />
                </div>
            )}
            {!isLoading && supplierList.length === 0 && (
                <div className="alert alert-warning mt-5">
                    Sorry ! No Supplier Found.
                </div>
            )}
            {!isLoading && supplierList.length > 0 && (


                <div className="react-bootstrap-table table-responsive pr-7">
                    <table className="table mt-2 tbl-standard" id="supplier-excel">
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Supplier Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supplierList && (
                                supplierList.map((item, index) => (
                                    <tr type={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.strSupplierName}</td>
                                        <td>{item.strEmail}</td>
                                        <td>{item.strContactNumber}</td>


                                        <td>
                                            {" "}
                                            <Link onClick={() => itemDetail(item)}>
                                                <i className="far fa-eye editIcon item-list-icon"></i>
                                            </Link> &nbsp;&nbsp;
                                            <Link
                                                to={`/suppliers/info/edit/${item.intSupplierId}`}
                                            >
                                                <i className="far fa-edit editIcon item-list-icon"></i>
                                            </Link>

                                            <a href>
                                                <i className="fas fa-trash-alt editIcon item-list-icon ml-4"
                                                    onClick={(id) => deleteList(item.intSupplierId)}
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
            <SimpleModal
                size="lg"
                show={supplierDetailShow}
                handleClose={() => setSupplierDetailShow(false)}
                handleShow={() => setSupplierDetailShow(true)}
                modalTitle={"Supplier Details"}
            >
                <SupplierDetails handleClose={() => setSupplierDetailShow(false)} supplierID={supplierID} />
            </SimpleModal>
        </>
    );
}

export default SuppliersList;