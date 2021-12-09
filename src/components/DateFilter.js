import React, {useState} from 'react';
import DateRange from "./DateRange";
import {get, isEmpty} from "lodash";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

const getDisplayDate = (filters) => {
    const startDate = get(filters, 'startDate');
    const endDate = get(filters, 'endDate');
    return isEmpty(startDate) ? 'Select Date' : `${startDate} To ${endDate}`;
};

const DateFilter = ({onDateSubmit, filters}) => {
    const [openPicker, setOpenPicker] = useState(false);

    const onOk = (startDate, endDate) => {
        setOpenPicker(false);
        onDateSubmit(startDate, endDate);
    };

    return (
        <FormControl fullWidth component="fieldset" sx={{width: 250}}>
            <FormLabel component="legend" sx={{marginBottom: 1}}>{"Date"}</FormLabel>
            <Box component="span" sx={{p: 1, border: '1px solid hsl(0, 0%, 80%)', borderRadius: 1}}
                 onClick={() => setOpenPicker(true)}>
                {getDisplayDate(filters)}
            </Box>
            <DateRange display={openPicker} onOk={onOk}/>
        </FormControl>
    )
};


export default DateFilter;
