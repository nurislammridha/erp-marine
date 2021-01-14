import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { Dropdown, DropdownButton } from 'react-bootstrap';

const DatePicker = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [focusedInput, setFocusedInput] = useState("");
    const [isopen, setIsopen] = useState(false);
    return (
        <div className="row">
            <div className="col-sm-4">
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="btn btn-sm">
                        Choose Date
          </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                            Today
            </Dropdown.Item>
                        <Dropdown.Item href="#/action-1">
                            Last 30 Days
            </Dropdown.Item>
                        <Dropdown.Item onClick={() => setIsopen(true)}>
                            Custom Range
            </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="col-sm-8">

                <div className={(isopen === false) ? "d-none" : "d-block"}>
                    <DateRangePicker

                        startDate={startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => {
                            setStartDate(startDate);
                            setEndDate(endDate);
                        }} // PropTypes.func.isRequired,
                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                    />
                </div>
            </div>



        </div>

    );
}

export default DatePicker;