import React, {useState, useEffect} from 'react';
import apis from "../api";
import Grid from "@mui/material/Grid";
import ActivityPieChart from "../components/ActivityPieChart";
import _ from 'lodash';
import DataTable from "../components/DataTable";
import moment from "moment";
import ReportFilters from "../components/ReportFilters";

export default function HrReportScreen() {

    const [deviceModels, setDeviceModels] = useState({loading: true, data: []});
    const [appVersions, setAppVersions] = useState({loading: true, data: []});
    const [queryString, setQueryString] = useState("");
    const overAllActivityRef = React.createRef();
    const syncFailureRef = React.createRef();
    const userDetailsRef = React.createRef();
    const syncTelemetryRef = React.createRef();
    const medianSyncRef = React.createRef();
    const isLoading = deviceModels.loading || appVersions.loading;
    const inDateIncludedInFilters = _.includes(queryString, 'startDate');

    useEffect(() => {
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (overAllActivityRef.current) {
            refreshTables();
        }
    }, [queryString]); // eslint-disable-line react-hooks/exhaustive-deps

    const syncTelemetryColumns = [
        {
            title: 'User',
            field: 'userName',
        },
        {
            title: 'Android version',
            field: 'androidVersion',
        },
        {
            title: 'App version',
            field: 'appVersion',
        },
        {
            title: 'Device name',
            field: 'deviceModel',
        },
        {
            title: 'Sync start time',
            field: 'syncStart',
            render: rowData => moment(rowData.syncStart).format("D/M/YYYY h:mm a")
        },
        {
            title: 'Sync end time',
            field: 'syncEnd',
            render: rowData => moment(rowData.syncEnd).format("D/M/YYYY h:mm a") 
        },
        {
            title: 'Sync status',
            field: 'syncStatus',
        },
        {
            title: 'Sync source',
            field: 'syncSource',
        },
    ];

    const fetchData = (queryString = "") => {
        Promise.all([
            apis.fetchUserDeviceModels(queryString)
                .then(data => setDeviceModels({loading: false, data})),
            apis.fetchUserAppVersions(queryString)
                .then(data => setAppVersions({loading: false, data})),
        ]);
    };

    const startLoading = () => {
        setDeviceModels({loading: true});
        setAppVersions({loading: true});
    };

    const refreshTables = () => {
        overAllActivityRef.current && overAllActivityRef.current.onQueryChange();
        syncFailureRef.current && syncFailureRef.current.onQueryChange();
        userDetailsRef.current && userDetailsRef.current.onQueryChange();
        syncTelemetryRef.current && syncTelemetryRef.current.onQueryChange();
        medianSyncRef.current && medianSyncRef.current.onQueryChange();
    };

    const fetchDataAndRefreshTables = async (queryString) => {
        startLoading();
        let query = queryString;
        if (_.includes(query, 'locationIds') || _.includes(query, 'groupId')) {
            const ids = await apis.fetchCommonUserIds(queryString);
            const userIds = _.isEmpty(ids) ? '0' : _.join(ids, ',');
            query += `&userIds=${userIds}`;
        }
        setQueryString(query);
        fetchData(query);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flexStart'}}>
            <div style={{marginBottom: 50}}>
                <ReportFilters displayGroupFilter onApply={(queryString) => fetchDataAndRefreshTables(queryString)}
                               disableFilter={isLoading}/>
            </div>
            <Grid container spacing={2} direction={'row'}>
                <Grid item xs={7}>
                    <DataTable
                        tableRef={overAllActivityRef}
                        title={'Top 10 users by Overall Activity'}
                        columns={[
                            {title: 'User', field: 'userName'},
                            {title: 'Registrations', field: 'registrationCount'},
                            {title: 'Enrolments', field: 'programEnrolmentCount'},
                            {title: 'Program Encounters', field: 'programEncounterCount'},
                            {title: 'General Encounters', field: 'generalEncounterCount'},
                        ]}
                        fetchData={apis.fetchUserActivities}
                        onResolve={data => ({data})}
                        filterQueryString={queryString}
                    />
                </Grid>
                <Grid item xs={5}>
                    <DataTable
                        tableRef={syncFailureRef}
                        title={'Top 10 users by Sync Failures'}
                        columns={[
                            {title: 'User', field: 'userName'},
                            {title: 'Total Sync failures', field: 'count'}
                        ]}
                        fetchData={apis.fetchUserSyncFailures}
                        onResolve={data => ({data})}
                        filterQueryString={queryString}
                    />
                </Grid>
            </Grid>
            <Grid container direction={'row'} spacing={2}>
                <Grid item xs={6}>
                    <ActivityPieChart
                        loading={deviceModels.loading}
                        data={deviceModels.data}
                        chartName={'Device models'}
                        height={350}
                        showDateFilterMessage={inDateIncludedInFilters}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ActivityPieChart
                        loading={appVersions.loading}
                        data={appVersions.data}
                        chartName={'App versions'}
                        height={350}
                        showDateFilterMessage={inDateIncludedInFilters}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <DataTable
                        tableRef={userDetailsRef}
                        title={'User details'}
                        dateFilterDisabled
                        columns={[
                            {title: 'User', field: 'userName'},
                            {title: 'App version', field: 'appVersion'},
                            {title: 'Device model', field: 'deviceModel'},
                            {
                                title: 'Last successful sync time',
                                field: 'lastSuccessfulSync',
                                render: rowData => moment(rowData.lastSuccessfulSync).format("D/M/YYYY h:mm a")
                            },
                        ]}
                        fetchData={apis.fetchUserDetails}
                        onResolve={data => ({data})}
                        filterQueryString={queryString}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DataTable
                        tableRef={syncTelemetryRef}
                        title={'Sync telemetry - Latest Syncs'}
                        columns={syncTelemetryColumns}
                        fetchData={apis.fetchSyncTelemetry}
                        onResolve={data => ({data})}
                        filterQueryString={queryString}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DataTable
                        tableRef={medianSyncRef}
                        title={'Week-wise Median Sync Time (past 3 months) '}
                        columns={[
                            {
                                title: 'Start Date', 
                                field: 'syncStart',
                                render: rowData => moment(rowData.syncStart).format("D/M/YYYY")
                            },
                            {
                                title: 'End Date', 
                                field: 'syncEnd',
                                render: rowData => moment(rowData.syncEnd).format("D/M/YYYY")
                            },
                            {
                                title: 'Median Sync Time', 
                                field: 'medianSync',
                                render: rowData => (rowData.medianSync.replace(":"," hrs, ").replace(":"," mins and ") + " secs")
                            }
                        ]}
                        fetchData={apis.fetchMedianSync}
                        onResolve={data => ({data})}
                        filterQueryString={queryString}
                    />
                </Grid>
            </Grid>
            
        </div>
    )
}
