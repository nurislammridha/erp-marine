import React from 'react';
import { Form, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input';
import Select from "react-select";

const SuppliersFilter = () => {
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
    ];
    return (
        <>
            <Form.Group as={Col} controlId="formGridState">
                <Form.Control
                    className="formHeight"
                    type="text"
                    placeholder="Search"
                    value={""}
                />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
                <RHFInput
                    className="formSelect pt-0"
                    as={<Select options={statusOptions} />}
                    rules={{ required: false }}
                    name="isActive"
                    register={register}
                    value={""}
                    setValue={setValue}
                />
            </Form.Group>
        </>
    );
}

export default SuppliersFilter;