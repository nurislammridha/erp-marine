import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import LoadingSpinner from '../../../master/spinner/LoadingSpinner'
import { getSupplierList } from '../_redux/actions/SuppliersListAction'

const SuppliersList = () => {
    const dispatch = useDispatch();
    const supplierList = useSelector(state => state.supplierList.supplierList)
    const isLoading = useSelector(state => state.supplierList.isLoading)
    // console.log('supplierList List:>> ', isLoading);
    useEffect(() => {
        dispatch(getSupplierList())
    }, [])
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
                                            <a>
                                                <i className="fas fa-eye"></i>
                                            </a> &nbsp;&nbsp;
                                            <Link
                                                to={`/suppliers/info/edit/${item.intSupplierId}`}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Link> &nbsp;&nbsp;
                                            <a>
                                                <i className="fas fa-trash-alt"></i>
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

export default SuppliersList;