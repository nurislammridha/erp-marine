import React from 'react'
import { Form, Col } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
const ItemFilter = ({searchItems, searchText}) => {
    const { register, setValue } = useForm();
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
    return (
        <>

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
            </div>
        </>
    );
}

export default ItemFilter;