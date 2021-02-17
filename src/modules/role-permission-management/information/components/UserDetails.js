import React, { useEffect } from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../_redux/actions/RolePermissionManagementAction";
import LoadingSpinner from "../../../master/spinner/LoadingSpinner";

const UserDetails = ({ id, handleClose }) => {
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userRole.userDetails);
    const detailsLoading = useSelector((state) => state.userRole.detailsLoading);

    useEffect(() => {
        dispatch(getUserDetails(id))
    }, [])
    return (
        <>
            {detailsLoading && <LoadingSpinner text="user details loading...." />}
            {
                userDetails && (
                    <>
                        <Row className="mt-3">
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>First Name</p>
                                <h5>{userDetails.first_name !== null && userDetails.first_name !== "" ? userDetails.first_name : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Surname</p>
                                <h5>{userDetails.username !== null && userDetails.username !== "" ? userDetails.username : "---"}</h5>                </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Last Name</p>
                                <h5>{userDetails.last_name !== null && userDetails.last_name !== "" ? userDetails.last_name : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Email</p>
                                <h5>{userDetails.email !== null && userDetails.email !== "" ? userDetails.email : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Phone</p>
                                <h5>{userDetails.phone_no !== null && userDetails.phone_no !== "" ? userDetails.phone_no : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Role</p>
                                <Badge className="mt-2" variant="primary"> {userDetails.role_name !== null && userDetails.role_name !== "" ? userDetails.role_name : "not set yet"} </Badge>
                            </Col>
                        </Row>
                    </>
                )
            }
            <Button variant="secondary" className="float-right" onClick={handleClose}>Close</Button>
        </>
    );
};

export default UserDetails;