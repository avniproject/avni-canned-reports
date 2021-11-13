import React, {Fragment, useEffect, useState} from 'react';
import apis from '../api';
import './ActivitiesReportScreen.css'
import Spinner from "../components/Spinner";
import ActivityCalender from "../components/ActivityCalender";
import ActivityPieChart from "../components/ActivityPieChart";


const Activities = ({data}) => {
    const {completedVisits, registrations, enrolments, daywiseActivities, cancelledVisits, onTimeVisits, programExits} = data;
    return (
        <Fragment>
            <p>Day wise activities</p>
            <ActivityCalender data={daywiseActivities.data}/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <ActivityPieChart
                    data={registrations.data}
                    chartName={'Registrations'}
                    height={350}/>
                <ActivityPieChart
                    data={enrolments.data}
                    chartName={'Program enrolments'}
                    height={350}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <ActivityPieChart
                    data={completedVisits.data}
                    chartName={'Visits'}
                    height={350}/>
                <ActivityPieChart
                    data={cancelledVisits.data}
                    chartName={'Cancelled visits'}
                    height={350}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <ActivityPieChart
                    data={onTimeVisits.data}
                    chartName={'On time visits'}
                    height={350}/>
                <ActivityPieChart
                    data={programExits.data}
                    chartName={'Program exits'}
                    height={350}/>
            </div>
        </Fragment>
    )
};

export default function ActivitiesReportScreen() {
    const [activities, setActivities] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apis.fetchActivities().then(data => {
            setActivities(data);
            setLoading(false);
        })
    }, []);

    return (
        loading ? <Spinner/> : <Activities data={activities}/>
    )
}
