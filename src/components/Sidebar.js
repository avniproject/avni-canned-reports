import React from 'react';
import './Sidebar.css'

export default function Sidebar() {

    return (
        <div className={"container"}>
            <a href={"/"}>Activities</a>
            <a href={"/data"}>Data</a>
            <a href={"/hr"}>HR</a>
            <a href={"/test"}>Test</a>
        </div>
    )
}
