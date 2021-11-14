import React from 'react';
import './HomeScreen.css'
import Sidebar from "../components/Sidebar";
import Routes from "../components/Routes";

export const HomeScreen = () => {
    return (
        <div className={"main"}>
            <div className={"left"}>
                <Sidebar/>
            </div>
            <div className={"right"}>
                <Routes/>
            </div>
        </div>)
};
