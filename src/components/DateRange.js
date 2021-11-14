import React, {useState} from 'react';
import {DateRangePicker} from "react-date-range";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

export default function DateRange({display, onOk}) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleDateSelection = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const onSubmit = () => {
        onOk(startDate, endDate);
    };

    const onReset = () => {
        setStartDate(new Date());
        setEndDate(new Date());
        onOk();
    };

    return (
        <Modal open={display}
               style={{width: '30%', position: 'fixed', top: 55, left: '22%', height: 30, outline: 'none'}}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: 'white',
                outline: 'none',
                borderRadius: 5
            }}>
                <DateRangePicker
                    ranges={[{
                        startDate: startDate,
                        endDate: endDate,
                        key: 'selection',
                    }]}
                    onChange={handleDateSelection}
                />
                <div style={{alignSelf: 'flex-end'}}>
                    <Button color="primary" onClick={onReset}>Reset</Button>
                    <Button color="primary" onClick={onSubmit}>Ok</Button>
                </div>
            </div>
        </Modal>
    )
}
