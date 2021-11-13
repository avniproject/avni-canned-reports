import React, {useEffect, useState} from 'react';
import apis from "../api";
import Spinner from "../components/Spinner";

const FormItem = (form) => {
  return (<p>{form.name}</p>)
};

const FormList = ({forms}) => {
  return (
    <div>
      {forms.map((form) => FormItem(form))}
    </div>
  )
};


export default function DataReportScreen() {
  const [forms, setForms] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apis.fetchForms().then(data => {
      console.log('data', data);
      setForms(data);
      setLoading(false);
    })
  }, []);

  return (
    loading ? <Spinner/> : <FormList forms={forms}/>
  )
}
