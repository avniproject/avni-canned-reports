import React, {Fragment, useEffect, useState} from 'react';
import apis from '../api';
import Spinner from "../components/Spinner";
import ActivityCalender from "../components/ActivityCalender";
import ActivityPieChart from "../components/ActivityPieChart";
import ReportFilters from "../components/ReportFilters";
import Grid from "@mui/material/Grid";


const Activities = ({data}) => {
    const {completedVisits, registrations, enrolments, daywiseActivities, cancelledVisits, onTimeVisits, programExits} = data;
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flexStart'}}>
            <p>Day wise activities</p>
            <ActivityCalender data={daywiseActivities.data}/>
            <Grid container direction={'row'} spacing={2}>
                <Grid item xs={6}>
                    <ActivityPieChart
                        data={registrations.data}
                        chartName={'Registrations'}
                        height={350}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ActivityPieChart
                        data={enrolments.data}
                        chartName={'Program enrolments'}
                        height={350}
                    />
                </Grid>
            </Grid>
            <Grid container direction={'row'} spacing={2}>
                <Grid item xs={6}>
                    <ActivityPieChart
                        data={programExits.data}
                        chartName={'Program exits'}
                        height={350}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ActivityPieChart
                        data={completedVisits.data}
                        chartName={'Visits'}
                        height={350}
                    />
                </Grid>
            </Grid>
            <Grid container direction={'row'} spacing={2}>
                <Grid item xs={6}>
                    <ActivityPieChart
                        data={onTimeVisits.data}
                        chartName={'On time visits'}
                        height={350}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ActivityPieChart
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

    const [activities, setActivities] = useState({});
    const [loading, setLoading] = useState(true);

    function fetchData(queryString = "") {
        setLoading(true);
        apis.fetchActivities(queryString).then(data => {
            setActivities(data);
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Fragment>
            <ReportFilters onApply={(queryString) => fetchData(queryString)} disableFilter={loading} displayTypeFilter/>
            {loading ? <Spinner/> : <Activities data={activities}/>}
        </Fragment>
    )
}
