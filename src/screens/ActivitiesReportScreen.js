import React, {Suspense, useEffect, useState} from 'react';
import apis from '../api';
import './ActivitiesReportScreen.css'
import {map} from 'lodash';

export default function ActivitiesReportScreen() {
    const [activities, setActivities] = useState({});

    useEffect(() => {
        apis.fetchActivities().then(res => setActivities(res.data))
    }, []);

    return (
        <Suspense fallback={<div className="spinner" />}>
            <div>
                {map(activities, a => console.log(a))}
            </div>
        </Suspense>
    )
}
