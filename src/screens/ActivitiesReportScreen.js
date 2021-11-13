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
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <ActivityPieChart
                    data={registrations.data}
                    chartName={'Registrations'}
                    itemLegendWidth={100}
                    height={350}/>
                <ActivityPieChart
                    data={enrolments.data}
                    chartName={'Program enrolments'}
                    itemLegendWidth={100}
                    height={350}/>
            </div>
            <div>
                <ActivityPieChart
                    data={completedVisits.data}
                    chartName={'Visits'}
                    itemLegendWidth={450}
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
