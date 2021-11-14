import React, {Fragment, useEffect, useState} from 'react';
import apis from "../api";
import './DataDashboard.css'
import FormList from "../components/FormList";
import {useLocation} from "react-router";
import Spinner from "../components/Spinner";
import ActivityPieChart from "../components/ActivityPieChart";
import _ from 'lodash';

export default function DataDashboard() {
    apis.setAuth(useLocation());
    const [forms, setForms] = useState([]);
    const [form, setForm] = useState({});
    const [graphData, setGraphData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const setFormInState = (value) => {
        setForm(forms.find(form => form.uuid === value));
    };

    const errorHandler = (e) => {
        console.error(e);
        setLoading(false);
        setError(true);
    };

    useEffect(() => {
        if (!form) {
            return;
        }
        setLoading(true);
        setGraphData([]);
        apis.fetchFormData(form)
            .then((graphData) => {
                setLoading(false);
                setGraphData(graphData);
                setError(false);
            }).catch(errorHandler);
    }, [form]);


    useEffect(() => {
        setLoading(true);
        apis.fetchForms().then(data => {
            setForms(data);
            setLoading(false);
            setError(false);
        }).catch(errorHandler);
    }, []);

    const renderPair = (pair) => {
        return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {pair.map(item => renderGraph(item))}
            </div>
        );
    };

    const renderGraph = (item) => {
        return (<ActivityPieChart
            data={item.data}
            chartName={item.concept.name}
            height={350}
        />);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', margin: 20, alignItems: 'flexStart'}}>
            <FormList forms={forms} onFormSelect={setFormInState} form={form.uuid}/>
            {loading && <Spinner/>}
            {error && <p>Something went wrong. Please see console for more details. </p>}
            <div>
                {_.chunk(graphData, 2).map(renderPair)}
                {graphData.length === 0 && loading === false && form && <p>No Data Available</p>}
            </div>
        </div>
    );
}
