import React from 'react';
import apis from "../api";
import {useLocation} from "react-router";

export default function HrReportScreen() {
    apis.setAuth(useLocation());

    return (
        <div>
            hr report screen
        </div>
    )
}
