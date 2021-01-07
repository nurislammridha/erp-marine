import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getCertificateMainListAction } from '../../_redux/actions/CertificateMainAction';
import LoadingSpinner from './LoadingSpinner';
import PaginationLaravel from './PaginationLaravel';

const CertificateMainList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');

    const isLoading = useSelector((state) => state.certificateMainInfo.isLoading);
    const certificates = useSelector((state) => state.certificateMainInfo.certificates);
    const certificatesPaginatedData = useSelector((state) => state.product.certificatesPaginatedData);

    useEffect(() => {
        dispatch(getCertificateMainListAction(currentPage));
    }, [dispatch, currentPage]);

    const changePage = (data) => {
        setCurrentPage(data.page);
        dispatch(getCertificateMainListAction(data.page));
    }

    const searchProduct = (e) => {
        const searchText = e.target.value;
        setSearchText(searchText)
        if (searchText.length === 0) {
            dispatch(getCertificateMainListAction(currentPage));
        } else {
            dispatch(getCertificateMainListAction(currentPage, searchText));
        }
    }

    return (
        <>
            <div className="mb-2">
                <div className="float-left">
                    <input type="search" value={searchText} className="form-control product-search-input" placeholder="Search By Title, Description, Price" onChange={searchProduct} />
                </div>
                <div className="float-right">
                    <PaginationLaravel isDescription={false} changePage={changePage} data={certificatesPaginatedData} />
                </div>
                <div className="clearfix"></div>
            </div>
            {
                isLoading &&
                <LoadingSpinner text="Loading Products..." />
            }
            {
                !isLoading && certificates.length === 0 &&
                <div className="alert alert-warning">
                    Sorry ! No Product Found.
                </div>
            }
            {
                !isLoading && certificates.length > 0 &&
                <>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className='td-sl'>Sl</th>
                                    <th className='td-product-title'>Product</th>
                                    <th>Price</th>
                                    <th className='td-description'>Description</th>
                                    <th className='td-upload-info'>Upload Information</th>
                                    <th className='td-action'>Action</th>
                                </tr>
                            </thead>
                        </table>

                        <PaginationLaravel changePage={changePage} data={certificatesPaginatedData} />
                    </div>
                </>

            }
        </>
    );
}

export default CertificateMainList;