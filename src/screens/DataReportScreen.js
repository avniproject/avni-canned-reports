import React, {useEffect, useState} from 'react';
import apis from "../api";
import './DataReportScreen.css'

const FormItem = (form) => {
  return (<option value={form.uuid} key={form.uuid}>{form.name}</option>)
};

const FormList = ({forms, form, onFormSelect}) => {
  return (
    <select name="Forms" id="forms" value={form} onChange={(event) => {
      debugger;
      onFormSelect(event.target.value)
    }}>
      {forms.map((form) => FormItem(form))}
    </select>
  )
};

export default function DataReportScreen() {
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    apis.fetchForms().then(data => {
      setForms(data);
    })
  }, []);

  const setFormHere = (value) => {
    setForm(forms.find(form => form.uuid === value));
  };

  return (
    <div className={"container"}>
      <div className={"header"}>
        <FormList forms={forms} onFormSelect={setFormHere} form={form.uuid}/>
        <p>Selected form is {form.name}</p>
      </div>
    </div>
  )
}
