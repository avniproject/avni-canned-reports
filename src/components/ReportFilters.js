import React, {useState} from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DateRange from "./DateRange";
import {get, isEmpty, isNil} from 'lodash';
import moment from "moment";
import DarkerDisabledTextField from "./DarkerDisabledTextField";
import Button from "@material-ui/core/Button";
import {getQueryString} from "../utils";

export default function ReportFilters({onApply, disableFilter}) {
    const [openPicker, setOpenPicker] = useState(false);
    const [filters, setFilters] = useState({});

    const onFilterApply = () => onApply(getQueryString(filters));

    const onDateSubmit = (startDate, endDate) => {
        setOpenPicker(false);
        setFilters({
            ...filters,
            startDate: isNil(startDate) ? '' : moment(startDate).format('YYYY-MM-DD'),
            endDate: isNil(endDate) ? '' : moment(endDate).format('YYYY-MM-DD'),
        })
    };

    const getDisplayDate = () => {
        const startDate = get(filters, 'startDate');
        const endDate = get(filters, 'endDate');
        return isEmpty(startDate) ? 'Select Date' : `${startDate} To ${endDate}`;
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row', margin: 20}}>
            <DarkerDisabledTextField
                style={{cursor: 'pointer'}}
                disabled
                variant="outlined"
                onClick={() => setOpenPicker(true)}
                value={getDisplayDate()}/>
            <DateRange display={openPicker} onOk={onDateSubmit}/>
            <Button variant="contained" color={'primary'} disabled={disableFilter}
                    onClick={onFilterApply}>Apply</Button>
        </div>
    )

}
