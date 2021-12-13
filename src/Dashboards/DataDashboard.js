import React, {useEffect, useState} from 'react';
import apis from "../api";
import './DataDashboard.css'
import FormList from "../components/FormList";
import Spinner from "../components/Spinner";
import ActivityPieChart from "../components/ActivityPieChart";
import {chunk, isEmpty, filter, includes} from 'lodash';
import ReportFilters from "../components/ReportFilters";
import Grid from "@mui/material/Grid";

export default function DataDashboard() {
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

    const fetchData = (queryString = "") => {
        setLoading(true);
        setGraphData([]);
        apis.fetchFormData(form, queryString)
            .then((graphData) => {
                setLoading(false);
                setGraphData(graphData);
                setError(false);
            }).catch(errorHandler);
    };


    useEffect(() => {
        setLoading(true);
        apis.fetchForms().then(forms => {
            const supportedForms = ['IndividualProfile', 'ProgramEnrolment', 'ProgramEncounter', 'Encounter'];
            setForms(filter(forms, ({formType}) => includes(supportedForms, formType)));
            setLoading(false);
            setError(false);
        }).catch(errorHandler);
    }, []);

    const renderPair = (pair, index) => {
        return (
            <Grid key={index} container direction={'row'} spacing={2}>
                {pair.map(item => renderGraph(item))}
            </Grid>
        );
    };

    const renderGraph = (item, index) => {
        return (
            <Grid key={index} item xs={6}>
                <ActivityPieChart
                    data={item.data}
                    chartName={item.concept.name}
                    height={350}
                />
            </Grid>
        );
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', margin: 20, alignItems: 'flexStart'}}>
            <Grid container direction={'row'} spacing={2}>
                <Grid item>
                    <FormList forms={forms} onFormSelect={setFormInState}/>
                </Grid>
                <Grid item>
                    <ReportFilters onApply={(queryString) => fetchData(queryString)}
                                   disableFilter={loading || isEmpty(form)}/>
                </Grid>
            </Grid>


            {loading && <Spinner/>}
            {error && <p>Something went wrong. Please see console for more details. </p>}
            <div>
                {chunk(graphData, 2).map(renderPair)}
                {graphData.length === 0 && loading === false && form && <p>No Data Available</p>}
            </div>
        </div>
    );
}
