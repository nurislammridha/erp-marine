import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CertificateTypeEdit from "../edit/CertificateTypeEdit";
import { EditCertificateTypeList, getCertificateTypeList } from "../../_redux/actions/CertificateTypeAction";
import { useDispatch, useSelector } from "react-redux";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";

const CertificateTypeList = (props) => {

    const dispatch = useDispatch();
    const certificateTypeData = useSelector((state) => state.certificateTypeInfo.certificateTypeList);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        dispatch(getCertificateTypeList());
    }, []);



    const handlegetEdit = (data) => {
        handleShow();
        dispatch(EditCertificateTypeList(data));
    }

    return (
        <div className="react-bootstrap-table table-responsive">
            <table className="table mt-2 tbl-standard" id="table-to-xls">
                <thead>
                    <tr>
                        <th scope="col">Certificate Type</th>
                        <th scope="col">Created By</th>
                        <th scope="col">Created Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {certificateTypeData &&
                        certificateTypeData.map((item, index) => (
                            <tr>
                                <td>{item.strCertificateTypeName}</td>
                                <td>{item.intActionBy}</td>
                                <td>{item.dteLastActionDateTime}</td>
                                <td>{item.isActive ? "Active" : "Inactive"}</td>
                                <td>
                                    {" "}
                                    <Link to={``}>
                                        <i className="far fa-eye mr-3"></i>
                                    </Link>

                                    <a><i className="far fa-edit ml-2" onClick={() => handlegetEdit(item.intCertificateTypeID)}></i></a>

                                </td>
                            </tr>
                        ))}

                </tbody>
            </table>


            <SimpleModal
                show={show}
                size="lg"
                handleClose={() => handleClose()}
                modalTitle={"Certificate Type Add"}
            >
                <CertificateTypeEdit />
            </SimpleModal>
        </div>
    );
};

export default CertificateTypeList;
