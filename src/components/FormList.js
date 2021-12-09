import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import _ from "lodash";
import Select from 'react-select';

const formatOptions = (forms) => _.map(forms, ({uuid, name}) => ({
    label: name,
    value: uuid,
}));

const FormList = ({forms, onFormSelect}) => {
    const [form, setForm] = React.useState();

    const onChange = (event) => {
        setForm(event);
        onFormSelect(event.value);
    };

    return (
        <FormControl fullWidth component="fieldset" sx={{width: 400}}>
            <FormLabel component="legend" sx={{marginBottom: 1}}>{"Choose a Form"}</FormLabel>
            <Select
                isSearchable
                options={formatOptions(forms)}
                onChange={onChange}
                value={form}
            />
        </FormControl>
    )
};

export default FormList;
