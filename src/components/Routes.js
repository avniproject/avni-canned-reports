import React from 'react';
import {BrowserRouter as Router, Route, Routes as RRRoutes} from "react-router-dom";
import ActivitiesDashboard from "../Dashboards/ActivitiesDashboard";
import DataDashboard from "../Dashboards/DataDashboard";
import HRDashboard from "../Dashboards/HRDashboard";
import HomeScreen from "../Dashboards/HomeScreen";
import Box from "@mui/material/Box";

const drawerWidth = 240;
export default function Routes() {
    return (
        <Router>
            <Box component="main" sx={{flexGrow: 1, ml: 30, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}>
                <Box style={{marginTop: 100}}>
                    <RRRoutes>
                        <Route exact path="/analytics/activities" element={<ActivitiesDashboard/>}>
                        </Route>
                        <Route path="/analytics/data" element={<DataDashboard/>}>
                        </Route>
                        <Route path="/analytics/hr" element={<HRDashboard/>}>
                        </Route>
                    </RRRoutes>
                </Box>
            </Box>
            <HomeScreen/>
        </Router>
    )
}
