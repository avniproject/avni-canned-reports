import React, {useState, useEffect} from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DateRange from "./DateRange";
import {get, isEmpty, isNil, pickBy, identity} from 'lodash';
import moment from "moment";
import DarkerDisabledTextField from "./DarkerDisabledTextField";
import {getQueryString} from "../utils";
import api from "../api";
import TypeFilters from "./TypeFilters";
import {Space} from "./Space";
import Button from "@mui/material/Button";

export default function ReportFilters({onApply, disableFilter}) {
    const [openPicker, setOpenPicker] = useState(false);
    const [filters, setFilters] = useState({});
    const [operationalModules, setOperationalModules] = useState([]);

    useEffect(() => {
        api.fetchOperationalModules().then(om => setOperationalModules(om))
    }, []);

    const onFilterApply = () => onApply(getQueryString(pickBy(filters, identity)));

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
        <div style={{display: 'flex', flexDirection: 'row', margin: 20, alignItems: 'center'}}>
            <div>
                <p>Date</p>
                <DarkerDisabledTextField
                    margin="dense" style={{height: 52}}
                    disabled
                    variant="outlined"
                    onClick={() => setOpenPicker(true)}
                    value={getDisplayDate()}/>
            </div>
            <DateRange display={openPicker} onOk={onDateSubmit}/>
            <Space/>
            <TypeFilters operationalModules={operationalModules} onValueChange={setFilters}/>
            <Space size={15}/>
            <div style={{marginTop: '50px'}}>
                <Button variant="contained" color={'primary'} disabled={disableFilter}
                        onClick={onFilterApply}>Apply</Button>
            </div>
        </div>
    )

}
