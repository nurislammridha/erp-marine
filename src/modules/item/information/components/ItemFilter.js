import React, { useEffect } from 'react'
import { Form, Col } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { getCertificateChildCategoryData } from '../../../certificates/certificate-category/_redux/actions/CertificateCategoryAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getItemCategory } from '../_redux/actions/ItemAction';
import { getCertificateCategory, getCertificateMainListAction } from '../../../certificates/certificate-main/_redux/actions/CertificateMainAction';
const ItemFilter = ({ searchItems, searchText, categorySelecte }) => {
    const { register, setValue } = useForm();
    const dispatch = useDispatch()
    const itemCategoryOptionData = useSelector((state) => state.itemList.itemCategoryOptionData);
    useEffect(() => {
        dispatch(getItemCategory());
        dispatch(getCertificateCategory());

      }, [])
    //   useEffect(() => {
    //     dispatch(getCertificateMainListAction(currentPage));
    //     dispatch(getCertificateCategory());
    //     dispatch(getCertificateParentCategoryData());
    //   }, [dispatch, currentPage]);
    const statusOptions = [
        {
            label: "Supplier Type",
            value: "3",
        },
        {
            label: "Supplier 2",
            value: "2",
        },
        {
            label: "Supplier 3",
            value: "1",
        },
        {
            label: "Supplier 4",
            value: "0",
        },
    ]
    const certificateChildCategoryList = useSelector(
        (state) => state.CertificateCategoryReducer.certificateChildCategoryList
      );
      const certificateParentCategoryList = useSelector(
        (state) => state.CertificateCategoryReducer.certificateParentCategoryList
      );
    return (
        <>
{/*             
            <div className="col-xl-4 col-lg-4">
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={searchItems}
                    // onChange={(e) => changeSearch(e.target.value)}
                    />
                </Form.Group>
            </div>
            <div className="col-xl-4 col-lg-4">
                <Form.Group as={Col} controlId="formGridState">
                    <RHFInput
                        className="formSelect pt-0"
                        as={<Select options={statusOptions} />}
                        rules={{ required: false }}
                        name="isActive"
                        register={register}
                        // value={""}
                        setValue={setValue}
                    />
                </Form.Group>
            </div> */}
            <div className="row m-4">
                <h1 className="tableheading">Items</h1>

                <Form.Group as={Col} controlId="formGridState">
                    <input
                        type="search"
                        value={searchText}
                        className="form-control product-search-input formHeight"
                        placeholder="Search"
                        onChange={searchItems}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                    <RHFInput
                        as={<Select options={itemCategoryOptionData} />}
                        rules={{ required: true }}
                        name="intCategoryID"
                        placeholder="Category"
                        register={register}
                        value={certificateParentCategoryList.intParentCategoryID}
                        onChange={(option) => {
                            categorySelecte(option.value);
                            setValue("intCategoryID", "");
                            dispatch(getCertificateChildCategoryData(option.value));
                        }}
                        setValue={setValue}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <RHFInput
                        as={<Select options={statusOptions} />}
                        rules={{ required: true }}
                        placeholder="Sub Category"
                        name="intCategoryID"
                        register={register}
                        value={certificateChildCategoryList.intCategoryID}
                        onChange={(option) => {
                            categorySelecte(option.value);
                        }}
                        setValue={setValue}
                    />
                </Form.Group>
                <i className="fas fa-filter tableFilter mt-1 mr-2"></i>
                <i className="far fa-filter"></i>
                <Link
                    to="/items/add"
                    className="btn btn-primary text-center text-white btn-sm custome-addnew-btn certificate-add-btn"
                >
                    Add New
            </Link>
            </div>
        </>
    );
}

export default ItemFilter;