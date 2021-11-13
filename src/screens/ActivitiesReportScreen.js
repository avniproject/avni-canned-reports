import React, {Fragment, useEffect, useState} from 'react';
import apis from '../api';
import './ActivitiesReportScreen.css'
import Spinner from "../components/Spinner";
import ActivityCalender from "../components/ActivityCalender";
import ActivityPieChart from "../components/ActivityPieChart";


const Activities = ({data}) => {
    const {completedVisits, registrations, enrolments, daywiseActivities} = data;
    return (
        <Fragment>
            <p>Day wise activities</p>
            <ActivityCalender data={daywiseActivities.data}/>
            <p>Registrations</p>
            <ActivityPieChart data={registrations.data}/>
            <p>Program enrolments</p>
            <ActivityPieChart data={enrolments.data}/>
            <p>Visits</p>
            <ActivityPieChart data={completedVisits.data}/>
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
