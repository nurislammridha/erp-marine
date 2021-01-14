import React, { useEffect } from 'react'
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getLaytimeList } from '../../_redux/actions/LaytimeInfoAction';

const LaytimeList = () => {
    const dispatch = useDispatch();
    const laytimeData = useSelector(
        (state) => state.laytimeInfo.laytimeList
    );
    useEffect(() => {
        dispatch(getLaytimeList());
    }, [])
    console.log('laytimeDate :>> ', laytimeData);
    return (
        <div className="react-bootstrap-table table-responsive">
            <table className="table table table-head-custom table-vertical-center voyageTable">
                <thead>
                    <tr>
                        <th tabindex="0">
                            {" "}
                            <Form.Group controlId="formBasicChecbox">
                                <Form.Check type="checkbox" />
                            </Form.Group>
                        </th>
                        <th>VOYAGE NO</th>
                        <th>DATE</th>
                        <th>CHARTARER NAME</th>
                        <th>BALANCE</th>
                        <th>COMMISION</th>

                        <th class="text-right pr-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {laytimeData &&
                        laytimeData.map((item, index) => (
                            <tr>
                                <th scope="row">
                                    {" "}
                                    <Form.Check type="checkbox" />
                                </th>
                                <td>{item.intVoyageNumber}</td>
                                <td>{item.dteCommencedDate}</td>
                                <td>Md Akij Noor</td>
                                <td>23,00,00 USD</td>
                                <td>{item.numCommision}</td>
                                <td className="text-right pr-3 mt-3">
                                    {" "}
                                    <i className="far fa-edit editIcon"></i>
                                    <i className="fas fa-trash-alt editIcon ml-4"></i>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div>
    );
}

export default LaytimeList;