import React, {Fragment, useEffect, useState} from 'react';
import apis from '../api';
import ActivityCalender from "../components/ActivityCalender";
import ActivityPieChart from "../components/ActivityPieChart";
import ReportFilters from "../components/ReportFilters";
import Grid from "@mui/material/Grid";
import {map} from 'lodash';

const Activities = ({
                        daywiseActivities,
                        registrations,
                        enrolments,
                        completedVisits,
                        cancelledVisits,
                        onTimeVisits,
                        programExits
                    }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flexStart'}}>
            <ActivityCalender
                data={daywiseActivities.data}
                title={'Day wise activities'}
                loading={daywiseActivities.loading}
            />
            <Grid container direction={'row'} spacing={2}>
                <Grid item xs={6}>
                    <ActivityPieChart
                        loading={registrations.loading}
                        data={registrations.data}
                        chartName={'Registrations'}
                        height={350}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ActivityPieChart
                        loading={enrolments.loading}
                        data={enrolments.data}
                        chartName={'Program enrolments'}
                        height={350}
                    />
                </Grid>
            </Grid>
            <Grid container direction={'row'} spacing={2}>
                <Grid item xs={6}>
                    <ActivityPieChart
                        loading={programExits.loading}
                        data={programExits.data}
                        chartName={'Program exits'}
                        height={350}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ActivityPieChart
                        loading={completedVisits.loading}
                        data={completedVisits.data}
                        chartName={'Visits'}
                        height={350}
                    />
                </Grid>
            </Grid>
            <Grid container direction={'row'} spacing={2}>
                <Grid item xs={6}>
                    <ActivityPieChart
                        loading={onTimeVisits.loading}
                        data={onTimeVisits.data}
                        chartName={'On time visits'}
                        height={350}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ActivityPieChart
                        loading={cancelledVisits.loading}
                        data={cancelledVisits.data}
                        chartName={'Cancelled visits'}
                        height={350}
                    />
                </Grid>
            </Grid>
        </div>
    )
};

export default function ActivitiesReportScreen() {

    const [daywiseActivities, setDaywiseActivities] = useState({loading: true, data: []});
    const [registrations, setRegistrations] = useState({loading: true, data: []});
    const [enrolments, setEnrolments] = useState({loading: true, data: []});
    const [completedVisits, setCompletedVisits] = useState({loading: true, data: []});
    const [cancelledVisits, setCancelledVisits] = useState({loading: true, data: []});
    const [onTimeVisits, setOnTimeVisits] = useState({loading: true, data: []});
    const [programExits, setProgramExits] = useState({loading: true, data: []});
    const [loading, setLoading] = useState(true);
    const activityTypeToDispatcherMap = {
        "daywiseActivities": setDaywiseActivities,
        "registrations": setRegistrations,
        "enrolments": setEnrolments,
        "onTimeVisits": setOnTimeVisits,
        "programExits": setProgramExits,
        "completedVisits": setCompletedVisits,
        "cancelledVisits": setCancelledVisits,
    };

    function fetchData(queryString = "") {
        Promise.all(map(
            activityTypeToDispatcherMap,
            (setState, type) => Promise.resolve(
                apis.fetchActivity(type, queryString).then(({data}) => setState({loading: false, data}))
            ))
        ).then(() => setLoading(false));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Fragment>
            <ReportFilters onApply={(queryString) => fetchData(queryString)} disableFilter={loading} displayTypeFilter/>
            <Activities
                daywiseActivities={daywiseActivities}
                registrations={registrations}
                enrolments={enrolments}
                completedVisits={completedVisits}
                cancelledVisits={cancelledVisits}
                onTimeVisits={onTimeVisits}
                programExits={programExits}
            />
        </Fragment>
    )
}
