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

export default FormList;
