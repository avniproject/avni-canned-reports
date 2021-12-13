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
    const [championUsers, setChampionUsers] = useState({loading: true, data: []});
    const [nonPerformingUsers, setNonPerformingUsers] = useState({loading: true, data: []});
    const [mostCancelled, setMostCancelled] = useState({loading: true, data: []});
    const [queryString, setQueryString] = useState("");
    const overAllActivityRef = React.createRef();
    const syncFailureRef = React.createRef();
    const userDetailsRef = React.createRef();
    const syncTelemetryRef = React.createRef();
    const isLoading = deviceModels.loading || appVersions.loading || championUsers.loading || nonPerformingUsers.loading || mostCancelled.loading;
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
            render: rowData => _.get(rowData, '_links.userName.href')
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
            title: 'Device brand',
            field: 'deviceInfo',
            render: rowData => _.defaultTo(_.get(rowData, 'deviceInfo.brand'), rowData.deviceName)
        },
        {
            title: 'Sync start time',
            field: 'syncStartTime',
            render: rowData => moment(rowData.syncStartTime).format("D/M/YYYY h:mm a")
        },
        {
            title: 'Sync end time',
            field: 'syncEndTime',
            render: rowData => rowData.syncEndTime ? moment(rowData.syncEndTime).format("D/M/YYYY h:mm a") : ''
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
            apis.fetchChampionUsers(queryString)
                .then(data => setChampionUsers({loading: false, data})),
            apis.fetchNonPerformingUsers(queryString)
                .then(data => setNonPerformingUsers({loading: false, data})),
            apis.fetchUserCancellingVisits(queryString)
                .then(data => setMostCancelled({loading: false, data})),
        ]);
    };

    const startLoading = () => {
        setDeviceModels({loading: true});
        setAppVersions({loading: true});
        setChampionUsers({loading: true});
        setNonPerformingUsers({loading: true});
        setMostCancelled({loading: true});
    };

    const refreshTables = () => {
        overAllActivityRef.current && overAllActivityRef.current.onQueryChange();
        syncFailureRef.current && syncFailureRef.current.onQueryChange();
        userDetailsRef.current && userDetailsRef.current.onQueryChange();
        syncTelemetryRef.current && syncTelemetryRef.current.onQueryChange();
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
                <Grid item xs={6}>
                    <DataTable
                        tableRef={overAllActivityRef}
                        title={'Top 10 users by overall activity'}
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
                <Grid item xs={6}>
                    <DataTable
                        tableRef={syncFailureRef}
                        title={'Top 10 users by sync failures'}
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
            <Grid container direction={'row'}>
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
            <Grid container direction={'column'} spacing={3}>
                <Grid item>
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
                        title={'Sync telemetry'}
                        options={{paging: true, maxBodyHeight: 500}}
                        columns={syncTelemetryColumns}
                        fetchData={apis.fetchSyncTelemetry}
                        onResolve={data => ({
                            data: _.defaultTo(_.get(data, '_embedded.syncTelemetries'), []),
                            page: data.page.number,
                            totalCount: data.page.totalElements
                        })}
                        filterQueryString={queryString}
                    />
                </Grid>
            </Grid>

            <Grid container direction={'row'}>
                <Grid item xs={6}>
                    <ActivityPieChart
                        loading={championUsers.loading}
                        data={championUsers.data}
                        chartName={'Users with more than 80 % visits completed on time'}
                        height={350}/>
                </Grid>
                <Grid item xs={6}>
                    <ActivityPieChart
                        loading={nonPerformingUsers.loading}
                        data={nonPerformingUsers.data}
                        chartName={'Users with less than 50 % visits completed on time'}
                        height={350}/>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <ActivityPieChart
                    loading={mostCancelled.loading}
                    data={mostCancelled.data}
                    chartName={'Top 5 users with most cancelled visits'}
                    height={350}/>
            </Grid>
        </div>
    )
}
