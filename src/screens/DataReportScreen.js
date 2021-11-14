import React, {useEffect, useState} from 'react';
import apis from "../api";
import './DataReportScreen.css'
import FormList from "../components/FormList";
import AutoSuggestSingleSelection from "../components/AutoSuggestSingleSelection";
import {useLocation} from "react-router";

export default function DataReportScreen() {
  apis.setAuth(useLocation());

  const [forms, setForms] = useState([]);
  const [form, setForm] = useState({});
  const [concept, setConcept] = useState({name: ''});
  const setFormInState = (value) => {
    setForm(forms.find(form => form.uuid === value));
  };

  useEffect(() => {
    apis.fetchForms().then(data => {
      setForms(data);
    })
  }, []);

  return (
    <div className={"container"}>
      <div className={"header"}>
        <FormList forms={forms} onFormSelect={setFormInState} form={form.uuid}/>
        <p>Selected form is {form.name}</p>
        <input type={"text"} value={concept}></input>
        <AutoSuggestSingleSelection
          visibility={false}
          showAnswer={concept}
          onChangeAnswerName={setConcept}
          finalReturn={true}
          index={0}
          label="Concept"
          placeholder={"abc"}
        />
      </div>
    </div>
  );
}
