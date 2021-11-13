import React, {useEffect, useState} from 'react';
import apis from '../api';
import './ActivitiesReportScreen.css'
import Spinner from "../components/Spinner";
import ActivityCalender from "../components/ActivityCalender";


const Activities = ({data}) => {
    const {completedVisits, registrations, enrolments, daywiseActivities} = data;
    console.log("daywiseActivities =>>>", daywiseActivities);
    return (
        <ActivityCalender data={daywiseActivities.data}/>
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
