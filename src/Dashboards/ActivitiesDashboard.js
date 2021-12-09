import React, {Fragment, useEffect, useState} from 'react';
import apis from '../api';
import Spinner from "../components/Spinner";
import ActivityCalender from "../components/ActivityCalender";
import ActivityPieChart from "../components/ActivityPieChart";
import ReportFilters from "../components/ReportFilters";


const Activities = ({data}) => {
    const {completedVisits, registrations, enrolments, daywiseActivities, cancelledVisits, onTimeVisits, programExits} = data;
    return (
        <div style={{marginBottom: 20}}>
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
                    data={programExits.data}
                    chartName={'Program exits'}
                    height={350}/>
                <ActivityPieChart
                    data={completedVisits.data}
                    chartName={'Visits'}
                    height={350}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <ActivityPieChart
                    data={onTimeVisits.data}
                    chartName={'On time visits'}
                    height={350}/>
                <ActivityPieChart
                    data={cancelledVisits.data}
                    chartName={'Cancelled visits'}
                    height={350}/>
            </div>
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
