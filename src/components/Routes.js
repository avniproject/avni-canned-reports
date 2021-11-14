import React from 'react';
import {BrowserRouter as Router, Route, Routes as RRRoutes} from "react-router-dom";
import ActivitiesDashboard from "../Dashboards/ActivitiesDashboard";
import DataDashboard from "../Dashboards/DataDashboard";
import HRDashboard from "../Dashboards/HRDashboard";

export default function Routes() {
    return (
        <Router>
            <RRRoutes>
                <Route exact path="/" element={<ActivitiesDashboard/>}>
                </Route>
                <Route path="/data" element={<DataDashboard/>}>
                </Route>
                <Route path="/hr" element={<HRDashboard/>}>
                </Route>
            </RRRoutes>
        </Router>
    )
}
