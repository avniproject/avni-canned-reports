import React, {Fragment, useEffect, useState} from 'react';
import apis from '../api';
import DataTable from "../components/DataTable";
import ReportFilters from "../components/ReportFilters";
import Grid from "@mui/material/Grid";
import {map} from 'lodash';

export default function ActivitiesReportScreen() {

    const summaryTableRef = React.createRef();
    const [loading, setLoading] = useState(true);

    function fetchData(queryString = "") {
        Promise.all(map(
            // activityTypeToDispatcherMap,
            (setState, type) => Promise.resolve(
                apis.fetchActivity(type, queryString).then(({data}) => setState({loading: false, data}))
            ))
        ).then(() => setLoading(false));
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);


    return (
        <Fragment>
            <ReportFilters onApply={(queryString) => fetchData(queryString)} disableFilter={loading} displayTypeFilter/>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flexStart'}}>
                <Grid item xs={12}>
                    <DataTable
                        tableRef={summaryTableRef}
                        title={'Summary of Organisation Tables'}
                        columns={[
                            {title: 'Name', field: 'tableName'},
                            {title: 'Type', field: 'tableType'},
                            {title: 'Link to detailed analysis'},
                        ]}
                        fetchData={apis.fetchSummaryTable}
                        onResolve={data => ({data})}
                    />
                </Grid>
        </div>
        </Fragment>
    )
}
