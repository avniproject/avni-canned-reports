import React, {useEffect, useState} from 'react';
import apis from "../api";
import './DataDashboard.css'
import FormList from "../components/FormList";
import {useLocation} from "react-router";
import ConceptSelect from "../components/ConceptSelect";

export default function DataDashboard() {
    apis.setAuth(useLocation());
    const [forms, setForms] = useState([]);
    const [form, setForm] = useState({});
    const [concept, setConcept] = useState({});
    const setFormInState = (value) => {
        setForm(forms.find(form => form.uuid === value));
    };

    useEffect(() => {
        apis.fetchForms().then(data => {
            setForms(data);
        })
    }, []);

    return (
        <div style={{display: 'flex', flexDirection: 'row', margin: 20, alignItems: 'center'}}>
            <FormList forms={forms} onFormSelect={setFormInState} form={form.uuid} className={"item"}/>
            <ConceptSelect onSelect={setConcept}/>
        </div>
    );
}
