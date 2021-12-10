import React, {useState, useEffect} from 'react';
import apis from "../api";
import Grid from "@mui/material/Grid";
import ActivityPieChart from "../components/ActivityPieChart";
import _ from 'lodash';
import DataTable from "../components/DataTable";
import moment from "moment";

export default function HrReportScreen() {

    const [deviceModels, setDeviceModels] = useState({loading: true, data: []});
    const [appVersions, setAppVersions] = useState({loading: true, data: []});
    const [championUsers, setChampionUsers] = useState({loading: true, data: []});
    const [nonPerformingUsers, setNonPerformingUsers] = useState({loading: true, data: []});
    const [mostCancelled, setMostCancelled] = useState({loading: true, data: []});

    useEffect(() => {
        apis.fetchUserDeviceModels()
            .then(data => setDeviceModels({loading: false, data}));
    }, []);

    useEffect(() => {
        apis.fetchUserAppVersions()
            .then(data => setAppVersions({loading: false, data}));
    }, []);

    useEffect(() => {
        apis.fetchChampionUsers()
            .then(data => setChampionUsers({loading: false, data}))
    }, []);

    useEffect(() => {
        apis.fetchNonPerformingUsers()
            .then(data => setNonPerformingUsers({loading: false, data}))
    }, []);

    useEffect(() => {
        apis.fetchUserCancellingVisits()
            .then(data => setMostCancelled({loading: false, data}))
    }, []);

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

    return (
        <div style={{display: 'flex', flexDirection: 'column', margin: 20, alignItems: 'flexStart'}}>
            <Grid container spacing={2} direction={'row'}>
                <Grid item xs={6}>
                    <DataTable
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
                    />
                </Grid>
                <Grid item xs={6}>
                    <DataTable
                        title={'Top 10 users by sync failures'}
                        columns={[
                            {title: 'User', field: 'userName'},
                            {title: 'Total Sync failures', field: 'count'}
                        ]}
                        fetchData={apis.fetchUserSyncFailures}
                        onResolve={data => ({data})}
                    />
                </Grid>
            </Grid>
            <Grid container direction={'row'}>
                <Grid item xs={6}>
                    <ActivityPieChart
                        loading={deviceModels.loading}
                        data={deviceModels.data}
                        chartName={'Device models'}
                        height={350}/>
                </Grid>
                <Grid item xs={6}>
                    <ActivityPieChart
                        loading={appVersions.loading}
                        data={appVersions.data}
                        chartName={'App versions'}
                        height={350}/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <DataTable
                    title={'Sync telemetry'}
                    options={{paging: true, maxBodyHeight: 500}}
                    columns={syncTelemetryColumns}
                    fetchData={apis.fetchSyncTelemetry}
                    onResolve={data => ({
                        data: data._embedded.syncTelemetries,
                        page: data.page.number,
                        totalCount: data.page.totalElements
                    })}
                />
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
