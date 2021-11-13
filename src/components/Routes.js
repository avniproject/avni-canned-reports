import React from 'react';
import {BrowserRouter as Router, Route, Routes as RRRoutes} from "react-router-dom";
import ActivitiesReportScreen from "../screens/ActivitiesReportScreen";
import DataReportScreen from "../screens/DataReportScreen";
import HrReportScreen from "../screens/HrReportScreen";

export default function Routes() {
    return (
        <Router>
            <RRRoutes>
                <Route exact path="/" element={<ActivitiesReportScreen/>}>
                </Route>
                <Route path="/data" element={<DataReportScreen/>}>
                </Route>
                <Route path="/hr" element={<HrReportScreen/>}>
                </Route>
            </RRRoutes>
        </Router>
    )
}
