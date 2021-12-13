import React, {useState, useEffect} from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {isNil, pickBy, identity, isEmpty} from 'lodash';
import moment from "moment";
import {getQueryString} from "../utils";
import api from "../api";
import TypeFilters from "./TypeFilters";
import Button from "@mui/material/Button";
import DateFilter from "./DateFilter";
import Grid from "@mui/material/Grid";
import AddressLevelsByType from "./AddressLevelsByType";
import UserGroupFilter from "./UserGroupFilter";

export default function ReportFilters({onApply, disableFilter, displayTypeFilter, displayGroupFilter}) {
    const [filters, setFilters] = useState({});
    const [operationalModules, setOperationalModules] = useState([]);

    useEffect(() => {
        api.fetchOperationalModules().then(om => setOperationalModules(om))
    }, []);

    const onFilterApply = () => onApply(getQueryString(pickBy(pickBy(filters, v => !isEmpty(v)), identity)));

    const onDateSubmit = (startDate, endDate) => {
        setFilters({
            ...filters,
            startDate: isNil(startDate) ? '' : moment(startDate).format('YYYY-MM-DD'),
            endDate: isNil(endDate) ? '' : moment(endDate).format('YYYY-MM-DD'),
        })
    };

    return (
        <Grid container direction={'row'} alignItems={'center'} spacing={2}>
            <Grid item>
                <DateFilter filters={filters} onDateSubmit={onDateSubmit}/>
            </Grid>
            <Grid item>
                <AddressLevelsByType onValueChange={setFilters}/>
            </Grid>
            {displayGroupFilter &&
            <Grid item>
                <UserGroupFilter onValueChange={setFilters}/>
            </Grid>}
            {displayTypeFilter &&
            <Grid item>
                <TypeFilters operationalModules={operationalModules} onValueChange={setFilters}/>
            </Grid>}
            <Grid item>
                <div style={{marginTop: '28px'}}>
                    <Button variant="contained" color={'primary'} disabled={disableFilter}
                            onClick={onFilterApply}>Apply</Button>
                </div>
            </Grid>
        </Grid>
    )
};
