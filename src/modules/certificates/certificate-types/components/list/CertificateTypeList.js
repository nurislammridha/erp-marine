import React, { useEffect, useState } from "react";
import CertificateTypeEdit from "../edit/CertificateTypeEdit";
import {
    EditCertificateTypeList,
    getCertificateTypeList,
} from "../../_redux/actions/CertificateTypeAction";
import { useDispatch, useSelector } from "react-redux";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";

const CertificateTypeList = (props) => {
    const dispatch = useDispatch();
    const certificateTypeData = useSelector(
        (state) => state.certificateTypeInfo.certificateTypeList
    );
    const modalStatus = useSelector(
        (state) => state.certificateTypeInfo.editStatus
    );

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getCertificateTypeList());
        if (modalStatus) {
            setShow(false);
            dispatch(getCertificateTypeList());
        }
    }, [modalStatus]);

    const handlegetEdit = (data) => {
        handleShow();
        dispatch(EditCertificateTypeList(data));
    };

    return (

        <div className="react-bootstrap-table table-responsive pr-7">
            <table className="table mt-2 tbl-standard">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Certificate Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {certificateTypeData &&
                        certificateTypeData.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.strCertificateTypeName}</td>
                                <td>{item.isActive === "1" ? "Active" : "Inactive"}</td>
                                <td className="mt-3">
                                    <a>
                                        <i
                                            className="far fa-edit editIcon"
                                            onClick={() => handlegetEdit(item.intCertificateTypeID)}
                                        ></i>
                                    </a>
                                    {/* <i className="fas fa-trash-alt editIcon ml-4"></i> */}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <SimpleModal
                show={show}
                handleClose={() => handleClose()}
                modalTitle={"Certificate Type Edit"}
            >
                <CertificateTypeEdit />
            </SimpleModal>
        </div>
    );
};

export default CertificateTypeList;
